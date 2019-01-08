import React, { Component } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { StaggeredMotion, spring } from "react-motion";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const BODY_DIAMETER = Math.trunc(Math.max(WIDTH, HEIGHT) * 0.07);
const BORDER_WIDTH = Math.trunc(BODY_DIAMETER * 0.1);
// const COLORS = ["#86E9BE", "#8DE986", "#B8E986", "#E9E986"];
// const BORDER_COLORS = ["#C0F3DD", "#C4F6C0", "#E5FCCD", "#FCFDC1"];

export class NodeRenderer extends Component {

	render() {
		const x = this.props.state.x - BODY_DIAMETER / 2;
		const y = this.props.state.y - BODY_DIAMETER / 2;
		return (
			<View>
				<View style={[css.head, { left: x, top: y }]} />
			</View>
		);
	}
}

export default (props) => {

	this.state = {
		x: props.x,
		y: props.y,
	};

	return{
		state: state,
		type: "node",
		renderer: <NodeRenderer />
	}
}

const css = StyleSheet.create({
	head: {
		backgroundColor: "#FF5877",
		borderColor: "#FFC1C1",
		borderWidth: BORDER_WIDTH,
		width: BODY_DIAMETER,
		height: BODY_DIAMETER,
		position: "absolute",
		borderRadius: BODY_DIAMETER * 2
	}
});
