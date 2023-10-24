import type { ButtonToken, ProviderId } from "@/organisms/social-login/types";

export const colors: Record<ProviderId, ButtonToken> = {
	github: {
		backgroundColor: "#181717",
		hoverBackgroundColor: "#0d0d0d",
		activeBackgroundColor: "#050505",
		textColor: "#ffffff",
	},
	google: {
		backgroundColor: "#4285F4",
		hoverBackgroundColor: "#357abd",
		activeBackgroundColor: "#2c6dac",
		textColor: "#ffffff",
	},
};
