import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CheckBox } from 'react-native-elements';

interface FormCheckBoxProps {
	title: string;
	options: string[];
}

const FormCheckBox: React.FC<FormCheckBoxProps> = ({ title, options }) => {
	const [check, setCheck] = React.useState(options.map((o) => ({ option: o, chosen: false })));

	const handleCheck = (index: number) => {
		setCheck((check) => check.map((c, i) => (i === index ? { ...c, chosen: !c.chosen } : c)));
	};

	return (
		<View>
			<Text style={styles.title}>{title}</Text>
			{check.map((c, index) => (
				<CheckBox
					checkedColor='#900'
					containerStyle={styles.checkbox}
					key={index}
					iconType='material-community'
					checkedIcon='checkbox-marked-outline'
					uncheckedIcon='checkbox-blank-outline'
					title={c.option}
					checked={c.chosen}
					onPress={() => handleCheck(index)}
				/>
			))}
		</View>
	);
};

export default FormCheckBox;

const styles = StyleSheet.create({
	title: {
		marginBottom: 16,
	},
	checkbox: {
		marginLeft: 0,
		marginRight: 0,
	},
});
