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
  ImageBackground,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native'
import { ArrowLeftCircleIcon} from 'react-native-heroicons/outline';

const { width, height } = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.86;

const ITEM_HEIGHT = ITEM_WIDTH * 1.47;
const ios = Platform.OS == 'ios';

const data = [
  {
    logo: require('../assets/logos/GDSC.png'),
    photo: require('../assets/gdsc.jpg'),
    text: 'Event Info',
    accent: '#f4db7b',
  },
  {
    logo: require('../assets/logos/CSI.png'),
    photo: require('../assets/csi.jpg'),
    text: "Event Info",
    accent: '#183883',
  },
  {
    logo: require('../assets/logos/wie.png'),
    photo: require('../assets/wie.jpg'),
    text: 'Event Info',
    accent: '#75308b',
  },
  {
    logo: require('../assets/logos/ibf.png'),
    photo: require('../assets/ibf.jpg'),
    text: 'Event Info',
    accent: '#012251',
  },
];

export default function App() {
  const scrollY = React.useRef(new Animated.Value(1)).current;
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
            backgroundColor: 'white',
          }}
        >
          <Text style={{ fontSize: 35, fontWeight: 'bold', color: 'black' }}>
            Upcoming Events
          </Text>
          <TouchableOpacity className=" rounded-full " onPress={()=> navigation.goBack()}>
            <ArrowLeftCircleIcon size="50" strokeWidth={1.2} color="black" />
          </TouchableOpacity>
        </View>
        <Animated.FlatList
          data={data}
          keyExtractor={(item) => item.key}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          backgroundColor='white'
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
                    width: ITEM_WIDTH*1.07,
                    // height: ITEM_HEIGHT,
                    borderRadius: 18,
                    borderWidth: 5,
                    // borderColor: item.accent,
                    borderColor: 'black',
                    // marginBottom: 10,
                    borderRadius: 18,
                    padding: 7,
                    marginBottom: 10,
                    backgroundColor: 'white',
                  }}
                >
                  <View
                    style={{
                      width: ITEM_WIDTH,
                      height: ITEM_HEIGHT,
                      // marginHorizontal: 17,
                      overflow: 'hidden',
                      alignItems: 'center',
                      borderRadius: 14,
                      // backgroundColor: 'white',
                    }}
                  >
                    <Animated.Image
                      source={item.photo }
                      style={{
                        width: ITEM_WIDTH ,
                        height: ITEM_HEIGHT,
                        resizeMode: 'cover',
                        // backgroundColor: 'white',
                        transform: [
                          {
                            translateX,
                          },
                        ],
                      }}
                    />
                       
                  </View >
                  <Image 
                      source={item.logo}
                      style={{
                        width:40,
                        height:40,
                        borderRadius: 60,
                        borderWidth: 3,
                        // borderColor: item.accent,
                        borderColor: 'black',
                        backgroundColor: 'white',
                        position: 'absolute',
                        bottom: -25,
                        right: 60,
            
                      }}>
                  </Image>
                  
                  
                  
                  <Text style={{ fontSize: 15, marginTop: 10,textAlign: 'justify', alignContent: 'center'}}>
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
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});