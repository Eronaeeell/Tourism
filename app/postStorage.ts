import AsyncStorage from '@react-native-async-storage/async-storage';
import { PostType } from './types';

const STORAGE_KEY = 'posts_data';

export const savePost = async (post: PostType): Promise<void> => {
  try {
    const existing = await AsyncStorage.getItem(STORAGE_KEY);
    const posts: PostType[] = existing ? JSON.parse(existing) : [];
    posts.unshift(post);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch (err) {
    console.error('Failed to save post:', err);
  }
};

export const loadPosts = async (): Promise<PostType[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Failed to load posts:', err);
    return [];
  }
};

export const clearPosts = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear posts:', err);
  }
};
