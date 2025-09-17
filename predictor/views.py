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
import time

EDA_CONTEXT = {}
try:
    logging.info("="*50)
    logging.info("STARTING EDA PRE-COMPUTATION AND TIMING...")
    total_start_time = time.time()

    start_time = time.time()
    df = pd.read_csv("notebook/data/lending_club_loan_two.csv")
    logging.info(f"[TIMING] Veri Yükleme (pd.read_csv) -> {time.time() - start_time:.4f} saniye")

    start_time_pr = time.time()
    df['loan_status_bin'] = df['loan_status'].map({'Fully Paid': 0, 'Charged Off': 1})
    
    total_acc_q97 = df['total_acc'].quantile(0.97)
    open_acc_q99 = df['open_acc'].quantile(0.99)
    df.loc[df['total_acc'] > total_acc_q97, 'total_acc'] = total_acc_q97
    df.loc[df['open_acc'] > open_acc_q99, 'open_acc'] = open_acc_q99

    df['loan_to_income'] = np.where(df['annual_inc'] == 0, 0, df['loan_amnt'] / df['annual_inc'])
    income_bins = [0, 40000, 80000, 120000, 160000, df['annual_inc'].max() + 1]
    income_labels = ['0-40k', '40k-80k', '80k-120k', '120k-160k', '160k+']
    df['income_cat'] = pd.cut(df['annual_inc'], bins=income_bins, labels=income_labels, right=False)
    df['open_total_acc_rate'] = np.where(df['total_acc'] == 0, 0, df['open_acc'] / df['total_acc'])

    logging.info(f"[TIMING] Temel Ön İşleme -> {time.time() - start_time_pr:.4f} saniye")

    start_time_la = time.time()
    loan_status_counts = df['loan_status'].value_counts()
    EDA_CONTEXT['status_labels'] = loan_status_counts.index.tolist()
    EDA_CONTEXT['status_data'] = loan_status_counts.values.tolist()

    bins = [0, 5000, 10000, 15000, 20000, 25000, 30000, 40000]
    labels = ['0-5k', '5k-10k', '10k-15k', '15k-20k', '20k-25k', '25k-30k', '30k-40k']
    df['loan_amnt_cat'] = pd.cut(df['loan_amnt'], bins=bins, labels=labels, right=False)

    loan_amnt_counts = df['loan_amnt_cat'].value_counts().sort_index()
    EDA_CONTEXT['loan_amnt_area_labels'] = loan_amnt_counts.index.astype(str).tolist()
    EDA_CONTEXT['loan_amnt_area_data'] = loan_amnt_counts.values.tolist()

    grouped_amnt = df.groupby(['loan_amnt_cat', 'loan_status'], observed=True).size().unstack(fill_value=0)
    EDA_CONTEXT['cat_labels'] = grouped_amnt.index.tolist()
    EDA_CONTEXT['fully_paid_data'] = grouped_amnt['Fully Paid'].values.tolist()
    EDA_CONTEXT['charged_off_data'] = grouped_amnt['Charged Off'].values.tolist()
    
    mean_data_series = df.groupby('loan_amnt_cat', observed=True)['loan_status_bin'].mean()
    mean_data = mean_data_series.tolist()
    x_values = np.arange(len(mean_data))
    m, c = np.polyfit(x_values, mean_data, 1)
    EDA_CONTEXT['mean_labels'] = mean_data_series.index.tolist()
    EDA_CONTEXT['mean_data'] = mean_data
    EDA_CONTEXT['mean_trendline_data'] = (m * x_values + c).tolist()
    logging.info(f"  - loan_amount -> {time.time() - start_time_la:.4f} saniye")
    

    start_time_term = time.time()
    term_grouped = df.groupby('term').agg(
                                            fully_paid=('loan_status', lambda x: (x == 'Fully Paid').sum()),
                                            charged_off=('loan_status', lambda x: (x == 'Charged Off').sum()),
                                            mean_rate=('loan_status_bin', 'mean')
                                        ).reset_index()

    EDA_CONTEXT['term_grouped_labels'] = term_grouped['term'].tolist()
    EDA_CONTEXT['term_grouped_fully_paid'] = term_grouped['fully_paid'].tolist()
    EDA_CONTEXT['term_grouped_charged_off'] = term_grouped['charged_off'].tolist()
    EDA_CONTEXT['term_mean_labels'] = term_grouped['term'].tolist()
    EDA_CONTEXT['term_mean_data'] = term_grouped['mean_rate'].tolist()
    EDA_CONTEXT['term_labels'] = term_grouped['term'].tolist()
    EDA_CONTEXT['term_data'] = (term_grouped['fully_paid'] + term_grouped['charged_off']).tolist()
    logging.info(f" term -> {time.time() - start_time_term:.4f} saniye")

    start_time_ltoi = time.time()
    filtered_df_ltoi = df[df['loan_to_income'] < 1]
    ltoi_plot_data = []
    for status, group in filtered_df_ltoi.groupby('loan_status'):
        ltoi_plot_data.append({
                                'y': group['loan_to_income'].dropna().tolist(),
                                'type': 'box', 'name': status, 'boxpoints': 'outliers'
                            })
    EDA_CONTEXT['ltoi_boxplot_data'] = ltoi_plot_data

    income_plot_data = []
    for status, group in df.groupby('loan_status'):
                    income_plot_data.append({
                                        'x': group['income_cat'].astype(str).dropna().tolist(),
                                        'y': group['loan_amnt'].dropna().tolist(),
                                        'type': 'box', 'name': status, 'boxpoints': 'outliers'
                                    })
    EDA_CONTEXT['income_boxplot_data'] = income_plot_data
    logging.info(f" Income -> {time.time() - start_time_ltoi:.4f} saniye")
    

    def process_categorical_feature(df, feature_name, ordered_cats=None):
        agg_funcs = {
                    'fully_paid': ('loan_status', lambda x: (x == 'Fully Paid').sum()),
                    'charged_off': ('loan_status', lambda x: (x == 'Charged Off').sum()),
                    'mean_rate': ('loan_status_bin', 'mean')
                }
        
        grouped = df.groupby(feature_name, observed=True).agg(**agg_funcs)
        
        if ordered_cats:
            grouped = grouped.reindex(ordered_cats, fill_value=0)
            
        grouped = grouped.reset_index()
        
        feature_data = {
            f"{feature_name}_dist_labels": grouped[feature_name].astype(str).tolist(),
            f"{feature_name}_dist_fp": grouped['fully_paid'].tolist(),
            f"{feature_name}_dist_co": grouped['charged_off'].tolist(),
            f"{feature_name}_rate_labels": grouped[feature_name].astype(str).tolist(),
            f"{feature_name}_rate_data": grouped['mean_rate'].tolist()
        }
        return feature_data
    

    start_time_apptype = time.time()
    app_type_grouped = df.groupby('application_type').agg(
            fully_paid=('loan_status', lambda x: (x == 'Fully Paid').sum()),
            charged_off=('loan_status', lambda x: (x == 'Charged Off').sum()),
            mean_rate=('loan_status_bin', 'mean')
        ).reset_index()

    app_type_total_counts = app_type_grouped['fully_paid'] + app_type_grouped['charged_off']

    EDA_CONTEXT['app_type_labels'] = app_type_grouped['application_type'].tolist()
    EDA_CONTEXT['app_type_data'] = app_type_total_counts.tolist()

    EDA_CONTEXT['app_type_grouped_labels'] = app_type_grouped['application_type'].tolist()
    EDA_CONTEXT['app_type_grouped_fully_paid'] = app_type_grouped['fully_paid'].tolist()
    EDA_CONTEXT['app_type_grouped_charged_off'] = app_type_grouped['charged_off'].tolist()

    EDA_CONTEXT['app_type_mean_labels'] = app_type_grouped['application_type'].tolist()
    EDA_CONTEXT['app_type_mean_data'] = app_type_grouped['mean_rate'].tolist()
    logging.info(f"  - App Type -> {time.time() - start_time_apptype:.4f} saniye")

    start_time_emplength = time.time()
    ordered_emp_cats = [
                        '< 1 year', '1 year', '2 years', '3 years', '4 years', '5 years',
                        '6 years', '7 years', '8 years', '9 years', '10+ years'
                    ]

    emp_length_grouped = df.groupby('emp_length').agg(
                    fully_paid=('loan_status', lambda x: (x == 'Fully Paid').sum()),
                    charged_off=('loan_status', lambda x: (x == 'Charged Off').sum()),
                    mean_rate=('loan_status_bin', 'mean')
    ).reindex(ordered_emp_cats, fill_value=0).reset_index()

    emp_total_counts = emp_length_grouped['fully_paid'] + emp_length_grouped['charged_off']

    EDA_CONTEXT['emp_length_labels'] = emp_length_grouped['emp_length'].tolist()
    EDA_CONTEXT['emp_length_data'] = emp_total_counts.tolist()

    EDA_CONTEXT['emp_length_grouped_labels'] = emp_length_grouped['emp_length'].tolist()
    EDA_CONTEXT['emp_length_grouped_fully_paid'] = emp_length_grouped['fully_paid'].tolist()
    EDA_CONTEXT['emp_length_grouped_charged_off'] = emp_length_grouped['charged_off'].tolist()

    EDA_CONTEXT['emp_length_mean_labels'] = emp_length_grouped['emp_length'].tolist()
    EDA_CONTEXT['emp_length_mean_data'] = emp_length_grouped['mean_rate'].tolist()
    logging.info(f"  - App Type -> {time.time() - start_time_emplength:.4f} saniye")

    start_time_others = time.time()
    for feature in ['grade', 'sub_grade', 'home_ownership', 'verification_status']:
        EDA_CONTEXT.update(process_categorical_feature(df, feature))
    logging.info(f"  - grade', 'sub_grade', 'home_ownership', 'verification_status -> {time.time() - start_time_others:.4f} saniye")
    
    def process_numeric_feature(df, feature_name, quantile=1.0):
        if quantile < 1.0:
            q_value = df[feature_name].quantile(quantile)
            filtered_df = df[df[feature_name] <= q_value].copy()
        else:
            filtered_df = df.copy()

        
        boxplot_data = []
        for status, group in filtered_df.groupby('loan_status'):
            boxplot_data.append({
                'y': group[feature_name].dropna().tolist(),
                'type': 'box', 'name': status, 'boxpoints': 'outliers'
            })
            
        fp_data = filtered_df[filtered_df['loan_status'] == 'Fully Paid'][feature_name].dropna()
        co_data = filtered_df[filtered_df['loan_status'] == 'Charged Off'][feature_name].dropna()
        
        min_val, max_val = filtered_df[feature_name].min(), filtered_df[feature_name].max()
        bins = np.linspace(min_val, max_val, 51)
        
        hist_fp, bin_edges = np.histogram(fp_data, bins=bins)
        hist_co, _ = np.histogram(co_data, bins=bins)
        
        bin_centers = (bin_edges[:-1] + bin_edges[1:]) / 2

        feature_data = {
            f"{feature_name}_boxplot_data": boxplot_data,
            f"{feature_name}_hist_labels": bin_centers.tolist(),
            f"{feature_name}_hist_fp": hist_fp.tolist(),
            f"{feature_name}_hist_co": hist_co.tolist()
        }
        return feature_data
    
    start_time_CHL = time.time()
    df['credit_history_length'] = (pd.to_datetime(df['issue_d'], format='%b-%Y', errors='coerce') - 
                                   pd.to_datetime(df['earliest_cr_line'], format='%b-%Y', errors='coerce')).dt.days / 365.25
    logging.info(f"  - Credit History Length -> {time.time() - start_time_CHL:.4f} saniye")
    


    total_acc_q97 = df['total_acc'].quantile(0.97)
    open_acc_q99 = df['open_acc'].quantile(0.99)
    df.loc[df['total_acc'] > total_acc_q97, 'total_acc'] = total_acc_q97
    df.loc[df['open_acc'] > open_acc_q99, 'open_acc'] = open_acc_q99
    df['open_total_acc_rate'] = np.where(df['total_acc'] == 0, 0, df['open_acc'] / df['total_acc'])


    grouped_installments = df.groupby('loan_status')['installment']
    installment_boxplot_data = [
        {
            'y': group.dropna().tolist(),
            'type': 'box', 'name': status, 'boxpoints': 'outliers'
        }
        for status, group in grouped_installments
    ]
    EDA_CONTEXT['installment_boxplot_data'] = installment_boxplot_data

    fp_data = grouped_installments.get_group('Fully Paid').dropna()
    co_data = grouped_installments.get_group('Charged Off').dropna()

    min_inst = df['installment'].min()
    max_inst = df['installment'].max()
    installment_bins = np.linspace(min_inst, max_inst, 51) 

    hist_fp, installment_bin_edges = np.histogram(fp_data, bins=installment_bins)
    hist_co, _ = np.histogram(co_data, bins=installment_bins)

    installment_bin_centers = (installment_bin_edges[:-1] + installment_bin_edges[1:]) / 2

    EDA_CONTEXT['installment_hist_labels'] = installment_bin_centers.tolist()
    EDA_CONTEXT['installment_hist_fully_paid'] = hist_fp.tolist()
    EDA_CONTEXT['installment_hist_charged_off'] = hist_co.tolist()


    credit_history_boxplot_data = []
    for status, group in df.groupby('loan_status'):
        credit_history_boxplot_data.append({
            'y': group['credit_history_length'].dropna().tolist(),
            'type': 'box',
            'name': status,
            'boxpoints': 'outliers'
        })
    EDA_CONTEXT['credit_history_boxplot_data'] = credit_history_boxplot_data

    fp_data = df[df['loan_status'] == 'Fully Paid']['credit_history_length'].dropna()
    co_data = df[df['loan_status'] == 'Charged Off']['credit_history_length'].dropna()

    min_hist = df['credit_history_length'].dropna().min()
    max_hist = df['credit_history_length'].dropna().max()
    credit_history_bins = np.linspace(min_hist, max_hist, 51)

    hist_fp, bin_edges = np.histogram(fp_data, bins=credit_history_bins)
    hist_co, _ = np.histogram(co_data, bins=credit_history_bins)

    bin_centers = (bin_edges[:-1] + bin_edges[1:]) / 2

    EDA_CONTEXT['credit_history_hist_labels'] = bin_centers.tolist()
    EDA_CONTEXT['credit_history_hist_fp'] = hist_fp.tolist()
    EDA_CONTEXT['credit_history_hist_co'] = hist_co.tolist()

    purpose_grouped = df.groupby('purpose').agg(
                        mean_rate=('loan_status_bin', 'mean'),
                        avg_loan=('loan_amnt', 'mean')
                        )

    
    purpose_rate_sorted = purpose_grouped.sort_values(by='mean_rate')
    EDA_CONTEXT['purpose_rate_labels'] = purpose_rate_sorted.index.tolist()
    EDA_CONTEXT['purpose_rate_data'] = purpose_rate_sorted['mean_rate'].tolist()

    purpose_avg_loan_sorted = purpose_grouped.sort_values(by='avg_loan')
    EDA_CONTEXT['purpose_avg_loan_labels'] = purpose_avg_loan_sorted.index.tolist()
    EDA_CONTEXT['purpose_avg_loan_data'] = purpose_avg_loan_sorted['avg_loan'].tolist()

    EDA_CONTEXT.update(process_numeric_feature(df, 'dti', quantile=0.99))
    
    open_total_acc_boxplot_data = []
    for status, group in df.groupby('loan_status'):
        open_total_acc_boxplot_data.append({
            'y': group['open_total_acc_rate'].dropna().tolist(),
            'type': 'box',
            'name': status,
            'boxpoints': 'outliers'
        })
    EDA_CONTEXT['open_total_acc_boxplot_data'] = open_total_acc_boxplot_data

    fp_data = df[df['loan_status'] == 'Fully Paid']['open_total_acc_rate'].dropna()
    co_data = df[df['loan_status'] == 'Charged Off']['open_total_acc_rate'].dropna()

    min_rate = df['open_total_acc_rate'].dropna().min()
    max_rate = df['open_total_acc_rate'].dropna().max()
    rate_bins = np.linspace(min_rate, max_rate, 51)

    hist_fp, bin_edges = np.histogram(fp_data, bins=rate_bins)
    hist_co, _ = np.histogram(co_data, bins=rate_bins)

    bin_centers = (bin_edges[:-1] + bin_edges[1:]) / 2

    EDA_CONTEXT['open_total_acc_hist_labels'] = bin_centers.tolist()
    EDA_CONTEXT['open_total_acc_hist_fp'] = hist_fp.tolist()
    EDA_CONTEXT['open_total_acc_hist_co'] = hist_co.tolist()


    EDA_CONTEXT.update(process_numeric_feature(df, 'revol_bal', quantile=0.95))
    EDA_CONTEXT.update(process_numeric_feature(df, 'revol_util', quantile=0.99))

    int_rate_bins = [5, 10, 15, 25, 35]
    int_rate_labels = ['5-10', '10-15', '15-25', '25-35']
    df['int_rate_cat'] = pd.cut(df['int_rate'], bins=int_rate_bins, labels=int_rate_labels, right=False)

    int_rate_grouped = df.groupby('int_rate_cat', observed=True).agg(
        fully_paid=('loan_status', lambda x: (x == 'Fully Paid').sum()),
        charged_off=('loan_status', lambda x: (x == 'Charged Off').sum()),
        mean_rate=('loan_status_bin', 'mean')
    ).reset_index()

    EDA_CONTEXT['int_rate_grouped_labels'] = int_rate_grouped['int_rate_cat'].astype(str).tolist()
    EDA_CONTEXT['int_rate_grouped_fully_paid'] = int_rate_grouped['fully_paid'].tolist()
    EDA_CONTEXT['int_rate_grouped_charged_off'] = int_rate_grouped['charged_off'].tolist()

    EDA_CONTEXT['int_rate_mean_labels'] = int_rate_grouped['int_rate_cat'].astype(str).tolist()
    EDA_CONTEXT['int_rate_mean_data'] = int_rate_grouped['mean_rate'].tolist()

    
    open_acc_bins = [0, 10, 15, 20, 30, np.inf] 
    open_acc_labels = ['0-10', '10-15', '15-20', '20-30', '30+']
    df['open_acc_cat'] = pd.cut(df['open_acc'], bins=open_acc_bins, labels=open_acc_labels, right=False)

    open_acc_grouped = df.groupby('open_acc_cat', observed=True).agg(
        fully_paid=('loan_status', lambda x: (x == 'Fully Paid').sum()),
        charged_off=('loan_status', lambda x: (x == 'Charged Off').sum()),
        mean_rate=('loan_status_bin', 'mean')
    ).reset_index()

    EDA_CONTEXT['open_acc_grouped_labels'] = open_acc_grouped['open_acc_cat'].astype(str).tolist()
    EDA_CONTEXT['open_acc_grouped_fp'] = open_acc_grouped['fully_paid'].tolist()
    EDA_CONTEXT['open_acc_grouped_co'] = open_acc_grouped['charged_off'].tolist()

    
    EDA_CONTEXT['open_acc_rate_labels'] = open_acc_grouped['open_acc_cat'].astype(str).tolist()
    EDA_CONTEXT['open_acc_rate_data'] = open_acc_grouped['mean_rate'].tolist()
    
    total_acc_bins = [0, 15, 25, 35, 45, 55, np.inf]
    total_acc_labels = ['0-15', '15-25', '25-35', '35-45', '45-55', '55+']
    df['total_acc_cat'] = pd.cut(df['total_acc'], bins=total_acc_bins, labels=total_acc_labels, right=False)

    
    total_acc_grouped = df.groupby('total_acc_cat', observed=True).agg(
        fully_paid=('loan_status', lambda x: (x == 'Fully Paid').sum()),
        charged_off=('loan_status', lambda x: (x == 'Charged Off').sum()),
        mean_rate=('loan_status_bin', 'mean')
    ).reset_index()

    EDA_CONTEXT['total_acc_grouped_labels'] = total_acc_grouped['total_acc_cat'].astype(str).tolist()
    EDA_CONTEXT['total_acc_grouped_fp'] = total_acc_grouped['fully_paid'].tolist()
    EDA_CONTEXT['total_acc_grouped_co'] = total_acc_grouped['charged_off'].tolist()

    EDA_CONTEXT['total_acc_rate_labels'] = total_acc_grouped['total_acc_cat'].astype(str).tolist()
    EDA_CONTEXT['total_acc_rate_data'] = total_acc_grouped['mean_rate'].tolist()
    
    feature = 'pub_rec'
    grouped_data = df.groupby(feature).agg(
        fully_paid=('loan_status', lambda x: (x == 'Fully Paid').sum()),
        charged_off=('loan_status', lambda x: (x == 'Charged Off').sum()),
        mean_rate=('loan_status_bin', 'mean')
    ).reset_index()

    EDA_CONTEXT[f'{feature}_grouped_labels'] = grouped_data[feature].astype(str).tolist()
    EDA_CONTEXT[f'{feature}_grouped_fp'] = grouped_data['fully_paid'].tolist()
    EDA_CONTEXT[f'{feature}_grouped_co'] = grouped_data['charged_off'].tolist()
    EDA_CONTEXT[f'{feature}_rate_labels'] = grouped_data[feature].astype(str).tolist()
    EDA_CONTEXT[f'{feature}_rate_data'] = grouped_data['mean_rate'].tolist()

    feature = 'pub_rec_bankruptcies'
    key_prefix = 'pub_rec_bank'

    grouped_data = df.groupby(feature).agg(
        fully_paid=('loan_status', lambda x: (x == 'Fully Paid').sum()),
        charged_off=('loan_status', lambda x: (x == 'Charged Off').sum()),
        mean_rate=('loan_status_bin', 'mean')
    ).reset_index()

    EDA_CONTEXT[f'{key_prefix}_grouped_labels'] = grouped_data[feature].astype(str).tolist()
    EDA_CONTEXT[f'{key_prefix}_grouped_fp'] = grouped_data['fully_paid'].tolist()
    EDA_CONTEXT[f'{key_prefix}_grouped_co'] = grouped_data['charged_off'].tolist()
    EDA_CONTEXT[f'{key_prefix}_rate_labels'] = grouped_data[feature].astype(str).tolist()
    EDA_CONTEXT[f'{key_prefix}_rate_data'] = grouped_data['mean_rate'].tolist()

    logging.info("EDA data loaded and preprocessed successfully.")
except Exception as e:
    EDA_CONTEXT = {'error': f'An error occurred during data pre-computation: {e}'}
    logging.error(f"Error during EDA pre-computation: {e}", exc_info=True)




def prepare_grouped_data(df, feature_name):
    grouped_data = df.groupby([feature_name, 'loan_status']).size().unstack(fill_value=0)
    
   
    if 'Fully Paid' not in grouped_data.columns:
        grouped_data['Fully Paid'] = 0
    
    if 'Charged Off' not in grouped_data.columns:
        grouped_data['Charged Off'] = 0

    
    sorted_labels = sorted(df[feature_name].dropna().unique())
    grouped_data = grouped_data.reindex(sorted_labels, fill_value=0)
    
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
    if 'error' in EDA_CONTEXT:
        return render(request, 'explatory_data_analysis.html', EDA_CONTEXT)
    return render(request, 'explatory_data_analysis.html', EDA_CONTEXT)

    
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
    
