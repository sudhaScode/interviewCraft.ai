from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv
import os


def setup_env():
    load_dotenv()
    LANGCHAIN_API_KEY= os.getenv("LANGCHAIN_API_KEY")
    LANGCHAIN_TRACING_V2= "true"
    LANGCHAIN_PROJECT="interviewCraft.ai"
    LANGCHAIN_ENDPOINT="https://api.smith.langchain.com"

def setup_model():
    setup_env()
    chat_model = ChatGoogleGenerativeAI(
        model="gemini-1.5-flash",
        temperature=0,
        max_tokens=None,
        timeout=None,
        max_retries=2,
    )
    return chat_model




