import Node from "./node";
import React from "react";
import { WIDTH, HEIGHT, BODY_RAD } from "./config";
import { Svg, Line } from 'react-native-svg';
import Untangle from "./index";



const renderEdges = (edges) => {

    let svg = [];
    let edgeRenders = [];

    for(var i = 0; i < edges.length; i++){
      var element = edges[i];
      const n1X = parseInt(element.node1.state.x);
      const n1Y = parseInt(element.node1.state.y);
      const n2X = parseInt(element.node2.state.x);
      const n2Y = parseInt(element.node2.state.y);

      var strokeColor = "black";
      if (element.intersects){
          strokeColor = "red";
      }
  
      var key = 'line' + i;
      let line = (<Line
        key={key}
        x1={n1X} 
        y1={n1Y} 
        x2={n2X}  
        y2={n2Y} 
        stroke={strokeColor}
        strokeWidth="2"
      ></Line>);

      edgeRenders.push(line);
    }

    svg.push(
      <Svg
        key={'svg'}
        width={WIDTH} 
        height={HEIGHT}
      >{edgeRenders}</Svg>);

    return edgeRenders;
  }

const UpdateGame = (entities) => {
    
    var completed = true;    
    Object.keys(entities).forEach(function(k){
        if (entities[k].type === "edge" && entities[k].intersects){ 
            completed = false;
        }
    });
    entities.untangle.game.state.level.completed = completed;
    entities.untangle.game.forceUpdate();
    return entities;
}

var movingNode;
const MoveFinger = (entities, { touches }) => {
  
    touches.filter(t => t.type === "move").forEach(t => {
        for (var key in entities) {
            if (entities.hasOwnProperty(key)){

                if (entities[key].type == "node"){
                    var x = entities[key].state.x;
                    var y = entities[key].state.y;
    
                    if (movingNode == null && 
                        (t.event.pageX >= (x - BODY_RAD) && t.event.pageX <= (x + BODY_RAD)) && 
                        (t.event.pageY >= (y - BODY_RAD) && t.event.pageY <= (y + BODY_RAD))){
                        movingNode = key;                
                    }
                }         
            }
        }
        if (movingNode != null && entities[movingNode].type == "node"){
            entities[movingNode].state.x += t.delta.pageX;
            entities[movingNode].state.y += t.delta.pageY;
        }
    });

    touches.filter(t => t.type === "end").forEach(t => {
        movingNode = null;
    });
  
    return entities;
};


const EdgeChecker = (Edge1, Edge2) => {

    var x1 = Edge1.node1.state.x;
    var y1 = Edge1.node1.state.y;
    var x2 = Edge1.node2.state.x;
    var y2 = Edge1.node2.state.y;
    var x3 = Edge2.node1.state.x;
    var y3 = Edge2.node1.state.y;
    var x4 = Edge2.node2.state.x;
    var y4 = Edge2.node2.state.y;

    var inter = true;

    if (Edge1.node1 === Edge2.node1 || Edge1.node1 === Edge2.node2 ||
        Edge1.node2 === Edge2.node1 || Edge1.node2 === Edge2.node2){
            
        var s1 = 0;
        var s2 = 0;
        if (x4 != x3){
            s1 = Math.atan((y4 - y3) / (x4 - x3))
        }
        if (x1 != x2){
            s2 = Math.atan((y2 - y1) / (x2 - x1));
        }

        if (Math.abs(s1 - s2) < 0.03) {
            Edge1.intersects = true;
            Edge2.intersects = true;
        }
        return;
    }

    if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
        return;
    }

    denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))
    
    // Lines are parallel
    if (denominator === 0) {
        return;
    }

    let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
    let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator

    // is the intersection along the segments
    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
        return;
    }

    // // Return a object with the x and y coordinates of the intersection
    // let x = x1 + ua * (x2 - x1)
    // let y = y1 + ua * (y2 - y1)

    if (inter){
        Edge1.intersects = inter;
        Edge2.intersects = inter;
    }
}

const CheckIntersectEntitesOnly = (entities) => {

    var edges = [];
    Object.keys(entities).forEach(function(k){
        if (entities[k].type === "edge"){ 
            entities[k].intersects = false;
            edges.push(entities[k]);
        }
    });
    var edgeCombos = [];
    for (var i = 0; i < Object.keys(edges).length-1; i++){    
        for (var j = i+1; j < Object.keys(edges).length; j++){
            edgeCombos.push({'e1': edges[i], 'e2': edges[j]});
        }
    }

    edgeCombos.forEach(function(element){
        EdgeChecker(element.e1, element.e2);
    });

    return entities;
}

const CheckIntersect = (entities, {touches}) => {
    touches.filter(t => t.type === "move").forEach(t => {
        CheckIntersectEntitesOnly(entities);
    });
    return entities;
}
  
export { UpdateGame, MoveFinger, CheckIntersect, CheckIntersectEntitesOnly, renderEdges};