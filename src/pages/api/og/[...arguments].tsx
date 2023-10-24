import { ImageResponse } from "@vercel/og";
import type { NextRequest } from "next/server";

const text: Record<string, string> = {
	en: "English Version",
	de: "Deutsche Version",
};

export default async function handler(request: NextRequest) {
	const { searchParams } = request.nextUrl;
	const [locale, ...arguments_] = searchParams.getAll("arguments");

	return new ImageResponse(
		(
			<div
				style={{
					height: "100%",
					width: "100%",
					textAlign: "center",
					alignContent: "center",
					alignItems: "center",
					justifyContent: "center",
					flexDirection: "column",
					display: "flex",
					position: "relative",
				}}
			>
				<div>{text[locale] ?? text.en}</div>
				<div>{arguments_.join("/")}</div>
			</div>
		),
		{
			width: 400,
			height: 225,
		}
	);
}

export const config = {
	runtime: "edge",
};
