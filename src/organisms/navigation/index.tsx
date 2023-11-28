import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";

import { ListItemLink, NavLink } from "@/atoms/link";
import type { NavigationItem } from "@/ions/contexts/navigation";
import { Box } from "@/molecules/box";

export function MultiLevelNavigation({ navigation }: { navigation: NavigationItem }) {
	return (
		<List
			sx={{
				flex: "initial",
				py: 0,
				"&:hover, &:focus, &:focus-within": { ".MuiList-root": { display: "block" } },
			}}
		>
			<Box as="li">
				<NavLink
					disableHighlight
					href={navigation.href}
					endDecorator={<ArrowDropDownIcon />}
					sx={{ py: 1 }}
					onClick={event => {
						(event.target as HTMLAnchorElement).blur();
					}}
				>
					{navigation.label}
				</NavLink>
				<Box sx={{ position: "absolute", top: "100%", pt: 1 }}>
					<List
						color="neutral"
						variant="soft"
						sx={{
							display: "none",
							width: "max-content",
							minWidth: 180,
							borderRadius: "xs",
							boxShadow: "xl",
						}}
					>
						{navigation.children?.map(child => (
							<ListItem key={child.href}>
								<ListItemLink
									disableHighlight
									color="neutral"
									variant="soft"
									href={child.href}
									onClick={event => {
										(event.target as HTMLAnchorElement).blur();
									}}
								>
									{child.label}
								</ListItemLink>
							</ListItem>
						))}
					</List>
				</Box>
			</Box>
		</List>
	);
}
