import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const tabs = [
  { name: 'index', icon: 'camera-outline', label: 'Post' },
  { name: 'chatbot', icon: 'chatbubbles-outline', label: 'Chatbot' },
  { name: 'map', icon: 'map-outline', label: 'Map' },
  { name: 'badge', icon: 'ribbon-outline', label: 'Badge' },
  { name: 'leaderboard', icon: 'trophy-outline', label: 'Leaderboard' },
];

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={({ state, descriptors, navigation }) => (
        <View
          style={{
            position: 'absolute',
            left: 16,
            right: 16,
            bottom: insets.bottom + 12,
            flexDirection: 'row',
            justifyContent: 'space-around',
            backgroundColor: '#fff',
            borderRadius: 20,
            paddingVertical: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 10,
          }}
        >
          {tabs.map((tab, index) => {
            const isFocused = state.index === index;

            return (
              <Pressable
                key={tab.name}
                onPress={() => navigation.navigate(tab.name)}
                style={{
                  alignItems: 'center',
                  flex: 1,
                }}
              >
                <Ionicons
                  name={tab.icon as any}
                  size={24}
                  color={isFocused ? '#007aff' : '#999'}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: isFocused ? '#007aff' : '#999',
                    marginTop: 4,
                  }}
                >
                  {tab.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      )}
    >
      <Tabs.Screen name="post" />
      <Tabs.Screen name="chatbot" />
      <Tabs.Screen name="map" />
      <Tabs.Screen name="badge" />
      <Tabs.Screen name="leaderboard" />
    </Tabs>
  );
}
