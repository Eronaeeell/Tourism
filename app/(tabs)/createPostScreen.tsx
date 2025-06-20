import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { savePost } from '../postStorage';
import { PostType } from '../types';

const CreatePostScreen: React.FC = () => {
  const [caption, setCaption] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [photo, setPhoto] = useState<any>(null);
  const [badgeId, setBadgeId] = useState<string>('');
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const username = 'BlockDee';

  // Load badges user earned from AsyncStorage
  useEffect(() => {
    const loadEarnedBadges = async () => {
      const saved = await AsyncStorage.getItem('earnedBadges');
      if (saved) {
        const parsed = JSON.parse(saved);
        setEarnedBadges(parsed);
        if (parsed.length > 0) setBadgeId(`🎖️ ${parsed[0]}`); // default select first badge
      }
    };
    loadEarnedBadges();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.canceled) {
      setPhoto(result.assets[0]);
    }
  };

  const uploadPost = async () => {
    if (!photo?.uri) {
      alert('Please select an image!');
      return;
    }

    setLoading(true);

    const newPost: PostType = {
      username,
      caption,
      location,
      badgeId,
      imageUrl: photo.uri,
      createdAt: new Date().toISOString()
    };

    await savePost(newPost);
    alert('Post created!');
    setLoading(false);
    router.push('/');
  };

  const badges = earnedBadges.map((name) => `🎖️ ${name}`);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Feather name="arrow-left" size={24} color="#333" />
      </TouchableOpacity>

      <Text style={styles.title}>Create Your Adventure Post</Text>

      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        {photo ? (
          <Image source={{ uri: photo.uri }} style={styles.imagePreview} />
        ) : (
          <Text style={styles.imageText}>📷 Tap to choose image</Text>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Caption your journey..."
        placeholderTextColor="#777"
        value={caption}
        onChangeText={setCaption}
      />

      <TextInput
        style={styles.input}
        placeholder="Location (optional)"
        placeholderTextColor="#777"
        value={location}
        onChangeText={setLocation}
      />

      <Text style={styles.badgeLabel}>Choose your Badge:</Text>
      <View style={styles.badgeContainer}>
        {badges.map((badge) => (
          <TouchableOpacity
            key={badge}
            style={[
              styles.badgeButton,
              badge === badgeId && styles.selectedBadge
            ]}
            onPress={() => setBadgeId(badge)}
          >
            <Text style={styles.badgeText}>{badge}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity onPress={uploadPost} style={styles.postButton} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.postText}>Post</Text>}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CreatePostScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f7fa',
    flexGrow: 1
  },
  backButton: {
    marginBottom: 10,
    alignSelf: 'flex-start'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 20
  },
  imagePicker: {
    backgroundColor: '#e0eafc',
    borderRadius: 10,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#cbd8f0'
  },
  imageText: {
    color: '#555',
    fontSize: 16
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 10
  },
  input: {
    backgroundColor: '#fff',
    color: '#222',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  badgeLabel: {
    color: '#444',
    fontSize: 14,
    marginBottom: 6
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20
  },
  badgeButton: {
    backgroundColor: '#dde9fb',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#c3d4f0'
  },
  selectedBadge: {
    backgroundColor: '#1e88e5',
    borderColor: '#1e88e5'
  },
  badgeText: {
    color: '#1e1e1e'
  },
  postButton: {
    backgroundColor: '#1e88e5',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center'
  },
  postText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
