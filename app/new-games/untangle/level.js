import React from "react";
import { Dimensions } from "react-native";
import Node from "./node";
import Edge from "./edge";
import {CheckIntersectEntitesOnly} from "./systems";


const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const nNodes = 8;

export const LevelOne = (game) => {
    
    var nodes = [];
    var edges = [];
    var entities = {}
    var i;
    for (i = 0; i < nNodes; i++){
      let x = Math.random() * (WIDTH * 0.7) + (WIDTH * 0.15);
      let y = Math.random() * (HEIGHT * 0.7) + (HEIGHT * 0.15);
      var newNode = Node({x: x, y: y});
      nodes.push(newNode);
      entities[i] = nodes[i];
    }
    
    var e1 = Edge(nodes[0], nodes[1]);
    var e2 = Edge(nodes[2], nodes[3]);
    var e3 = Edge(nodes[1], nodes[3]);
    var e4 = Edge(nodes[1], nodes[2]);
    var e5 = Edge(nodes[4], nodes[3]);
    edges.push(e1);
    edges.push(e2);
    edges.push(e3);
    edges.push(e4);
    edges.push(e5);


    for (var j = 0; j < edges.length; j++){
      entities[nNodes + j] = edges[j];
    }

    CheckIntersectEntitesOnly(entities);

    return {
        game: game,
        nodes: nodes,
        edges: edges,
        entities: entities,
        completed: false
    }

}