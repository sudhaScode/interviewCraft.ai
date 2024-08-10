import styles from "./Chat.module.css";
import React, { useRef, useEffect, memo } from "react";
import { useSelector } from "react-redux";
import Resume from "../Resume";
import {Marked} from 'marked';

export const botimage = "https://images.unsplash.com/photo-1586374579358-9d19d632b6df?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
export const userimage = "https://images.unsplash.com/photo-1696429175928-793a1cdef1d3?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

// Memoized chat components
const BotMessage = memo(({ chat, isUploaded, isLogin }) => {
    const getMarkdownText = (markdownText) => ({ __html: new Marked({ gfm: true }).parse(markdownText) });

    return (
        <div className={styles["bot-container"]}>
            <div className={styles.header}>
                <img src={botimage} alt={chat.name} className={styles["chat-img"]} />
                <span>{chat.name}</span>
            </div>
            {chat.componentType ? (
                <div className={isUploaded ? styles["container-bot-message"] : isLogin ? `${styles["container-bot-message"]} ${styles["container-bot-upload"]}` : styles["container-bot-message"]}>
                    {chat.response}
                    {!isUploaded && isLogin && <Resume className={styles["upload-resume"]} />}
                </div>
            ) : (
                <div className={styles["container-bot-message"]} dangerouslySetInnerHTML={getMarkdownText(chat.response)} />
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
                        <BotMessage chat={chat} isUploaded={isUploaded} isLogin={isLogin} />
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
