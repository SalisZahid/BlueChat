import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  isLoading: boolean;
  toastMessage: string | null;
  toastType: "success" | "error" | "info" | null;
  isOnline: boolean;
}

const initialState: UIState = {
  isLoading: false,
  toastMessage: null,
  toastType: null,
  isOnline: true,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    showToast: (
      state,
      action: PayloadAction<{
        message: string;
        type: "success" | "error" | "info";
      }>,
    ) => {
      state.toastMessage = action.payload.message;
      state.toastType = action.payload.type;
    },
    hideToast: (state) => {
      state.toastMessage = null;
      state.toastType = null;
    },
    setOnlineStatus: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload;
    },
  },
});

export const { setLoading, showToast, hideToast, setOnlineStatus } =
  uiSlice.actions;

export default uiSlice.reducer;
