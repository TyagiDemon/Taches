import { useState, useEffect } from "react";
import {
	StyleSheet,
	View,
	Text,
	StatusBar,
	KeyboardAvoidingView,
	Platform,
	TextInput,
	TouchableOpacity,
	Keyboard,
	ScrollView,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Task from "./components/Task";

const styles = StyleSheet.create({
	container: {
		paddingTop: StatusBar.currentHeight,
		backgroundColor: "#EEF2FF",
	},
	view: {
		width: "100%",
	},
	button: {
		backgroundColor: "#676FA3",
	},
});
export default function App() {
	const [taskList, setTaskList] = useState([]);
	const [task, setTask] = useState("");

	const handlePressAdd = () => {
		if (!task) {
			return;
		}
		Keyboard.dismiss();

		setTaskList([...taskList, task]);
		setTask(null);
	};

	const handlePressDelete = (prop) => {
		setTaskList(taskList.filter((item, index) => index != prop));
	};

	useEffect(async () => {
		const list = await AsyncStorage.getItem("taskList");

		if (list) {
			setTaskList(JSON.parse(list));
		}
	}, []);

	useEffect(async () => {
		await AsyncStorage.setItem("taskList", JSON.stringify(taskList));
	}, [taskList]);

	return (
		<View style={[tw`flex-1`, styles.container]}>
			<View style={[tw`h-full flex-1`]}>
				<Text style={[tw`text-2xl font-bold px-4 py-2 text-white bg-blue-900`]}>
					All Tasks
				</Text>
				<ScrollView style={[tw`flex`]}>
					{taskList.length > 0 ? (
						taskList.map((item, index) => (
							<TouchableOpacity
								key={index}
								onPress={() => handlePressDelete(index)}
							>
								<Task task={item} />
							</TouchableOpacity>
						))
					) : (
						<Text style={[tw`mx-auto text-xl mt-8 text-gray-400`, {}]}>
							Add a task to get started!
						</Text>
					)}
					<Text style={[tw`text-sm italic mx-auto text-gray-400 my-4`]}>
						Tip: Press + to add task and click on task to delete!
					</Text>
				</ScrollView>
			</View>

			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={[
					tw`flex flex-row justify-between z-50 bg-blue-300 p-4 items-center`,
				]}
			>
				<TextInput
					placeholder="Add task"
					style={[tw`bg-white flex-1 text-gray-800 p-2 rounded-lg mr-6`]}
					value={task}
					onChangeText={setTask}
				/>
				<TouchableOpacity
					style={[
						tw`h-10 w-10 rounded-full flex justify-center items-center`,
						styles.button,
					]}
					onPress={() => handlePressAdd()}
				>
					<View>
						<Text style={[tw`text-white text-2xl`]}>+</Text>
					</View>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		</View>
	);
}
