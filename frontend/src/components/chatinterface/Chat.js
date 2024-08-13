import styles from "./Chat.module.css";
import React, { useRef, useEffect, memo, useState } from "react";
import { useSelector } from "react-redux";
import Resume from "../Resume";
import {Marked} from 'marked';
import ReactMarkdown from 'react-markdown';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';

export const botimage = "https://images.unsplash.com/photo-1586374579358-9d19d632b6df?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
export const userimage = "https://images.unsplash.com/photo-1696429175928-793a1cdef1d3?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

// Memoized chat components
const BotMessage = memo(({ index, chat, isUploaded, isLogin }) => {
    const getMarkdownText = (markdownText) => ({ __html: new Marked({ gfm: true }).parse(markdownText) });
    const copyRef = useRef(null)
    const timeRef = useRef(null)
    // const {isCopied, setIsCopied} = useState(false)
    
    const copyHandler =async(text, index)=>{
        //    if (chatRef.current){
        //     console.log(chatRef.current.markdownText)
        //    }
           const chatElement = document.getElementById(`chat-content${index}`)
           try{
           await navigator.clipboard.writeText(chatElement.textContent);
           if(copyRef.current){
            copyRef.current.innerText = "Copied"
           }
        //    console.log("Text copied")
           }
           catch {
            // console.log("Failed copied")
            copyRef.current.innerText = "Failed Copied"
           }
           timeRef.current = setTimeout(()=>{
            if(copyRef.current){
                copyRef.current.innerText = ""
               }
           }, 500)
    }
    return (
        <div className={styles["bot-container"]}>
            <div className={styles.header}>
                <img src={botimage} alt={chat.name} className={styles["chat-img"]} />
                <span>{chat.name}</span>
            </div>
            {chat.componentType ? (
                <div className={isUploaded ? styles["container-bot-message"] : isLogin ? `${styles["container-bot-message"]} ${styles["container-bot-upload"]}` : styles["container-bot-message"]}  id={`chat-content${index}`}>
                    {chat.response}
                    {!isUploaded && isLogin && <Resume className={styles["upload-resume"]} />}
                    <p ref={copyRef} className={styles.copied}></p>
                    <button className={styles["copy-button"]} onClick={()=>copyHandler(chat.response,index)}><ContentCopyOutlinedIcon/></button>
                </div>
            ) : (
                <div className={styles["container-bot-message"]} id={`chat-content${index}`} >   {/* dangerouslySetInnerHTML={getMarkdownText(chat.response)} /> */}<ReactMarkdown children={chat.response} />
                 <p ref={copyRef} className={styles.copied}></p>
                 <button className={styles["copy-button"]} onClick={()=>copyHandler(chat.response,index)}><ContentCopyOutlinedIcon sx={{width:"21px", height:"21px"}}/></button></div>
            )}
        </div>
    );
});

const UserMessage = memo(({ chat }) => (
    <div className={styles["user-container"]}>
        <div className={styles.header}>
            <span>{chat.name}</span>
            <img src={userimage} alt={chat.name} className={styles["chat-img"]} />
        </div>
        <div className={styles["container-user-message"]}>
            <div>{chat.response.map((prompt, index) => <p key={index}>{prompt}<br /></p>)}</div>
        </div>
    </div>
));

function Chat({ messages }) {
    const chatEndRef = useRef(null);
    const isUploaded = useSelector(state => state.flow.isUploaded);
    const isLogin = useSelector(state => state.flow.isLogin);

    useEffect(() => {
        const handleScroll = () => {
            if (chatEndRef.current) {
                chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        };

        // Debounce the scroll handler to avoid performance issues
        const debounceScroll = debounce(handleScroll, 200);
        debounceScroll();

        return () => {
            // Clean up the debounce function if necessary
          
        };
    }, [messages]);

    // Debounce function implementation
    function debounce(func, wait) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    return (
        <div className={styles["chat-box"]}>
            {messages.map((chat, index) => (
                <div className={styles.interface} key={`${chat.key}${index}`}>
                    {chat.name === "Craft.ai" ? (
                        <BotMessage index={index} chat={chat} isUploaded={isUploaded} isLogin={isLogin} />
                    ) : (
                        <UserMessage chat={chat} />
                    )}
                </div>
            ))}
            <div ref={chatEndRef} />
        </div>
    );
}

export default Chat;
