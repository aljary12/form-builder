import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { ScrollView } from 'react-native-gesture-handler';
import CheckBoxInput from '../components/CheckBoxInput';
import { Form, FormTypeEnum, RootStackParamList } from '../types';

interface SetupScreenProps {
	navigation: StackNavigationProp<RootStackParamList>;
	route: RouteProp<RootStackParamList, 'SetupScreen'>;
}

const FormType = [
	{
		label: 'Text',
		value: FormTypeEnum.TEXT,
		icon: () => <MaterialCommunityIcons name='text' size={18} color='#900' />,
	},
	{
		label: 'Number',
		value: FormTypeEnum.NUMBER,
		icon: () => <MaterialCommunityIcons name='numeric' size={18} color='#900' />,
	},
	{
		label: 'Boolean',
		value: FormTypeEnum.BOOLEAN,
		icon: () => <MaterialCommunityIcons name='toggle-switch-off-outline' size={18} color='#900' />,
	},
	{
		label: 'Check Box',
		value: FormTypeEnum.CHECKBOX,
		icon: () => <MaterialCommunityIcons name='checkbox-marked-outline' size={18} color='#900' />,
	},
];

const SetupScreen: React.FC<SetupScreenProps> = ({ navigation }) => {
	const [form, setForm] = React.useState<Form[]>([{ title: '', type: FormTypeEnum.TEXT }]);
	const [space, setSpace] = React.useState<number>(0);

	const handleOpen = (index: number) => {
		if (index === form.length - 1) {
			setSpace(162);
		} else if (index === form.length - 2) {
			setSpace(45);
		}
	};

	const handleClose = () => {
		setSpace(0);
	};

	const addForm = () => {
		setForm((prev) => [...prev, { title: '', type: FormTypeEnum.TEXT }]);
	};

	const deleteForm = (formIndex: number) => {
		setForm((prev) => prev.filter((_, i) => i != formIndex));
	};

	const addOptions = (formIndex: number) => {
		setForm((form) =>
			form.map((f, fi) =>
				fi === formIndex
					? { ...f, error: undefined, options: f.options ? [...f.options, ''] : [''] }
					: f
			)
		);
	};

	const removeOptions = (formIndex: number, optionIndex: number) => {
		setForm((form) =>
			form.map((f, fi) =>
				fi === formIndex
					? { ...f, error: undefined, options: f.options?.filter((o, oi) => oi !== optionIndex) }
					: f
			)
		);
	};

	const handleOptions = (options: string, formIndex: number, optionIndex: number) => {
		setForm((form) =>
			form.map((f, fi) =>
				fi === formIndex
					? {
							...f,
							error: undefined,
							options: f.options?.map((o, oi) => (oi === optionIndex ? options : o)),
					  }
					: f
			)
		);
	};

	const handleTitle = (title: string, formIndex: number) => {
		setForm((form) =>
			form.map((f, fi) => (fi === formIndex ? { ...f, title, error: undefined } : f))
		);
	};

	const handleType = (type: FormTypeEnum, formIndex: number) => {
		setForm((form) =>
			form.map((f, fi) => (fi === formIndex ? { ...f, type, error: undefined } : f))
		);
	};

	const next = async () => {
		let counter = 0;

		await setForm((form) => {
			return form.map((f) => {
				if (f.title === '') {
					counter += 1;
					return { ...f, error: 'Question is required' };
				} else if (
					f.type === FormTypeEnum.CHECKBOX &&
					(!f.options ||
						(f.options && f.options.length === 0) ||
						(f.options && f.options.filter((o) => o === '').length > 0))
				) {
					counter += 1;
					return { ...f, error: 'Options is required' };
				} else {
					return f;
				}
			});
		});

		if (counter === 0) {
			navigation.navigate('FormScreen', { form });
		}
	};

	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity onPress={addForm}>
					<View style={styles.headerRight}>
						<Ionicons name='ios-add' size={30} color='white' />
					</View>
				</TouchableOpacity>
			),
		});
	}, []);

	return (
		<View style={styles.container}>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				{form.map((f, formIndex) => (
					<View key={formIndex} style={styles.formOuterContainer}>
						<View style={styles.formInnerContainer}>
							<View style={styles.form}>
								<TextInput
									style={styles.textInput}
									onChangeText={(text) => handleTitle(text, formIndex)}
									value={f.title}
									placeholder='Untitled question'
								/>
								<DropDownPicker
									items={FormType}
									defaultValue={f.type}
									containerStyle={{ height: 40, marginBottom: 8 }}
									dropDownStyle={{ minHeight: 162 }}
									onOpen={() => handleOpen(formIndex)}
									onClose={handleClose}
									itemStyle={{
										justifyContent: 'flex-start',
									}}
									onChangeItem={(item) => handleType(item.value, formIndex)}
								/>
							</View>
							<TouchableOpacity onPress={() => deleteForm(formIndex)} style={styles.formDelete}>
								<View>
									<MaterialCommunityIcons name='trash-can-outline' size={30} color='#900' />
								</View>
							</TouchableOpacity>
						</View>
						{f.type === FormTypeEnum.CHECKBOX && (
							<View style={styles.optionsContainer}>
								{f.options?.map((f, optionsIndex) => (
									<CheckBoxInput
										key={optionsIndex}
										options={f}
										setOptions={(options) => handleOptions(options, formIndex, optionsIndex)}
										removeOptions={() => removeOptions(formIndex, optionsIndex)}
									/>
								))}
								<TouchableOpacity onPress={() => addOptions(formIndex)}>
									<View style={styles.addOptions}>
										<Text style={styles.addOptionsText}>Add Options</Text>
									</View>
								</TouchableOpacity>
							</View>
						)}
						{f.error && <Text style={styles.error}>{f.error}</Text>}
					</View>
				))}
				<View style={{ minHeight: space }} />
				<View style={{ marginBottom: 32 }}>
					<Button color='#900' title='next' onPress={next} />
				</View>
			</ScrollView>
		</View>
	);
};

export default SetupScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 32,
		paddingHorizontal: 32,
	},
	headerRight: {
		borderRadius: 12,
		marginRight: 32,
		paddingHorizontal: 2,
		backgroundColor: '#900',
	},
	formOuterContainer: {
		marginBottom: 16,
	},
	formInnerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	textInput: {
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderRadius: 8,
		backgroundColor: '#F9F9F9',
		marginBottom: 8,
	},
	form: {
		flex: 1,
		flexGrow: 6,
	},
	formDelete: {
		flex: 1,
		alignItems: 'flex-end',
	},
	optionsContainer: {
		marginTop: 8,
	},
	addOptions: {
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderRadius: 8,
		backgroundColor: '#F9F9F9',
		color: '#900',
		marginBottom: 8,
	},
	addOptionsText: {
		color: '#900',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	error: {
		color: '#900',
	},
});
