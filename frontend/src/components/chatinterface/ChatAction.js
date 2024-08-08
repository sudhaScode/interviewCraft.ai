import React, { useRef, useState } from "react";
import styles from "./ChatAction.module.css";
import { useSelector,useDispatch } from "react-redux";
import { push } from "../../Reduxstore/Store";
import axios from "axios"
import { URL_ENDPOINT } from "../../constants/Config";
import { botimage } from "./Chat";

function ChatAction({isMock}){

    const isUploaded = useSelector(state=>state.flow.isUploaded)
    // const messages = useSelector(state=>state.chat.messages)
    const [isPromting, setIsPromting] = useState(false)
    const [prompt, setPrompt] = useState([]);
    const [count, setCount] = useState(1)
    const ref = useRef(null)
    const dispatch = useDispatch() 
    const onPromptHander=async (event)=>{
        event.preventDefault();
       // console.log("PROMTPT:: ",event.target.prompt.value)
       setIsPromting(true)

        let payload = {
            name: "User",
            key: "user-resume-mes",
            response:prompt
        }
        const persistedMessages =JSON.parse( sessionStorage.getItem("messages"))
        persistedMessages.push(payload)
        sessionStorage.setItem("messages", JSON.stringify(persistedMessages))
        dispatch(push(payload));

        try{
            const data = await fetchAPI(event.target.prompt.value)
       // console.log("got it:: ",data.response)
        const result = {
            name: "Craft.ai",
            key: "bot-init-res",
            response:data.response
        }
       // console.log(result, "dadaas")
        persistedMessages.push(result)
        sessionStorage.setItem("messages", JSON.stringify(persistedMessages))
        dispatch(push(result));
        if(ref.current){
            ref.current.value=""
            setPrompt([])
           }
        }
        catch(e){ 
            // console.log(e)
            //  if(ref.current){
            //     ref.current.value=""
            //     ref.current.placeholder="Request not processed please try again"
            //    }
        }
        setIsPromting(false)
    }
    
    const fetchAPI=async(prompt)=>{
        let URL = `${URL_ENDPOINT}/prompt`
        const fileName = localStorage.getItem("fileName")

        let body =  {
            prompt:prompt,
            file_name: fileName
        }
        if(isMock){
            URL=`${URL_ENDPOINT}/mock`
            body = {
                answer: prompt,
                file_name: fileName,
                qnsno: count
            }
            setCount(prev=>prev+1)
        }
        try{
            const response = await axios.post(URL, body );
            //console.log(response)
            if(response.status === 200){
                const data=  await response.data;
                return data;
            }
            else{
                throw Error("Prompt Failed")
            }
        }
        catch(error){
            throw error
        }
        
    }

    const handleInputChange = (event) => {
        const lines = event.target.value.split('\n');
        // Process lines here
        setPrompt([...lines])
      };

    return (
        <>
        {isPromting &&
        <div className={prompt.length>1?styles.header:styles["header-one"]}>
        <img src={botimage} alt={"Craft.ai"} className={ styles["chat-img"]} />
        <span>{"Typing..."}</span>
    </div>}
        <div className={prompt.length>1? styles["chat-conatiner"]:styles["chat-conatiner-one"]}>
            
             {!isUploaded ? <form className={prompt.length>1? styles["style-container"]:styles["style-container-one"]} onSubmit={onPromptHander}>
                <textarea className={styles["prompt-input"]} ref={ref} placeholder="Enter a prompt here" name="prompt" onChange={handleInputChange}/>
               {/* <input type="text" name="prompt" placeholder="Enter a prompt here" className={styles["prompt-input"]}/>*/}
                <button type="submit" className={styles["send-button"]} disabled ={isPromting}><img src="https://cdn-icons-png.freepik.com/512/10109/10109981.png" alt="SEND" className={styles["send-icon"]}/></button>
            </form>:<input type="text" value="Please upload the resume to open chat window" className={styles["prompt-window"]} readOnly />}
                
        </div>
        </>
    );
}

export default ChatAction;