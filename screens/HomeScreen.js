import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Animated, ScrollView, FlatList, TouchableOpacity, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
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
    title: 'Exploring the ICP',
    description: "Discover the Internet Computer Protocol (ICP) and its groundbreaking influence on the internet. Engage in hands-on learning to explore ICP's diverse applications. As a bonus, receive 100 rupees worth of ICP tokens, making this event a must-attend for tech enthusiasts and innovators, offering a chance to influence the internet's future.",
    poster: 'https://instagram.fdel72-1.fna.fbcdn.net/v/t51.2885-15/376860745_7064389703591629_5285187086017684065_n.webp?stp=dst-jpg_e35&_nc_ht=instagram.fdel72-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=i-xEy55S5r4AX8kWlep&edm=ACWDqb8BAAAA&ccb=7-5&ig_cache_key=MzE4ODM2MjUyNzQ0ODUzOTI3MQ%3D%3D.2-ccb7-5&oh=00_AfCDYp1PMjhFmqzSozXDXzgeJ7BarbnZB9QM25jv0d-elQ&oe=651739B8&_nc_sid=ee9879',
    backdrop: 'https://instagram.fdel72-1.fna.fbcdn.net/v/t51.2885-15/376860745_7064389703591629_5285187086017684065_n.webp?stp=dst-jpg_e35&_nc_ht=instagram.fdel72-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=i-xEy55S5r4AX8kWlep&edm=ACWDqb8BAAAA&ccb=7-5&ig_cache_key=MzE4ODM2MjUyNzQ0ODUzOTI3MQ%3D%3D.2-ccb7-5&oh=00_AfCDYp1PMjhFmqzSozXDXzgeJ7BarbnZB9QM25jv0d-elQ&oe=651739B8&_nc_sid=ee9879',
    release_date: '12 September 2023',
  },
  {
    key: '2',
    title: 'Hack your Profile',
    description: "Get ready to embark on an exciting journey into the world of web development as HYPE, a hands-on program, kicks off on 12th September 2023. During this workshop, you'll have the opportunity to learn the ins and outs of creating and managing your very own portfolio website.", 
    poster: 'https://instagram.fdel72-1.fna.fbcdn.net/v/t51.2885-15/373612223_323345150088620_6622840979533480652_n.heic?stp=dst-jpg_e35&_nc_ht=instagram.fdel72-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=FJzjbEJ_f2MAX9mfDTl&edm=ACWDqb8BAAAA&ccb=7-5&ig_cache_key=MzE4MzU4OTI1ODc3ODQ5NjUxMw%3D%3D.2-ccb7-5&oh=00_AfDCyAheF8fmd5pFWaF0jh3bQz5eJF1u7jkSThvMLxY-sw&oe=6516F1B9&_nc_sid=ee9879',
    backdrop: 'https://instagram.fdel72-1.fna.fbcdn.net/v/t51.2885-15/373612223_323345150088620_6622840979533480652_n.heic?stp=dst-jpg_e35&_nc_ht=instagram.fdel72-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=FJzjbEJ_f2MAX9mfDTl&edm=ACWDqb8BAAAA&ccb=7-5&ig_cache_key=MzE4MzU4OTI1ODc3ODQ5NjUxMw%3D%3D.2-ccb7-5&oh=00_AfDCyAheF8fmd5pFWaF0jh3bQz5eJF1u7jkSThvMLxY-sw&oe=6516F1B9&_nc_sid=ee9879',
    release_date: '22 September 2023',
  },
  {
    key: '3',
    title: 'Info Session',
    description: "This event mostly focuses on first-year students, and it aims to educate about - What is GDSC, - our vision for the tenure, - how to get started with coding as an absolute beginner, - Get a chance to interact with our senior mentors. - Win some stickers and get early access to junior core team forms.",
    poster: 'https://instagram.fdel72-1.fna.fbcdn.net/v/t51.2885-15/377263021_331984496000541_2030354148840462498_n.heic?stp=dst-jpg_e35&_nc_ht=instagram.fdel72-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=ZJkE0UISI3UAX8vA2IE&edm=ACWDqb8BAAAA&ccb=7-5&ig_cache_key=MzE5MDM1NTk0NTMxODIxNjM4NA%3D%3D.2-ccb7-5&oh=00_AfBLp7fGVPl9noVHCSVbeTkrwE6GqPudY48GyyB_DzJvag&oe=65166835&_nc_sid=ee9879',
    backdrop: "https://instagram.fdel72-1.fna.fbcdn.net/v/t51.2885-15/377263021_331984496000541_2030354148840462498_n.heic?stp=dst-jpg_e35&_nc_ht=instagram.fdel72-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=ZJkE0UISI3UAX8vA2IE&edm=ACWDqb8BAAAA&ccb=7-5&ig_cache_key=MzE5MDM1NTk0NTMxODIxNjM4NA%3D%3D.2-ccb7-5&oh=00_AfBLp7fGVPl9noVHCSVbeTkrwE6GqPudY48GyyB_DzJvag&oe=65166835&_nc_sid=ee9879",
    release_date: '14 September 2023',
  },
];

const hardcodedData1 = [
  {
    key: '1',
    title: 'Mobilon',
    img: require('../assets/logos/mobilon.png'),
    description: "Discover the Internet Computer Protocol (ICP) and its groundbreaking influence on the internet. Engage in hands-on learning to explore ICP's diverse applications. As a bonus, receive 100 rupees worth of ICP tokens, making this event a must-attend for tech enthusiasts and innovators, offering a chance to influence the internet's future.",
  },
  {
    key: '2',
    title: 'Geeks for Geeks',
    img: require('../assets/logos/gfg.png'),
    description: "Get ready to embark on an exciting journey into the world of web development as HYPE, a hands-on program, kicks off on 12th September 2023. During this workshop, you'll have the opportunity to learn the ins and outs of creating and managing your very own portfolio website.", 
  },
  {
    key: '3',
    title: 'IEEE',
    img: require('../assets/logos/ieee.png'),
    description: "This event mostly focuses on first-year students, and it aims to educate about - What is GDSC, - our vision for the tenure, - how to get started with coding as an absolute beginner, - Get a chance to interact with our senior mentors. - Win some stickers and get early access to junior core team forms.",
  },
  {
    key: '4',
    title: 'Google Developer Student Club',
    img: require('../assets/logos/GDSC.png'),
    description: "This event mostly focuses on first-year students, and it aims to educate about - What is GDSC, - our vision for the tenure, - how to get started with coding as an absolute beginner, - Get a chance to interact with our senior mentors. - Win some stickers and get early access to junior core team forms.",
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
            extrapolate:'clamp'
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
                source={{ uri: item.poster }}
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
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const eventData = hardcodedData.map((event, index) => ({
      key: index.toString(),
      title: event.title,
      description: event.description,
      poster: event.poster,
      backdrop: event.backdrop,
    }));
    setEvents([{ key: 'empty-left' }, ...eventData, { key: 'empty-right' }]);
  }, []);

  const renderEventCard = ({ item, index }) => {
    if (!item.poster) {
      return <View style={{ width: EMPTY_ITEM_SIZE }} />;
    }

    const inputRange = [
      (index - 2) * ITEM_SIZE,
      (index - 1) * ITEM_SIZE,
      index * ITEM_SIZE,
 
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
          <Text style={{ fontSize: 24, marginTop: 20 }} numberOfLines={1}>
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
      <Text style={{ fontSize: 30, fontWeight: 'bold', color: themeColors.textNeutral,marginBottom: 15,marginStart: 16 }}>Announcements</Text>
      <FlatList
        data={hardcodedData1}
        keyExtractor={item=> item.key}
        horizontal={true}
        renderItem={({ item }) => 
        <View style={{backgroundColor: 'white', height: 170,width: width*0.8, marginStart: 30, borderRadius: 30, marginBottom: 25}}>
        <View className={'flex-row items-center'}>
        <Image  
          source={item.img}
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
  
        <Text style={{marginHorizontal: 20, marginTop: 20}} numberOfLines={2}>{item.description}
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
