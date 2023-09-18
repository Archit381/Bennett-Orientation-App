import React, { Component } from "react";
import { Platform, StyleSheet, View, Button } from "react-native";
import { AnimatedEmoji } from 'react-native-animated-emoji';

export default class App extends Component {

  defaultval = [1, 2];

  constructor(props) {
    super(props);

    // Disable warning message
    console.disableYellowBox = true;

    this.state = { emoji: this.defaultval, showEmojis: false }; // Add showEmojis state
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  showFloatingReaction = () => {
    let emojiCount = this.state.emoji.length;
    let numNewEmojis = 10; // Number of new emojis to add

    let newEmojis = [];
    for (let i = 0; i < numNewEmojis; i++) {
      newEmojis.push(emojiCount + i + 1);
    }

    let emojis = [...this.state.emoji, ...newEmojis];
    this.setState({ emoji: emojis, showEmojis: true }, () => {
      console.log(this.state.emoji);
    });
  };

  simulateButtonPress = () => {
    for (let i = 0; i < 3; i++) {
      setTimeout(this.showFloatingReaction, i * 100); // Delay each press by 1 second
    }
  };

  render() {
    let displayFloatingEmojiReaction = null; // Initialize as null

    if (this.state.showEmojis) { // Render AnimatedEmoji components only when showEmojis is true
      displayFloatingEmojiReaction = this.state.emoji.map((x, index) => (
        <AnimatedEmoji
          key={index}
          style={{ bottom: this.getRandomInt(10, 500), right: this.getRandomInt(0, 300) }} // Random horizontal and vertical positions
          name={'heart'}
          size={20}
          duration={3000}
          onAnimationCompleted={this.onAnimationCompleted}
        />
      ));
    }

    return (
      <View style={styles.container}>
        {displayFloatingEmojiReaction}
        <View style={{ position: 'absolute', width: '100%', bottom: 10, flex: 1, alignItems: 'center' }}>
          <Button
            onPress={this.simulateButtonPress}
            title="Click Me"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
