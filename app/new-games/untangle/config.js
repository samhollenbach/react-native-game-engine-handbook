
import React, { PureComponent } from "react";
import { StyleSheet, View, Dimensions } from "react-native";

export const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

export const BODY_DIAMETER = Math.trunc(Math.max(WIDTH, HEIGHT) * 0.07);
export const BODY_RAD = BODY_DIAMETER / 2;
export const BORDER_WIDTH = Math.trunc(BODY_DIAMETER * 0.1);