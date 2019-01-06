import React from "react";
import Untangle from "./untangle";

export default function (mount) {
	return {
		heading: "TT Games",
		items: [
			{
				heading: "Untangle",
				onPress: _ => mount(<Untangle />)
			}
		]
	}
}

 