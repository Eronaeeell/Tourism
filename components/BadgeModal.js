// components/BadgeModal.js
import { Button, Modal, StyleSheet, Text, View } from 'react-native';

const badgeStories = {
  batu_caves: "Batu Caves is a limestone hill with a series of caves and temples, famous for its giant golden Murugan statue.",
  kl_tower: "KL Tower is a telecommunications tower in Kuala Lumpur and a key tourist attraction offering skyline views.",
  penang_hill: "Penang Hill offers scenic views and colonial-era architecture. It's one of the oldest colonial hill stations in Southeast Asia.",
};

export default function BadgeModal({ visible, badgeId, onClose }) {
  if (!badgeId) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>E-Badge Story</Text>
          <Text>{badgeStories[badgeId] || 'No story found for this badge.'}</Text>
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 24,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 18,
  },
});
