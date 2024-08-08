from src.langchain_components.prompts.classifier import classifer_prompt
from src.langchain_components.prompts.generator import generator_prompt
from src.langchain_components.llm.model import setup_model
from src.langchain_components.chains.llmchain import advance_chain, setup_chain
from src.langchain_components.chains.simplesequentialchain import setup_simple_chain
from langchain_core.runnables import RunnablePassthrough
from src.utilities.utility import load_file, to_markdown
from src.langchain_components.document_loaders.pdfloader import resume_reader
## Pydatic data validation
from src.pydantic_models.request_model import Request
from src.pydantic_models.reponse_model import Response

from src.langchain_components.chains.conversationchain import setup_conversationchain
from src.langchain_components.memory.conversationbuffermemory import setup_conversationmemory

from src.utilities.logger import logger


import json
## Rstfull servies - ASGI

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware




"""
Configure two LLMChain:
One chian for classfiying the prompt among the services providing and the output format must be {prompt, service}
Another chain for content genration as per prompt, serivce, memory 
"""

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],    
    allow_headers=["*"],
)
# global chain
#print(chat_template_prompt)
chat_model= setup_model()
#memory = setup_conversationmemory()
# chain = setup_conversationchain(chat_model, memory, prompt_template)
#classificationchain = advance_chain(chat_model)
classifer_chain = advance_chain(chat_model, classifer_prompt)
#setup_chain(chat_model, generator_prompt, memory)
generator_chain = advance_chain(chat_model, generator_prompt)
#setup_simple_chain(chains=[classifer_chain,generator_chain])

simple_chain =  ( {"resumeservice" : classifer_chain}
        | RunnablePassthrough.assign(generate=generator_chain) )

@app.post("/load")
async def load(file: UploadFile = File(...)):
    print("Received request for load")
    #print(file, "asddfghlkjkjds")
    try:
       file_name= load_file(file) #for tommorow
    #    global resume
    #    resume= resume_reader(f"store/{file_name}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return JSONResponse(content={"response": "Upload and read done successful"}, status_code=200)

@app.post("/prompt")
async def prompt(req:Request):
    print("Received request for prompt: ",req.prompt)
    try:
        resume= resume_reader(f"store/{req.file_name}")
        # prompt = "Query: \n" + req.promwpt +" \n\nRESUME: \n" + resume
        # print(prompt)
        #response = chain.invoke(input =req.prompt, resume= resume) # for advanced chain
        #data = response.content
        response = simple_chain.invoke({"resumeservice": req.prompt, "resume":resume})
        # data = to_markdown(response.content)
        print(response["prompt"].content)
        data = response["prompt"].content 
    except Exception as e: 
        #  logger.info(e)
        print(e)
        raise HTTPException(status_code=503, detail=str(e))
    
    # logger.info(response)

    return Response(response=data, status="200 ok")