import React, { Component } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { StaggeredMotion, spring } from "react-motion";
import { Svg, Line } from 'react-native-svg';
import { WIDTH, HEIGHT, BODY_DIAMETER, BORDER_WIDTH } from "./config";

export default (node1, node2) => {

	return{
		type: "edge",
		node1: node1,
		node2: node2,
		intersects: true,
	}
}

const css = StyleSheet.create({
	edge: {
		backgroundColor: "#000000",
		borderWidth: 0,
		width: '100%',
		height: 1,
		margin: 0
	}
});
