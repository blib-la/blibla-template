import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";

import { NavLink } from "@/atoms/link";
import type { NavigationItem } from "@/ions/contexts/navigation";
import { Box } from "@/molecules/box";

export function MultiLevelNavigation({ navigation }: { navigation: NavigationItem }) {
	return (
		<List
			sx={{
				position: "relative",
				"&:hover, &:focus, &:focus-within": { ".MuiList-root": { display: "block" } },
			}}
		>
			<Box as="li">
				<NavLink
					disableHighlight
					href={navigation.href}
					endDecorator={<ArrowDropDownIcon />}
					onClick={event => {
						(event.target as HTMLAnchorElement).blur();
					}}
				>
					{navigation.label}
				</NavLink>
				<Box sx={{ position: "absolute", top: "100%", pt: 2 }}>
					<List
						sx={{
							display: "none",
							width: "max-content",
							borderRadius: "xs",
							boxShadow: "xl",
							bgcolor: "background.body",
						}}
					>
						{navigation.children?.map(child => (
							<ListItem key={child.href}>
								<NavLink
									disableHighlight
									href={child.href}
									onClick={event => {
										(event.target as HTMLAnchorElement).blur();
									}}
								>
									{child.label}
								</NavLink>
							</ListItem>
						))}
					</List>
				</Box>
			</Box>
		</List>
	);
}
