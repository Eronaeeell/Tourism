import React, { useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const badgeImage = require('../../assets/images/badge-batu-caves.png');

// Placeholder medal images (update paths later)
const goldMedal = require('../../assets/images/gold-badge.png');
const silverMedal = require('../../assets/images/silver-badge.jpg');
const bronzeMedal = require('../../assets/images/bronze-badge.webp');

export default function BadgeScreen() {
  const [tab, setTab] = useState<'badge' | 'visited'>('badge');
  const navigation = useNavigation();

  const obtainedBadges = Array(6).fill({ id: '', earned: true });
  const unobtainedBadges = Array(6).fill({ id: '', earned: false });
  const allBadges = [...obtainedBadges, ...unobtainedBadges];

  const progress = obtainedBadges.length / allBadges.length;

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
        <TouchableOpacity
          style={[styles.tab, styles.activeTab]}
        >
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
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.badgeCircle}>
            <Image
              source={badgeImage}
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
  badgeCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  badgeImage: {
    width: 120,
    height: 120,
  },
  unobtainedBadgeImage: {
    opacity: 0.3,
  },
});
