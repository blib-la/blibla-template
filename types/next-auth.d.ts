import { Session as NextAuthSession, User, User as NextAuthUser } from "next-auth";
import { JWT as NextAuthJWT } from "next-auth/jwt";
import { Except } from "type-fest";

declare module "next-auth" {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
	 */
	interface Session extends Except<NextAuthSession, "user"> {
		user: User;
	}

	interface User extends NextAuthUser {
		role?: string;
		plan?: string;
	}
}

declare module "next-auth/jwt" {
	/**
	 * Returned by the `jwt` callback and `getToken`, when using JWT sessions
	 */
	interface JWT extends NextAuthJWT {
		role?: string;
		plan?: string;
	}
}
