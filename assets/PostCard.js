import { useState } from "react";
import { Button, Image, Modal, Text, TouchableOpacity, View } from "react-native";

const PostCard = ({ post }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ borderBottomWidth: 1, padding: 10 }}>
      <Text style={{ fontWeight: "bold" }}>{post.user || "Tourist"}</Text>
      <Text>{post.content}</Text>

      {post.badge && (
        <>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image source={post.badge.image} style={{ width: 60, height: 60, marginTop: 10 }} />
          </TouchableOpacity>
          <Modal visible={modalVisible} transparent animationType="slide">
            <View style={{ marginTop: 100, backgroundColor: "#fff", padding: 20 }}>
              <Text style={{ fontWeight: "bold" }}>{post.badge.location}</Text>
              <Text>{post.badge.story}</Text>
              <Button title="Close" onPress={() => setModalVisible(false)} />
            </View>
          </Modal>
        </>
      )}
    </View>
  );
};

export default PostCard;
