import React from "react";
import Resume from "./Resume";
import PromptsMenu from "./PromptsMenu";
import { useSelector } from "react-redux";


function LeftPaneMenu(){
    const isLogin = useSelector(state=>state.flow.isLogin);
    const isUploaded = useSelector(state=>state.flow.isUploaded)
   //console.log(isUploaded, isLogin, "store")
    return(
       <>
       { <Resume />}
       {isUploaded && <PromptsMenu/>  }  
       </>
    );
}

export default LeftPaneMenu;