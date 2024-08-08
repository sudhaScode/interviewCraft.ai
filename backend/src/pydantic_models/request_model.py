from pydantic import BaseModel

class Request(BaseModel):
    prompt: str
    file_name: str # no need if memory works
class MockRequest(BaseModel):
    answer: str
    file_name: str
    qnsno: int