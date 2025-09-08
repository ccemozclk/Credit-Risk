# Lütfen bu kodu debug_training_data.py olarak kaydedin

import pandas as pd
import numpy as np
import os
from src.exception import CustomException
from src.logger import logging
from src.components.data_ingestion import DataIngestion
from src.components.data_transformation import DataTransformation

def create_training_data_snapshot():
    try:
        logging.info("--- STARTING DATA SNAPSHOT PROCESS ---")

        # 1. Adım: Veri alımını başlat
        logging.info("Step 1: Running Data Ingestion...")
        ingestion_obj = DataIngestion()
        train_data_path, test_data_path = ingestion_obj.initiate_data_ingestion()
        logging.info(f"Data ingestion complete. Train path: {train_data_path}")

        # 2. Adım: Veri dönüşümünü başlat
        logging.info("Step 2: Running Data Transformation...")
        transformation_obj = DataTransformation()
        train_arr, test_arr, preprocessor_path = transformation_obj.initiate_data_transformation(
            train_data_path, test_data_path
        )
        logging.info("Data transformation complete.")

        # 3. Adım: "Kara Kutu" Kaydını Oluştur
        logging.info("Step 3: Creating the snapshot of the final training data...")
        
        # Preprocessor'dan sütun isimlerini al
        from src.utils import load_object
        preprocessor = load_object(file_path=preprocessor_path)
        model_columns = preprocessor['model_columns']
        
        # Eğitim dizisini (train_arr) bir DataFrame'e dönüştür
        # Son sütun hedef değişkeni olduğu için sütun listesine onu da ekliyoruz
        final_columns = model_columns + ['loan_status_bin']
        snapshot_df = pd.DataFrame(train_arr, columns=final_columns)

        # Snapshot'ı bir CSV dosyasına kaydet
        snapshot_path = os.path.join("debug_train_data.csv")
        snapshot_df.to_csv(snapshot_path, index=False)

        logging.info(f"--- SNAPSHOT CREATED SUCCESSFULLY ---")
        print("\n" + "="*50)
        print(" 'debug_train_data.csv' dosyası başarıyla oluşturuldu.")
        print(" Lütfen bu dosyanın içeriğini kontrol edin.")
        print("="*50 + "\n")

        # 4. Adım: Hızlı Analiz
        print("--- QUICK ANALYSIS OF THE SNAPSHOT ---")
        print(f"Toplam Satır Sayısı: {len(snapshot_df)}")
        print("\nHedef Değişkenin (loan_status_bin) Dağılımı:")
        print(snapshot_df['loan_status_bin'].value_counts())
        print("\nVeriden İlk 5 Satır:")
        print(snapshot_df.head())
        print("\n" + "="*50)


    except Exception as e:
        raise CustomException(e, "Error in snapshot creation script")

if __name__ == "__main__":
    create_training_data_snapshot()