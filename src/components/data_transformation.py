import sys
import os
import pandas as pd
import numpy as np
from dataclasses import dataclass

from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, OneHotEncoder, OrdinalEncoder

from src.exception import CustomException
from src.logger import logging
from src.utils import save_object

@dataclass
class DataTransformationConfig:
    preprocessor_obj_file_path: str = os.path.join("artifacts", "preprocessor.pkl")
class DataTransformation:
    def __init__(self):
        self.data_transformation_config = DataTransformationConfig()

    def get_data_transformer_object(self):
        '''
        This function is responsible for data transformation
        '''
        try:           
            numerical_columns = [
                'revol_util', 'dti', 'revol_bal', 'int_rate', 'installment',
                'credit_history_length', 'loan_to_income', 'open_total_acc_rate'
            ]
            
            categorical_columns_non_ord = [
                'purpose', 'home_ownership', 'verification_status', 
                'initial_list_status', 'application_type', 'zipcode'
            ]

            categorical_columns_ord = ['sub_grade']

            numerical_pipeline = Pipeline(steps=[
                ("imputer", SimpleImputer(strategy="median")),
                ("scaler", StandardScaler())
            ])

            categorical_pipeline = Pipeline(steps=[
                ("imputer", SimpleImputer(strategy="most_frequent")),
                ("onehot", OneHotEncoder(handle_unknown="ignore", drop="first")),
            ])

            sub_grade_order = ['A1', 'A2', 'A3', 'A4', 'A5', 'B1', 'B2', 'B3', 'B4', 'B5', 
                               'C1', 'C2', 'C3', 'C4', 'C5', 'D1', 'D2', 'D3', 'D4', 'D5', 
                               'E1', 'E2', 'E3', 'E4', 'E5', 'F1', 'F2', 'F3', 'F4', 'F5', 
                               'G1', 'G2', 'G3', 'G4', 'G5']

            cat_pipeline_ord = Pipeline(
                steps=[
                    ("imputer", SimpleImputer(strategy="most_frequent")),
                    ("ordinal_encoder", OrdinalEncoder(categories=[sub_grade_order], handle_unknown='use_encoded_value', unknown_value=-1)),
                ]
            )

            logging.info("Numerical columns processing completed")
            logging.info("Categorical columns encoding completed")

            preprocessor = ColumnTransformer(
                [
                    ("num_pipeline", numerical_pipeline, numerical_columns),
                    ("cat_pipeline_non_ord", categorical_pipeline, categorical_columns_non_ord),
                    ("cat_pipeline_ord", cat_pipeline_ord, categorical_columns_ord)
                ],
                remainder='passthrough'
            )

            return preprocessor
        
        except Exception as e:
            raise CustomException(e, sys)

    def initiate_data_transformation(self, train_path, test_path):
        try:
            train_df = pd.read_csv(train_path)
            test_df = pd.read_csv(test_path)
            logging.info("Read train and test data completed")

            logging.info("Applying preprocessing steps on dataframe")
            pub_rec_bankruptcies_mode = train_df['pub_rec_bankruptcies'].mode()[0]
            pub_rec_mode = train_df['pub_rec'].mode()[0]
            train_df['pub_rec'] = train_df['pub_rec'].fillna(pub_rec_mode)
            test_df['pub_rec'] = test_df['pub_rec'].fillna(pub_rec_mode)
            train_df['pub_rec_bankruptcies'] = train_df['pub_rec_bankruptcies'].fillna(pub_rec_bankruptcies_mode)
            test_df['pub_rec_bankruptcies'] = test_df['pub_rec_bankruptcies'].fillna(pub_rec_bankruptcies_mode)

            for col in ['dti', 'revol_bal', 'revol_util', 'int_rate', 'installment', 'annual_inc', 'open_acc', 'total_acc']:
                if col in train_df.columns:
                    q_train_99 = train_df[col].quantile(0.99)
                    q_train_95 = train_df[col].quantile(0.95)
                    q_train_97 = train_df[col].quantile(0.97)

                    if col in ['revol_bal', 'annual_inc']:
                        train_df.loc[train_df[col] > q_train_95, col] = q_train_95
                        test_df.loc[test_df[col] > q_train_95, col] = q_train_95
                    elif col == 'total_acc':
                        train_df.loc[train_df[col] > q_train_97, col] = q_train_97
                        test_df.loc[test_df[col] > q_train_97, col] = q_train_97
                    else:
                        train_df.loc[train_df[col] > q_train_99, col] = q_train_99
                        test_df.loc[test_df[col] > q_train_99, col] = q_train_99

            for df in [train_df, test_df]:
                df['loan_to_income'] = np.where(df['annual_inc'] == 0, 0, (df['loan_amnt'] / df['annual_inc']))
                df['term_cat'] = df['term'].str.replace(' months', '').astype(int)
                df['credit_history_length'] = ((pd.to_datetime(df['issue_d'], format='%b-%Y') - pd.to_datetime(df['earliest_cr_line'], format='%b-%Y')).dt.days / 365.25)
                df['zipcode'] = df['address'].str.extract(r'(\d{5})$')
                df['open_total_acc_rate'] = np.where(df['total_acc'] == 0, 0, (df['open_acc'] / df['total_acc']))
                df['has_pub_rec'] = np.where(df['pub_rec'] > 0, 1, 0)
                df['has_pub_rec_bank'] = np.where(df['pub_rec_bankruptcies'] > 0, 1, 0)

            
            target_column_name = "loan_status_bin"
            
            
            drop_cols = ['loan_status', 'loan_amnt','term','emp_title', 'emp_length', 'address', 'title', 
                         'grade','issue_d', 'earliest_cr_line','total_acc', 'open_acc', 'pub_rec', 
                         'pub_rec_bankruptcies', 'annual_inc']
            
            input_feature_train_df = train_df.drop(columns=drop_cols + [target_column_name], axis=1)
            target_feature_train_df = train_df[target_column_name]

            input_feature_test_df = test_df.drop(columns=drop_cols + [target_column_name], axis=1)
            target_feature_test_df = test_df[target_column_name]
            
            logging.info("Obtaining preprocessing object")
            preprocessing_obj = self.get_data_transformer_object()
            
            
            input_feature_train_arr = preprocessing_obj.fit_transform(input_feature_train_df)
            input_feature_test_arr = preprocessing_obj.transform(input_feature_test_df)

            train_arr = np.c_[input_feature_train_arr, np.array(target_feature_train_df)]
            test_arr = np.c_[input_feature_test_arr, np.array(target_feature_test_df)]

            logging.info(f"Saved preprocessing object.")
            save_object(
                file_path=self.data_transformation_config.preprocessor_obj_file_path,
                obj=preprocessing_obj
            )

            return (
                train_arr,
                test_arr,
                self.data_transformation_config.preprocessor_obj_file_path,
            )
        
        except Exception as e:
            raise CustomException(e, sys)
            