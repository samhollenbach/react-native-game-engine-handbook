import _ from "lodash";
import { Box } from "./renderers";
import Matter from "matter-js";

import {world, width, height, wallSize, floorSize, paddleSize, puckSize, CONSTRAIN_PADDLE} from "./config";

let scoreUser = 0;
let scoreOpp = 0;

const userScore = () => {
    return scoreUser;
}

const oppScore = () => {
    return scoreOpp;
}



const Physics = (state, { touches, time }) => {
	let engine = state["physics"].engine;

	Matter.Engine.update(engine, time.delta);

	return state;
};

const MovePaddle = (state, { touches }) => {
	let constraint = state["physics"].constraint;

	// //-- Handle start touch
	// let start = touches.find(x => x.type === "start");

	// if (start) {
	// 	let startPos = [start.event.pageX, start.event.pageY];

	// 	let boxId = Object.keys(state).find(key => {
	// 		let body = state[key].body;

	// 		return (
	// 			body &&
	// 			distance([body.position.x, body.position.y], startPos) < 25
	// 		);
	// 	});

	// 	if (boxId) {
	// 		constraint.pointA = { x: startPos[0], y: startPos[1] };
	// 		constraint.bodyB = state[boxId].body;
	// 		constraint.pointB = { x: 0, y: 0 };
	// 		constraint.angleB = state[boxId].body.angle;
	// 	}
	// }

	//-- Handle move touch
	let move = touches.find(x => x.type === "move");

	if (move) {

        if (move.event.pageX >= wallSize + paddleSize/2
            && move.event.pageX <= width - wallSize - paddleSize/2){

            constraint.pointA.x = move.event.pageX;
        }

        var h = floorSize;
        if (CONSTRAIN_PADDLE){
            h = height / 2;
        }
        if (move.event.pageY >= h + paddleSize/2
            && move.event.pageY <= height - floorSize - paddleSize/2){

            constraint.pointA.y = move.event.pageY;   
        }

    }
    


	// //-- Handle end touch
	// let end = touches.find(x => x.type === "end");

	// if (end) {
	// 	constraint.pointA = null;
	// 	constraint.bodyB = null;
	// 	constraint.pointB = null;
	// }

	return state;
};


const CheckScore = (entities) => {

    if (entities.puck.body.position.y <= 0){
        var newPuck = Matter.Bodies.circle(width / 2, height / 2, puckSize/2, { frictionAir: 0.01, restitution: 0.8});
        entities.puck.body = newPuck;
        Matter.World.add(world, [newPuck]);
        scoreUser++;
        entities.game.forceUpdate();

    }else if(entities.puck.body.position.y >= height){
        var newPuck = Matter.Bodies.circle(width / 2, height / 2, puckSize/2, { frictionAir: 0.01, restitution: 0.8});
        entities.puck.body = newPuck;
        Matter.World.add(world, [newPuck]);
        scoreOpp++;
        entities.game.forceUpdate();
    }

    
    

    return entities;


}


export { Physics, MovePaddle, CheckScore, userScore, oppScore};