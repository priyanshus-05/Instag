import { Box, Button, Flex} from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar"
import { Text } from "@chakra-ui/react";
import { Skeleton, SkeletonCircle } from "@/components/ui/skeleton"
import { Link } from "react-router-dom";


// const PostHeader = ({ post, creatorProfile }) => {
// 	const { handleFollowUser, isFollowing, isUpdating } = useFollowUser(post.createdBy);

// 	return (
// 		<Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} my={2}>
// 			<Flex alignItems={"center"} gap={2}>
// 				{creatorProfile ? (
// 					<Link to={`/${creatorProfile.username}`}>
// 						<Avatar src={creatorProfile.profilePicURL} alt='user profile pic' size={"sm"} />
// 					</Link>
// 				) : (
// 					<SkeletonCircle size='10' />
// 				)}

// 				<Flex fontSize={12} fontWeight={"bold"} gap='2'>
// 					{creatorProfile ? (
// 						<Link to={`/${creatorProfile.username}`}>{creatorProfile.username}</Link>
// 					) : (
// 						<Skeleton w={"100px"} h={"10px"} />
// 					)}

// 					<Box color={"gray.500"}>• {timeAgo(post.createdAt)}</Box>
// 				</Flex>
// 			</Flex>
// 			<Box cursor={"pointer"}>
// 				<Button
// 					size={"xs"}
// 					bg={"transparent"}
// 					fontSize={12}
// 					color={"blue.500"}
// 					fontWeight={"bold"}
// 					_hover={{
// 						color: "white",
// 					}}
// 					transition={"0.2s ease-in-out"}
// 					onClick={handleFollowUser}
// 					isLoading={isUpdating}
// 				>
// 					{isFollowing ? "Unfollow" : "Follow"}
// 				</Button>
// 			</Box>
// 		</Flex>
// 	);
// };

const PostHeader = ({username,avatar}) => {
    return (
        <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} my={2}>
            <Flex alignItems={"center"} gap={2}>
                <Avatar src={avatar} alt='user profile pic' size={"sm"} />
                <Flex fontSize={12} fontWeight={"bold"} gap='2'>
                    {username}
                    <Box color={"gray.500"}>• 1k</Box>
                </Flex>
            </Flex>
            <Box cursor={"pointer"}>
                <Text fontSize={12} color={"blue.500"} fontWeight={"bold"} _hover={{ color: "white" }} transition={"0.2s ease-in-out"}>
                    Unfollow
                </Text>
            </Box>
        </Flex>
    );
};


export default PostHeader;
