import { Colors } from "@/constants/Colors";
import { createGlobalStyles } from "@/constants/GlobalStyles";
import { useAppSelector } from "@/store/hooks";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ChatItem {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
}

const MOCK_CHATS: ChatItem[] = [
  {
    id: "1",
    name: "John's iPhone",
    lastMessage: "Hey, are you at the conference?",
    timestamp: "2m ago",
    unreadCount: 2,
  },
  {
    id: "2",
    name: "Sarah's Galaxy",
    lastMessage: "Thanks for the help!",
    timestamp: "1h ago",
  },
  {
    id: "3",
    name: "Alex's Pixel",
    lastMessage: "See you tomorrow 👋",
    timestamp: "Yesterday",
  },
];

interface ChatItemProps {
  chat: ChatItem;
  onPress: () => void;
}

const ChatItemComponent = ({ chat, onPress }: ChatItemProps) => {
  const colorScheme = useAppSelector((state) => state.theme.colorScheme);
  const colors = Colors[colorScheme ?? "light"];
  const styles = createGlobalStyles(colorScheme, colors);

  // Get first letter from chat name
  const avatarLetter = chat.name.charAt(0).toUpperCase();

  // Generate consistent color for avatar based on first letter
  const getAvatarColor = (letter: string) => {
    const letterColors: { [key: string]: string } = {
      J: "#06B6D4",
      S: "#06B6D4",
      A: "#06B6D4",
    };
    return letterColors[letter] || "#06B6D4";
  };

  return (
    <TouchableOpacity
      style={styles.touchableCard}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.rowCenter}>
        {/* Avatar */}
        <View
          style={[
            styles.avatarContainer,
            { backgroundColor: getAvatarColor(avatarLetter) },
          ]}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#fff",
            }}
          >
            {avatarLetter}
          </Text>
        </View>

        {/* Chat Info */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{chat.name}</Text>
          <Text style={styles.subtitle}>{chat.lastMessage}</Text>
        </View>
      </View>

      {/* Right Section */}
      <View style={{ alignItems: "flex-end" }}>
        <Text style={styles.timestamp}>{chat.timestamp}</Text>
        {chat.unreadCount && chat.unreadCount > 0 && (
          <View style={[styles.badge, { marginTop: 6 }]}>
            <Text style={styles.badgeText}>{chat.unreadCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default function ChatList() {
  const colorScheme = useAppSelector((state) => state.theme.colorScheme);
  const colors = Colors[colorScheme ?? "light"];
  const styles = createGlobalStyles(colorScheme, colors);

  const handleChatPress = (chatId: string) => {
    // Handle chat navigation
    console.log("Chat pressed:", chatId);
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.container}
      >
        <Text style={styles.headerLarge}>Chats</Text>

        {MOCK_CHATS.map((chat) => (
          <ChatItemComponent
            key={chat.id}
            chat={chat}
            onPress={() => handleChatPress(chat.id)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
