import { Button, Flex, Text, Link } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar"
// import useLogout from "../../hooks/useLogout";
// import useAuthStore from "../../store/authStore";
import { Link as RouterLink } from "react-router-dom";

// const SuggestedHeader = () => {
// 	const { handleLogout, isLoggingOut } = useLogout();
// 	const authUser = useAuthStore((state) => state.user);

// 	if (!authUser) return null;

// 	return (
// 		<Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
// 			<Flex alignItems={"center"} gap={2}>
// 				<Link to={`${authUser.username}`}>
// 					<Avatar size={"lg"} src={authUser.profilePicURL} />
// 				</Link>
// 				<Link to={`${authUser.username}`}>
// 					<Text fontSize={12} fontWeight={"bold"}>
// 						{authUser.username}
// 					</Text>
// 				</Link>
// 			</Flex>
// 			<Button
// 				size={"xs"}
// 				background={"transparent"}
// 				_hover={{ background: "transparent" }}
// 				fontSize={14}
// 				fontWeight={"medium"}
// 				color={"blue.400"}
// 				onClick={handleLogout}
// 				isLoading={isLoggingOut}
// 				cursor={"pointer"}
// 			>
// 				Log out
// 			</Button>
// 		</Flex>
// 	);
// };


const SuggestedHeader = () => {
	return (
	  <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
		<Flex alignItems={"center"} gap={2}>
		  <Avatar name="As a Programmer" size={"lg"} src="/profilepic.png" />
		  <Text fontSize={12} fontWeight={"bold"}>
			asaprogrammer_
		  </Text>
		</Flex>
		<Link
		  as={RouterLink}
		  to={"/auth"}
		  fontSize={14}
		  fontWeight={"medium"}
		  color={"blue.400"}
		  style={{ textDecoration: "none" }}
		  cursor={"pointer"}
		>
			Log out
		</Link>
	  </Flex>
	);
  };


export default SuggestedHeader;
