import styles from "./Chat.module.css";
import { useRef, useEffect } from "react";
import {Marked} from 'marked';
import ReactMarkdown from "react-markdown"
export const botimage = "https://images.unsplash.com/photo-1586374579358-9d19d632b6df?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
export const userimage = "https://images.unsplash.com/photo-1696429175928-793a1cdef1d3?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
function Chat({messages}) {
    //console.log(messages)
    const marked = new Marked({ gfm: true });
    const chatEndRef = useRef(null);

    const getMarkdownText = (markdownText) => {
        return { __html: marked.parse(markdownText) };
      };

    function removeLastTags(html) {
        
        let msg = html.slice(3,html.length-5)
        return msg;
      }

      useEffect(() => {
        // Scroll to the bottom when messages update
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, [messages]);
    return (
        <div className={styles["chat-box"]} >
       
            {messages.map((chat,index) => (
            <div className={styles.interface} key={`${chat.key}${index}`}>
                {chat.name === "Craft.ai" ? <div className={styles["bot-container"]}>
                    <div className={styles.header}>
                        <img src={botimage} alt={chat.name} className={styles["chat-img"]} />
                        <span>{chat.name}</span>
                    </div>
                    {/* <ReactMarkdown children ={chat.response   }/> */}
                    <div className={styles["container-bot-message"]}  dangerouslySetInnerHTML={getMarkdownText(chat.response)}>
                        
                    </div>
                </div> : <div className={styles["user-container"]}>
                    <div className={styles.header}>
                        <span>{chat.name}</span>
                        <img src={userimage} alt={chat.name} className={styles["chat-img"]} />
                    </div>
                    <div className={styles["container-user-message"]}>
                        <div>{chat.response.map((prompt, index)=><p key={index}>{prompt}<br></br></p>)}</div>
                    </div>
                </div>}
            </div>))}
            <div ref={chatEndRef}/>
        </div>
    );
}
export default Chat;
