import {configureStore} from '@reduxjs/toolkit';
import chatReducer from '../features/chat/chatSlice';
import authReducer from '../features/auth/authSlice';


const store = configureStore({
    reducer: {
        auth: authReducer,
        chat: chatReducer,
    },
});

export default store;
