import * as ImagePicker from 'expo-image-picker';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text, TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { db, storage } from '../firebaseConfig';

const BADGES = ['🏅 IPOH', '🏅 MELAKA', '🏅 GENTING', ' PORT DICKSON'];

export default function CreatePost() {
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [username, setUsername] = useState('BlockDee');
  const [image, setImage] = useState(null);
  const [badgeId, setBadgeId] = useState('');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadPost = async () => {
    if (!image || !caption || !badgeId) {
      return Alert.alert('Missing Info', 'Please fill in all fields and pick an image.');
    }

    const response = await fetch(image);
    const blob = await response.blob();
    const filename = image.substring(image.lastIndexOf('/') + 1);
    const imageRef = ref(storage, `posts/${filename}`);

    await uploadBytes(imageRef, blob);
    const imageUrl = await getDownloadURL(imageRef);

    await addDoc(collection(db, 'posts'), {
      username,
      caption,
      location,
      badgeId,
      imageUrl,
      timestamp: serverTimestamp()
    });

    Alert.alert('Success', 'Post uploaded!');
    setCaption('');
    setLocation('');
    setImage(null);
    setBadgeId('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Your Adventure Post</Text>

      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        {image ? (
          <Image source={{ uri: image }} style={styles.imagePreview} />
        ) : (
          <Text style={styles.imagePickerText}>Tap to choose image</Text>
        )}
      </TouchableOpacity>

      <TextInput
        placeholder="Username"
        placeholderTextColor="#aaa"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Caption your journey..."
        placeholderTextColor="#aaa"
        value={caption}
        onChangeText={setCaption}
        style={styles.input}
      />
      <TextInput
        placeholder="Location (optional)"
        placeholderTextColor="#aaa"
        value={location}
        onChangeText={setLocation}
        style={styles.input}
      />

      <View style={styles.badgeBox}>
        {BADGES.map((badge) => (
          <TouchableOpacity
            key={badge}
            onPress={() => setBadgeId(badge)}
            style={[
              styles.badgeButton,
              badgeId === badge && styles.selectedBadge
            ]}
          >
            <Text style={styles.badgeText}>{badge}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity onPress={uploadPost} style={styles.submitButton}>
        <Text style={styles.submitText}>Post Adventure</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a1a2f',
    padding: 20,
  },
  header: {
    fontSize: 22,
    color: '#fdd835',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  imagePicker: {
    height: 200,
    backgroundColor: '#1f2e45',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    overflow: 'hidden'
  },
  imagePickerText: {
    color: '#aaa',
    fontSize: 16
  },
  imagePreview: {
    width: '100%',
    height: '100%',
  },
  input: {
    backgroundColor: '#1f2e45',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    color: '#fff',
  },
  badgeBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    gap: 8,
  },
  badgeButton: {
    backgroundColor: '#1f2e45',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#555',
  },
  selectedBadge: {
    borderColor: '#fdd835',
    backgroundColor: '#26344f',
  },
  badgeText: {
    color: '#fff',
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: '#fdd835',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  submitText: {
    color: '#0a1a2f',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
