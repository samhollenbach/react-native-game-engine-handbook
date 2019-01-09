import React, { Component, PureComponent} from "react";
import { StyleSheet, Dimensions, StatusBar, View } from "react-native";
import { GameEngine } from "react-native-game-engine";
import {MoveFinger, CheckIntersect, renderEdges, UpdateGame} from "./systems";
import { Svg, Line } from 'react-native-svg';

import Matter from "matter-js";
import { LevelOne } from "./level";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

Matter.Common.isElement = () => false; //-- Overriding this function because the original references HTMLElement


export default class Untangle extends PureComponent {
  constructor() { 
    super();

    var level = LevelOne(this);

    this.state = {
      level: level,
    };
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
            'untangle': {game: this},
            ...this.state.level.entities
          }}
        >

          <StatusBar hidden={true} />

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
  }
});

// AppRegistry.registerComponent("Untangle", () => Untangle);