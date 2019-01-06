import React, { Component } from "react";
import { StyleSheet, Dimensions, StatusBar } from "react-native";
import { GameLoop } from "react-native-game-engine";
import Node from "./node";
import Edge from "./edge";

import Matter from "matter-js";


const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const nNodes = 5;

Matter.Common.isElement = () => false; //-- Overriding this function because the original references HTMLElement


export default class Untangle extends Component {
  constructor() {
    super();

    var nodes = [];
    var edges = [];



    var i;
    for (i = 0; i < nNodes; i++){
      let newNode = Node()
      nodes.push()

    }


    this.state = {
      nodes: nodes,
      edges: edges
    };
  }

  onUpdate = ({ touches }) => {
    let move = touches.find(x => x.type === "move");
    if (move) {
      this.setState({
        nodes: this.state.nodes,
        edges: this.state.edges
      });
    }
  };

  render() {
    return (
      <GameLoop style={styles.container} onUpdate={this.onUpdate}>

        <StatusBar hidden={true} />

        <Worm {...this.state} />

      </GameLoop>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  }
});
