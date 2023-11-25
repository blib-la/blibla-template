import { Role } from "@prisma/client";
import { useSession } from "next-auth/react";

export function useAdminRights() {
	const { data: session } = useSession();
	return session?.user.role === Role.ADMIN;
}
