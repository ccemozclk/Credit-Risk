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

def prepare_grouped_data(df, feature_name):
            """Auxiliary function: Prepares grouped and sorted data."""
            
            sorted_labels = sorted(df[feature_name].dropna().unique())
            
            grouped_data = df.groupby([feature_name, 'loan_status']).size().unstack(fill_value=0).reindex(sorted_labels)
            
            labels = grouped_data.index.tolist()
            fully_paid = grouped_data['Fully Paid'].values.tolist()
            charged_off = grouped_data['Charged Off'].values.tolist()
            return labels, fully_paid, charged_off

def prepare_mean_data(df, feature_name):
            """Auxiliary function: Prepares grouped and sorted average data."""
            
            grouped_data = df.groupby(feature_name)['loan_status_bin'].mean()
            
            labels = grouped_data.index.tolist()
            data = grouped_data.values.tolist()
            return labels, data

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

        issue_d_dt = pd.to_datetime(df['issue_d'], format='%b-%Y', errors='coerce')
        earliest_cr_line_dt = pd.to_datetime(df['earliest_cr_line'], format='%b-%Y', errors='coerce')
        df['credit_history_length'] = (issue_d_dt - earliest_cr_line_dt).dt.days / 365.25

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
                
                y_data.extend(subset['loan_amnt'].dropna().tolist())
                x_data.extend([cat] * len(subset)) 
            
            income_plot_data.append({
                                    'x': x_data,
                                    'y': y_data,
                                    'type': 'box',
                                    'name': status,
                                    'boxpoints': 'outliers'
                                    })
            

        app_type_counts = df['application_type'].value_counts()
        app_type_labels = app_type_counts.index.tolist()
        app_type_data = app_type_counts.values.tolist()

        app_type_grouped_counts = df.groupby(['application_type', 'loan_status']).size().unstack(fill_value=0)
        app_type_grouped_labels = app_type_grouped_counts.index.tolist()
        app_type_grouped_fully_paid = app_type_grouped_counts['Fully Paid'].values.tolist()
        app_type_grouped_charged_off = app_type_grouped_counts['Charged Off'].values.tolist()

        app_type_mean = df.groupby('application_type')['loan_status_bin'].mean()
        app_type_mean_labels = app_type_mean.index.tolist()
        app_type_mean_data = app_type_mean.values.tolist()

        ordered_categories = [
            '< 1 year', '1 year', '2 years', '3 years', '4 years', '5 years',
            '6 years', '7 years', '8 years', '9 years', '10+ years'
        ]

        emp_length_counts = df['emp_length'].value_counts().reindex(ordered_categories, fill_value=0)
        emp_length_labels = emp_length_counts.index.tolist()
        emp_length_data = emp_length_counts.values.tolist()

        emp_length_grouped_counts = df.groupby(['emp_length', 'loan_status']).size().unstack(fill_value=0).reindex(ordered_categories, fill_value=0)
        emp_length_grouped_labels = emp_length_grouped_counts.index.tolist()
        emp_length_grouped_fully_paid = emp_length_grouped_counts['Fully Paid'].values.tolist()
        emp_length_grouped_charged_off = emp_length_grouped_counts['Charged Off'].values.tolist()

        emp_length_mean = df.groupby('emp_length')['loan_status_bin'].mean().reindex(ordered_categories, fill_value=0)
        emp_length_mean_labels = emp_length_mean.index.tolist()
        emp_length_mean_data = emp_length_mean.values.tolist()


        int_rate_bins = [5, 10, 15, 25, 35]
        int_rate_labels = ['5-10', '10-15', '15-25', '25-35']
        df['int_rate_cat'] = pd.cut(df['int_rate'], bins=int_rate_bins, labels=int_rate_labels, right=False)

        
        int_rate_grouped_counts = df.groupby(['int_rate_cat', 'loan_status'], observed=True).size().unstack(fill_value=0)
        int_rate_grouped_labels = int_rate_grouped_counts.index.astype(str).tolist()
        int_rate_grouped_fully_paid = int_rate_grouped_counts['Fully Paid'].values.tolist()
        int_rate_grouped_charged_off = int_rate_grouped_counts['Charged Off'].values.tolist()

        
        int_rate_mean = df.groupby('int_rate_cat', observed=True)['loan_status_bin'].mean()
        int_rate_mean_labels = int_rate_mean.index.astype(str).tolist()
        int_rate_mean_data = int_rate_mean.values.tolist()

        installment_boxplot_data = []
        for status in ['Fully Paid', 'Charged Off']:
            installment_boxplot_data.append({
                'y': df[df['loan_status'] == status]['installment'].dropna().tolist(),
                'type': 'box',
                'name': status,
                'boxpoints': 'outliers'
            })

        
        min_inst = df['installment'].min()
        max_inst = df['installment'].max()
        installment_bins = np.linspace(min_inst, max_inst, 51) 

        fp_data = df[df['loan_status'] == 'Fully Paid']['installment'].dropna()
        co_data = df[df['loan_status'] == 'Charged Off']['installment'].dropna()
        
        
        hist_fp, installment_bin_edges = np.histogram(fp_data, bins=installment_bins)
        hist_co, _ = np.histogram(co_data, bins=installment_bins)

        
        installment_bin_centers = (installment_bin_edges[:-1] + installment_bin_edges[1:]) / 2

        installment_hist_labels = installment_bin_centers.tolist()
        installment_hist_fully_paid = hist_fp.tolist()
        installment_hist_charged_off = hist_co.tolist()

        grade_dist_labels, grade_dist_fp, grade_dist_co = prepare_grouped_data(df, 'grade')
        sub_grade_dist_labels, sub_grade_dist_fp, sub_grade_dist_co = prepare_grouped_data(df, 'sub_grade')
        home_ownership_dist_labels, home_ownership_dist_fp, home_ownership_dist_co = prepare_grouped_data(df, 'home_ownership')
        verification_status_dist_labels, verification_status_dist_fp, verification_status_dist_co = prepare_grouped_data(df, 'verification_status')

        grade_rate_labels, grade_rate_data = prepare_mean_data(df, 'grade')
        sub_grade_rate_labels, sub_grade_rate_data = prepare_mean_data(df, 'sub_grade')
        home_ownership_rate_labels, home_ownership_rate_data = prepare_mean_data(df, 'home_ownership')
        verification_status_rate_labels, verification_status_rate_data = prepare_mean_data(df, 'verification_status')
        

        credit_history_boxplot_data = []
        for status in ['Fully Paid', 'Charged Off']:
            credit_history_boxplot_data.append({
                'y': df[df['loan_status'] == status]['credit_history_length'].dropna().tolist(),
                'type': 'box',
                'name': status,
                'boxpoints': 'outliers'
            })
        
        
        min_hist = df['credit_history_length'].dropna().min()
        max_hist = df['credit_history_length'].dropna().max()
        credit_history_bins = np.linspace(min_hist, max_hist, 51)

        fp_data = df[df['loan_status'] == 'Fully Paid']['credit_history_length'].dropna()
        co_data = df[df['loan_status'] == 'Charged Off']['credit_history_length'].dropna()
        
        hist_fp, bin_edges = np.histogram(fp_data, bins=credit_history_bins)
        hist_co, _ = np.histogram(co_data, bins=credit_history_bins)

        bin_centers = (bin_edges[:-1] + bin_edges[1:]) / 2

        credit_history_hist_labels = bin_centers.tolist()
        credit_history_hist_fp = hist_fp.tolist()
        credit_history_hist_co = hist_co.tolist()


        purpose_avg_loan = df.groupby('purpose')['loan_amnt'].mean().sort_values()
        purpose_avg_loan_labels = purpose_avg_loan.index.tolist()
        purpose_avg_loan_data = purpose_avg_loan.values.tolist()

        purpose_rate = df.groupby('purpose')['loan_status_bin'].mean().sort_values()
        purpose_rate_labels = purpose_rate.index.tolist()
        purpose_rate_data = purpose_rate.values.tolist()


        dti_quantile_99 = df['dti'].quantile(0.99)
        filtered_dti_df = df[df['dti'] <= dti_quantile_99]
        dti_boxplot_data = []
        for status in ['Fully Paid', 'Charged Off']:
            dti_boxplot_data.append({
                'y': filtered_dti_df[filtered_dti_df['loan_status'] == status]['dti'].dropna().tolist(),
                'type': 'box',
                'name': status,
                'boxpoints': 'outliers'
            })
        
        min_dti = filtered_dti_df['dti'].dropna().min()
        max_dti = filtered_dti_df['dti'].dropna().max()
        dti_bins = np.linspace(min_dti, max_dti, 51)

        fp_data = filtered_dti_df[filtered_dti_df['loan_status'] == 'Fully Paid']['dti'].dropna()
        co_data = filtered_dti_df[filtered_dti_df['loan_status'] == 'Charged Off']['dti'].dropna()
        
        hist_fp, bin_edges = np.histogram(fp_data, bins=dti_bins)
        hist_co, _ = np.histogram(co_data, bins=dti_bins)

        bin_centers = (bin_edges[:-1] + bin_edges[1:]) / 2

        dti_hist_labels = bin_centers.tolist()
        dti_hist_fp = hist_fp.tolist()
        dti_hist_co = hist_co.tolist()



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

            'app_type_labels': app_type_labels,
            'app_type_data': app_type_data,
            'app_type_grouped_labels': app_type_grouped_labels,
            'app_type_grouped_fully_paid': app_type_grouped_fully_paid,
            'app_type_grouped_charged_off': app_type_grouped_charged_off,
            'app_type_mean_labels': app_type_mean_labels,
            'app_type_mean_data': app_type_mean_data,

            'emp_length_labels': emp_length_labels,
            'emp_length_data': emp_length_data,
            'emp_length_grouped_labels': emp_length_grouped_labels,
            'emp_length_grouped_fully_paid': emp_length_grouped_fully_paid,
            'emp_length_grouped_charged_off': emp_length_grouped_charged_off,
            'emp_length_mean_labels': emp_length_mean_labels,
            'emp_length_mean_data': emp_length_mean_data,

            'int_rate_grouped_labels': int_rate_grouped_labels,
            'int_rate_grouped_fully_paid': int_rate_grouped_fully_paid,
            'int_rate_grouped_charged_off': int_rate_grouped_charged_off,
            'int_rate_mean_labels': int_rate_mean_labels,
            'int_rate_mean_data': int_rate_mean_data,


            'installment_boxplot_data': installment_boxplot_data,
            'installment_hist_labels': installment_hist_labels,
            'installment_hist_fully_paid': installment_hist_fully_paid,
            'installment_hist_charged_off': installment_hist_charged_off,


            'grade_dist_labels': grade_dist_labels,
            'grade_dist_fp': grade_dist_fp,
            'grade_dist_co': grade_dist_co,

            'sub_grade_dist_labels': sub_grade_dist_labels,
            'sub_grade_dist_fp': sub_grade_dist_fp,
            'sub_grade_dist_co': sub_grade_dist_co,

            'home_ownership_dist_labels': home_ownership_dist_labels,
            'home_ownership_dist_fp': home_ownership_dist_fp,
            'home_ownership_dist_co': home_ownership_dist_co,

            'verification_status_dist_labels': verification_status_dist_labels,
            'verification_status_dist_fp': verification_status_dist_fp,
            'verification_status_dist_co': verification_status_dist_co,

            'grade_rate_labels': grade_rate_labels,
            'grade_rate_data': grade_rate_data,

            'sub_grade_rate_labels': sub_grade_rate_labels,
            'sub_grade_rate_data': sub_grade_rate_data,

            'home_ownership_rate_labels': home_ownership_rate_labels,
            'home_ownership_rate_data': home_ownership_rate_data,
            
            'verification_status_rate_labels': verification_status_rate_labels,
            'verification_status_rate_data': verification_status_rate_data,


            'credit_history_boxplot_data': credit_history_boxplot_data,
            'credit_history_hist_labels': credit_history_hist_labels,
            'credit_history_hist_fp': credit_history_hist_fp,
            'credit_history_hist_co': credit_history_hist_co,

            'purpose_avg_loan_labels': purpose_avg_loan_labels,
            'purpose_avg_loan_data': purpose_avg_loan_data,
            'purpose_rate_labels': purpose_rate_labels,
            'purpose_rate_data': purpose_rate_data,


            'dti_boxplot_data': dti_boxplot_data,
            'dti_hist_labels': dti_hist_labels,
            'dti_hist_fp': dti_hist_fp,
            'dti_hist_co': dti_hist_co,
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
    
