import React, { useEffect, useState, useCallback, useRef } from 'react';  
import Chat from './Chat';
import ChatAction from "./ChatAction";
import styles from "./Chat.module.css";
import { useSelector, useDispatch } from 'react-redux'; 
import { push, handleMock } from '../../Reduxstore/Store';
import {chatInitialState} from "../../Reduxstore/Store"
import { URL_ENDPOINT } from '../../constants/Config';
import axios from 'axios';


function ChatBot(){
    //console.log("messages:: ", messages)

    const dispatch = useDispatch();

    let storedMessages = useSelector(state=>state.chat.messages)
    const env = useSelector(state=>state.flow.isMock)
    const areMessages = sessionStorage.getItem("messages")
    const [messages, setMessages]  = useState(JSON.parse(areMessages) || storedMessages)
    const[mockENV, setMockENV] = useState(env)
    const isLogin = useSelector(state=>state.flow.isLogin)
    const isUploaded = useSelector(state=>state.flow.isUploaded)
    const count = useRef(0)
    const pushChat =(message)=>{
        //setConversation(prevState=> [...prevState, message]);
        dispatch(push(message))
    }
    const mockHandler=(event)=>{
        // console.log(mockENV)
        
        if(!mockENV){
            setMockENV(true)
            dispatch(handleMock(true))
            mockAPI()
       }
       else{
        setMockENV(false)
        dispatch(handleMock(false))
       }
    }

    const mockAPI =useCallback(async()=>{
        let URL = `${URL_ENDPOINT}/mock`
        const fileName = localStorage.getItem("fileName")
        let body = {
            answer: "It is just for your reference to keep resume candidate. don't ask question go through resume once",
            file_name: fileName,
            qnsno: -1
        }
        try{
            const response = await axios.post(URL, body );
            //console.log(response)
            if(response.status === 200){
                const data=  await response.data;
                return data;
            }
            else{
                mockAPI()
            }
        }
        catch(error){
            throw error
        }
    },[])

     
   useEffect(()=>{
        const areMessages = sessionStorage.getItem("messages")
        
        if(areMessages){
            setMessages(JSON.parse(areMessages));
        }
      
   }, [storedMessages])

//    useEffect(()=>{
//      if(!isLogin){
//         setMessages(chatInitialState.messages);
//      }
//    },[isLogin])
// useEffect(()=>{
    
// },[])

// useEffect(()=>{
// if(mockENV){
//     mockAPI()
// }
// },[mockENV])

    return(
        <div className={styles.container}>
           { isUploaded  && <div className={styles["check-mock"]}>
                <input type="checkbox" id="mock" checked={mockENV} onChange={mockHandler}/>
                <label htmlFor="mock"><span className={styles["mock-env"]} >Remember!</span> To Switch ON/OFF for Mock Interview Simulation </label>
           </div>}
            <Chat messages={messages}/>  
           {<ChatAction  pushChat={pushChat} isMock = {mockENV}/>  }
        </div> 


    );
}
export default ChatBot;
