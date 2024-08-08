from src.langchain_components.prompts.resumeenhance import format_prompt, chat_template_prompt, prompt_template, mock_prompt_template
from src.langchain_components.llm.model import setup_model
from src.langchain_components.chains.llmchain import advance_chain, setup_chain
from src.utilities.utility import load_file, to_markdown
from src.langchain_components.document_loaders.pdfloader import resume_reader
## Pydatic data validation
from src.pydantic_models.request_model import Request, MockRequest
from src.pydantic_models.reponse_model import Response

from src.langchain_components.chains.conversationchain import setup_conversationchain
from src.langchain_components.memory.conversationbuffermemory import setup_conversationmemory, setup_conversationsummarymemory

from src.utilities.logger import logger

import json
## Rstfull servies - ASGI

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

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

#with memory
mockmemory = setup_conversationmemory()
# memory = setup_conversationsummarymemory(chat_model) # depreceted fro chain
mockchain = setup_conversationchain(chat_model, mockmemory, mock_prompt_template)


# without memory
chain = advance_chain(chat_model,chat_template_prompt)
# chain = setup_chain(chat_model,chat_template_prompt,memory ) # depreceated

@app.post("/load")
async def load(file: UploadFile = File(...)):
    print("Received request for load")
    #print(file, "asddfghlkjkjds")
    try:

        file_name= load_file(file) #for tommorow
        # # IF Memory works
        # resume= resume_reader(f"store/{file_name}")
        # query = "Service None, Just walk though the resume, and check for improvements don't generate anything it is just for your future reference " +" \n\n RESUME: \n\n "
        # query = query+ resume
        # #print(resume)

        # response = chain.invoke(input = query)
        # print(response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return JSONResponse(content={"response": "Upload and read done successful"}, status_code=200)

@app.post("/prompt")
async def prompt(req:Request):
    print("Received request for prompt: ",req.prompt)
    try:

        # for un memory chain
        resume= resume_reader(f"store/{req.file_name}")
        query = req.prompt 
        response = chain.invoke({"query":req.prompt, "resume": resume}) # for advanced chain
        data = response.content


        # #for memory chain
        # resume= resume_reader(f"store/{req.file_name}") #for summary memory
        # query= req.prompt + "\n\n Resume \n\n" + resume
        # response = chain.invoke(input = query)
        # # data = to_markdown(response.content)
        # data = response["response"]

    except Exception as e: 
        #  logger.info(e)
        print(e)
        raise HTTPException(status_code=503, detail=str(e))
    
    # logger.info(response)

    return Response(response=data, status="200 ok")

@app.post("/mock")
async def mock(req:MockRequest):
    print("Received request for prompt: ", req.answer)
    try:
        # # for un memory chain
        # resume= resume_reader(f"store/{req.file_name}")
        # query = req.answer + " thanks for the question asking me next technical question"
        # response = chain.invoke({"query":query, "resume": resume}) # for advanced chain
        # data = response.content


        #for memory chain
        query= "Answer: \n"+req.answer
        if req.qnsno == 0:
            resume= resume_reader(f"store/{req.file_name}") #for summary memory
            query= "Note: \n"+req.answer + "\nResume:" + resume
        else:
            query= req.answer 
            #f"\n Thanks for the question, give me question next."

        response = mockchain.invoke(input= query)
        # data = to_markdown(response.content)
        data = response["response"]

    except Exception as e: 
        #  logger.info(e)
        print(e)
        raise HTTPException(status_code=503, detail=str(e))
    
    # logger.info(response)

    return Response(response=data, status="200 ok")