import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Animated, ScrollView, FlatList, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { themeColors } from '../theme';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');
const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.65;
const ios = Platform.OS == 'ios';

const Loading = () => (
  <View style={styles.loadingContainer}>
    <Text style={styles.paragraph}>Loading...</Text>
  </View>
);
const hardcodedData = [
  {
    key: '1',
    title: 'GDSC',
    description: 'Description',
    poster: 'https://i.postimg.cc/7Gxz6p6s/gdsc.jpg',
    backdrop: 'https://i.postimg.cc/C1Vgf0G2/21.png',
    release_date: '20 September 2023',
  },
  {
    key: '2',
    title: 'CSI',
    description: 'Description', 
    poster: 'https://i.postimg.cc/WdkgfGCn/csi.jpg',
    backdrop: 'https://i.postimg.cc/MHBDhkMy/24.png',
    release_date: '22 September 2023',
  },
  {
    key: '3',
    title: 'IBF',
    description: 'Description',
    poster: 'https://i.postimg.cc/vg3V63xQ/ibf.jpg',
    backdrop: 'https://i.postimg.cc/5t8wm5zt/19.png',
    release_date: '25 September 2023',
  },
];

const Backdrop = ({ movies, scrollX }) => {
  return (
    <View style={{ height: BACKDROP_HEIGHT, width, position: 'absolute' }}>
      <FlatList
        data={movies.reverse()}
        keyExtractor={(item) => item.key + '-backdrop'}
        removeClippedSubviews={false}
        contentContainerStyle={{ width, height: BACKDROP_HEIGHT }}
        renderItem={({ item, index }) => {
          if (!item.backdrop) {
            return null;
          }
          const translateX = scrollX.interpolate({
            inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
            outputRange: [0, width],
            // extrapolate:'clamp'
          });
          return (
            <Animated.View
              removeClippedSubviews={false}
              style={{
                position: 'absolute',
                width: translateX,
                height,
                overflow: 'hidden',
              }}
            >
              <Image
                source={{ uri: item.backdrop }}
                style={{
                  width,
                  height: BACKDROP_HEIGHT,
                  position: 'absolute',
                }}
              />
            </Animated.View>
          );
        }}
      />
      <View className={'flex-row'} style={{marginTop: 45, position: 'absolute',paddingHorizontal: 15,backgroundColor: 'rgba(255,255,255,0.9)',borderRadius: 50, alignSelf: 'center' }}>
        <Image source={require('../assets/logos/bennett_logo.png')} className={'h-9 w-9 p-1'} style={{marginVertical: 5}}/>
        <Text style={{ alignSelf: 'center',padding: 9, fontSize: 20, fontWeight: 'bold', color: 'black'}}>Upcoming Events</Text>
      </View>
      <LinearGradient
        colors={['rgba(0, 0, 0, 0)', 'white']}
        style={{
          height: BACKDROP_HEIGHT,
          width,
          position: 'absolute',
          bottom: 0,
        }}
      />
    </View>
  );
};

export default function App() {
  const [events, setEvents] = useState([]);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    axios.get('http://10.0.2.2:5000/get_data')
      .then(response => {
        if (response.data && Array.isArray(response.data)) {
          const eventData = response.data.map((event, index) => ({
            key: index.toString(),
            title: event.event_name,
            description: event.event_description,
            poster: event.poster_image,
            backdrop: event.cover_image,
          }));
          setEvents([{ key: 'empty-left' }, ...eventData, { key: 'empty-right' }]);
        } else {
          console.log('No data found in response');
        }
      })
      .catch(error => {
        console.log('Error fetching data:', error);
      });
  }, []);

  const renderEventCard = ({ item }) => {
    if (!item.poster) {
      return <View style={{ width: EMPTY_ITEM_SIZE }} />;
    }

    const inputRange = [
      (parseInt(item.key) - 2) * ITEM_SIZE,
      (parseInt(item.key) - 1) * ITEM_SIZE,
      parseInt(item.key) * ITEM_SIZE,
    ];

    const translateY = scrollX.interpolate({
      inputRange,
      outputRange: [100, 50, 100],
      extrapolate: 'clamp',
    });

    return (
      <View style={{ width: ITEM_SIZE }}>
        <Animated.View
          style={{
            marginHorizontal: SPACING,
            padding: SPACING * 2,
            alignItems: 'center',
            transform: [{ translateY }],
            backgroundColor: 'white',
            marginBottom: 80,
            borderRadius: 34,

          }}
        >
          <Image source={{ uri: item.poster }} style={styles.posterImage} />
              <Text style={{ fontSize: 24,marginTop: 20 }} numberOfLines={1}>
                    {item.title}
              </Text>
              <Text style={{ fontSize: 12, marginTop: 15 }} numberOfLines={3}>
                    {item.description}
              </Text>
        </Animated.View>
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Backdrop movies={events} scrollX={scrollX} />
        <StatusBar />
        <Animated.FlatList
          showsHorizontalScrollIndicator={false}
          data={events}
          keyExtractor={(item) => item.key}
          horizontal
          bounces={false}
          decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
          renderToHardwareTextureAndroid
          contentContainerStyle={{ alignItems: 'center' }}
          snapToInterval={ITEM_SIZE}
          snapToAlignment='start'
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: false,
          })}
          scrollEventThrottle={16}
          renderItem={renderEventCard}
        />
      </View>

      <View>
      <Text style={{ fontSize: 30, fontWeight: 'bold', color: themeColors.textNeutral,marginBottom: 15,marginStart: 16 }}>PostBox</Text>
      <FlatList
        data={hardcodedData}
        keyExtractor={item=> item.key}
        horizontal={true}
        renderItem={({ item }) => 
        <View style={{backgroundColor: 'white', height: 170,width: width*0.8, marginStart: 30, borderRadius: 30, marginBottom: 25}}>
        <View className={'flex-row items-center'}>
        <Image  
          source={require('../assets/logos/mobilon.png')}
          style={{
            marginHorizontal: 20,
            marginTop: 20,
            width:50,
            height:50,
            borderRadius: 60,
            borderWidth: 1,
            borderColor: 'black',
            backgroundColor: 'white'}}>
        </Image>
        <Text style={{fontSize: 15, fontWeight: 'bold'}}>{item.title}</Text>
        </View>
  
        <Text style={{marginHorizontal: 20, marginTop: 20}} numberOfLines={2}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
        </Text>
         
      </View>
        }>

      </FlatList>
      
    <View>
      <Text style={{ fontSize: 30, fontWeight: 'bold', color: themeColors.textNeutral,marginBottom: 15,marginStart: 16 }}>Dean of SCSET</Text>
    </View>
    
    <View style={{alignItems: 'center', marginBottom : 30}}>
      <Image source={require('../assets/dean_pic.webp')} style={{height: 150, width: 150,borderRadius: 20}}></Image>
      <Text style={{marginTop: 10, fontWeight: 'bold', fontSize: 15}}>Prof. (Dr.) Abhay Bansal</Text> 
    </View>
    
    <View className={'flex-row'}>
    <View style={{backgroundColor: 'white', height: 200,width: width*0.40,marginHorizontal: 20, borderRadius: 30, marginBottom: 25}}>
      <View className={'flex-row items-center'}></View>
    </View>
    <View style={{backgroundColor: 'white', height: 200,width: width*0.4,marginHorizontal: 20, borderRadius: 30, marginBottom: 25}}>
      <View className={'flex-row items-center'}></View>
    </View>
    </View>      

    </View> 
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 0,
    height: height,
  },
  posterImage: {
    width: '100%',
    height: ITEM_SIZE * 1.2,
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
});
