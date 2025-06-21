import React from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SCREEN_WIDTH = Dimensions.get('window').width;

// Placeholder medal images (update paths as needed)
const goldMedal = require('../../assets/images/gold-badge.png');
const silverMedal = require('../../assets/images/silver-badge.jpg');
const bronzeMedal = require('../../assets/images/bronze-badge.webp');

const LOCATIONS = [
  { name: 'Batu Caves', image: require('../../assets/badges/badge-batu-caves.png') },
  { name: 'Chin Swee Temple', image: require('../../assets/badges/chin swee temple.png') },
  { name: 'Gunung Mulu National Park', image: require('../../assets/badges/Gunung Mulu.png') },
  { name: 'Mount Kinabalu', image: require('../../assets/badges/Mount Kinabalu.png') },
  { name: 'George Town', image: require('../../assets/badges/George Town.png') },
  { name: 'Melaka Sultanate Palace Museum', image: require('../../assets/badges/Melaka Sultanate Palace Museum.png') },
  { name: 'Niah National Park', image: require('../../assets/badges/Niah National Park.png') },
  { name: 'Sultan Abdul Samad Building', image: require('../../assets/badges/Sultan Abdul Samad.png') },
  { name: 'Lenggong Valley', image: require('../../assets/badges/Lenggong Valley.png') },
  { name: 'Bukit Cina', image: require('../../assets/badges/Bukit Cina.png') },
];

const allBadges = LOCATIONS.map((loc, index) => ({
  ...loc,
  earned: index < 4, // First 4 are obtained
}));

export default function BadgeScreen() {
  const navigation = useNavigation();

  const progress = allBadges.filter(badge => badge.earned).length / allBadges.length;

  let medalImage;
  if (progress >= 0.8) {
    medalImage = goldMedal;
  } else if (progress >= 0.5) {
    medalImage = silverMedal;
  } else {
    medalImage = bronzeMedal;
  }

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={styles.activeTabText}>Badge</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigation.navigate('visited')}
        >
          <Text style={styles.tabText}>Visited</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.medalContainer}>
        <Image source={medalImage} style={styles.medalImage} resizeMode="contain" />
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
        </View>
        <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
      </View>

      <FlatList
        contentContainerStyle={styles.badgeGrid}
        data={allBadges}
        numColumns={3}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.badgeCircle}>
            <Image
              source={item.image}
              style={[
                styles.badgeImage,
                !item.earned && styles.unobtainedBadgeImage
              ]}
              resizeMode="contain"
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginHorizontal: 10,
    backgroundColor: '#f0f0f0',
  },
  activeTab: {
    backgroundColor: '#007aff',
  },
  tabText: {
    fontSize: 16,
    color: '#555',
  },
  activeTabText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  medalContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  medalImage: {
    width: 50,
    height: 50,
  },
  progressContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  progressBarBackground: {
    width: SCREEN_WIDTH - 60,
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#007aff',
  },
  progressText: {
    marginTop: 6,
    fontWeight: 'bold',
  },
  badgeGrid: {
    alignItems: 'center',
  },

  badgeImage: {
    width: 120,
    height: 120,
  },
  unobtainedBadgeImage: {
    opacity: 0.3,
  },
});
