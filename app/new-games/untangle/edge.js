import React, { Component } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { StaggeredMotion, spring } from "react-motion";
import { Svg, Line } from 'react-native-svg';

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const BODY_DIAMETER = Math.trunc(Math.max(WIDTH, HEIGHT) * 0.07);
const BORDER_WIDTH = Math.trunc(BODY_DIAMETER * 0.1);

export class EdgeRenderer extends Component {

	render() {
		const n1X = parseInt(this.props.node1.state.x);
		const n1Y = parseInt(this.props.node1.state.y);
		const n2X = parseInt(this.props.node2.state.x);
		const n2Y = parseInt(this.props.node2.state.y);
		const distX = parseInt(n2X - n1X);
		const distY = parseInt(n2Y - n1Y);

		return (
			<View>
				<Svg
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
				</Svg>

			</View>
		);
	}
}

// function lineDistance(x, y, x0, y0){
//     return Math.sqrt((x -= x0) * x + (y -= y0) * y);
// };

// function getLine(n1, n2) {
// 	var n1x = n1.x;
// 	var n1y = n1.y;
// 	var n2x = n2.x;
// 	var n2y = n2.y;
// 	var distX = n2x - n1x;
// 	var distY = n2y - n1y;
// 	var angle = Math.atan2(distY, distX) * 180 / Math.PI;
// 	var distance = lineDistance(n1x, n1y, n2x, n2y);

// 	var lx;
// 	var ly;
// 	if (n2x < n1x){
// 		lx = n2x;
// 		ly = n1y;
// 	}else{
// 		lx = n1x;
// 		ly = n1y;
		
// 	}

// 	var dy = distY/2;
// 	ly += dy;

// 	if (n2y < n1y){
// 		lx += dy;
		
// 	}else{
// 		lx -= dy;
		
// 	}


	
// 	// ly += distY/2;

// 	return {transform: [{rotate: + angle + 'deg'}, {translateX: 0}, {translateY: 0}], width: distance, position: 'absolute', left: lx, top: ly, }
// }

export default (node1, node2) => {

	return{
		type: "edge",
		node1: node1,
		node2: node2,
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
