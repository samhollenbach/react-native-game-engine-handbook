import React, { PureComponent } from "react";
import { StyleSheet, StatusBar, Dimensions } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { Physics, MovePaddle } from "./systems";
import { Box, Circle } from "./renderers";
import Matter from "matter-js";
import { View } from "react-native-animatable";

import { width, height, puckSize, paddleSize, floorSize, wallSize, wallRest, paddleRest} from "./config";

export default class AirHockey extends PureComponent {
  constructor() {
    super();
  }

  render() {

    const engine = Matter.Engine.create({ enableSleeping: false });
    const world = engine.world;
    world.gravity.x = 0;
    world.gravity.y = 0;

    const wallExtended = wallSize * 5;

    const puck = Matter.Bodies.circle(width / 2, height / 2, puckSize/2, { frictionAir: 0.01, restitution: 0.8});

    const paddleUser = Matter.Bodies.circle(width / 2, height - (paddleSize * 1.5), paddleSize/2, {restitution: paddleRest});

    const paddleOpp = Matter.Bodies.circle(width / 2, paddleSize * 1.5, paddleSize/2, {restitution: paddleRest});
    
    const floor = Matter.Bodies.rectangle(
      width / 2, height - floorSize / 2 + wallExtended/2, width, floorSize + wallExtended, { isStatic: true, restitution: wallRest });

    const ceil = Matter.Bodies.rectangle(
      width / 2, floorSize/2 - wallExtended/2, width, floorSize + wallExtended, { isStatic: true, restitution: wallRest });

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

    Matter.World.add(world, [puck, floor, ceil, leftWall, rightWall, paddleUser, paddleOpp]);
    Matter.World.addConstraint(world, constraint);

    return (
      <View style={styles.bg}>
      <GameEngine
        systems={[Physics, MovePaddle]}
        entities={{
          physics: { engine: engine, world: world, constraint: constraint },
          puck: { body: puck, size: [puckSize, puckSize], color: "black", renderer: Circle },
          paddleUser: { body: paddleUser, size: [paddleSize, paddleSize], color: "red", renderer: Circle },
          paddleOpp: { body: paddleOpp, size: [paddleSize, paddleSize], color: "blue", renderer: Circle },
          floor: { body: floor, size: [width, floorSize + wallExtended], color: "grey", renderer: Box },
          ceil: { body: ceil, size: [width, floorSize + wallExtended], color: "grey", renderer: Box },
          leftWall: { body: leftWall, size: [wallSize + wallExtended, height], color: "grey", renderer: Box },
          rightWall: { body: rightWall, size: [wallSize + wallExtended, height], color: "grey", renderer: Box }
        }}
      >

        <StatusBar hidden={true} />

      </GameEngine>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: 'white'
  }
});