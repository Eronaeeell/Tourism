import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const PostScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Post Screen</Text>
    </View>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  }
});
