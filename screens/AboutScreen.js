import * as React from 'react';
import {
  Animated,
  Dimensions,
  Image,
  FlatList,
  Text,  
  View,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { themeColors } from '../theme';

const { width, height } = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.86;
const ITEM_HEIGHT = ITEM_WIDTH * 1.47;
const ios = Platform.OS == 'ios';

const data = [
  {
    key: '0',
    photo: 'https://i.postimg.cc/x1jFSKg6/1.png',
    text: 'Join our club and get to interact with Apple Representatives! Our club in collaboration with Apple, lets you attend exclusive workshops.',
  },
  {
    key: '1',
    photo: 'https://i.postimg.cc/Dz8jSn9s/2.png',
    text: "Join us for exclusive entry into the Mac Lab, your gateway to the world of Swift App Development! Don't miss out!",
  },
  {
    key: '2',
    photo: 'https://i.postimg.cc/tgwrP8bc/3.png',
    text: 'Show us your technical writing and creative writing skills. Gather experience by writing technical blogs and content for our apps.',
  },
  {
    key: '3',
    photo: 'https://i.postimg.cc/zGd2DVc8/4.png',
    text: 'Master the art of building projects from scratch and gain valuable professional experience that sets you apart from the crowd.',
  },
  {
    key: '4',
    photo: 'https://i.postimg.cc/cCG8ySGw/Kitchen-Kourier-1.png',
    text: "Kitchen Kourier: We've simplified student and food vendor tasks on campus with an app connecting you to any campus food vendor.",
  },
  {
    key: '5',
    photo: 'https://i.postimg.cc/wB4HCcLp/kav.png',
    text: 'Nischal: Finalist in Kavach 2023 Cybersecurity Hackathon with this AI-powered spam detection and personal chatbot app.',
  },
  {
    key: '6',
    photo: 'https://i.postimg.cc/htF00HYF/game-2.png',
    text: 'Cube Bounce: Experiment with technologies like Gaming, AR/VR, Blockchain and many more, creating full-stack apps.',
  },

];

export default function App() {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <StatusBar />
      <SafeAreaView style={ios ? { marginBottom: -8 } : {}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingTop: 15,
          }}
        >
          <Text style={{ fontSize: 40, fontWeight: 'bold', color: 'black' }}>
            More about us
          </Text>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL('https://chat.whatsapp.com/JcF7cYIX8GyAGsz98SYVjF')
            }
          >
            <Image
              source={require('../assets/images/joinBTN.png')}
              style={{
                borderRadius: 30,
                width: 80,
                height: 50,
                // tintColor: themeColors.bggray,
              }}
            />
          </TouchableOpacity>
        </View>
        <Animated.FlatList
          data={data}
          keyExtractor={(item) => item.key}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          renderItem={({ item, index }) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];
            const translateX = scrollX.interpolate({
              inputRange,
              outputRange: [-width * 0.7, 0, width * 0.7],
            });
            return (
              <View style={{ width, justifyContent: 'center', alignItems: 'center' }}>
                <View
                  style={{
                    borderRadius: 18,
                    borderWidth: 10,
                    borderColor: 'transparent',
                    
                    borderRadius: 18,
                    padding: 12,
                    backgroundColor: 'transparent',
                  }}
                >
                  <View
                    style={{
                      width: ITEM_WIDTH,
                      height: ITEM_HEIGHT,
                      overflow: 'hidden',
                      alignItems: 'center',
                      borderRadius: 14,
                    }}
                  >
                    <Animated.Image
                      source={{ uri: item.photo }}
                      style={{
                        width: ITEM_WIDTH * 1.4,
                        height: ITEM_HEIGHT,
                        resizeMode: 'cover',
                        transform: [
                          {
                            translateX,
                          },
                        ],
                      }}
                    />
                  </View>
                  <Text style={{ fontSize: 18, marginTop: 10, alignContent: 'center', fontWeight: 'bold' }}>
                    {item.text}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },
});