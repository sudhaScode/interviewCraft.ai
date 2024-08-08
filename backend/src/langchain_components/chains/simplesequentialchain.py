from langchain.chains import SimpleSequentialChain



def setup_simple_chain(chains):
    simple_chain = SimpleSequentialChain({chains: chains,  "verbose":True})
    return simple_chain
