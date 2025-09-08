import os
import sys
from dataclasses import dataclass

from xgboost import XGBClassifier

from sklearn.metrics import f1_score, classification_report, accuracy_score,precision_score, recall_score
from src.exception import CustomException
from src.logger import logging
from sklearn.model_selection import RandomizedSearchCV
from src.utils import save_object


@dataclass
class ModelTrainerConfig:
    trained_model_file_path = os.path.join("artifacts", "model.pkl")


class ModelTrainer:
    def __init__(self):
        self.model_trainer_config = ModelTrainerConfig()

    def initiate_model_trainer(self, train_array, test_array):
        """
        This function trains the best-known model with its optimal hyperparameters
        and saves it as an artifact.
        """
        try:
            logging.info("Training and test data are separated as X and y.")

            X_train, y_train, X_test, y_test = (
                train_array[:, :-1],
                train_array[:, -1],
                test_array[:, :-1],
                test_array[:, -1],
            )
            scale_pos_weight = (y_train == 0).sum() / (y_train == 1).sum()
            logging.info(f"Calculated scale_pos_weight: {scale_pos_weight:.2f}")

            best_params = {
                'subsample': 1.0, 
                'n_estimators': 500, 
                'max_depth': 8, 
                'learning_rate': 0.1, 
                'colsample_bytree': 1.0
            }

            model = XGBClassifier(
                **best_params,
                scale_pos_weight=scale_pos_weight, 
                random_state=42, 
                
                eval_metric='logloss'
            )
            logging.info("Model training with best parameters has started.")
            model.fit(X_train, y_train)
            logging.info("Model training completed.")

            y_pred = model.predict(X_test)
            accuracy = accuracy_score(y_test, y_pred)
            f1 = f1_score(y_test, y_pred)
            precision = precision_score(y_test, y_pred)
            recall = recall_score(y_test, y_pred)
            report = classification_report(y_test, y_pred)

            logging.info("\n--- XGBoost with Best Parameters RESULTS ---")
            logging.info(f"Accuracy: {accuracy:.4f}")
            logging.info(f"F1 Score: {f1:.4f}")
            logging.info(f"Precision: {precision:.4f}")
            logging.info(f"Recall: {recall:.4f}")
            logging.info("\nClassification Report:\n" + report)

            if accuracy < 0.6: 
                raise CustomException("Model performance is too low", sys)
            
            logging.info("Saving the trained model.")
            save_object(
                file_path=self.model_trainer_config.trained_model_file_path,
                obj=model
            )

            scores = {"accuracy": accuracy, "f1_score": f1, "precision": precision, "recall": recall}
            return scores
        except Exception as e:
            raise CustomException(e, sys)
