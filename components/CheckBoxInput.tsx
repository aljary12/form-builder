import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export interface CheckBoxInputProps {
	options: string;
	setOptions: (options: string) => void;
	removeOptions: () => void;
}

const CheckBoxInput: React.FC<CheckBoxInputProps> = ({ options, setOptions, removeOptions }) => {
	return (
		<View style={styles.checkboxContainer}>
			<View style={styles.checkbox}>
				<MaterialCommunityIcons
					name='checkbox-blank-outline'
					size={24}
					color='rgba(153, 0, 0, 0.5)'
				/>
			</View>
			<TextInput
				style={[styles.textInput, styles.checkboxInput]}
				onChangeText={setOptions}
				value={options}
				placeholder={`Options`}
			/>
			<View style={styles.remove}>
				<TouchableOpacity onPress={removeOptions}>
					<MaterialCommunityIcons name='close' size={24} color='#900' />
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default CheckBoxInput;

const styles = StyleSheet.create({
	textInput: {
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderRadius: 8,
		backgroundColor: '#F9F9F9',
		marginBottom: 8,
	},
	checkboxContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	checkbox: {
		flex: 1,
		alignItems: 'center',
		// borderWidth: 1,
	},
	checkboxInput: {
		flex: 1,
		flexGrow: 4,
	},
	remove: {
		flex: 1,
		alignItems: 'flex-end',
		// borderWidth: 1,
	},
});
