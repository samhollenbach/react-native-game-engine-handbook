import React from "react";
import Untangle from "./untangle";
import AirHockey from "./hockey";

export default function (mount) {
	return {
		heading: "TT Games",
		items: [
			{
				heading: "Untangle",
				onPress: _ => mount(<Untangle />)
			},
			{
				heading: "Air Hockey",
				onPress: _ => mount(<AirHockey />)
			}
		]
	}
}

 