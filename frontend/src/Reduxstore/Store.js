import { createSlice, configureStore } from "@reduxjs/toolkit";
// Import persist-related functions for future use
// import { persistReducer, persistStore } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// Initial State Setup
const flowInitialState = {
  isLogin: sessionStorage.getItem("session") === "active",
  isUploaded: sessionStorage.getItem("uploaded") === "true",
  isMock: sessionStorage.getItem("mockenv") === "true",
  hasError: sessionStorage.getItem("error") === "true"
};

const chatInitialState = {
  messages: JSON.parse(sessionStorage.getItem("messages")) || [{
    name: "Craft.ai",
    key: "bot-init-res",
    response: "Welcome to GenAI! Your one-stop shop for landing your dream job.\nPlease login to my application."
  }]
};

// Flow Slice
const flowSlice = createSlice({
  name: "flow",
  initialState: flowInitialState,
  reducers: {
    handleAuth: (state, action) => {
      state.isLogin = action.payload;
      if (action.payload) {
        sessionStorage.setItem("session", "active");
      } else {
        sessionStorage.removeItem("session");
      }
    },
    handleUpload: (state, action) => {
      state.isUploaded = action.payload;
      sessionStorage.setItem("uploaded", action.payload.toString());
    },
    handleMock: (state, action) => {
      state.isMock = action.payload;
      sessionStorage.setItem("mockenv", action.payload.toString());
    },
    handleError: (state,action)=>{
      state.hasError = action.payload;
      sessionStorage.setItem("error", action.payload.toString());
    }
  }
});

// Chat Slice
const chatSlice = createSlice({
  name: "chat",
  initialState: chatInitialState,
  reducers: {
    push: (state, action) => {
      state.messages = [...state.messages, action.payload];
      sessionStorage.setItem("messages", JSON.stringify(state.messages));
    },
    reset: (state) => {
      state.messages = chatInitialState.messages;
      sessionStorage.setItem("messages", JSON.stringify(state.messages));
    },
    update: (state) => {
      const newMessages = state.messages.filter(msg => !msg.componentType);
      state.messages = [...newMessages];
      sessionStorage.setItem("messages", JSON.stringify(state.messages));
    }
  }
});

// Configure the store without persistence
const store = configureStore({
  reducer: {
    flow: flowSlice.reducer,
    chat: chatSlice.reducer
  }
});

// Export actions for use in components
export const { handleAuth, handleUpload, handleMock, handleError } = flowSlice.actions;
export const { push, reset, update } = chatSlice.actions;

// Uncomment below if using redux-persist in the future
/*
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['chat'],
  blocklist: ['flow']
};

const persistedReducer = persistReducer(persistConfig, chatSlice.reducer);

const store = configureStore({
  reducer: {
    flow: flowSlice.reducer,
    chat: persistedReducer
  }
});

export const persistedStore = persistStore(store);
*/

export default store;
