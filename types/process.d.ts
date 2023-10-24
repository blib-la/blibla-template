declare module "node:process" {
	global {
		namespace NodeJS {
			interface ProcessEnv {
				PLAYWRIGHT_HEADLESS?: string;
				PLAYWRIGHT_SLOMO?: string;
				GITHUB_ID: string;
				GITHUB_SECRET: string;
				GOOGLE_ID: string;
				GOOGLE_SECRET: string;
			}
		}
	}
}
