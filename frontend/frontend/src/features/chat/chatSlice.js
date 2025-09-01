import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendMessage } from "./chatAPI";

export const sendChatMessage = createAsyncThunk(
    "chat/sendChatMessage",
    async (message) => {
        const reply = await sendMessage(message);
        return { role: "bot", text: reply };
    }
);

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        messages: [],
    },
    reducers: {
        addUserMessage: (state, action) => {
            state.messages.push({
                id: Date.now(),
                role: "user",
                text: action.payload,
                timestamp: new Date().toISOString(),
            });
        },
        resetChat: (state) => {
            state.messages = [];
            state.error = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(sendChatMessage.fulfilled, (state, action) => {
            state.messages.push(action.payload);
        });
    },
});

export const { addUserMessage,resetChat } = chatSlice.actions;
export default chatSlice.reducer;
