/\*\*

- Redux Usage Examples
-
- This file demonstrates how to use Redux Toolkit throughout the app.
  \*/

// ============================================
// Example 1: Using Redux in a Component
// ============================================

// First, import the hooks and actions you need:
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
setChats,
selectChat,
setChatLoading,
} from "@/store/slices/chatSlice";
import { showToast } from "@/store/slices/uiSlice";

// In your component:
function MyComponent() {
const dispatch = useAppDispatch();

// Select state from Redux
const chats = useAppSelector((state) => state.chat.chats);
const selectedChatId = useAppSelector((state) => state.chat.selectedChatId);
const loading = useAppSelector((state) => state.chat.loading);
const isOnline = useAppSelector((state) => state.ui.isOnline);

// Dispatch actions
const handleSelectChat = (chatId: string) => {
dispatch(selectChat(chatId));
};

const handleLoadChats = async () => {
dispatch(setChatLoading(true));
try {
// Fetch chats from API
const chatsData = await fetchChatsFromAPI();
dispatch(setChats(chatsData));
dispatch(
showToast({ message: "Chats loaded", type: "success" })
);
} catch (error) {
dispatch(
showToast({ message: "Failed to load chats", type: "error" })
);
} finally {
dispatch(setChatLoading(false));
}
};

return (
// JSX here

<div></div>
);
}

// ============================================
// Example 2: Available Redux Slices and Actions
// ============================================

// CHAT SLICE
// ---------
// State:
// - chats: Chat[]
// - selectedChatId: string | null
// - loading: boolean
// - error: string | null
//
// Actions:
// - setChats(chats: Chat[])
// - addChat(chat: Chat)
// - updateChat(chat: Chat)
// - removeChat(chatId: string)
// - selectChat(chatId: string | null)
// - setChatLoading(loading: boolean)
// - setChatError(error: string | null)
// - clearChats()

// AUTH SLICE
// ----------
// State:
// - user: User | null
// - isAuthenticated: boolean
// - loading: boolean
// - error: string | null
//
// Actions:
// - login(user: User)
// - logout()
// - setUser(user: User)
// - setAuthLoading(loading: boolean)
// - setAuthError(error: string | null)

// UI SLICE
// --------
// State:
// - isLoading: boolean
// - toastMessage: string | null
// - toastType: "success" | "error" | "info" | null
// - isOnline: boolean
//
// Actions:
// - setLoading(loading: boolean)
// - showToast(payload: { message: string; type: "success" | "error" | "info" })
// - hideToast()
// - setOnlineStatus(isOnline: boolean)

// ============================================
// Example 3: Best Practices
// ============================================

// ✅ DO: Always use useAppDispatch and useAppSelector for type safety
import { useAppDispatch, useAppSelector } from "@/store/hooks";

// ❌ DON'T: Use plain useDispatch and useSelector (loses type info)
// import { useDispatch, useSelector } from "react-redux";

// ✅ DO: Keep components clean by selecting only what you need
const chats = useAppSelector((state) => state.chat.chats);

// ❌ DON'T: Select too much state
// const everything = useAppSelector((state) => state);

// ✅ DO: Use descriptive action names
dispatch(setChatLoading(true));
dispatch(selectChat(chatId));

// ❌ DON'T: Use unclear action names
// dispatch(setData(true));
// dispatch(select(id));

export {};
