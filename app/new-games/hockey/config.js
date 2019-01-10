
import React from "react";
import { Dimensions } from "react-native";

export const { width, height } = Dimensions.get("window");
export const puckSize = Math.trunc(Math.max(width, height) * 0.075);
export const paddleSize = Math.trunc(Math.max(width, height) * 0.1);

export const floorSize = Math.trunc(width * 0.05);
export const wallSize = Math.trunc(width * 0.05);

export const wallRest = 0.5;
export const paddleRest = 0.4;