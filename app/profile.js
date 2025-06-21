// app/profile.js
import { useRouter } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is your profile page!</Text>
      <Button title="Go Back" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
