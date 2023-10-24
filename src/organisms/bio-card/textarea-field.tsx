import FormControl from "@mui/joy/FormControl";
import FormHelperText from "@mui/joy/FormHelperText";
import FormLabel from "@mui/joy/FormLabel";
import type { TextareaProps } from "@mui/joy/Textarea";
import Textarea from "@mui/joy/Textarea";
import type { UseControllerProps } from "react-hook-form";
import { useController } from "react-hook-form";

import type { FormInput, TextareaProperties } from "@/organisms/bio-card/types";

export function TextareaField({
	label,
	name,
	control,
	placeholder,
	rules,
	defaultValue,
	...properties
}: UseControllerProps<FormInput> & TextareaProperties & TextareaProps) {
	const {
		field,
		fieldState: { error },
	} = useController({ name, control, rules, defaultValue: defaultValue ?? "" });
	return (
		<FormControl error={Boolean(error)} sx={{ width: "100%" }}>
			<FormLabel>{label}</FormLabel>
			<Textarea
				{...properties}
				{...field}
				placeholder={placeholder}
				minRows={2}
				maxRows={10}
				slotProps={{
					textarea: {
						"data-testid":
							(properties as Record<string, unknown>)["data-testid"] &&
							`${(properties as Record<string, unknown>)["data-testid"]}-textarea`,
					},
				}}
			/>
			{error && <FormHelperText>{error.message}</FormHelperText>}
		</FormControl>
	);
}
