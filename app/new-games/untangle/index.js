import React, { Component, PureComponent} from "react";
import { AppRegistry, StyleSheet, Dimensions, StatusBar } from "react-native";
import { GameEngine } from "react-native-game-engine";
import Node from "./node";
import Edge from "./edge";
import {MoveFinger} from "./systems";


import Matter from "matter-js";


const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const nNodes = 5;

Matter.Common.isElement = () => false; //-- Overriding this function because the original references HTMLElement


export default class Untangle extends PureComponent {
  constructor() { 
    super();

    var nodes = [];
    var edges = [];
    var entities = {}
    var i;
    for (i = 0; i < nNodes; i++){
      let x = Math.random() * (WIDTH * 0.7) + (WIDTH * 0.15);
      let y = Math.random() * (HEIGHT * 0.7) + (HEIGHT * 0.15);
      // var newNode = {x: x, y: y, renderer: <NodeRenderer />};
      var newNode = Node(x, y);
      nodes.push(newNode);
      entities[i] = nodes[i]
    }
    
    var e1 = Edge(nodes[0], nodes[1]);
    edges.push(e1);

    var j;
    for (j = 0; j < edges.length; j++){
      entities[nNodes + j] = edges[j]
    }

    this.state = {
      nodes: nodes,
      edges: edges,
      entities: entities
    };
  }

  // onUpdate = ({ touches }) => {
  //   let move = touches.find(x => x.type === "move");
  //   if (move) {
  //     this.setState({
  //       nodes: this.state.nodes,
  //       edges: this.state.edges
  //     });
  //   }
  // };



  render() {

    return (
      <GameEngine style={styles.container} 
        // onUpdate={this.onUpdate}
        systems={[MoveFinger]}
        entities={{
          ...this.state.entities
        }}
      
      >
        {/* <NodeRenderer x={100} y={100} /> */}
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