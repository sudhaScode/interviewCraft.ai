import {jsPDF} from "jspdf";
import { URL_ENDPOINT } from "./Config"
import axios from "axios"

const fetch =async(file)=>{
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

export const saveDoc = async()=>{
    let conversation_data = sessionStorage.getItem("messages")
    let data = ""
    if(conversation_data){
        conversation_data = JSON.parse(conversation_data);
        conversation_data.forEach((chat,index)=>{
            if(index >=2){
            if(chat.name === "Craft.ai"){
                data = `${data}\nAIMESSAGE: ${chat.response}`
            }
            else{
                 let prompt = ""
                 chat.response.forEach(msg=>{
                     prompt = `${prompt} ${chat.response}`
                 })
                 data = `${data}\nUSERMESSAGE: ${prompt}`
            }
        }
        })

    }
    if(!data){
        console.log("No data to save.");
        return false
    }

    const doc = new jsPDF();
    const maxWidth = 200; 
    const lines = doc.splitTextToSize(data, maxWidth);
    lines.forEach((line, index) => {
        doc.text(line, 10, 10 + (index * 10)); // Adjust vertical spacing as needed
    });
    let fileName = sessionStorage.getItem("fileName")
    console.log("fileName debug",fileName)
    if(fileName){
        fileName = fileName.split(".")[0]
    }
    console.log("fileName debug",fileName)
    const pad = (num) => num.toString().padStart(2, '0'); 
    const date = new Date();
    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1); // Months are 0-based
    const year = date.getFullYear();
    const hours = pad(date.getHours());
    
    const dateFormat = `${day}${month}${year}${hours}`;
    let chat_name = `${fileName}${dateFormat}`
    doc.save(chat_name);
    // Fetch the PDF file and upload it
    const pdfBlob = doc.output('blob');
    chat_name = chat_name +".pdf"
    //await fetch(new File([pdfBlob], chat_name, { type: 'application/pdf' }))
    return true
}

