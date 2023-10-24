import FormControl from "@mui/joy/FormControl";
import FormHelperText from "@mui/joy/FormHelperText";
import FormLabel from "@mui/joy/FormLabel";
import type { InputProps } from "@mui/joy/Input";
import Input from "@mui/joy/Input";
import type { UseControllerProps } from "react-hook-form";
import { useController } from "react-hook-form";

import type { FormInput, InputProperties } from "@/organisms/bio-card/types";

export function InputField({
	label,
	name,
	control,
	placeholder,
	rules,
	defaultValue,
	...properties
}: UseControllerProps<FormInput> & InputProperties & InputProps) {
	const {
		field,
		fieldState: { error },
	} = useController({ name, control, rules, defaultValue: defaultValue ?? "" });
	return (
		<FormControl error={Boolean(error)} sx={{ width: "100%" }}>
			<FormLabel>{label}</FormLabel>
			<Input
				{...properties}
				{...field}
				placeholder={placeholder}
				slotProps={{
					input: {
						"data-testid":
							(properties as Record<string, unknown>)["data-testid"] &&
							`${(properties as Record<string, unknown>)["data-testid"]}-input`,
					},
				}}
			/>
			{error && <FormHelperText>{error.message}</FormHelperText>}
		</FormControl>
	);
}
