import React from "react";
import { Dimensions } from "react-native";
import Matter from "matter-js";

export const engine = Matter.Engine.create({ enableSleeping: false });
export const world = engine.world;

export const { width, height } = Dimensions.get("window");
export const puckSize = Math.trunc(Math.max(width, height) * 0.075);
export const paddleSize = Math.trunc(Math.max(width, height) * 0.1);

export const floorSize = Math.trunc(width * 0.06);
export const wallSize = Math.trunc(width * 0.06);
export const wallExtended = wallSize * 10;

export const goalSize = Math.trunc(width * 0.3);

export const wallRest = 0.5;
export const paddleRest = 0.4;


export const CONSTRAIN_PADDLE = false;