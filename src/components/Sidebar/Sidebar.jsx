import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";
import { Link as RouterLink } from "react-router-dom";
import { Avatar } from "@/components/ui/avatar"
import { AiFillHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { InstagramLogo, InstagramMobileLogo, SearchLogo, NotificationsLogo, CreatePostLogo } from "../../assets/constants";


const Sidebar = () => {
	console.log("Rendering Sidebar component");

	const sidebarItems = [
		{
			icon: <AiFillHome size={25} />,
			text: "Home",
			link: "/",
		},
		{
			icon: <SearchLogo />,
			text: "Search",
		},
		{
			icon: <NotificationsLogo />,
			text: "Notifications",
		},
		{
			icon: <CreatePostLogo />,
			text: "Create",
		},
		{
			icon: <Avatar size={"sm"} name='Priyanshu Sharma' src='https://bit.ly/sage-adebayo' />,
			text: "Profile",
			link: "/asaprogrammer",
		},
	];

	console.log("Sidebar items:", sidebarItems);

	return (
		<Box
			height={"100vh"}
			borderRight={"1px solid"}
			borderColor={"whiteAlpha.300"}
			py={8}
			position={"sticky"}
			top={0}
			left={0}
			px={{ base: 2, md: 4 }}
		>
			<Flex direction={"column"} gap={10} w='full' height={"full"}>
				<RouterLink to={"/"} style={{ display: 'block', cursor: 'pointer' }}>
					<InstagramLogo />
				</RouterLink>
				<RouterLink to={"/"} style={{ display: 'block', cursor: 'pointer' }}>
					<InstagramMobileLogo />
				</RouterLink>
				<Flex direction={"column"} gap={5} cursor={"pointer"}>
					{sidebarItems.map((item, index) => (
						<Tooltip
							key={index}
							content={item.text}
						>
							<RouterLink
								to={item.link || "#"}
								style={{ display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
							>
								{item.icon}
								<Box display={{ base: "none", md: "block" }}>
									{item.text}
								</Box>
							</RouterLink>
						</Tooltip>
					))}
				</Flex>
				<Tooltip
					hasArrow
					label={"Logout"}
					placement='right'
					ml={1}
					openDelay={500}
					display={{ base: "block", md: "none" }}
				>
					<Link
						display={"flex"}
						to={"/auth"}
						as={RouterLink}
						alignItems={"center"}
						gap={4}
						_hover={{ bg: "whiteAlpha.400" }}
						borderRadius={6}
						p={2}
						w={{ base: 10, md: "full" }}
						mt={'auto'}
						justifyContent={{ base: "center", md: "flex-start" }}
					>
						<BiLogOut size={25} />
						<Box display={{ base: "none", md: "block" }}>Logout</Box>
					</Link>
				</Tooltip>
			</Flex>
		</Box>
	);
};

export default Sidebar;
