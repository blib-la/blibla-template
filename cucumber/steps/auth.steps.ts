import path from "node:path";
import process from "node:process";

import { Given, Then, When } from "@cucumber/cucumber";
import type { BrowserContext, Page } from "@playwright/test";
import { expect } from "@playwright/test";
import dotenv from "dotenv";
import type { JWT } from "next-auth/jwt";
import { encode } from "next-auth/jwt";

import { defaultUser } from "../../tests/fixtures/user";
import { config } from "../support/config";
import type { ICustomWorld } from "../support/custom-world";

dotenv.config({ path: path.join(process.cwd(), ".env.local") });

async function login(page: Page, context: BrowserContext, token: JWT, newUser?: boolean) {
	const encryptedToken = await encode({
		token,
		secret: process.env.NEXTAUTH_SECRET!,
	});
	await context.addCookies([
		{
			name: "next-auth.session-token",
			value: encryptedToken,
			domain: "localhost",
			path: "/",
			httpOnly: true,
			sameSite: "Lax",
			expires: Math.floor(Date.now() / 1000) + 3600,
		},
	]);
	await page.reload();
	await page.route("**/api/auth/session", async route => {
		await route.fulfill({
			status: 200,
			contentType: "application/json",
			body: JSON.stringify({
				user: { ...token, newUser },
			}),
		});
	});

	await page.route("**/api/user/profile", async route => {
		await route.fulfill({
			status: newUser ? 201 : 200,
			contentType: "application/json",
			json: {
				language: "en",
				name: token.name,
				bio: "Hi, I'm Alex",
				image: token.picture,
				birthday: new Date("2000/01/01"),
			},
		});
	});
	await page.reload();
}

When("I log in", async function (this: ICustomWorld) {
	const page = this.page!;
	const context = this.context!;
	await login(page, context, defaultUser);
});

When("I log in as {string}", async function (this: ICustomWorld, role: string) {
	const page = this.page!;
	const context = this.context!;
	await login(page, context, {
		...defaultUser,
		role,
	});
});

When("I log in with a {string} plan", async function (this: ICustomWorld, plan: string) {
	const page = this.page!;
	const context = this.context!;
	await login(page, context, {
		...defaultUser,
		plan,
	});
});

When(
	"I log in as {string} with a {string} plan",
	async function (this: ICustomWorld, role: string, plan: string) {
		const page = this.page!;
		const context = this.context!;
		await login(page, context, {
			...defaultUser,
			plan,
			role,
		});
	}
);

When("I log out", async function (this: ICustomWorld) {
	const page = this.page!;
	const context = this.context!;
	await page.unroute("**/api/auth/session");
	await page.unroute("**/api/user/profile");
	await context.clearCookies();
	await page.reload();
});

Given("I have successfully signed in for the first time", async function (this: ICustomWorld) {
	const page = this.page!;
	await page.goto(`${config.BASE_URL}/auth/new-user`);
});

When("a {string} error occurs", async function (this: ICustomWorld, errorType: string) {
	const page = this.page!;
	// Directly navigate to the error page with the appropriate query parameter
	await page.goto(`${config.BASE_URL}/auth/error?error=${errorType}`);
});

Then(
	"the URL should contain the query parameter {string}",
	async function (this: ICustomWorld, query: string) {
		const page = this.page!;
		const url = page.url();
		expect(url).toContain(query);
	}
);
