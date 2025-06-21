import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function ChatbotScreen() {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hi there! I’m your Malaysian travel buddy 🇲🇾. JOMExplore!',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    scrollRef.current?.scrollToEnd({ animated: true });

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer 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',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-r1-0528:free',
          messages: [
            {
              role: 'system',
              content:
                'You are a helpful and friendly Malaysian travel assistant. Help tourists plan fun, safe, and exciting itineraries, and know Malaysia Heritag well. Keep answers short and only reply with a table format when appropriate.',
            },
            ...newMessages.map((msg) => ({
              role: msg.sender === 'user' ? 'user' : 'assistant',
              content: msg.text,
            })),
          ],
        }),
      });

      const data = await response.json();
      const botText = data.choices?.[0]?.message?.content?.trim();

      if (botText) {
        setMessages((prev) => [...prev, { sender: 'bot', text: botText }]);
      } else {
        setMessages((prev) => [...prev, { sender: 'bot', text: 'Sorry, I couldn’t find an answer right now.' }]);
      }
    } catch (error) {
      console.error('API error:', error);
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Something went wrong. Please try again later.' }]);
    } finally {
      setLoading(false);
      scrollRef.current?.scrollToEnd({ animated: true });
    }
  };

  const renderMessage = (msg: { sender: string; text: string }, index: number) => {
    const isBot = msg.sender === 'bot';
    const isMarkdownTable = msg.text.includes('|') && msg.text.includes('---');

    if (isBot && isMarkdownTable) {
      const lines = msg.text
        .split('\n')
        .filter((line) => line.trim().startsWith('|') && line.includes('|'));

      const rows = lines.map((line) =>
        line
          .split('|')
          .map((cell) => cell.trim())
          .filter((cell) => cell !== '')
      );

      const header = rows[0];
      const dataRows = rows.slice(1).filter((row) => !row[0].includes('-'));

      return (
        <View
          key={index}
          style={{
            alignSelf: 'flex-start',
            backgroundColor: '#e5e5ea',
            padding: 10,
            borderRadius: 16,
            marginBottom: 10,
            maxWidth: '100%',
          }}
        >
          <Text style={{ fontWeight: 'bold', marginBottom: 6 }}>🗓 Itinerary:</Text>

          {/* Header Row */}
          <View style={{ flexDirection: 'row', marginBottom: 6 }}>
            {header.map((cell, i) => (
              <Text
                key={i}
                style={{
                  flex: 1,
                  fontWeight: '700',
                  color: '#000',
                }}
              >
                {cell}
              </Text>
            ))}
          </View>

          {/* Data Rows */}
          {dataRows.map((row, rowIndex) => (
            <View
              key={rowIndex}
              style={{
                flexDirection: 'row',
                marginBottom: 4,
                alignItems: 'flex-start',
              }}
            >
              {row.map((cell, colIndex) => (
                <Text
                  key={colIndex}
                  style={{
                    flex: 1,
                    color: '#333',
                  }}
                >
                  {cell}
                </Text>
              ))}
            </View>
          ))}
        </View>
      );
    }

    // Default chat bubble
    return (
      <View
        key={index}
        style={{
          alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
          backgroundColor: msg.sender === 'user' ? '#007aff' : '#e5e5ea',
          padding: 10,
          borderRadius: 16,
          marginBottom: 10,
          maxWidth: '80%',
        }}
      >
        <Text style={{ color: msg.sender === 'user' ? 'white' : 'black' }}>
          {msg.text.replace(/\\/g, '').replace(/[*_`\\]/g, '')}
        </Text>
      </View>
    );
  };

  return (
<SafeAreaView style={{ flex: 1, backgroundColor: '#f9f9f9' }}>
  <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 60}
  >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        ref={scrollRef}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ padding: 16, paddingBottom: 160 }}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((msg, index) => renderMessage(msg, index))}
        {loading && (
          <View 
          style={{
            alignSelf: 'flex-start',
            padding: 10,
            borderRadius: 16,
            backgroundColor: '#e5e5ea',
            marginBottom: 10,
          }}>
            <ActivityIndicator size="small" color="#333" />
          </View>
        )}
      </ScrollView>
    </TouchableWithoutFeedback>

            <View
  style={{
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 100, // Increased from 20 to 100 to move above footer
    backgroundColor: '#fff',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 6,
  }}
>      
<TextInput
        placeholder="Ask about your Malaysia trip..."
        value={input}
        onChangeText={setInput}
        onSubmitEditing={sendMessage}
        multiline
        blurOnSubmit={false}
    style={{
      flex: 1,
      minHeight: 40,
      maxHeight: 100,
      borderRadius: 20,
      paddingHorizontal: 16,
      backgroundColor: '#f0f0f0',
      paddingTop: 10,
      paddingBottom: 10,
    }}      
    />
      <Pressable onPress={sendMessage} style={{ marginLeft: 10 }}>
        <Ionicons name="send" size={24} color="#007aff" />
      </Pressable>
    </View>
  </KeyboardAvoidingView>
</SafeAreaView>
  );
}