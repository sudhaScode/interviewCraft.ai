import { jsPDF } from "jspdf";
import { URL_ENDPOINT } from "./Config";
import axios from "axios";

const fetchAPI = async (file) => {
    const formData = new FormData();
    formData.append('file', file, file.name);
    const URL = `${URL_ENDPOINT}/persist`;
    try {
        const response = await axios.post(URL, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        if (response.status !== 200) {
            console.error("Failed to upload file. Status code:", response.status);
            return false;
        }
        return true;
    } catch (error) {
        console.error("Error during file upload:", error);
        return false;
    }
};

function cleanAndFormatText(text) {
    text = text.replace(/<\/?[^>]+(>|$)/g, ""); // Remove HTML tags
    text = text.replace(/\*\*/g, ""); // Remove markdown bold
    text = text.replace(/\*/g, ""); // Remove markdown italics
    text = text.replace(/(\r\n|\n|\r)/gm, " "); // Replace newlines with spaces
    text = text.replace(/\s\s+/g, "\n"); // Replace multiple spaces with new lines
    text = text.replace(/(\d+)\.\s/g, "$1) "); // Convert numbered lists
    text = text.replace(/^\s*-\s/gm, "* "); // Convert bullet points
    return text.trim();
}

export const saveDoc = async () => {
    let conversation_data = sessionStorage.getItem("messages");
    let data = "";
    const pdf = new jsPDF();
    pdf.setFillColor(246, 237, 237)
    const maxWidth = 180;
    const lineHeight = 10;
    let yOffset = 10;
    const pageHeight = pdf.internal.pageSize.height;

    if (conversation_data) {
        conversation_data = JSON.parse(conversation_data);
        conversation_data.forEach((chat, index) => {
            if (index >= 1) {
                if (chat.name === "Craft.ai") {
                    pdf.setFont("helvetica", "bold");
                    pdf.setFontSize(14);
                    pdf.text("AIMESSAGE:", 10, yOffset);
                    yOffset += lineHeight;

                    pdf.setFont("helvetica", "normal");
                    const message = cleanAndFormatText(chat.response);
                    const lines = pdf.splitTextToSize(message, maxWidth);
                    lines.forEach((line) => {
                        if (yOffset + lineHeight > pageHeight) {
                            pdf.addPage();
                            yOffset = 10;
                        }
                        pdf.setFontSize(12);
                        pdf.text(line, 10, yOffset);
                        yOffset += lineHeight;
                    });
                } else {
                    let prompt = ""
                    chat.response.forEach(msg => {
                        prompt = `${prompt} ${msg}\n`;
                    });
                    pdf.setFont("helvetica", "bold");
                    pdf.setFontSize(14);
                    pdf.text("USERMESSAGE:", 10, yOffset);
                    yOffset += lineHeight;

                    pdf.setFont("helvetica", "normal");
                        pdf.setFontSize(12);
                        pdf.text(prompt, 10, yOffset);
                        yOffset += lineHeight;
                    });
                }
                yOffset += lineHeight; // Add some space after each message
            }
        });
    }

    if (data === "") {
        console.log("No data to save.");
        return false;
    }

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
    let chat_name = `Chat history ${fileName} ${dateFormat}`;
    pdf.save(chat_name);

    const pdfBlob = pdf.output('blob');
    chat_name = chat_name + ".pdf";

    return await fetchAPI(new File([pdfBlob], chat_name, { type: 'application/pdf' }));
};
