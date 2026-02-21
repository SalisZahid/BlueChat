import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme as useSystemColorScheme } from "react-native";

type ColorScheme = "light" | "dark" | null;

interface ThemeContextType {
  colorScheme: ColorScheme;
  setColorScheme: (scheme: "light" | "dark") => Promise<void>;
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "@bluechat_theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useSystemColorScheme();
  const [colorScheme, setColorSchemeState] = useState<ColorScheme>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved theme preference on mount
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme === "light" || savedTheme === "dark") {
          setColorSchemeState(savedTheme);
        } else if (systemColorScheme) {
          // Use system preference if no saved preference
          setColorSchemeState(systemColorScheme);
        }
      } catch (error) {
        console.error("Failed to load theme preference:", error);
        if (systemColorScheme) {
          setColorSchemeState(systemColorScheme);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadThemePreference();
  }, [systemColorScheme]);

  const setColorScheme = async (scheme: "light" | "dark") => {
    try {
      setColorSchemeState(scheme);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, scheme);
    } catch (error) {
      console.error("Failed to save theme preference:", error);
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <ThemeContext.Provider
      value={{
        colorScheme,
        setColorScheme,
        isDarkMode: colorScheme === "dark",
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
