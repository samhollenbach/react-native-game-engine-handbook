import React, { Component, PureComponent} from "react";
import { StyleSheet, Dimensions, StatusBar, View, Text } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { MoveFinger, CheckIntersect, renderEdges, UpdateGame} from "./systems";
import { Svg, Line } from 'react-native-svg';
import { WIDTH, HEIGHT } from "./config";
import { LevelOne } from "./level";

export default class Untangle extends PureComponent {
  constructor() { 
    super();

    var level = LevelOne(this);

    this.state = {
      level: level,
    };
  }

  getDisplayText(){
    if (this.state.level.completed){
      return "Success!";
    }
    return "Untangle the edges..";
  }


  render() {

    return (
      <View style={styles.bg}>
      <Svg
        key={'svg'}
        width={WIDTH} 
        height={HEIGHT}
      >
        {renderEdges(this.state.level.edges)}

        <GameEngine style={styles.container} 
          systems={[MoveFinger, CheckIntersect, UpdateGame]}
          entities={{
            'untangle': {type: "game", game: this},
            ...this.state.level.entities
          }}
        >

          <StatusBar hidden={true} />

          <Text style={styles.statusText}>{this.getDisplayText()}</Text>

        </GameEngine>
      </Svg>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent"
  },
  bg: {
    backgroundColor: "#87CEFA"
  },
  statusText: {
    textAlign: "center",
    marginTop: 5,
    fontSize: 24

  }
});