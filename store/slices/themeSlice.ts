import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ColorScheme = "light" | "dark" | null;

interface ThemeState {
  colorScheme: ColorScheme;
  isDarkMode: boolean;
  isLoading: boolean;
}

const initialState: ThemeState = {
  colorScheme: null,
  isDarkMode: false,
  isLoading: true,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setColorScheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.colorScheme = action.payload;
      state.isDarkMode = action.payload === "dark";
    },
    initializeTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.colorScheme = action.payload;
      state.isDarkMode = action.payload === "dark";
      state.isLoading = false;
    },
    setThemeLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setColorScheme, initializeTheme, setThemeLoading } =
  themeSlice.actions;

export default themeSlice.reducer;
