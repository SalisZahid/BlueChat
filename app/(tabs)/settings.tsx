import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/Colors";
import { createGlobalStyles } from "@/constants/GlobalStyles";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setColorScheme } from "@/store/slices/themeSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface SettingItemProps {
  icon: any;
  title: string;
  subtitle: string;
  action?: React.ReactNode;
  onPress?: () => void;
  iconColor?: string;
  iconBgColor?: string;
}

interface IconContainerProps {
  children: React.ReactNode;
  size?: "small" | "large";
  bgColor?: string;
  style?: any;
}

const IconContainer = ({
  children,
  size = "small",
  bgColor,
  style,
}: IconContainerProps) => {
  const colorScheme = useAppSelector((state) => state.theme.colorScheme);
  const colors = Colors[colorScheme ?? "light"];
  const styles = createGlobalStyles(colorScheme, colors);
  const containerStyle =
    size === "large" ? styles.iconContainerLarge : styles.iconContainer;

  return (
    <View
      style={[containerStyle, bgColor && { backgroundColor: bgColor }, style]}
    >
      {children}
    </View>
  );
};

const SettingCard = ({
  icon,
  title,
  subtitle,
  action,
  onPress,
  iconColor,
  iconBgColor,
}: SettingItemProps) => {
  const colorScheme = useAppSelector((state) => state.theme.colorScheme);
  const colors = Colors[colorScheme ?? "light"];
  const styles = createGlobalStyles(colorScheme, colors);

  const CardComponent = onPress ? TouchableOpacity : View;

  return (
    <CardComponent
      style={[styles.card, onPress && { marginBottom: 24 }]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <IconContainer bgColor={iconBgColor}>
        <IconSymbol
          name={icon}
          size={20}
          color={iconColor || (colorScheme === "dark" ? "#9CA3AF" : "#6B7280")}
        />
      </IconContainer>
      <View style={styles.textContainer}>
        <Text
          style={[
            styles.title,
            iconColor === "#EF4444" && { color: "#EF4444" },
          ]}
        >
          {title}
        </Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      {action && <View>{action}</View>}
    </CardComponent>
  );
};

const DeviceCard = () => {
  const colorScheme = useAppSelector((state) => state.theme.colorScheme);
  const colors = Colors[colorScheme ?? "light"];
  const styles = createGlobalStyles(colorScheme, colors);

  return (
    <View style={[styles.card, { marginBottom: 12 }]}>
      <IconContainer size="small" bgColor="#0EA5E9">
        <IconSymbol name="person.fill" size={20} color="#fff" />
      </IconContainer>
      <View style={styles.textContainer}>
        <Text style={styles.title}>My Device</Text>
        <Text style={styles.subtitle}>iPhone 14 Pro</Text>
      </View>
    </View>
  );
};

export default function Settings() {
  const dispatch = useAppDispatch();
  const colorScheme = useAppSelector((state) => state.theme.colorScheme);
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const colors = Colors[colorScheme ?? "light"];
  const styles = createGlobalStyles(colorScheme, colors);

  const [autoScan, setAutoScan] = useState(true);

  const handleDarkModeToggle = async (value: boolean) => {
    const newScheme = value ? "dark" : "light";
    dispatch(setColorScheme(newScheme));
    try {
      await AsyncStorage.setItem("@bluechat_theme", newScheme);
    } catch (error) {
      console.error("Failed to save theme preference:", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.container}
      >
        <Text style={styles.headerLarge}>Settings</Text>

        <DeviceCard />

        <SettingCard
          icon="moon.fill"
          title="Theme"
          subtitle="Dark Mode"
          action={
            <Switch
              value={isDarkMode}
              onValueChange={handleDarkModeToggle}
              trackColor={{ false: "#D1D5DB", true: "#3B82F6" }}
              thumbColor="#fff"
            />
          }
        />

        <SettingCard
          icon="waveform.path.ecg.rectangle.fill"
          title="Auto Scan"
          subtitle="Automatically scan for devices"
          action={
            <Switch
              value={autoScan}
              onValueChange={setAutoScan}
              trackColor={{ false: "#D1D5DB", true: "#3B82F6" }}
              thumbColor="#fff"
            />
          }
        />

        <SettingCard
          icon="trash.fill"
          title="Clear Chat History"
          subtitle="Delete all conversations"
          iconColor="#EF4444"
          iconBgColor="rgba(239, 68, 68, 0.1)"
          onPress={() => alert("Clear chat history?")}
        />

        <Text
          style={[
            styles.caption,
            { textAlign: "center", marginTop: 20, marginBottom: 40 },
          ]}
        >
          BlueChat v0.0.1
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
