import React, { Component, PureComponent} from "react";
import { StyleSheet, Dimensions, StatusBar } from "react-native";
import { GameEngine } from "react-native-game-engine";
import {MoveFinger} from "./systems";

import Matter from "matter-js";
import { LevelOne } from "./level";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

Matter.Common.isElement = () => false; //-- Overriding this function because the original references HTMLElement


export default class Untangle extends PureComponent {
  constructor() { 
    super();

    var level = LevelOne();

    this.state = {
      level: level,
    };
  }

  render() {

    return (
      <GameEngine style={styles.container} 
        // onUpdate={this.onUpdate}
        systems={[MoveFinger]}
        entities={{
          ...this.state.level.entities
        }}
      >
        <StatusBar hidden={true} />

      </GameEngine>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  }
});

// AppRegistry.registerComponent("Untangle", () => Untangle);