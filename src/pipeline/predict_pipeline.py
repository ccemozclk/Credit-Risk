import sys
import os
import pandas as pd
import numpy as np
from src.exception import CustomException
from src.logger import logging
from src.utils import load_object

class PredictPipeline:
    def __init__(self):
        pass

    def predict(self, features):
        try:
            model_path = os.path.join('artifacts', 'model.pkl')
            preprocessor_path = os.path.join('artifacts', 'preprocessor.pkl')

            model = load_object(file_path=model_path)
            preprocessor = load_object(file_path=preprocessor_path)
           
            data_scaled = preprocessor.transform(features)
            
            
            data_scaled = preprocessor.transform(features)
            
            preds = model.predict(data_scaled)
            return preds

        except Exception as e:
            raise CustomException(e, sys)

class CustomData:
    def __init__(self,
                 revol_util: float,
                 dti: float,
                 revol_bal: float,
                 int_rate: float,
                 installment: float,
                 purpose: str,
                 home_ownership: str,
                 verification_status: str,
                 initial_list_status: str,
                 application_type: str,
                 zipcode: str,
                 sub_grade: str,
                 loan_amnt: float,
                 term: str,
                 issue_d: str,
                 earliest_cr_line: str,
                 address: str,
                 total_acc: int,
                 open_acc: int,
                 pub_rec: int,
                 pub_rec_bankruptcies: int,
                 annual_inc: float,
                 mort_acc: int
                ):
        
        self.revol_util = revol_util
        self.dti = dti
        self.revol_bal = revol_bal
        self.int_rate = int_rate
        self.installment = installment
        self.purpose = purpose
        self.home_ownership = home_ownership
        self.verification_status = verification_status
        self.initial_list_status = initial_list_status
        self.application_type = application_type
        self.zipcode = zipcode
        self.sub_grade = sub_grade
        self.loan_amnt = loan_amnt
        self.term = term
        self.issue_d = issue_d
        self.earliest_cr_line = earliest_cr_line
        self.address = address
        self.total_acc = total_acc
        self.open_acc = open_acc
        self.pub_rec = pub_rec
        self.pub_rec_bankruptcies = pub_rec_bankruptcies
        self.annual_inc = annual_inc
        self.mort_acc = mort_acc

    def get_data_as_dataframe(self):
        try:    
            custom_data_input_dict = {
                "revol_util": [self.revol_util],
                "dti": [self.dti],
                "revol_bal":[self.revol_bal],
                "int_rate":[self.int_rate],
                "installment":[self.installment],
                "purpose":[self.purpose],
                "home_ownership": [self.home_ownership],
                "verification_status":[self.verification_status],
                "initial_list_status":[self.initial_list_status],
                "application_type":[self.application_type],
                "zipcode":[self.zipcode],
                "sub_grade":[self.sub_grade],
                "loan_amnt":[self.loan_amnt],
                "term":[self.term],
                "issue_d": [self.issue_d],
                "earliest_cr_line":[self.earliest_cr_line],
                "address":[self.address],
                "total_acc":[self.total_acc],
                "open_acc":[self.open_acc],
                "pub_rec":[self.pub_rec],
                "pub_rec_bankruptcies":[self.pub_rec_bankruptcies],
                "annual_inc": [self.annual_inc],
                "mort_acc": [self.mort_acc]
            }

            df = pd.DataFrame(custom_data_input_dict)

            df['loan_to_income'] = np.where(df['annual_inc'] == 0, 0, (df['loan_amnt'] / df['annual_inc']))
            df['term_cat'] = int(self.term.strip().split(' ')[0])
            df['credit_history_length'] = ((pd.to_datetime(df['issue_d'], format='%b-%Y') - pd.to_datetime(df['earliest_cr_line'], format='%b-%Y')).dt.days / 365.25)
            df['zipcode'] = df['address'].str.extract(r'(\d{5})$')
            df['open_total_acc_rate'] = np.where(df['total_acc'] == 0, 0, (df['open_acc'] / df['total_acc']))
            df['has_pub_rec'] = np.where(df['pub_rec'] > 0, 1, 0)
            df['has_pub_rec_bank'] = np.where(df['pub_rec_bankruptcies'] > 0, 1, 0)

            final_columns = [
                                'revol_util', 'dti', 'revol_bal', 'int_rate', 'installment',
                                'mort_acc',
                                'credit_history_length', 'loan_to_income', 'open_total_acc_rate',
                                'purpose', 'home_ownership', 'verification_status',
                                'initial_list_status', 'application_type', 'zipcode', 'sub_grade',
                                'term_cat', 'has_pub_rec', 'has_pub_rec_bank'
                            ]

            return df[final_columns]
        except Exception as e:
            raise CustomException(e, sys)

        