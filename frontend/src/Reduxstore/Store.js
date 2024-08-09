import {createSlice, configureStore} from "@reduxjs/toolkit";
import {persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

let env = sessionStorage.getItem("mockenv");
let loginState = localStorage.getItem("session")
let uploadState = sessionStorage.getItem("uploaded")
let msg = sessionStorage.getItem("messages")
if(msg){
  msg = JSON.parse(msg)
}


const flowInitialState ={
    isLogin: loginState === "active"? true: false,
    isUploaded: uploadState === "true"?true:false,
    isMock : env === "true"?true:false
}
const flowSlice = createSlice({
    name: "flow",
    initialState: flowInitialState,
    reducers:{
        handleAuth: (state, action)=>{
            state.isLogin = action.payload
            if(action.payload){
              sessionStorage.setItem("uploaded", "active")
            }
        } ,
        handleUpload: (state, action)=>{
            state.isUploaded = action.payload
            sessionStorage.setItem("uploaded", action.payload)
        } ,
        handleMock: (state, action)=>{
          state.isMock = action.payload
          sessionStorage.setItem("mockenv", action.payload)
      } 
    }
});
export const chatInitialState = {
    messages: msg || [{
        name: "Craft.ai",
        key: "bot-init-res",
        response:"Welcome to GenAI! Your one-stop shop for landing your dream job.\nPlease login to my application."
    }]
}

const chatSlice = createSlice({
    name: "chat",
    initialState: chatInitialState,
    reducers:{
        push:(state,action)=>{
          console.log(state.messages)
           state.messages = [...state.messages, action.payload];
            // console.log(state.messages)
           sessionStorage.setItem("messages",JSON.stringify(state.messages))
        },  
        reset:(state)=>{
          state.messages = chatInitialState.messages
          sessionStorage.setItem("messages",JSON.stringify(state.messages))
        } ,
        update:(state)=>{
          const newMSGS = state.messages.filter( msg=> !msg.componentType)
          console.log(newMSGS)
          state.messages =  [...newMSGS]
          sessionStorage.setItem("messages",JSON.stringify(state.messages))
        }
    } 
})

export const persistedStore = configureStore({
    reducer: {
      flow: flowSlice.reducer,
      chat:chatSlice.reducer
    },
  });
/*

  const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['chat'],
    blocklist: ['flow']
  }

  const persistedReducer = persistReducer(persistConfig, chatSlice.reducer);
  const store = configureStore({
    reducer:{
      flow: flowSlice.reducer,
      chat: persistedReducer
    }
  }  
  )


  export const persistedStore = persistStore(store)
*/
  export const {chatReducer} = chatSlice.reducer
  export const {flowReducer} = flowSlice.reducer
  export const { handleAuth, handleUpload, handleMock } = flowSlice.actions;
  export const {push, reset, update} = chatSlice.actions;



