import { useRouter } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Button, FlatList, Text, TouchableOpacity, View } from 'react-native';
import BadgeModal from '../components/BadgeModal';
import { db } from '../firebaseConfig';

export default function PostListScreen() {
  const [posts, setPosts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBadgeId, setSelectedBadgeId] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, 'posts'));
      const postData = querySnapshot.docs.map(doc => doc.data());
      setPosts(postData);
    };
    fetchPosts();
  }, []);

  const renderItem = ({ item }) => (
    <View style={{ padding: 10, borderBottomWidth: 1 }}>
      <Text style={{ fontWeight: 'bold' }}>{item.username}</Text>
      <Text>{item.caption}</Text>
      <TouchableOpacity onPress={() => {
        setSelectedBadgeId(item.badgeId);
        setModalVisible(true);
      }}>
        <Text style={{ color: 'blue' }}>🏅 {item.badgeId}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <Button title="Create Post" onPress={() => router.push('/create')} />
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
      <BadgeModal
        visible={modalVisible}
        badgeId={selectedBadgeId}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}
