import React, { Component } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { StaggeredMotion, spring } from "react-motion";
import { Svg, Line } from 'react-native-svg';

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const BODY_DIAMETER = Math.trunc(Math.max(WIDTH, HEIGHT) * 0.07);
const BORDER_WIDTH = Math.trunc(BODY_DIAMETER * 0.1);

export class EdgeRenderer extends Component {


	render() {
		// const n1X = parseInt(this.props.node1.state.x);
		// const n1Y = parseInt(this.props.node1.state.y);
		// const n2X = parseInt(this.props.node2.state.x);
		// const n2Y = parseInt(this.props.node2.state.y);

		// var vb = 0 + " " + 0 + " " + WIDTH + " " + HEIGHT;

		// console.log(this);

		return (
			<View>
				{/* <Svg
					width={WIDTH} 
					height={HEIGHT}
				>
					<Line
						x1={n1X} 
						y1={n1Y} 
						x2={n2X}  
						y2={n2Y} 
						stroke="black"
						strokeWidth="2"
					/>
				</Svg> */}
			</View>
		);
	}
}


export default (node1, node2) => {

	return{
		type: "edge",
		node1: node1,
		node2: node2,
		intersects: true,
		renderer: <EdgeRenderer />
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
