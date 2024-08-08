from langchain_community.document_loaders import PyPDFLoader
from src.utilities.logger import logger

def resume_reader(file_path):
    #print(file_path)   
    loader = PyPDFLoader(file_path)
    pages =  loader.load_and_split()
    # logger.info("Resume:\n".join(pages) )
    #print(pages)
    content =""
    for page in pages:
        content += page.page_content  
    return content
