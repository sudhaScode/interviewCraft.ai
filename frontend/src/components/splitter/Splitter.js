import React, {useState} from "react";
import "./Splitter.css";
import Split from "react-split";
import LeftPaneMenu from "../LeftPaneMenu";
import ChatBot from "../chatinterface/ChatBot";
import Resume from "../Resume"
/*  
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import ActionProvider from "../Chatbot/ActionProvider";
import MessageParser from "../Chatbot/MessageParser";
import config from "../Chatbot/config";
*/

function Splitter(){
  
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
             <div className="top-content">
                 <Resume/>
             </div>
        </div>
   </>
    );
}

export default Splitter;