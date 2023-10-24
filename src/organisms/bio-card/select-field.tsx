import FormControl from "@mui/joy/FormControl";
import FormHelperText from "@mui/joy/FormHelperText";
import FormLabel from "@mui/joy/FormLabel";
import Option from "@mui/joy/Option";
import Select from "@mui/joy/Select";
import { useId } from "react";
import type { UseControllerProps } from "react-hook-form";
import { useController } from "react-hook-form";

import type { FormInput, SelectProperties } from "@/organisms/bio-card/types";

export function SelectField({
	label,
	name,
	control,
	rules,
	defaultValue,
	placeholder,
	options,
	helperText,
	...properties
}: UseControllerProps<FormInput> & SelectProperties) {
	const id = useId();
	const buttonId = `${id}-button`;
	const labelId = `${id}-label`;
	const helperId = `${id}-helper`;

	const {
		field: { onChange, ...field },
		fieldState: { error },
	} = useController({ name, control, rules, defaultValue: defaultValue ?? "" });
	return (
		<FormControl sx={{ width: "100%" }} error={Boolean(error)}>
			<FormLabel id={labelId} htmlFor={buttonId}>
				{label}
			</FormLabel>
			<Select
				{...properties}
				{...field}
				placeholder={placeholder}
				slotProps={{
					root: {},
					listbox: {
						"data-testid":
							(properties as Record<string, unknown>)["data-testid"] &&
							`${(properties as Record<string, unknown>)["data-testid"]}-listbox`,
					},
					button: {
						id: buttonId,
						"aria-labelledby": `${labelId} ${buttonId}`,
						"data-testid":
							(properties as Record<string, unknown>)["data-testid"] &&
							`${(properties as Record<string, unknown>)["data-testid"]}-button`,
					},
				}}
				onChange={(event, value) => {
					onChange(value);
				}}
			>
				{options.map(option => (
					<Option key={option.value} value={option.value}>
						{option.label}
					</Option>
				))}
			</Select>
			<FormHelperText id={helperId}>{error ? error.message : helperText}</FormHelperText>
		</FormControl>
	);
}
