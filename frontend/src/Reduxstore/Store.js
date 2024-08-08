import {createSlice, configureStore} from "@reduxjs/toolkit";
import {persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const flowInitialState ={
    isLogin: sessionStorage.getItem("session")?true:false,
    isUploaded: sessionStorage.getItem("uploaded")?true:false
}
const flowSlice = createSlice({
    name: "flow",
    initialState: flowInitialState,
    reducers:{
        handleAuth: (state, action)=>{
            state.isLogin = action.payload
            //console.log("auth action", action)
        } ,
        handleUpload: (state, action)=>{
            state.isUploaded = action.payload
        } 
    }
});
export const chatInitialState = {
    messages: [{
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
           state.messages = [...state.messages, action.payload];
            // console.log(state.messages)
           // sessionStorage.setItem("messages",[JSON.stringify(...state.messages), JSON.stringify(action.payload)])
        },   
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
  export const { handleAuth, handleUpload } = flowSlice.actions;
  export const {push} = chatSlice.actions;



