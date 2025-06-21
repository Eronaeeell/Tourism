import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    ActivityIndicator,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function CreatePostScreen() {
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [photo, setPhoto] = useState(null);
  const [badgeId, setBadgeId] = useState('🏝 Beach Explorer');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const username = 'BlockDee'; // mock user

  const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images, // ✅ Correct and supported
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    setPhoto(result.assets[0]);
  }
};

  const uploadToCloudinary = async () => {
  if (!photo?.uri) return null;

  const formData = new FormData();
  formData.append('file', {
    uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    type: 'image/jpeg',
    name: 'upload.jpg',
  });
  formData.append('upload_preset', 'tourism_uploads');

  try {
    const res = await fetch('https://api.cloudinary.com/v1_1/duaovfxze/image/upload', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    });

    const data = await res.json();
    console.log('Cloudinary response:', data);

    if (data.secure_url) {
      return data.secure_url;
    } else {
      console.error('Cloudinary error:', data);
      return null;
    }
  } catch (err) {
    console.error('Upload failed:', err);
    return null;
  }
};  

  const uploadPost = async () => {
    setLoading(true);
    const imageUrl = await uploadToCloudinary();

    if (!imageUrl) {
      alert('Image upload failed');
      setLoading(false);
      return;
    }

    console.log({
      username,
      caption,
      location,
      badgeId,
      imageUrl,
    });

    alert('Post created (locally)');
    setLoading(false);
    router.push('/');
  };

  const badges = ['🎖️ Batu Caves', '🎖️ Chin Swee Temple', '🎖️ Gunung Mulu','🎖️Mount Kinabalu'];

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
              badge === badgeId && styles.selectedBadge,
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
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#0a1a2f',
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  imagePicker: {
    backgroundColor: '#1f2f4a',
    borderRadius: 10,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  imageText: {
    color: '#ccc',
    fontSize: 16,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  input: {
    backgroundColor: '#1f2f4a',
    color: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  badgeLabel: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 6,
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  badgeButton: {
    backgroundColor: '#163355',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedBadge: {
    backgroundColor: '#1e88e5',
  },
  badgeText: {
    color: '#fff',
  },
  postButton: {
    backgroundColor: '#1e88e5',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  postText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
