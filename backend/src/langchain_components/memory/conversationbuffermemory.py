from langchain.memory import ConversationBufferMemory
from langchain.memory import ConversationSummaryBufferMemory


def setup_conversationmemory():
    memory = ConversationBufferMemory()
    return memory

def setup_conversationsummarymemory(chat_model):
    memory = ConversationSummaryBufferMemory(llm=chat_model, max_token_limit=200)
    return memory