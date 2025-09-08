import pandas as pd
from src.pipeline.predict_pipeline import CustomData, PredictPipeline

def test_risky_customer():
    """
    Bu fonksiyon, "Charged-Off" olma olasılığı yüksek, riskli bir
    müşteri profili oluşturur ve modelin tahminini test eder.
    """
    print("Riskli müşteri profili için tahmin süreci başlatılıyor...")

    risky_data = CustomData(
        revol_util=89.7,
        dti=29.5,
        revol_bal=15334.0,
        int_rate=18.55,
        installment=557.8,
        purpose='debt_consolidation',
        home_ownership='RENT',
        verification_status='Not Verified',
        initial_list_status='f',
        application_type='Individual',
        zipcode='93700',
        sub_grade='F2',
        loan_amnt=20000.0,
        term=' 36 months',
        issue_d='Dec-2018',
        earliest_cr_line='Jan-2005',
        address='123 Main St, Anytown, CA 93700',
        total_acc=25,
        open_acc=18,
        pub_rec=1,
        pub_rec_bankruptcies=1,
        annual_inc=45000.0,
        mort_acc=0

    )

    # Veriyi modelin anlayacağı DataFrame'e çevir
    # GÜNCELLEME: Metod adı hatası düzeltildi.
    pred_df = risky_data.get_data_as_dataframe()
    print("\nModele gönderilecek veri:")
    print(pred_df)

    # Tahmin pipeline'ını kullanarak tahmin yap
    predict_pipeline = PredictPipeline()
    results = predict_pipeline.predict(pred_df)
    
    print(f"\nModelin Ham Çıktısı: {results}")

    # Sonucu yorumla
    if results[0] == 1:
        print("Tahmin Sonucu: Kredi Başvurusu RED (Charged-Off Riski Yüksek)")
    else:
        print("Tahmin Sonucu: Kredi Başvurusu ONAY (Fully Paid Riski Yüksek)")

def test_safe_customer():
    """
    Bu fonksiyon, "Fully Paid" olma olasılığı yüksek, sağlam bir
    müşteri profili oluşturur ve modelin tahminini test eder.
    """
    print("-" * 50)
    print("Sağlam müşteri profili için tahmin süreci başlatılıyor...")

    # Düşük riskli bir senaryo oluşturalım:
    # - Yüksek gelir, mortgage ile ev sahibi
    # - Düşük borçluluk oranı (dti), kredi kartı borcu az (revol_util)
    # - Kredi notu yüksek (sub_grade 'A' veya 'B' serisi)
    # - Geçmişte iflas kaydı yok
    # - Geliri doğrulanmış
    
    safe_data = CustomData(
        revol_util=25.5,                   # Kredi kartı kullanım oranı düşük
        dti=10.2,                          # Gelire oranla borçluluk çok düşük
        revol_bal=5210.0,                  # Düşük kredi kartı borcu
        int_rate=7.21,                     # Düşük faiz oranı (düşük risk)
        installment=310.45,                # Makul taksit tutarı
        purpose='major_purchase',          # Araba, ev eşyası gibi net bir amaç
        home_ownership='MORTGAGE',         # Ev sahibi (Mortgage)
        verification_status='Verified',    # Gelir doğrulanmış
        initial_list_status='w',
        application_type='Individual',
        zipcode='10022',
        sub_grade='A5',                    # Yüksek kredi notu
        loan_amnt=10000.0,
        term=' 36 months',
        issue_d='Mar-2019',
        earliest_cr_line='Sep-2002',       # Uzun kredi geçmişi
        address='456 Park Ave, New York, NY 10022',
        total_acc=35,
        open_acc=10,
        pub_rec=0,
        pub_rec_bankruptcies=0,            # 0 iflas kaydı
        annual_inc=120000.0,               # Yüksek yıllık gelir
        mort_acc=2                         # Mortgage'a ek başka hesapları olabilir
    )

    pred_df = safe_data.get_data_as_dataframe()
    print("\nModele gönderilecek veri (Sağlam Müşteri):")
    print(pred_df.head())

    predict_pipeline = PredictPipeline()
    results = predict_pipeline.predict(pred_df)
    
    print(f"\nModelin Ham Çıktısı: {results}")

    if results[0] == 0:
        print("Tahmin Sonucu: Kredi Başvurusu ONAY (Fully Paid Riski Yüksek) -> BAŞARILI TEST ✅")
    else:
        print("Tahmin Sonucu: Kredi Başvurusu RED (Charged-Off Riski Yüksek) -> BAŞARISIZ TEST ❌")


if __name__ == "__main__":
    test_risky_customer()
    test_safe_customer()