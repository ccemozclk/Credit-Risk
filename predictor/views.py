from django.shortcuts import render, redirect 
import json
import pandas as pd
import numpy as np
import re
from src.pipeline.predict_pipeline import CustomData, PredictPipeline
from scipy.stats import gaussian_kde

def home_view(request):
    return render(request, "index.html")

def eda_view(request):
    try:
        df = pd.read_csv("notebook/data/lending_club_loan_two.csv")
    except FileNotFoundError:
        context = {'error': 'Veri dosyası "notebook/data/lending_club_loan_two.csv" bulunamadı.'}
        return render(request, 'explatory_data_analysis.html', context)

    loan_status_counts = df['loan_status'].value_counts()
    status_labels = loan_status_counts.index.tolist()
    status_data = loan_status_counts.values.tolist()


    bins = np.arange(0, 40001, 2000) 
    labels = [f'{int(i/1000)}k-{int((i+2000)/1000)}k' for i in bins[:-1]]
    df['loan_amnt_binned'] = pd.cut(df['loan_amnt'], bins=bins, labels=labels, right=False)
    loan_amnt_counts = df['loan_amnt_binned'].value_counts().sort_index()
    loan_amnt_labels = loan_amnt_counts.index.tolist()
    loan_amnt_data = loan_amnt_counts.values.tolist()

    bin_centers = [(bins[i] + bins[i+1]) / 2 for i in range(len(bins)-1)]
    kde = gaussian_kde(df['loan_amnt'].dropna()) 
    loan_amnt_kde_data = kde(bin_centers).tolist()



    bins_cat = [0, 5000, 10000, 15000, 20000, 25000, 30000, 40000]
    labels_cat = ['0-5k', '5k-10k', '10k-15k', '15k-20k', '20k-25k', '25k-30k', '30k-40k']
    df['loan_amnt_cat'] = pd.cut(df['loan_amnt'], bins=bins_cat, labels=labels_cat)
    df['loan_status_bin'] = df['loan_status'].map({'Fully Paid': 0, 'Charged Off': 1})
    grouped_countplot = df.groupby(['loan_amnt_cat', 'loan_status']).size().unstack(fill_value=0)
    cat_labels = grouped_countplot.index.tolist()
    fully_paid_data = grouped_countplot['Fully Paid'].values.tolist()
    charged_off_data = grouped_countplot['Charged Off'].values.tolist()

    grouped_barplot = df.groupby('loan_amnt_cat')['loan_status_bin'].mean().reset_index()
    mean_labels = grouped_barplot['loan_amnt_cat'].tolist()
    mean_data = grouped_barplot['loan_status_bin'].tolist()
    context = {
        'status_labels': status_labels,
        'status_data': status_data,
        'loan_amnt_labels': loan_amnt_labels,
        'loan_amnt_data': loan_amnt_data,
        'loan_amnt_kde_data': loan_amnt_kde_data,

        'cat_labels': cat_labels,
        'fully_paid_data': fully_paid_data,
        'charged_off_data': charged_off_data,
        'mean_labels': mean_labels,
        'mean_data': mean_data,
    }
    
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
    
