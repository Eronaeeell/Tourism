// import AsyncStorage from '@react-native-async-storage/async-storage';
// import React, { useEffect, useState } from 'react';
// import {
//   Alert,
//   Dimensions,
//   FlatList,
//   Image,
//   Platform,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// const SCREEN_WIDTH = Dimensions.get('window').width;

// const goldMedal = require('../../assets/images/gold-badge.png');
// const silverMedal = require('../../assets/images/silver-badge.jpg');
// const bronzeMedal = require('../../assets/images/bronze-badge.webp');

// const LOCATIONS = [
//   { name: 'Batu Caves', image: require('../../assets/badges/badge-batu-caves.png') },
//   { name: 'Chin Swee Temple', image: require('../../assets/badges/chin swee temple.png') },
//   { name: 'Gunung Mulu National Park', image: require('../../assets/badges/Gunung Mulu.png') },
//   { name: 'Mount Kinabalu', image: require('../../assets/badges/Mount Kinabalu.png') },
//   { name: 'George Town', image: require('../../assets/badges/George Town.png') },
//   { name: 'Melaka Sultanate Palace Museum', image: require('../../assets/badges/Melaka Sultanate Palace Museum.png') },
//   { name: 'Niah National Park', image: require('../../assets/badges/Niah National Park.png') },
//   { name: 'Sultan Abdul Samad Building', image: require('../../assets/badges/Sultan Abdul Samad.png') },
//   { name: 'Lenggong Valley', image: require('../../assets/badges/Lenggong Valley.png') },
//   { name: 'Bukit Cina', image: require('../../assets/badges/Bukit Cina.png') },
// ];

// <<<<<<< HEAD
// export default function IndexPage() {
//   const [earnedBadgeNames, setEarnedBadgeNames] = useState([]);
// =======
// const allBadges = LOCATIONS.map((loc, index) => ({
//   ...loc,
//   earned: index < 4, 
// }));
// >>>>>>> 88fa0fe0275ba1aebc6f491061e93f7497ea6c1e

//   useEffect(() => {
//     const loadBadges = async () => {
//       const saved = await AsyncStorage.getItem('earnedBadges');
//       if (saved) {
//         setEarnedBadgeNames(JSON.parse(saved));
//       }
//     };
//     loadBadges();
//   }, []);

//   useEffect(() => {
//     const processBadgeFromURL = async () => {
//       if (Platform.OS === 'web') {
//         const url = new URL(window.location.href);
//         const badgeParam = url.searchParams.get('badge');

//         if (badgeParam) {
//           const badgeName = decodeURIComponent(badgeParam);
//           const saved = await AsyncStorage.getItem('earnedBadges');
//           let savedList = saved ? JSON.parse(saved) : [];

//           if (!savedList.includes(badgeName)) {
//             savedList.push(badgeName);
//             await AsyncStorage.setItem('earnedBadges', JSON.stringify(savedList));
//             setEarnedBadgeNames(savedList);
//             Alert.alert('🎉 Badge Unlocked!', `${badgeName}`);
//           } else {
//             setEarnedBadgeNames(savedList); // ensure state stays in sync
//           }
//         }
//       }
//     };

//     processBadgeFromURL();
//   }, []);

//   const handleResetBadges = async () => {
//     await AsyncStorage.removeItem('earnedBadges');
//     setEarnedBadgeNames([]);
//     Alert.alert('Reset Complete', 'All badges have been cleared.');
//   };

//   // const allBadges = LOCATIONS.map(loc => ({
//   //   ...loc,
//   //   earned: earnedBadgeNames.includes(loc.name),
//   // }));

//   const progress = allBadges.filter(b => b.earned).length / allBadges.length;

//   let medalImage = bronzeMedal;
//   if (progress >= 0.8) medalImage = goldMedal;
//   else if (progress >= 0.5) medalImage = silverMedal;

//   return (
//     <View style={styles.container}>
//       {/* Small Hidden Reset Button */}
//       <TouchableOpacity style={styles.hiddenReset} onPress={handleResetBadges}>
//         <Text style={styles.hiddenResetText}>🔄</Text>
//       </TouchableOpacity>

//       <Text style={styles.title}>🏅 Your Heritage Badges</Text>

//       <View style={styles.medalContainer}>
//         <Image source={medalImage} style={styles.medalImage} resizeMode="contain" />
//       </View>

//       <View style={styles.progressContainer}>
//         <View style={styles.progressBarBackground}>
//           <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
//         </View>
//         <Text style={styles.progressText}>{Math.round(progress * 100)}% Complete</Text>
//       </View>

//       <FlatList
//         contentContainerStyle={styles.badgeGrid}
//         data={allBadges}
//         numColumns={3}
//         keyExtractor={(item) => item.name}
//         renderItem={({ item }) => (
//           <View style={styles.badgeCircle}>
//             <Image
//               source={item.image}
//               style={[
//                 styles.badgeImage,
//                 !item.earned && styles.unobtainedBadgeImage,
//               ]}
//               resizeMode="contain"
//             />
//             <Text style={styles.badgeLabel}>{item.name}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1, paddingTop: 60, backgroundColor: '#eaf2ff', paddingHorizontal: 16,
//   },
//   title: {
//     fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 10,
//   },
//   medalContainer: { alignItems: 'center', marginBottom: 10 },
//   medalImage: { width: 50, height: 50 },
//   progressContainer: { marginBottom: 20, alignItems: 'center' },
//   progressBarBackground: {
//     width: SCREEN_WIDTH - 60, height: 20, backgroundColor: '#e0e0e0', borderRadius: 10, overflow: 'hidden',
//   },
//   progressBarFill: {
//     height: '100%', backgroundColor: '#007aff',
//   },
//   progressText: { marginTop: 6, fontWeight: 'bold' },
//   badgeGrid: { alignItems: 'center' },
//   badgeCircle: { margin: 10, alignItems: 'center', width: 100 },
//   badgeImage: { width: 80, height: 80 },
//   unobtainedBadgeImage: { opacity: 0.3 },
//   badgeLabel: { fontSize: 12, textAlign: 'center', marginTop: 4 },

//   hiddenReset: {
//     position: 'absolute',
//     top: 10,
//     right: 10,
//     padding: 4,
//     opacity: 0.2,
//   },
//   hiddenResetText: {
//     fontSize: 16,
//     color: '#555',
//   },
// });
