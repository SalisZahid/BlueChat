import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useColorScheme as useSystemColorScheme } from "react-native";
import { useAppDispatch, useAppSelector } from "./hooks";
import { initializeTheme } from "./slices/themeSlice";

const THEME_STORAGE_KEY = "@bluechat_theme";

export function useThemeInitialization() {
  const dispatch = useAppDispatch();
  const systemColorScheme = useSystemColorScheme();
  const isLoading = useAppSelector((state) => state.theme.isLoading);

  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme === "light" || savedTheme === "dark") {
          dispatch(initializeTheme(savedTheme));
        } else if (
          systemColorScheme === "light" ||
          systemColorScheme === "dark"
        ) {
          dispatch(initializeTheme(systemColorScheme));
        } else {
          dispatch(initializeTheme("dark"));
        }
      } catch (error) {
        console.error("Failed to load theme preference:", error);
        dispatch(
          initializeTheme(systemColorScheme === "light" ? "light" : "dark"),
        );
      }
    };

    loadThemePreference();
  }, [systemColorScheme, dispatch]);

  return isLoading;
}
