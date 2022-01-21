import { StyleSheet, View, Text } from "react-native";
import tw from "tailwind-react-native-classnames";

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#CDDEFF",
		width: "90%",
	},
	square: {
		backgroundColor: "#676FA3",
	},
	ring: {
		borderColor: "#676FA3",
		// borderWidth: 2,
	},
	content: {
		maxWidth: "80%",
	},
	text: {
		// color: "#676FA3",
	},
});

function Task(props) {
	return (
		<View
			style={[
				tw`flex flex-row my-2 py-4 px-4 items-center justify-between rounded-lg mx-auto`,
				styles.container,
			]}
		>
			<View style={[tw`h-4 w-4 rounded-sm`, styles.square]}></View>
			<View style={[tw`flex-1 ml-2 text-red-700`, styles.content]}>
				<Text style={[tw`text-gray-600`, styles.text]}>{props.task}</Text>
			</View>
			<View style={[tw`h-4 w-4 rounded-full bg-green-500`, styles.ring]}></View>
		</View>
	);
}

export default Task;
