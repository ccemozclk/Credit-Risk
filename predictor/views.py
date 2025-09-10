from django.shortcuts import render

import re
from src.pipeline.predict_pipeline import CustomData, PredictPipeline

def home_view(request):
    return render(request, "index.html")

def predict_view(request):
    results = None
    if request.method == 'POST':
        return render(request, 'model.html')
        
    results = None
    form_data = request.POST # Form verilerini her durumda alalım

    try:
        address_str = request.POST.get('address', '')
        zipcode_match = re.search(r'(\d{5})$', address_str.strip())
        zipcode_str = zipcode_match.group(1) if zipcode_match else "00000"
        data = CustomData(
                
                loan_amnt=float(request.POST.get('loan_amnt')),
                int_rate=float(request.POST.get('int_rate')),
                installment=float(request.POST.get('installment')),
                annual_inc=float(request.POST.get('annual_inc')),
                dti=float(request.POST.get('dti')),
                revol_bal=float(request.POST.get('revol_bal')),
                revol_util=float(request.POST.get('revol_util')),

                
                open_acc=int(request.POST.get('open_acc')),
                pub_rec=int(request.POST.get('pub_rec')),
                total_acc=int(request.POST.get('total_acc')),
                mort_acc=int(request.POST.get('mort_acc')),
                pub_rec_bankruptcies=int(request.POST.get('pub_rec_bankruptcies')),

                
                term=request.POST.get('term'),
                sub_grade=request.POST.get('sub_grade'),
                home_ownership=request.POST.get('home_ownership'),
                verification_status=request.POST.get('verification_status'),
                issue_d=request.POST.get('issue_d'),
                purpose=request.POST.get('purpose'),
                earliest_cr_line=request.POST.get('earliest_cr_line'),
                initial_list_status=request.POST.get('initial_list_status'),
                application_type=request.POST.get('application_type'),
                address=address_str, 
                
                zipcode=zipcode_str
        )
            
        pred_df = data.get_data_as_dataframe()
            
        predict_pipeline = PredictPipeline()
        prediction = predict_pipeline.predict(pred_df)
            
        results = "Charged Off" if prediction[0] == 1 else "Fully Paid"

    except Exception as e:
        results = f"An Error Occured: {e}"
        
    context = {
            'results': results,
            'form_data': form_data 
        }
    return render(request, 'model.html', context)
    
