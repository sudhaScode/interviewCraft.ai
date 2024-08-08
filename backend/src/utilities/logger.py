import logging
import os
from datetime import datetime

def setup_logger():
  """Sets up a logger that creates a new log file for each day in a utility folder."""

  # Create the utility folder if it doesn't exist
  utility_folder = 'logs'
  os.makedirs(utility_folder, exist_ok=True)

  # Get today's date for the log file name
  today = datetime.now().strftime('%Y-%m-%d')
  log_file = os.path.join(utility_folder, f'log_{today}.log')

  # Configure the logger
  logging.basicConfig(
      filename=log_file,
      level=logging.INFO,
      format='%(asctime)s - %(levelname)s - %(message)s',
      datefmt='%Y-%m-%d %H:%M:%S'
  )

  return logging.getLogger(__name__)

# Example usage:
logger = setup_logger()