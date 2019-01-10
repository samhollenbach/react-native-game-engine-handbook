import React, { Component, PureComponent } from "react";
import { StyleSheet, StatusBar, Dimensions, Text} from "react-native";
import { GameEngine } from "react-native-game-engine";
import { userScore, oppScore, Physics, MovePaddle, CheckScore } from "./systems";
import { Box, Circle } from "./renderers";
import Matter from "matter-js";
import { View } from "react-native-animatable";

import { engine, world, width, height, puckSize, paddleSize, floorSize, wallSize, wallExtended, wallRest, paddleRest, goalSize} from "./config";

export default class AirHockey extends Component {
  constructor() {
    super();

    world.gravity.x = 0;
    world.gravity.y = 0;

    const puck = Matter.Bodies.circle(width / 2, height / 2, puckSize/2, { frictionAir: 0.01, restitution: 0.8});

    const paddleUser = Matter.Bodies.circle(width / 2, height - (paddleSize * 1.5), paddleSize/2, {restitution: paddleRest});

    const paddleOpp = Matter.Bodies.circle(width / 2, paddleSize * 1.5, paddleSize/2, {restitution: paddleRest});

    const floorLeft = Matter.Bodies.rectangle(
      -goalSize/2, height - floorSize / 2 + wallExtended/2, width, floorSize + wallExtended, { isStatic: true, restitution: wallRest });

    const floorRight = Matter.Bodies.rectangle(
      width + goalSize/2, height - floorSize / 2 + wallExtended/2, width, floorSize + wallExtended, { isStatic: true, restitution: wallRest });

    const ceilLeft = Matter.Bodies.rectangle(
      -goalSize/2, floorSize/2 - wallExtended/2, width, floorSize + wallExtended, { isStatic: true, restitution: wallRest });

    const ceilRight = Matter.Bodies.rectangle(
      width + goalSize/2, floorSize/2 - wallExtended/2, width, floorSize + wallExtended, { isStatic: true, restitution: wallRest });

    const leftWall = Matter.Bodies.rectangle(
      wallSize/2 - wallExtended/2, height/2, wallSize + wallExtended, height, { isStatic: true, restitution: wallRest });

    const rightWall = Matter.Bodies.rectangle(
      width - wallSize/2 + wallExtended/2, height/2, wallSize + wallExtended, height, { isStatic: true, restitution: wallRest});

    const constraint = Matter.Constraint.create({
      label: "Drag Constraint",
      pointA: { x: paddleUser.position.x, y: paddleUser.position.y },
      pointB: { x: 0, y: 0 },
      bodyB: paddleUser,
      length: 0.01,
      stiffness: 1,
      angularStiffness: 1
    });

    const stateVars = {
      puck: puck,
      floorLeft: floorLeft,
      floorRight: floorRight, 
      ceilLeft: ceilLeft, 
      ceilRight: ceilRight,
      leftWall: leftWall, 
      rightWall: rightWall, 
      paddleUser: paddleUser, 
      paddleOpp: paddleOpp,
      constraint: constraint
    };

    const bodies = [puck, floorLeft, floorRight, ceilLeft, ceilRight, leftWall, rightWall, paddleUser, paddleOpp];

    Matter.World.add(world, bodies);
    Matter.World.addConstraint(world, constraint);

    this.state = stateVars;

  }   
  

  render() {

    return (
      <View style={styles.bg}>
      <View style={styles.midLine}/>
      <View style={styles.midCircle}/>

      <GameEngine
        systems={[Physics, MovePaddle, CheckScore]}
        entities={{
          game: this, 
          physics: { engine: engine, world: world, constraint: this.state.constraint},
          puck: { body: this.state.puck, size: [puckSize, puckSize], color: "black", renderer: Circle },
          paddleUser: { body: this.state.paddleUser, size: [paddleSize, paddleSize], color: "red", renderer: Circle },
          paddleOpp: { body: this.state.paddleOpp, size: [paddleSize, paddleSize], color: "blue", renderer: Circle },
          floorLeft: { body: this.state.floorLeft, size: [width, floorSize + wallExtended], color: "grey", renderer: Box },
          floorRight: { body: this.state.floorRight, size: [width, floorSize + wallExtended], color: "grey", renderer: Box },
          ceilLeft: { body: this.state.ceilLeft, size: [width, floorSize + wallExtended], color: "grey", renderer: Box },
          ceilRight: { body: this.state.ceilRight, size: [width, floorSize + wallExtended], color: "grey", renderer: Box },
          leftWall: { body: this.state.leftWall, size: [wallSize + wallExtended, height], color: "grey", renderer: Box },
          rightWall: { body: this.state.rightWall, size: [wallSize + wallExtended, height], color: "grey", renderer: Box }
        }}
      >

        <StatusBar hidden={true} />
        
        <Text style={styles.scoreboard}>Blue: {oppScore()} - Red: {userScore()}</Text>
      </GameEngine>
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: 'white'
  },
  midLine: {
    position: "absolute",
    left: 0,
    top: height/2 - 1,
    height: 3,
    width: width,
    backgroundColor: 'red'

  },
  midCircle: {
    position: "absolute",
    left: width/2 - width/8,
    top: height/2 - width/8,
    height: width/4,
    width: width/4,
    backgroundColor: 'transparent',
    borderWidth: 3,
    borderRadius: width/8,
    borderColor: 'red'
  },
  scoreboard: {
    textAlign: "right",
    marginTop: 2,
    marginRight: 10,
    fontSize: 16,
    backgroundColor: "transparent"
  }
});