import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import type { ReactElement } from "react";

import type { ProviderId } from "@/organisms/social-login/types";

export const socialIcons: Record<ProviderId, ReactElement> = {
	github: <GitHubIcon />,
	google: <GoogleIcon />,
};
