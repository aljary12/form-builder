export type RootStackParamList = {
	SetupScreen: undefined;
	FormScreen: {
		form: Form[];
	};
};

export enum FormTypeEnum {
	TEXT,
	NUMBER,
	BOOLEAN,
	CHECKBOX,
}

export interface Form {
	title: string;
	type: FormTypeEnum;
	options?: string[];
	error?: string;
}
