import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import type { JWT } from "next-auth/jwt";
import { getToken } from "next-auth/jwt";

const prisma = new PrismaClient();

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
	const token = (await getToken({ req: request })) as JWT;
	if (!token?.sub) {
		return response.status(401).end();
	}

	const { method, body } = request;

	try {
		switch (method) {
			case "GET": {
				const profile = await prisma.profile.findUnique({
					where: { userId: token.sub },
				});
				if (!profile) {
					return response.status(404).json({ error: "Profile not found" });
				}

				return response.status(200).json(profile);
			}

			case "POST": {
				const updatedProfile = await prisma.profile.update({
					where: { userId: token.sub },
					data: body,
				});

				return response.status(200).json(updatedProfile);
			}

			default: {
				return response.status(405).end(`Method ${method} Not Allowed`);
			}
		}
	} catch (error) {
		console.error("Server Error:", error);
		return response.status(500).json({ error: "Internal Server Error" });
	}
}
