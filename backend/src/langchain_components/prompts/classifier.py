from langchain_core.prompts import PromptTemplate

template = """
You work is to classifying a given prompt among the mention cetegories using given check and returing repsonse in mention format: \n
Classify prompt Category as per following check:\n
1. if prompt is for enhancing resume or improvement suggestions -Service: Resume Enhancing\n
2. if prompt is for providing interview questions or asking for interview question and answers - Service: Interview preparation\n
3. if prompt is for taking mock interview or Simulating mock interview - Service: Mock interview\n
4. if prompt is answer or justification or explanation to a question - Service: Answer\n
5. if prompt is Question or doubt or question type - Service: Question \n


Here is Prompt Given to you:\n
{resumeservice}\n
Here is Resume Given to you:\n
{resume}\n

combine both servie and resume fro next LLM input

"""
classifer_prompt = PromptTemplate(
    template=template,
    input_variables=["resumeservice", "resume"]
)



"""
Your response should be following to next LLM ,
Service : this should be name of service you classified
Resume: this should be resume information given to you
"""
