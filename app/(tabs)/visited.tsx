import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type Location = {
  name: string;
  query: string;
  description: string;
  longDescription: string;
  image: any; // since require returns number
};

const LOCATIONS: Location[] = [
  {
    name: 'Batu Caves',
    query: 'Batu Caves, Malaysia',
    description: 'Famous limestone hill with a series of caves and temples.',
    longDescription: 'Batu Caves is a renowned Hindu temple complex set in limestone caves, featuring a towering golden statue of Lord Murugan and vibrant cultural festivals.',
    image: require('../../assets/images/batu-caves.jpg')
  },
  {
    name: 'Chin Swee Temple',
    query: 'Chin Swee Caves Temple, Malaysia',
    description: 'Scenic temple located in Genting Highlands.',
    longDescription: 'Chin Swee Caves Temple is a majestic Taoist temple nestled on a cliff in Genting Highlands, offering stunning mountain views and intricate architectural details.',
    image: require('../../assets/images/chin-swee-temple.jpg')
  },
  {
    name: 'Gunung Mulu National Park',
    query: 'Gunung Mulu National Park, Malaysia',
    description: 'UNESCO site with limestone karsts.',
    longDescription: 'Gunung Mulu National Park is famed for breathtaking limestone karst formations, extensive caves, and pristine rainforest.',
    image: require('../../assets/images/gunung-mulu.jpg')
  },
  {
    name: 'Mount Kinabalu',
    query: 'Mount Kinabalu, Malaysia',
    description: 'Malaysia’s highest peak.',
    longDescription: 'Mount Kinabalu is the tallest mountain in Malaysia and a biodiversity hotspot, sacred to local communities.',
    image: require('../../assets/images/mount-kinabalu.jpg')
  },
  {
    name: 'George Town',
    query: 'George Town, Penang, Malaysia',
    description: 'UNESCO World Heritage city.',
    longDescription: 'George Town blends colonial architecture, vibrant street art, and diverse cuisine, showcasing Malaysia’s multicultural heritage.',
    image: require('../../assets/images/george-town.jpg')
  },
  {
    name: 'Melaka Sultanate Palace Museum',
    query: 'Melaka Sultanate Palace Museum, Malaysia',
    description: 'Sultanate era museum.',
    longDescription: 'A replica of Sultan Mansur Shah’s 15th century palace, filled with artifacts from Melaka’s golden era.',
    image: require('../../assets/images/sultanate-palace.jpg')
  },
  {
    name: 'Niah National Park',
    query: 'Niah National Park, Malaysia',
    description: 'Famous for caves and archaeology.',
    longDescription: 'Niah is known for its ancient caves and prehistoric human remains dating back over 40,000 years.',
    image: require('../../assets/images/niah-park.jpg')
  },
  {
    name: 'Sultan Abdul Samad Building',
    query: 'Sultan Abdul Samad Building, Kuala Lumpur, Malaysia',
    description: 'Iconic colonial building.',
    longDescription: 'Built in 1897, this Moorish-style building is a historic symbol in Kuala Lumpur’s cityscape.',
    image: require('../../assets/images/sultan-abdul-building.jpg')
  },
  {
    name: 'Lenggong Valley',
    query: 'Lenggong Valley, Malaysia',
    description: 'Prehistoric archaeological site.',
    longDescription: 'Lenggong Valley is a UNESCO World Heritage Site rich in ancient tools and human skeletons.',
    image: require('../../assets/images/lenggong-valley.jpg')
  },
  {
    name: 'Bukit Cina',
    query: 'Bukit Cina, Malacca, Malaysia',
    description: 'Historic Chinese cemetery.',
    longDescription: 'Bukit Cina is the largest Chinese cemetery outside China, dating back to the 15th century.',
    image: require('../../assets/images/bukit-cina.jpg')
  }
];

const visitedNames = [
  'Batu Caves',
  'Chin Swee Temple',
  'Gunung Mulu National Park',
  'Mount Kinabalu'
];

const visitedLocations = LOCATIONS.filter(loc => visitedNames.includes(loc.name));

export default function VisitedScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigation.navigate('badge')}
        >
          <Text style={styles.tabText}>Badge</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.activeTab}>
          <Text style={styles.activeTabText}>Visited</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={visitedLocations}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardDate}>Visited: 2024-06-XX</Text>
              <Text style={styles.cardRating}>Rating: 4.5 ⭐</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, backgroundColor: '#fff', paddingHorizontal: 16 },
  tabContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 30 },
  tab: { paddingVertical: 10, paddingHorizontal: 24, borderRadius: 20, marginHorizontal: 10, backgroundColor: '#f0f0f0' },
  activeTab: { paddingVertical: 10, paddingHorizontal: 24, borderRadius: 20, marginHorizontal: 10, backgroundColor: '#007aff' },
  tabText: { fontSize: 16, color: '#555' },
  activeTabText: { fontSize: 16, color: 'white', fontWeight: 'bold' },
  card: { flexDirection: 'row', padding: 12, marginBottom: 12, backgroundColor: '#f9f9f9', borderRadius: 8, alignItems: 'center' },
  cardImage: { width: 60, height: 60, marginRight: 12, borderRadius: 8 },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: 'bold' },
  cardDate: { fontSize: 14, color: '#555', marginTop: 4 },
  cardRating: { fontSize: 14, color: '#555', marginTop: 2 },
});
