import { css, Global } from "@emotion/react";
import React from "react";

export const globalStyles = (
	<Global
		styles={css({
			":root": {
				"--safe-area-inset-top": "env(safe-area-inset-top)",
				"--safe-area-inset-bottom": "env(safe-area-inset-bottom)",
				"--safe-area-inset-left": "env(safe-area-inset-left)",
				"--safe-area-inset-right": "env(safe-area-inset-right)",
			},
			"#__next": { display: "contents" },
		})}
	/>
);
