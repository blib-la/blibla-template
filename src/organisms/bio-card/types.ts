export interface BioCardProperties {
	loading: boolean;
	image?: string;
	plan: string;
	name?: string;
	language?: string;
	bio?: string;
}

export interface FormInput {
	name: string;
	bio: string;
	language: string;
}

export interface InputProperties {
	label: string;
	placeholder?: string;
}

export interface TextareaProperties {
	label: string;
	placeholder?: string;
}

export interface SelectProperties {
	label: string;
	placeholder?: string;
	options: { value: string; label: string }[];
	helperText?: string;
}
