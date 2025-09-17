import logging
import os
from datetime import datetime
import sys


LOG_FILE_NAME = f"{datetime.now().strftime('%m_%d_%Y_%H_%M_%S')}.log"


LOGS_DIR = os.path.join(os.getcwd(), "logs")


os.makedirs(LOGS_DIR, exist_ok=True)


LOG_FILE_PATH = os.path.join(LOGS_DIR, LOG_FILE_NAME)


logging.basicConfig(
    level=logging.INFO,
    format="[ %(asctime)s ] %(lineno)d %(name)s - %(levelname)s - %(message)s",
    handlers=[
        logging.FileHandler(LOG_FILE_PATH), # Sadece tam yolu ver
        logging.StreamHandler(sys.stdout)   # Konsola da yazdırmak için
    ]
)


if __name__ == "__main__":
    logging.info("Logging has started.")