// components/PostItem.js
import { StyleSheet, Text, View } from 'react-native';

export default function PostItem({ post }) {
  return (
    <View style={styles.card}>
      <Text style={styles.username}>{post.username}</Text>
      <Text style={styles.caption}>{post.caption}</Text>
      <Text style={styles.location}>📍 {post.location}</Text>

      {post.badgeId && (
        <Text style={styles.badge} onPress={() => alert(`Badge story for ${post.badgeId}`)}>
          🏅 {post.badgeId}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#eee',
    borderRadius: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  caption: {
    marginTop: 5,
  },
  location: {
    marginTop: 5,
    color: '#555',
  },
  badge: {
    marginTop: 10,
    color: '#007bff',
    fontWeight: 'bold',
  },
});
