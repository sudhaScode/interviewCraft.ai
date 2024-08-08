from src.utilities.logger import logger

def load_file(file_meta):
    """
    receives file binary data 
    writes into file 
    path store/
    and retruns the path file 
    """
   # print(file_meta, "dsddas")
    file_path = f"store/{file_meta.filename}"
    #file_path = f"C:/Users/SUBOMMAS/interviewcraft.ai/backend/store/{file_meta.filename}"
    file_name = file_meta.filename
    #print(file_path)
    with open(file_path, "wb") as fs:
        fs.write(file_meta.file.read())

    return file_name

def to_markdown(response):
    # Split the response into paragraphs
    paragraphs = response.strip().split('\n****\n')
    
    formatted_paragraphs = []
    for paragraph in paragraphs:
        # Check if the paragraph starts with '* **' to detect bullet points
        if paragraph.strip().startswith('* **'):
            # Replace '*' with Markdown list syntax (*)
            formatted_paragraph = '* ' + paragraph.strip()[2:].strip()  # Remove '*' and extra spaces
        else:
            # Wrap the paragraph in double asterisks for bold formatting
            formatted_paragraph = '**' + paragraph.strip() + '**'
        
        # Append the formatted paragraph to the list of formatted paragraphs
        formatted_paragraphs.append(formatted_paragraph)
    
    # Join the formatted paragraphs with double newline characters (\n\n) for separation
    formatted_response = '\n\n'.join(formatted_paragraphs)
    
    return formatted_response
       