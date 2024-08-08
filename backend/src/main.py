from langchain_community import llms
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from IPython.display import Markdown, display
from  src.Prompts.ResumeEnhance import prompt_template
from langchain_community.document_loaders import PyPDFLoader
from langchain.chains import LLMChain
import textwrap
import os 
import pdfplumber
import re

load_dotenv()

llm = ChatGoogleGenerativeAI(model="gemini-pro")

chain = LLMChain(llm=llm, prompt=prompt_template, verbose=True)

def pdf_folder_reader(folder_path):

    pdf_text =""

    for filename in os.listdir(folder_path):

        if filename.endswith(".pdf"):
            file_path = os.path.join(folder_path, filename)

            #read the pdf
            with pdfplumber.open(file_path) as file:
                for page in file.pages:
                    pdf_text += page.extract_text()
    return pdf_text

def resume_enhance (file_path):
    loader = PyPDFLoader(file_path)
    pages = loader.load_and_split()
    response = chain.run(resume=pages)
    return response