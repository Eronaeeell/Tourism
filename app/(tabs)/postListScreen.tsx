import React, { useCallback, useState } from 'react';
import { useRouter, useFocusEffect } from 'expo-router';
import {
  Button,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native';
import BadgeModal from '../../components/BadgeModal';
import { loadPosts, clearPosts } from '../postStorage';
import { PostType } from '../types';

const PostListScreen: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedBadgeId, setSelectedBadgeId] = useState<string>('');
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      loadPosts().then(setPosts);
    }, [])
  );

  const handleClearPosts = async () => {
    await clearPosts();
    setPosts([]);
    alert('All posts cleared!');
  };

  const renderItem = ({ item }: { item: PostType }) => (
    <View style={styles.postContainer}>
      <Text style={styles.username}>{item.username}</Text>
      <Text>{item.caption}</Text>
      <TouchableOpacity onPress={() => {
        setSelectedBadgeId(item.badgeId);
        setModalVisible(true);
      }}>
        <Text style={styles.badgeText}>🏅 {item.badgeId}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Button title="Create Post" onPress={() => router.push('/create')} />
      <View style={{ marginVertical: 10 }}>
        <Button title="Clear All Posts" onPress={handleClearPosts} color="red" />
      </View>
      <FlatList
        data={posts}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
      />
      <BadgeModal
        visible={modalVisible}
        badgeId={selectedBadgeId}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

export default PostListScreen;

const styles = StyleSheet.create({
  postContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  username: {
    fontWeight: 'bold'
  },
  badgeText: {
    color: 'blue'
  }
});
