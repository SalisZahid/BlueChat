import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
}

interface ChatState {
  chats: Chat[];
  selectedChatId: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  chats: [],
  selectedChatId: null,
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<Chat[]>) => {
      state.chats = action.payload;
    },
    addChat: (state, action: PayloadAction<Chat>) => {
      state.chats.push(action.payload);
    },
    updateChat: (state, action: PayloadAction<Chat>) => {
      const index = state.chats.findIndex(
        (chat) => chat.id === action.payload.id,
      );
      if (index !== -1) {
        state.chats[index] = action.payload;
      }
    },
    removeChat: (state, action: PayloadAction<string>) => {
      state.chats = state.chats.filter((chat) => chat.id !== action.payload);
    },
    selectChat: (state, action: PayloadAction<string | null>) => {
      state.selectedChatId = action.payload;
    },
    setChatLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setChatError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearChats: (state) => {
      state.chats = [];
      state.selectedChatId = null;
    },
  },
});

export const {
  setChats,
  addChat,
  updateChat,
  removeChat,
  selectChat,
  setChatLoading,
  setChatError,
  clearChats,
} = chatSlice.actions;

export default chatSlice.reducer;
