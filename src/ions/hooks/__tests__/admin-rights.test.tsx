import { Role } from "@prisma/client";
import { renderHook } from "@testing-library/react";
import { useSession } from "next-auth/react";

import { useAdminRights } from "../admin-rights";

jest.mock("next-auth/react", () => ({
	useSession: jest.fn(),
}));

describe("useAdminRights", () => {
	it("should return true when user is an admin", () => {
		(useSession as jest.Mock).mockReturnValue({
			data: { user: { role: Role.ADMIN } },
		});

		const { result } = renderHook(() => useAdminRights());

		expect(result.current).toBe(true);
	});

	it("should return false when user is not an admin", () => {
		(useSession as jest.Mock).mockReturnValue({
			data: { user: { role: Role.USER } },
		});

		const { result } = renderHook(() => useAdminRights());

		expect(result.current).toBe(false);
	});

	it("should return false when there is no session", () => {
		// eslint-disable-next-line  unicorn/no-null
		(useSession as jest.Mock).mockReturnValue({ data: null });

		const { result } = renderHook(() => useAdminRights());

		expect(result.current).toBe(false);
	});
});
