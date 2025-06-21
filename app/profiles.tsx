import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    FlatList,
    ListRenderItemInfo,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

// Define user type (optional for expansion)
type User = {
  username: string;
  email: string;
  badges: string[];
};

const MOCK_USER: User = {
  username: 'BlockDee',
  email: 'blockdee@jomexplore.app',
  badges: ['🎖️ Batu Caves', '🎖️ Chin Swee Temple', '🎖️ Gunung Mulu', '🎖️ Mount Kinabalu']
};

export default function ProfileScreen(): JSX.Element {
  const router = useRouter();

  const renderBadgeItem = ({ item }: ListRenderItemInfo<string>) => (
    <View style={styles.badgeItem}>
      <MaterialCommunityIcons name="medal" size={18} color="#fbc02d" />
      <Text style={styles.badgeText}>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <Text style={styles.title}>My Profile</Text>
      </View>

      <View style={styles.userBox}>
        <Feather name="user" size={40} color="#1E3A8A" />
        <Text style={styles.username}>{MOCK_USER.username}</Text>
        <Text style={styles.email}>{MOCK_USER.email}</Text>
      </View>

      <Text style={styles.badgeTitle}>My E-Badges</Text>
      <FlatList
        data={MOCK_USER.badges}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderBadgeItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaf2ff',
    paddingTop: 50,
    paddingHorizontal: 20
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  title: {
    color: '#1E3A8A',
    fontSize: 24,
    fontWeight: 'bold'
  },
  userBox: {
    alignItems: 'center',
    marginBottom: 30
  },
  username: {
    color: '#1E3A8A',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 8
  },
  email: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 4
  },
  badgeTitle: {
    color: '#1E3A8A',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10
  },
  badgeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10
  },
  badgeText: {
    color: '#1E3A8A',
    marginLeft: 10,
    fontSize: 15
  },
  logoutButton: {
    backgroundColor: '#007aff',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});
