import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';

type Location = {
  name: string;
  query: string;
  description: string;
  longDescription: string;
  image: any;
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

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = Math.min(160, SCREEN_WIDTH * 0.5);
const CARD_CONTAINER_HEIGHT = 175;

const MapScreen: React.FC = () => {
  const [selected, setSelected] = useState<Location>(LOCATIONS[0]);
  const [hoveredLocation, setHoveredLocation] = useState<Location | null>(null);
  const [hoverBoxPosition, setHoverBoxPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const flatListRef = useRef<FlatList>(null);
  const cardRefs = useRef<Record<string, any>>({});
  const [fadeAnim] = useState(new Animated.Value(0));

  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyAxL0a_KsN7iTGqnjxqCDkLxENyUBhZT4I&q=${encodeURIComponent(selected.query)}`;

  const handleMouseEnter = (item: Location) => {
    const cardEl = cardRefs.current[item.name];
    if (cardEl) {
      const rect = cardEl.getBoundingClientRect();
      fadeAnim.stopAnimation(() => {
        fadeAnim.setValue(0);
        setHoverBoxPosition({
          x: rect.left + rect.width / 2 - 110,
          y: rect.top - 60,
        });
        setHoveredLocation(item);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    }
  };

  const handleMouseLeave = () => {
    fadeAnim.stopAnimation(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setHoveredLocation(null);
      });
    });
  };

  const scrollBy = (direction: 'left' | 'right') => {
    if (flatListRef.current) {
      const offset = (flatListRef.current as any)._listRef._scrollMetrics.offset;
      flatListRef.current.scrollToOffset({
        offset: direction === 'left'
          ? Math.max(0, offset - CARD_WIDTH - 10)
          : offset + CARD_WIDTH + 10,
        animated: true,
      });
    }
  };

  const HoverableWrapper = ({ children, item }: { children: React.ReactNode; item: Location }) => {
    if (Platform.OS === 'web') {
      return (
        <div
          ref={(el) => { cardRefs.current[item.name] = el }}
          onMouseEnter={() => handleMouseEnter(item)}
          onMouseLeave={handleMouseLeave}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {children}
        </div>
      );
    } else {
      return <View>{children}</View>;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', position: 'relative' }}>
      <View style={{ flex: 1 }}>
        {Platform.OS === 'web' ? (
          <iframe
            src={mapUrl}
            style={{ width: '100%', height: '100%', border: 0 }}
            allowFullScreen
          />
        ) : (
          <WebView source={{ uri: mapUrl }} style={{ flex: 1 }} />
        )}
      </View>

      {hoveredLocation && (
        <Animated.View
          style={[
            styles.floatingBox,
            {
              position: 'fixed',
              top: hoverBoxPosition.y,
              left: hoverBoxPosition.x,
              opacity: fadeAnim,
            }
          ]}
        >
          <Text style={styles.floatingBoxTitle}>{hoveredLocation.name}</Text>
          <Text style={styles.floatingBoxText}>{hoveredLocation.longDescription}</Text>
        </Animated.View>
      )}

      <View style={[styles.cardContainer, { marginBottom: 100 }]}>
        <TouchableOpacity style={styles.scrollButton} onPress={() => scrollBy('left')}>
          <Text style={styles.scrollButtonText}>{'<'}</Text>
        </TouchableOpacity>

        <FlatList
          ref={flatListRef}
          data={LOCATIONS}
          keyExtractor={(item) => item.name}
          horizontal
          contentContainerStyle={{ paddingHorizontal: 5 }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <HoverableWrapper item={item}>
              <TouchableOpacity
                style={[
                  styles.card,
                  { width: CARD_WIDTH },
                  selected.name === item.name ? { backgroundColor: '#add8e6' } : { backgroundColor: '#f0f0f0' }
                ]}
                onPress={() => setSelected(item)}
              >
                <Image source={item.image} style={styles.image} />
                <View style={{ paddingHorizontal: 4 }}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Text style={styles.cardDesc}>{item.description}</Text>
                </View>
              </TouchableOpacity>
            </HoverableWrapper>
          )}

        />

        <TouchableOpacity style={styles.scrollButton} onPress={() => scrollBy('right')}>
          <Text style={styles.scrollButtonText}>{'>'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: CARD_CONTAINER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginHorizontal: 25,
    overflow: 'hidden',
    padding: 10,
    height: 140,
    justifyContent: 'space-between',
    paddingBottom: 50,
  },
  image: {
    width: '100%',
    height: 70,
    borderRadius: 4,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 2,
  },
  cardDesc: {
    fontSize: 10,
    color: '#555',
  },
  scrollButton: {
    width: 30,
    height: 30,
    backgroundColor: '#007bff',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  scrollButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  floatingBox: {
    width: 220,
    backgroundColor: '#fff',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    zIndex: 9999,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  floatingBoxTitle: {
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 4,
  },
  floatingBoxText: {
    fontSize: 10,
    color: '#333',
  },
});

export default MapScreen;
