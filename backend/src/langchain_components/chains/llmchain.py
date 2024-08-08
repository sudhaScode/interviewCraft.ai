from langchain.chains.llm import LLMChain
from langchain.schema import StrOutputParser
# # depreceated
def setup_chain(llm, prompt_template, memory):
    chain = LLMChain(llm=llm, prompt=prompt_template)
    # chain = prompt_template | memory | llm
    return chain

def advance_chain(llm, prompt_template):
    chain = prompt_template | llm
    return chain

