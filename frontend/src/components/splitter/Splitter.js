import React, {useState} from "react";
import "./Splitter.css";
import Split from "react-split";
import LeftPaneMenu from "../LeftPaneMenu";
import ChatBot from "../chatinterface/ChatBot";
import Resume from "../Resume";
import { useSelector } from "react-redux";
import PromptsMenu from "../PromptsMenu";
/*  
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import ActionProvider from "../Chatbot/ActionProvider";
import MessageParser from "../Chatbot/MessageParser";
import config from "../Chatbot/config";
*/

function Splitter(){
    const isLogin = useSelector(state=>state.flow.isLogin);
    const isUploaded = useSelector(state=>state.flow.isUploaded)
  
  //console.log("islogin", isLogin)
    return(
        <>
       
        <Split className="split" gutterAlign="end" id="splitter">
            <div className="left-pane">
                <LeftPaneMenu  />
            </div>
            <div className="right-pane">
               <ChatBot />
            </div>
        </Split>
        <div id="normal-interface">
             <ChatBot />
             <div className="prompt-container">
                {isUploaded && <PromptsMenu/>  }  
             </div>
        </div>
   </>
    );
}

export default Splitter;