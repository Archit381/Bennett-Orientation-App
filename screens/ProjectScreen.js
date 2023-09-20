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
    SafeAreaView,
  } from 'react-native';

  import data, {detailsList, iconsByType} from '../constants/data';
  import { SimpleLineIcons } from '@expo/vector-icons';
  import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
  import {Easing, Transition, Transitioning, elastic} from 'react-native-reanimated'
  import { StatusBar } from 'expo-status-bar';
  import { themeColors } from '../theme';
  import { useNavigation } from '@react-navigation/native'
  import { ArrowLeftCircleIcon} from 'react-native-heroicons/outline';
  import { Directions, FlingGestureHandler,State } from 'react-native-gesture-handler';
  import posed, {Transition as PoseTransition} from 'react-native-pose';

  const { width, height } = Dimensions.get('screen');
  const ios = Platform.OS == 'ios';

  const DURATION=700;
  const TITLE_SIZE=36;
  const SPACING = 80;
  const IMAGE_SIZE =width*0.8;

  const colors={
    lightBg: '#f2f2f2' ,
    darkBg: '#2c2d51' ,
    lightText: '#e5e5dd' ,
    darkText: '#a5a6aa' ,
  };

  const Item =({ children, style})=>{
    return(
      <View
        style={[
          {
            justifyContent: 'center',
            overflow: 'hidden',
            backgroundColor: 'transparent',
          },
          style,
        ]}>
        {children}
      </View>
    );
  };

  const Icon=({ type })=>{
    return(
      <SimpleLineIcons
        name={type}
        size={26}
        color='#A5A6AA'
        style={{marginRight: 15, height: 26}}
        >
      </SimpleLineIcons>
    );
  };

  const Description=({ index,text,color})=>{
    return(
      <Item>
        <Text key={`description-${index}`} style={{fontSize: 16,color}}>
          {text}
        </Text>
      </Item>
    )
  }

  const Title=({ index,text,color})=>{
    return(
      <Item style={{height: TITLE_SIZE*3, justifyContent: 'flex-end'}}>
        <Text 
          key={`title-${index}`} 
          style={{
            fontSize: TITLE_SIZE,
            fontWeight: '900',
            color,
            }}>
          {text}
        </Text>
      </Item>
    );
  };
  const Details=({color,index})=>{
    return(
      <View style={{marginVertical: SPACING}}>
        {detailsList.map((key)=>{
          return(
            <View
              key={key}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 25,
              }}>
            <Icon type={iconsByType[key]}></Icon>
            <Item style={{ flex:1,height: 26, justifyContent: 'center'}}>
                <Text
                  key={`${key}-${index}`}
                  style={{ fontSize: 16,color,fontWeight: '700'}}
                >
                  {data[index][key]}
                </Text>
            </Item>

            </View>
          ); 
        })}
      </View>
    );
  };

const tranisiton = (
  <Transition.Together>
    <Transition.Out type='slide-bottom' durationMs={DURATION} interpolation='easeIn'/>
    <Transition.Change/>
    <Transition.In type='slide-bottom' durationMs={DURATION} interpolation='easeOut'/>
  </Transition.Together>
);

const config={
  tranisiton:{
    type: 'tween',
    duration: DURATION,
    Easing:  Easing.elastic(0.9),
  }
};

const PosedView = posed.View ({
  enter: {opacity: 1, rotate: '0deg'},
  exit: {opacity: 0, rotate: '180deg'},
});


  export default gestureHandlerRootHOC(function App() {
    const [index, setIndex] = React.useState(0);
    const color = index % 2 === 1 ? colors.lightText : colors.darkText;
    const headingColor = index % 2 === 1 ? colors.lightText: colors.darkBg;
    const activeIndex=React.useRef(new Animated.Value(0)).current;
    const animation=React.useRef(new Animated.Value(0)).current;

    React.useEffect(()=>{
      Animated.timing(animation, {
        toValue: activeIndex,
        duration: DURATION*0.7,
        useNativeDriver: true,
      }).start();
    });


    const setActiveIndex =React.useCallback(newIndex =>{
      activeIndex.setValue(newIndex);
      ref.current.animateNextTransition();
      setIndex(newIndex);
    })

    const translateY = animation.interpolate({
      inputRange: [-1,0,1],
      outputRange: [height,0,-height] 
    })

    const ref = React.useRef();

    return (
      <FlingGestureHandler key='up' direction={Directions.UP} 
        onHandlerStateChange={(ev)=>{
        if(ev.nativeEvent.state === State.END){
          if ( index === data.length - 1){
            
            return;
          }
          setActiveIndex(index + 1); 
          
        }
      }}>
        <FlingGestureHandler key='down' direction={Directions.DOWN} 
        onHandlerStateChange={(ev)=>{
        if(ev.nativeEvent.state === State.END){
          if ( index === 0){
            
            return;
          }
          setActiveIndex(index - 1);
          
        }
      }}>

      <SafeAreaView style={styles.container}>
        <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          {height:  height*data.length, transform: [{translateY}]},
        ]}>
          {data.map((_,i)=>{
            return(
              <View
                key={i}
                style={{
                  height,
                  backgroundColor: i%2 === 0 ? colors.lightBg : colors.darkBg,
                }}>

              </View>
            );
          })}
          
        </Animated.View>
        <PoseTransition>
          {index % 2 === 0 ? <PosedView
            key='image0'
            style={{
              borderColor: index % 2 === 0 ? colors.darkBg :colors.lightBg
              }}>
            <Image source={data[index].image} style={{marginLeft: width*0.85,}}></Image>
          </PosedView> : <PosedView
            key='image1'
            style={{
              borderColor: index % 2 === 0 ? colors.darkBg :colors.lightBg
              }}>
            <Image source={data[index].image} style={{marginLeft: width*0.85}}></Image>
          </PosedView>}
        </PoseTransition>

        <Transitioning.View
          ref={ref}
          transition={tranisiton}
          style={{
            padding: 20,
            flex: 1,
            justifyContent: 'space-evenly',
            position: 'absolute'
          }}>

            <Title color={headingColor} index={index} text={data[index].title}></Title>
            <Details color={color} index={index}/>
            <Description
              index={index}
              text={data[index].description}
              color={headingColor}/>
        </Transitioning.View>
        
      </SafeAreaView>
      </FlingGestureHandler>
      </FlingGestureHandler>
    );
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
  });