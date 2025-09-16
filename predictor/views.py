from django.shortcuts import render, redirect 
import json
import pandas as pd
import numpy as np
import re
from src.pipeline.predict_pipeline import CustomData, PredictPipeline
from scipy.stats import gaussian_kde
from src.components.data_ingestion import DataIngestion
from src.exception import CustomException
from django.core.cache import cache
from src.logger import logging


def home_view(request):
    return render(request, "index.html")

def eda_view(request):
    cached_context = cache.get('eda_context')

    if cached_context:
        logging.info("EDA context loaded from cache.")
        return render(request, 'explatory_data_analysis.html', cached_context)
    logging.info("EDA context not found in cache, recalculating...")

    try:
        df = pd.read_csv("notebook/data/lending_club_loan_two.csv")
        if 'loan_status_bin' not in df.columns:
            df['loan_status_bin'] = df['loan_status'].map({'Fully Paid': 0, 'Charged Off': 1})

        loan_status_counts = df['loan_status'].value_counts()
        status_labels = loan_status_counts.index.tolist()
        status_data = loan_status_counts.values.tolist()

        bins = [0, 5000, 10000, 15000, 20000, 25000, 30000, 40000]
        labels = ['0-5k', '5k-10k', '10k-15k', '15k-20k', '20k-25k', '25k-30k', '30k-40k']
        df['loan_amnt_cat'] = pd.cut(df['loan_amnt'], bins=bins, labels=labels, right=False)

        loan_amnt_counts = df['loan_amnt_cat'].value_counts().sort_index()
        loan_amnt_area_labels = loan_amnt_counts.index.astype(str).tolist()
        loan_amnt_area_data = loan_amnt_counts.values.tolist()


        df['loan_status_bin'] = df['loan_status'].map({'Fully Paid': 0, 'Charged Off': 1})
        grouped_countplot = df.groupby(['loan_amnt_cat', 'loan_status']).size().unstack(fill_value=0)
        cat_labels = grouped_countplot.index.tolist()

        

        fully_paid_data = grouped_countplot['Fully Paid'].values.tolist()
        charged_off_data = grouped_countplot['Charged Off'].values.tolist()

        grouped_barplot = df.groupby('loan_amnt_cat')['loan_status_bin'].mean().reset_index()
        mean_labels = grouped_barplot['loan_amnt_cat'].tolist()
        mean_data = grouped_barplot['loan_status_bin'].tolist()
        x_values = np.arange(len(mean_data))
        m, c = np.polyfit(x_values, mean_data, 1)
        mean_trendline_data = (m * x_values + c).tolist()

        term_counts = df['term'].value_counts()
        term_labels = term_counts.index.tolist()
        term_data = term_counts.values.tolist()

        term_grouped_counts = df.groupby(['term', 'loan_status']).size().unstack(fill_value=0)
        term_grouped_labels = term_grouped_counts.index.tolist()
        term_grouped_fully_paid = term_grouped_counts['Fully Paid'].values.tolist()
        term_grouped_charged_off = term_grouped_counts['Charged Off'].values.tolist()

        term_mean = df.groupby('term')['loan_status_bin'].mean()
        term_mean_labels = term_mean.index.tolist()
        term_mean_data = term_mean.values.tolist()




        df['loan_to_income'] = np.where(df['annual_inc'] == 0, 0, df['loan_amnt'] / df['annual_inc'])
        income_bins = [0, 40000, 80000, 120000, 160000, df['annual_inc'].max() + 1]
        income_labels = ['0-40k', '40k-80k', '80k-120k', '120k-160k', '160k+']
        df['income_cat'] = pd.cut(df['annual_inc'], bins=income_bins, labels=income_labels, right=False)


        ltoi_plot_data = []
        filtered_df = df[df['loan_to_income'] < 1]
        for status in ['Fully Paid', 'Charged Off']:
            ltoi_plot_data.append({
                'y': filtered_df[filtered_df['loan_status'] == status]['loan_to_income'].dropna().tolist(),
                'type': 'box',
                'name': status,
                'boxpoints': 'outliers' 
            })

        
        income_plot_data = []
        for status in ['Fully Paid', 'Charged Off']:
            x_data = []
            y_data = []
            for cat in income_labels:
                subset = df[(df['income_cat'] == cat) & (df['loan_status'] == status)]
                # Her bir veri noktası için x ve y değerlerini ekliyoruz
                y_data.extend(subset['loan_amnt'].dropna().tolist())
                x_data.extend([cat] * len(subset)) # Kategori adını veri sayısı kadar tekrar et
            
            income_plot_data.append({
                                    'x': x_data,
                                    'y': y_data,
                                    'type': 'box',
                                    'name': status,
                                    'boxpoints': 'outliers'
                                    })

        context = {
            'status_labels': status_labels,
            'status_data': status_data,
            
            'loan_amnt_area_labels': loan_amnt_area_labels,
            'loan_amnt_area_data': loan_amnt_area_data,

            'cat_labels': cat_labels,
            'fully_paid_data': fully_paid_data,
            'charged_off_data': charged_off_data,
            'mean_labels': mean_labels,
            'mean_data': mean_data,
            'mean_trendline_data': mean_trendline_data,

            'term_labels': term_labels,
            'term_data': term_data,
            'term_grouped_labels': term_grouped_labels,
            'term_grouped_fully_paid': term_grouped_fully_paid,
            'term_grouped_charged_off': term_grouped_charged_off,
            'term_mean_labels': term_mean_labels,
            'term_mean_data': term_mean_data,

            'ltoi_boxplot_data': ltoi_plot_data,
            'income_boxplot_data': income_plot_data,
        }
        cache.set('eda_context', context, 3600)
        return render(request, 'explatory_data_analysis.html', context)
    except FileNotFoundError:
        context = {'error': 'Data File "notebook/data/lending_club_loan_two.csv" Doesnt exist.'}
        return render(request, 'explatory_data_analysis.html', context)

    
def clean_numeric(value_str):
    """This function removes characters such as None, space, comma, dollar sign and converts them to float."""
    if value_str is None or value_str.strip() == '':
        return 0.0  
    
    
    characters_to_remove = ",$ %"
    for char in characters_to_remove:
        value_str = value_str.replace(char, '')
    
    try:
        return float(value_str)
    except (ValueError, TypeError):
        return 0.0 

def predict_view(request):
    context = {
        'results': request.session.pop('results', None),
        'form_data': request.session.pop('form_data', {})
    }
    
    if request.method == 'POST':
        form_data = request.POST
        
        try:
            address_str = form_data.get('address', '')
            zipcode_match = re.search(r'(\d{5})$', address_str.strip())
            zipcode_str = zipcode_match.group(1) if zipcode_match else "00000"
            data = CustomData(
                    loan_amnt=clean_numeric(form_data.get('loan_amnt')),
                    int_rate=clean_numeric(form_data.get('int_rate')),
                    installment=clean_numeric(form_data.get('installment')),
                    annual_inc=clean_numeric(form_data.get('annual_inc')),
                    dti=clean_numeric(form_data.get('dti')),
                    revol_bal=clean_numeric(form_data.get('revol_bal')),
                    revol_util=clean_numeric(form_data.get('revol_util')),
                    
                    open_acc=int(clean_numeric(form_data.get('open_acc'))),
                    pub_rec=int(clean_numeric(form_data.get('pub_rec'))),
                    total_acc=int(clean_numeric(form_data.get('total_acc'))),
                    mort_acc=int(clean_numeric(form_data.get('mort_acc'))),
                    pub_rec_bankruptcies=int(clean_numeric(form_data.get('pub_rec_bankruptcies'))),

                    term=form_data.get('term', '').strip(),
                    sub_grade=form_data.get('sub_grade'),
                    home_ownership=form_data.get('home_ownership'),
                    verification_status=form_data.get('verification_status'),
                    issue_d=form_data.get('issue_d'),
                    purpose=form_data.get('purpose'),
                    earliest_cr_line=form_data.get('earliest_cr_line'),
                    initial_list_status=form_data.get('initial_list_status'),
                    application_type=form_data.get('application_type'),
                    address=address_str,
                    zipcode=zipcode_str
            )
                
            pred_df = data.get_data_as_dataframe()
                
            predict_pipeline = PredictPipeline()
            prediction = predict_pipeline.predict(pred_df)
                
            results = "Charged Off" if prediction[0] == 1 else "Fully Paid"

        except Exception as e:
            results = f"An Error Occured: {e}"
        
        request.session['results'] = results
        request.session['form_data'] = form_data.dict()
        return redirect('predictor:predict')
    return render(request, 'model.html', context)
    
