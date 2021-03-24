import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import FormBoolean from '../components/FormBoolean';
import FormCheckBox from '../components/FormCheckBox';
import FormNumeric from '../components/FormNumeric';
import FormText from '../components/FormText';
import { FormTypeEnum, RootStackParamList } from '../types';

interface FormScreenProps {
	navigation: StackNavigationProp<RootStackParamList>;
	route: RouteProp<RootStackParamList, 'FormScreen'>;
}

const FormScreen: React.FC<FormScreenProps> = ({ route }) => {
	const { form } = route.params;
	return (
		<View style={styles.container}>
			<ScrollView>
				{form.map((f, index) => (
					<View key={index} style={styles.formContainer}>
						{f.type === FormTypeEnum.TEXT ? (
							<FormText title={f.title} />
						) : f.type === FormTypeEnum.NUMBER ? (
							<FormNumeric title={f.title} />
						) : f.type === FormTypeEnum.BOOLEAN ? (
							<FormBoolean title={f.title} />
						) : (
							<FormCheckBox title={f.title} options={f.options as string[]} />
						)}
					</View>
				))}
			</ScrollView>
		</View>
	);
};

export default FormScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 32,
		paddingHorizontal: 32,
	},
	formContainer: {
		marginBottom: 16,
	},
});
