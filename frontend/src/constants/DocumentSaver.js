import {jsPDF} from "jspdf";
import { URL_ENDPOINT } from "./Config"
import axios from "axios"

const fetchAPI =async(file)=>{
    const formData = new FormData();
    formData.append('file', file, file.name);
    const URL = `${URL_ENDPOINT}/persist`
    try{
        const response = await axios.post(URL, formData, {
            headers:{'Content_Type': 'multipart/form-data'}
                })
        if (response === 200){
            console.error("Failed to upload file. Status code:", response.status);  
            return true
        }
    }
    catch(error){
        console.error("Error during file upload:", error);
        return false
    }
  
  }

  function cleanAndFormatText(text) {
    // Remove HTML tags
    text = text.replace(/<\/?[^>]+(>|$)/g, "");
    
    // Replace markdown syntax with plain text equivalents
    text = text.replace(/\*\*/g, ""); // Remove bold (Markdown style)
    text = text.replace(/\*/g, ""); // Remove italics (Markdown style)
    text = text.replace(/(\r\n|\n|\r)/gm, " "); // Replace newlines with spaces
    text = text.replace(/\s\s+/g, " "); // Replace multiple spaces with a single space
    
    // Convert bullet points and lists to a plain text format
    text = text.replace(/(\d+)\.\s/g, "$1) "); // Convert numbered lists
    text = text.replace(/^\s*-\s/gm, "* "); // Convert bullet points

    return text.trim(); // Remove any leading/trailing spaces
}

export const saveDoc = async () => {
    let conversation_data = sessionStorage.getItem("messages");
    let data = "";
    if (conversation_data) {
        conversation_data = JSON.parse(conversation_data);
        conversation_data.forEach((chat, index) => {
            if (index >= 2) {
                let cleanedResponse = cleanAndFormatText(chat.response);
                if (chat.name === "Craft.ai") {
                    data = `${data}\nAIMESSAGE: ${cleanedResponse}`;
                } else {
                    let prompt = "";
                    chat.response.forEach(msg => {
                        prompt = `${prompt} ${cleanAndFormatText(msg)}`;
                    });
                    data = `${data}\nUSERMESSAGE: ${prompt}`;
                }
            }
        });
    }

    if (!data) {
        console.log("No data to save.");
        return false;
    }

    const doc = new jsPDF();
    const maxWidth = 180;
    const lines = doc.splitTextToSize(data, maxWidth);
    const lineHeight = 10;
    let yOffset = 10;
    const pageHeight = doc.internal.pageSize.height;

    lines.forEach((line) => {
        if (yOffset + lineHeight > pageHeight) {
            doc.addPage();
            yOffset = 10;
        }
        doc.text(line, 10, yOffset);
        yOffset += lineHeight;
    });

    let fileName = sessionStorage.getItem("fileName");
    if (fileName) {
        fileName = fileName.split(".")[0];
    }

    const pad = (num) => num.toString().padStart(2, '0');
    const date = new Date();
    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = pad(date.getHours());

    const dateFormat = `${day}${month}${year}${hours}`;
    let chat_name = `${fileName}${dateFormat}`;
    doc.save(chat_name);

    const pdfBlob = doc.output('blob');
    chat_name = chat_name + ".pdf";

    return await fetchAPI(new File([pdfBlob], chat_name, { type: 'application/pdf' }));
};
