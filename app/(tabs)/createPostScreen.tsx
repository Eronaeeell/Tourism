import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
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
  const [badgeId, setBadgeId] = useState<string>('🏝 Beach Explorer');
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const username = 'BlockDee';

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

  const badges = ['🎖️ Batu Caves', '🎖️ Chin Swee Temple', '🎖️ Gunung Mulu', '🎖️ Mount Kinabalu'];

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
        placeholderTextColor="#999"
        value={caption}
        onChangeText={setCaption}
      />

      <TextInput
        style={styles.input}
        placeholder="Location (optional)"
        placeholderTextColor="#999"
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
    backgroundColor: '#0a1a2f',
    flexGrow: 1
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20
  },
  imagePicker: {
    backgroundColor: '#1f2f4a',
    borderRadius: 10,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16
  },
  imageText: {
    color: '#ccc',
    fontSize: 16
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 10
  },
  input: {
    backgroundColor: '#1f2f4a',
    color: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12
  },
  badgeLabel: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 6
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20
  },
  badgeButton: {
    backgroundColor: '#163355',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10
  },
  selectedBadge: {
    backgroundColor: '#1e88e5'
  },
  badgeText: {
    color: '#fff'
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
