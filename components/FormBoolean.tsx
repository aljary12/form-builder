import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export interface FormBooleanProps {
	title: string;
}

const FormBoolean: React.FC<FormBooleanProps> = ({ title }) => {
	const [bool, setBool] = React.useState<boolean>(true);

	return (
		<View>
			<Text style={styles.title}>{title}</Text>
			<View style={styles.container}>
				<View style={styles.radioButtonContainer}>
					<TouchableOpacity onPress={() => setBool(true)}>
						<MaterialCommunityIcons
							style={styles.radioButton}
							name={bool ? 'radiobox-marked' : 'radiobox-blank'}
							size={24}
							color='#900'
						/>
					</TouchableOpacity>
					<Text>Yes</Text>
				</View>
				<View style={styles.radioButtonContainer}>
					<TouchableOpacity onPress={() => setBool(false)}>
						<MaterialCommunityIcons
							style={styles.radioButton}
							name={!bool ? 'radiobox-marked' : 'radiobox-blank'}
							size={24}
							color='#900'
						/>
					</TouchableOpacity>
					<Text>No</Text>
				</View>
			</View>
		</View>
	);
};

export default FormBoolean;

const styles = StyleSheet.create({
	title: {
		marginBottom: 16,
	},
	textInput: {
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderRadius: 8,
		backgroundColor: '#F9F9F9',
		marginBottom: 8,
	},
	container: {
		flexDirection: 'row',
	},
	radioButtonContainer: {
		flexDirection: 'row',
		marginRight: 32,
		alignItems: 'center',
		justifyContent: 'center',
	},
	radioButton: {
		marginRight: 8,
	},
});
