import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
    FlatList, Image, Modal,
    Pressable, StyleSheet,
    Text, TouchableOpacity, View
} from 'react-native';
import { db } from '../../firebaseConfig';

export default function HomeScreen() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newPosts = snapshot.docs.map(doc => ({
        id: doc.id,
        imageUrl: doc.data().imageUrl || 'https://placekitten.com/300/300',
        likes: Math.floor(Math.random() * 100), // Simulated like count
        comments: Math.floor(Math.random() * 30), // Simulated comment count
        eBadge: '🏅 Explorer', // Placeholder badge
        ...doc.data()
      }));
      setPosts(newPosts);
    });

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => setSelectedPost(item)}>
      <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
      <View style={styles.postDetails}>
        <Text style={styles.username}>{item.username}</Text>
        <Text numberOfLines={2} style={styles.caption}>{item.caption}</Text>
        <Text style={styles.location}>📍 {item.location}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>JomExplore</Text>

      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 120 }}
      />

      <TouchableOpacity style={styles.postButton} onPress={() => router.push('/create')}>
        <Text style={styles.postButtonText}>＋ Post</Text>
      </TouchableOpacity>

      <Modal
        visible={!!selectedPost}
        animationType="fade"
        transparent
        onRequestClose={() => setSelectedPost(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedPost && (
              <>
                <Image source={{ uri: selectedPost.imageUrl }} style={styles.modalImage} />

                <View style={styles.modalInfo}>
                  <Text style={styles.modalUsername}>{selectedPost.username}</Text>
                  <Text style={styles.modalCaption}>{selectedPost.caption}</Text>
                  <Text style={styles.modalLocation}>📍 {selectedPost.location}</Text>

                  <View style={styles.row}>
                    <AntDesign name="like1" size={20} color="#e91e63" />
                    <Text style={styles.iconText}>{selectedPost.likes} Likes</Text>

                    <Feather name="message-circle" size={20} color="#1e88e5" style={{ marginLeft: 16 }} />
                    <Text style={styles.iconText}>{selectedPost.comments} Comments</Text>
                  </View>

                  <View style={styles.badgeBox}>
                    <MaterialCommunityIcons name="medal" size={18} color="#fbc02d" />
                    <Text style={styles.badgeText}>{selectedPost.eBadge}</Text>
                  </View>
                </View>

                <Pressable style={styles.closeButton} onPress={() => setSelectedPost(null)}>
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>Close</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 40 },
  header: { fontSize: 26, fontWeight: 'bold', padding: 16, color: '#222' },
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#fdfdfd',
    elevation: 3,
    overflow: 'hidden',
  },
  postImage: {
    width: '100%',
    height: 300,
  },
  postDetails: {
    padding: 12,
  },
  username: { fontWeight: 'bold', fontSize: 16 },
  caption: { fontSize: 14, marginVertical: 4, color: '#333' },
  location: { fontSize: 12, color: '#777' },
  postButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: '#007aff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    elevation: 3,
  },
  postButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: 280,
    borderRadius: 10,
    marginBottom: 14,
  },
  modalInfo: {
    alignSelf: 'stretch',
    paddingHorizontal: 4,
  },
  modalUsername: { fontWeight: 'bold', fontSize: 18, marginBottom: 6 },
  modalCaption: { fontSize: 15, color: '#444', marginBottom: 6 },
  modalLocation: { fontSize: 13, color: '#555', marginBottom: 10 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconText: {
    fontSize: 13,
    marginLeft: 4,
    color: '#333',
  },
  badgeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fffde7',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  badgeText: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: '500',
    color: '#795548',
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: '#007aff',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
});
