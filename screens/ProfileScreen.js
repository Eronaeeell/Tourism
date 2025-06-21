import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { db } from '../firebaseConfig';

export default function ProfileScreen() {
  const [badges, setBadges] = useState([]);

  // Replace with real user ID in production
  const username = 'tourist123';

  useEffect(() => {
    const fetchUserBadges = async () => {
      const q = query(collection(db, 'posts'), where('username', '==', username));
      const querySnapshot = await getDocs(q);
      const badgeList = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.badgeId && !badgeList.includes(data.badgeId)) {
          badgeList.push(data.badgeId);
        }
      });

      setBadges(badgeList);
    };

    fetchUserBadges();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🎓 {username}'s E-Badges</Text>
      <FlatList
        data={badges}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.badgeItem}>
            <Text style={styles.badgeText}>🏅 {item}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  badgeItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  badgeText: { fontSize: 18 }
});
