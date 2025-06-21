import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const users = [
  { rank: 1, name: 'Alicia', avatar: 'https://i.pravatar.cc/100?img=1', badges: 15 },
  { rank: 2, name: 'Ben', avatar: 'https://i.pravatar.cc/100?img=2', badges: 13 },
  { rank: 3, name: 'Charlie', avatar: 'https://i.pravatar.cc/100?img=3', badges: 12 },
  { rank: 4, name: 'Dina', avatar: 'https://i.pravatar.cc/100?img=4', badges: 11 },
  { rank: 5, name: 'Ethan', avatar: 'https://i.pravatar.cc/100?img=5', badges: 10 },
  { rank: 6, name: 'Fiona', avatar: 'https://i.pravatar.cc/100?img=6', badges: 9 },
  { rank: 7, name: 'George', avatar: 'https://i.pravatar.cc/100?img=7', badges: 8 },
  { rank: 8, name: 'Hannah', avatar: 'https://i.pravatar.cc/100?img=8', badges: 7 },
  { rank: 9, name: 'Ivan', avatar: 'https://i.pravatar.cc/100?img=9', badges: 6 },
  { rank: 10, name: 'Jenny', avatar: 'https://i.pravatar.cc/100?img=10', badges: 5 },
];

export default function LeaderboardScreen() {
  const top1 = users[0];
  const top2 = users[1];
  const top3 = users[2];
  const rest = users.slice(3);

  const getTopAvatarStyle = (size: number, shadowColor: string) => ({
    width: size,
    height: size,
    borderRadius: size / 2,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 8,
    shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 6,
  });

  const getMedalColor = (rank: number) => {
    switch (rank) {
      case 1: return '#FFD700'; // Gold
      case 2: return '#C0C0C0'; // Silver
      case 3: return '#CD7F32'; // Bronze
      default: return '#60A5FA'; // Blue
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎮 Leaderboard Arena</Text>
      <View style={styles.topThreeContainer}>
        <View style={styles.topUser}>
          <Image source={{ uri: top2.avatar }} style={getTopAvatarStyle(70, '#C0C0C0')} />
          <Text style={[styles.topName, { color: getMedalColor(2) }]}>🥈 {top2.name}</Text>
          <Text style={styles.badgeInfo}>🏅 {top2.badges} pts</Text>
          <Text style={styles.rewardLabel}>🎁 Token of appreciation</Text>
        </View>

        <View style={styles.topUser}>
          <Image source={{ uri: top1.avatar }} style={getTopAvatarStyle(90, '#FFD700')} />
          <Text style={[styles.topName, { color: getMedalColor(1) }]}>👑 {top1.name}</Text>
          <Text style={styles.badgeInfo}>🏅 {top1.badges} pts</Text>
          <Text style={styles.rewardLabel}>🏆 Experience Wau</Text>
        </View>

        <View style={styles.topUser}>
          <Image source={{ uri: top3.avatar }} style={getTopAvatarStyle(70, '#CD7F32')} />
          <Text style={[styles.topName, { color: getMedalColor(3) }]}>🥉 {top3.name}</Text>
          <Text style={styles.badgeInfo}>🏅 {top3.badges} pts</Text>
          <Text style={styles.rewardLabel}>🎁 Token of appreciation</Text>
        </View>
      </View>

      <FlatList
        data={rest}
        keyExtractor={(item) => item.rank.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.rankNumber}>{item.rank}</Text>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
            </View>
            <View style={[styles.badgePill, { backgroundColor: getMedalColor(item.rank) }]}>
              <Text style={styles.badgePillText}>🏅 {item.badges}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <View style={{ height: 80 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaf2ff',
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    alignSelf: 'center',
    marginBottom: 24,
    color: '#1E3A8A',
  },
  topThreeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
    alignItems: 'flex-end',
  },
  topUser: {
    alignItems: 'center',
  },
  topName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
  },
  badgeInfo: {
    fontSize: 13,
    color: '#1E40AF',
  },
  rewardLabel: {
    fontSize: 12,
    marginTop: 4,
    color: '#1D4ED8',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#aaa',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  rankNumber: {
    width: 28,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1E3A8A',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 12,
    borderWidth: 2,
    borderColor: '#60A5FA',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E3A8A',
  },
  badgePill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgePillText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fff',
  },
});