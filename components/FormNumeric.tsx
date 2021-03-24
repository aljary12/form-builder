import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export interface FormNumericProps {
	title: string;
}

const FormNumeric: React.FC<FormNumericProps> = ({ title }) => {
	const [text, setText] = React.useState<string>('');

	return (
		<View>
			<Text style={styles.title}>{title}</Text>
			<TextInput
				style={styles.textInput}
				placeholder={title}
				value={text}
				onChangeText={setText}
				keyboardType='numeric'
			/>
		</View>
	);
};

export default FormNumeric;

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
});
