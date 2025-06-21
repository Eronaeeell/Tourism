import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const MOCK_USER = {
  username: 'BlockDee',
  email: 'blockdee@jomexplore.app',
  badges: ['🏅 IPOH', '🏅 MELAKA', '🏅 GENTING', '🏅 PD']
};

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Top bar */}
      <View style={styles.headerBar}>
        <Text style={styles.title}>My Profile</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="x" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* User Info */}
      <View style={styles.userBox}>
        <Feather name="user" size={40} color="#fdd835" />
        <Text style={styles.username}>{MOCK_USER.username}</Text>
        <Text style={styles.email}>{MOCK_USER.email}</Text>
      </View>

      {/* E-badges */}
      <Text style={styles.badgeTitle}>My E-Badges</Text>
      <FlatList
        data={MOCK_USER.badges}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.badgeItem}>
            <MaterialCommunityIcons name="medal" size={18} color="#fbc02d" />
            <Text style={styles.badgeText}>{item}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Logout Button (placeholder) */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a1a2f',
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
    color: '#fdd835',
    fontSize: 24,
    fontWeight: 'bold'
  },
  userBox: {
    alignItems: 'center',
    marginBottom: 30
  },
  username: {
    color: '#fff',
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
    color: '#fdd835',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10
  },
  badgeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1f2e45',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10
  },
  badgeText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 15
  },
  logoutButton: {
    backgroundColor: '#fdd835',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30
  },
  logoutText: {
    color: '#0a1a2f',
    fontWeight: 'bold',
    fontSize: 16
  }
});
