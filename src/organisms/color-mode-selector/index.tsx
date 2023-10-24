import Button from "@mui/joy/Button";
import ToggleButtonGroup from "@mui/joy/ToggleButtonGroup";
import { useTranslation } from "next-i18next";

import { useSsrColorScheme } from "@/ions/hooks/color-scheme";
import { icons } from "@/organisms/color-mode-selector/icons";

export function ColorModeSelector() {
	const { t } = useTranslation(["button"]);
	const { mode, setMode } = useSsrColorScheme();
	return (
		<ToggleButtonGroup
			value={mode}
			variant="plain"
			color="neutral"
			onChange={(event, newValue) => {
				setMode(newValue ?? "system");
			}}
		>
			{Object.entries(icons).map(([key, icon]) => (
				<Button
					key={key}
					value={key}
					data-testid={`color-mode-${key}`}
					aria-label={t(`button:colorMode.${key}`)}
				>
					{icon}
				</Button>
			))}
		</ToggleButtonGroup>
	);
}
