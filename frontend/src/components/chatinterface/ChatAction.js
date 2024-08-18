import React, { useCallback, useEffect, useRef, useState, useMemo } from "react";
import styles from "./ChatAction.module.css";
import { useSelector, useDispatch } from "react-redux";
import { push, handleError } from "../../Reduxstore/Store";
import axios from "axios";
import { URL_ENDPOINT } from "../../constants/Config";
import botimage from "../../assets/chatbot.jpg";
import { mock } from "../../constants/prompts";

function ChatAction({ isMock }) {
    const isUploaded = useSelector(state => state.flow.isUploaded);
    const storedMessages = useSelector(state => state.chat.messages);
    const hasError = useSelector(state=>state.flow.hasError)
    const [isPrompting, setIsPrompting] = useState(false);
    const [prompt, setPrompt] = useState([]);
    const [count, setCount] = useState(0);

    const promptRef = useRef(null);
    const dispatch = useDispatch();


    const fetchAPI = useCallback(async (prompt) => {
        // console.log("coutn:: ", count, prompt)
        const fileName = sessionStorage.getItem("fileName");
        const mock_id = sessionStorage.getItem("mock_id");
        const resume_id = sessionStorage.getItem("resume_id");
        const URL = isMock ? `${URL_ENDPOINT}/api/mock/${count}` : `${URL_ENDPOINT}/api/prompt/${storedMessages.length-2}`;
        const body = isMock 
            ? { input: prompt, file_name: fileName, mock_id: mock_id } 
            : { prompt, file_name: fileName, resume_id:resume_id };

        if (isMock) setCount(prev => prev + 1);

        try {
            const response = await axios.post(URL, body);
            if (response.status === 200) return response.data;
            throw new Error("Prompt Failed");
        } catch {
            // setError("An error occurred while processing your request. Please try again.");
            // dispatch(handleError(true))
        }
    }, [isMock, count, storedMessages]);

    const onPromptHandler = useCallback(async (event) => {
        let request = event.target.prompt.value;
        if (event.preventDefault){
            event.preventDefault();
        }
        if (promptRef.current) promptRef.current.value = "";

          setIsPrompting(true);
        // setError(null);
        dispatch(handleError(false))

        dispatch(push({ name: "User", key: `user-resume-mes${storedMessages.length}`, response: [request] }));

        try {
            const data = await fetchAPI(request);

            dispatch(push({ name: "Craft.ai", key: `bot-init-res${storedMessages.length}`, response: data.response }));
            setPrompt([]);
        } catch {
            // Error handling done in fetchAPI
            // setError("Service failed, Please try again")
            dispatch(handleError(true))
        } finally {
            setIsPrompting(false);

        }
    }, [fetchAPI, dispatch, storedMessages.length]);

    const handleInputChange = useCallback((event) => {
        setPrompt(event.target.value.split('\n'));
    }, [dispatch]);

    const feedBackHandler = useCallback(async () => {
        dispatch(handleError(false))
        const fileName = sessionStorage.getItem("fileName");
        const id = sessionStorage.getItem("mock_id");
        try {
            const response = await axios.post(`${URL_ENDPOINT}/api/mock/1000`, { input: `Stop interview. Please provide the Feedback for my performance. \n${storedMessages.length}`, file_name: fileName, mock_id: id});
            if (response.status === 200) {
                dispatch(push({ name: "Craft.ai", key: "bot-init-res", response: response.data.response }));
                setCount(0)
            }
            else{
                dispatch(handleError(true))
            }
        } catch {
            // setError("Failed to send feedback. Please try again.");
            dispatch(handleError(true))
        }
    }, [dispatch, storedMessages.length]);

    const sendPrompt = useCallback(() => {
        onPromptHandler({ target: { prompt: { value: mock[3] } } });
        if (promptRef.current) promptRef.current.value = mock[3];
        // setCount(prev=>prev+1) updating in fecth api
    }, [onPromptHandler]);

    // const startInterview =useCallback(()=>{
    //     onPromptHandler({ target: { prompt: { value: mock[3] } } });
    //     if (promptRef.current) promptRef.current.value = mock[3];
    //     setCount(1)
    // }, [onPromptHandler])

    useEffect(() => {
        if (!isMock) setCount(0);
    }, [isMock]);
    

    const isPromptMultipleLines = useMemo(() => prompt.length > 1, [prompt]);

    return (
        <>
            {isMock && count >= 2 && 
                <button className={styles["feedback-button"]} onClick={feedBackHandler}>
                    Click me! For Feedback
                </button>
            }
            {isMock && count === 0 &&
                <button className={styles["feedback-button"]} onClick={sendPrompt}>
                  Prompt or Click me! to Start Interview
                </button>
            }
             {/* {isMock && count === -1 &&
                <button className={styles["feedback-button"]} onClick={startInterview}>
                    Click me! to Start Interview again
                </button>
            } */}
            {isPrompting &&
                <div className={isPromptMultipleLines ? styles.header : styles["header-one"]}>
                    <img src={botimage} alt={"Craft.ai"} className={styles["chat-img"]} />
                    <span>{"Typing..."}</span>
                </div>
            }
            <div className={isPromptMultipleLines ? styles["chat-container"] : styles["chat-container-one"]}>
            {isUploaded  && hasError && <div className={styles.error}>Request Failed. Please send prompt again...</div>}
                {isUploaded ? (
                    <form className={isPromptMultipleLines ? styles["form-container"] : styles["form-container-one"]} onSubmit={onPromptHandler}>
                        <textarea
                            className={styles["prompt-input"]}
                            ref={promptRef}
                            placeholder="Enter a prompt or Copy prompt from Prompts Menu"
                            name="prompt"
                            onChange={handleInputChange}
                        />
                       { <button type="submit" className={styles["send-button"]} disabled={isPrompting}>
                            <img src="https://cdn-icons-png.freepik.com/512/10109/10109981.png" alt="SEND" className={styles["send-icon"]} />
                        </button>}
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
