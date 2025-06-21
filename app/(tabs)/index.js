import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    FlatList, Image, Modal,
    Pressable, StyleSheet,
    Text, TouchableOpacity, View
} from 'react-native';

import ipoh from '../../assets/images/ipoh1.jpeg';
import melaka from '../../assets/images/melaka1.jpeg';
import pd from '../../assets/images/pd1.jpeg';

const MOCK_POSTS = [
  {
    id: '1',
    image: melaka,
    username: 'alice',
    caption: 'yea',
    location: 'mlaka',
    badgeId: '🏝 melaka',
    likes: 98,
    comments: 12,
  },
  {
    id: '2',
    image: pd,
    username: 'bob',
    caption: 'Peak life 🏔',
    location: 'port dickson',
    badgeId: '🥾 pd',
    likes: 120,
    comments: 33,
  },
  {
    id: '3',
    image: ipoh,
    username: 'chloe',
    caption: 'Culture vibes 🏯',
    location: 'ipoh',
    badgeId: '🏛 ipoh',
    likes: 75,
    comments: 9,
  }
];

export default function HomeScreen() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const router = useRouter();
  

  useEffect(() => {
    setPosts(MOCK_POSTS);
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.imageBox} onPress={() => setSelectedPost(item)}>
      <Image source={item.image} style={styles.imageThumbnail} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <Text style={styles.header}>JomExplore</Text>
        <TouchableOpacity onPress={() => router.push('/profile')}>
        <Feather name="user" size={24} color="#222" />
  </TouchableOpacity>
        </View>
        
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
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
                <Image source={selectedPost.image} style={styles.modalImage} />
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
                    <Text style={styles.badgeText}>{selectedPost.badgeId}</Text>
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
  headerBar: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 16,
  paddingVertical: 10,
  backgroundColor: '#fff',
},

    container: { flex: 1, backgroundColor: '#fff', paddingTop: 40 },
  header: { fontSize: 26, fontWeight: 'bold', padding: 16, color: '#222' },
  imageBox: {
    flex: 1,
    margin: 8,
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#eee',
  },
  imageThumbnail: {
    width: '100%',
    height: '100%',
  },
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
