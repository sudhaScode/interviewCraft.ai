from langchain.chains.conversation.base import ConversationChain

def setup_conversationchain (llm ,memory, prompt):
    chain =  ConversationChain(llm=llm, memory=memory, prompt=prompt, verbose=True)
    return chain
