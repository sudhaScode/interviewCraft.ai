import React, { useCallback, useEffect, useRef, useState, useMemo } from "react";
import styles from "./ChatAction.module.css";
import { useSelector, useDispatch } from "react-redux";
import { push } from "../../Reduxstore/Store";
import axios from "axios";
import { URL_ENDPOINT } from "../../constants/Config";
import { botimage } from "./Chat";
import { mock } from "../../constants/prompts";

function ChatAction({ isMock }) {
    const isUploaded = useSelector(state => state.flow.isUploaded);
    const storedMessages = useSelector(state => state.chat.messages);
    const [isPrompting, setIsPrompting] = useState(false);
    const [prompt, setPrompt] = useState([]);
    const [count, setCount] = useState(0);
    const [error, setError] = useState(null);
    const ref = useRef(null);
    const dispatch = useDispatch();

    const fetchAPI = useCallback(async (prompt) => {
        const fileName = localStorage.getItem("fileName");
        console.log("coutn:: ", count, prompt)
        const URL = isMock ? `${URL_ENDPOINT}/mock` : `${URL_ENDPOINT}/prompt`;
        const body = isMock 
            ? { answer: prompt, file_name: fileName, qnsno: count } 
            : { prompt, file_name: fileName };

        if (isMock) setCount(prev => prev + 1);

        try {
            const response = await axios.post(URL, body);
            if (response.status === 200) return response.data;
            throw new Error("Prompt Failed");
        } catch {
            setError("An error occurred while processing your request. Please try again.");
        }
    }, [isMock, count]);

    const onPromptHandler = useCallback(async (event) => {
        let request = event.target.prompt.value;
        if (event.preventDefault){
            event.preventDefault();
        }
        if (count >=0)
          setIsPrompting(true);
        setError(null);
        if(count>=0)
            dispatch(push({ name: "User", key: `user-resume-mes${storedMessages.length}`, response: [request] }));

        try {
            const data = await fetchAPI(request);
            if(count >=0)
                dispatch(push({ name: "Craft.ai", key: `bot-init-res${storedMessages.length}`, response: data.response }));
            if (ref.current) ref.current.value = "";
            setPrompt([]);
        } catch {
            // Error handling done in fetchAPI
            setError("Service failed, Please try again")
        } finally {
            setIsPrompting(false);
        }
    }, [fetchAPI, dispatch, count, storedMessages.length]);

    const handleInputChange = useCallback((event) => {
        setPrompt(event.target.value.split('\n'));
    }, []);

    const feedBackHandler = useCallback(async () => {
        const fileName = localStorage.getItem("fileName");
        try {
            const response = await axios.post(`${URL_ENDPOINT}/mock`, { answer: `Please provide the feedback.${storedMessages.length}`, file_name: fileName, qnsno: 1000 });
            if (response.status === 200) {
                dispatch(push({ name: "Craft.ai", key: "bot-init-res", response: response.data.response }));
            }
            setCount(-1)
        } catch {
            setError("Failed to send feedback. Please try again.");
        }
    }, [dispatch, storedMessages.length]);

    const sendPrompt = useCallback(() => {
        onPromptHandler({ target: { prompt: { value: mock[2] } } });
        if (ref.current) ref.current.value = mock[3];
    }, [onPromptHandler]);

    const startInterview =useCallback(()=>{
        onPromptHandler({target:{prompt: {value:`I am getting ready for interview${storedMessages.length}`}}})
    }, [onPromptHandler,storedMessages.length])

    useEffect(() => {
        if (!isMock) setCount(0);
    }, [isMock]);

    const isPromptMultipleLines = useMemo(() => prompt.length > 1, [prompt]);

    return (
        <>
            {error && <div className={styles.error}>{error}</div>}
            {isMock && count >= 6 && 
                <button className={styles["feedback-button"]} onClick={feedBackHandler}>
                    Click me! For Feedback
                </button>
            }
            {isMock && count === 0 &&
                <button className={styles["feedback-button"]} onClick={sendPrompt}>
                    Send a mock interview prompt
                </button>
            }
             {isMock && count === -1 &&
                <button className={styles["feedback-button"]} onClick={startInterview}>
                    Start interview again
                </button>
            }
            {isPrompting &&
                <div className={isPromptMultipleLines ? styles.header : styles["header-one"]}>
                    <img src={botimage} alt={"Craft.ai"} className={styles["chat-img"]} />
                    <span>{"Typing..."}</span>
                </div>
            }
            <div className={isPromptMultipleLines ? styles["chat-container"] : styles["chat-container-one"]}>
                {isUploaded ? (
                    <form className={isPromptMultipleLines ? styles["style-container"] : styles["style-container-one"]} onSubmit={onPromptHandler}>
                        <textarea
                            className={styles["prompt-input"]}
                            ref={ref}
                            placeholder="Enter a prompt or Copy prompt from Prompts Menu"
                            name="prompt"
                            onChange={handleInputChange}
                        />
                        <button type="submit" className={styles["send-button"]} disabled={isPrompting}>
                            <img src="https://cdn-icons-png.freepik.com/512/10109/10109981.png" alt="SEND" className={styles["send-icon"]} />
                        </button>
                    </form>
                ) : (
                    <input
                        type="text"
                        value="Please upload the resume to open chat window"
                        className={styles["prompt-window"]}
                        readOnly
                    />
                )}
            </div>
        </>
    );
}

export default ChatAction;
