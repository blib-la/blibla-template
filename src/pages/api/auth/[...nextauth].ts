import process from "node:process";
import { URLSearchParams } from "node:url";

import { PrismaAdapter } from "@auth/prisma-adapter";
import type { NextApiRequest, NextApiResponse } from "next";
import type { NextAuthOptions, User } from "next-auth";
import nextAuth from "next-auth";
import githubProvider from "next-auth/providers/github";
import googleProvider from "next-auth/providers/google";

import index18Next from "../../../../next-i18next.config";

import prismaClient from "@/ions/prisma/client";

async function createProfile(user: User, language: string) {
	try {
		await prismaClient.profile.create({
			data: {
				userId: user.id,
				image: user.image,
				name: user.name,
				language,
			},
		});
	} catch (error) {
		console.error("Could not create default profile for user ID:", user.id, error);
	}
}

export function createAuthOptions(language: string): NextAuthOptions {
	return {
		// eslint-disable-next-line new-cap
		adapter: PrismaAdapter(prismaClient),

		providers: [
			githubProvider({
				clientId: process.env.GITHUB_ID,
				clientSecret: process.env.GITHUB_SECRET,
			}),
			googleProvider({
				clientId: process.env.GOOGLE_ID,
				clientSecret: process.env.GOOGLE_SECRET,
			}),
		],
		session: {
			strategy: "jwt",
		},
		pages: {
			signIn: "/auth/sign-in",
			signOut: "/auth/sign-out",
			error: "/auth/error",
			verifyRequest: "/auth/verify-request",
			newUser: "/auth/new-user",
		},
		callbacks: {
			async jwt({ token, user, trigger }) {
				if (user) {
					token.role = user.role;
					token.plan = user.plan;
				}

				if (trigger === "signUp" && user?.id) {
					createProfile(user, language).catch(error => {
						console.error("Profile creation failed:", error);
					});
				}

				return token;
			},
			async session({ session, token, user }) {
				session.user.role = token?.role ?? user?.role;
				session.user.plan = token?.plan ?? user?.plan;
				return session;
			},
		},
	};
}

export default async function handler(
	request: NextApiRequest & { activeLanguage?: string },
	response: NextApiResponse
) {
	// Import available locales and default locale
	const {
		i18n: { defaultLocale, locales },
	} = index18Next;

	// Start with the default locale
	let activeLanguage = defaultLocale;

	// Extract data from headers
	const {
		referer,
		"accept-language": acceptLanguageHeader,
		"x-invoke-query": invokeQuery,
		cookie,
	} = request.headers;

	// Extract callbackUrl from cookies (assuming you are storing it as a cookie)
	const callbackUrlMatch = cookie?.match(/next-auth\.callback-url=([^;]+)/);
	const callbackUrl = callbackUrlMatch ? decodeURIComponent(callbackUrlMatch[1]) : undefined;

	// Try to get language from 'accept-language' header
	if (acceptLanguageHeader) {
		const clientLanguages = acceptLanguageHeader.split(",").map(lang => lang.split(";")[0]);
		activeLanguage = clientLanguages.find(lang => locales.includes(lang)) || activeLanguage;
	}

	// Consider 'callbackUrl' if previous options didn't determine a non-default locale
	if (activeLanguage === defaultLocale && callbackUrl) {
		const match = callbackUrl.match(/\/\/[^/]+\/([a-z]{2})(\/|$)/);
		if (match && locales.includes(match[1])) {
			activeLanguage = match[1];
		}
	}

	// Consider 'referer' header if previous options didn't determine a non-default locale
	if (activeLanguage === defaultLocale && referer) {
		const match = referer.match(/\/\/[^/]+\/([a-z]{2})(\/|$)/);
		if (match && locales.includes(match[1])) {
			activeLanguage = match[1];
		}
	}

	// Fallback to 'x-invoke-query' if previous options didn't determine a non-default locale
	if (activeLanguage === defaultLocale && invokeQuery) {
		const parameters = new URLSearchParams(invokeQuery as string);
		activeLanguage = parameters.get("__nextLocale") || activeLanguage;
	}

	// Finally, invoke nextAuth
	return nextAuth(request, response, createAuthOptions(activeLanguage));
}
