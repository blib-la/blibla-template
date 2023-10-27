import { withAuth } from "next-auth/middleware";

export default withAuth({
	callbacks: {
		authorized({ token, req }) {
			if (req.nextUrl.pathname.startsWith("/admin")) {
				return token?.role === "ADMIN";
			}

			if (req.nextUrl.pathname.startsWith("/draft")) {
				return token?.role === "ADMIN";
			}

			return Boolean(token);
		},
	},
});

export const config = { matcher: ["/admin", "/profile", "/api/user"] };
