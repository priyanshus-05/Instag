import { Box, Button, Flex, HStack, useDisclosure } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Group, Input, Stack } from "@chakra-ui/react";
import { InputGroup} from "@/components/ui/input-group"
import { useRef, useState } from "react";
import { CommentLogo, NotificationsLogo, UnlikeLogo } from "../../assets/constants";


// const PostFooter = ({ post, isProfilePage, creatorProfile }) => {
//     const { isCommenting, handlePostComment } = usePostComment();
//     const [comment, setComment] = useState("");
//     const authUser = useAuthStore((state) => state.user);
//     const commentRef = useRef(null);
//     const { handleLikePost, isLiked, likes } = useLikePost(post);
//     const { isOpen, onOpen, onClose } = useDisclosure();

//     const handleSubmitComment = async () => {
//         await handlePostComment(post.id, comment);
//         setComment("");
//     };

//     return (
//         <Box mb={10} marginTop={"auto"}>
//             <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={4}>
//                 <Box onClick={handleLikePost} cursor={"pointer"} fontSize={18}>
//                     {!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
//                 </Box>

//                 <Box cursor={"pointer"} fontSize={18} onClick={() => commentRef.current.focus()}>
//                     <CommentLogo />
//                 </Box>
//             </Flex>
//             <Text fontWeight={600} fontSize={"sm"}>
//                 {likes} likes
//             </Text>

//             {isProfilePage && (
//                 <Text fontSize='12' color={"gray"}>
//                     Posted {timeAgo(post.createdAt)}
//                 </Text>
//             )}

//             {!isProfilePage && (
//                 <>
//                     <Text fontSize='sm' fontWeight={700}>
//                         {creatorProfile?.username}{" "}
//                         <Text as='span' fontWeight={400}>
//                             {post.caption}
//                         </Text>
//                     </Text>
//                     {post.comments.length > 0 && (
//                         <Text fontSize='sm' color={"gray"} cursor={"pointer"} onClick={onOpen}>
//                             View all {post.comments.length} comments
//                         </Text>
//                     )}
//                     {isOpen ? <CommentsModal isOpen={isOpen} onClose={onClose} post={post} /> : null}
//                 </>
//             )}

//             {authUser && (
//                 <Flex alignItems={"center"} gap={2} justifyContent={"space-between"} w={"full"}>
//                     <Stack gap="10">
//                         <Group attached>
//                             <Input
//                                 variant={"flushed"}
//                                 placeholder={"Add a comment..."}
//                                 fontSize={14}
//                                 onChange={(e) => setComment(e.target.value)}
//                                 value={comment}
//                                 ref={commentRef}
//                             />
//                             <InputAddon>
//                                 <Button
//                                     fontSize={14}
//                                     color={"blue.500"}
//                                     fontWeight={600}
//                                     cursor={"pointer"}
//                                     _hover={{ color: "white" }}
//                                     bg={"transparent"}
//                                     onClick={handleSubmitComment}
//                                     isLoading={isCommenting}
//                                 >
//                                     Post
//                                 </Button>
//                             </InputAddon>
//                         </Group>
//                     </Stack>
//                 </Flex>
//             )}
//         </Box>
//     );
// };

const PostFooter = ({username, isProfilePage}) => {
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(1000);
    const [comment, setComment] = useState("");

    const handleLike = () => {
        if (liked) {
            setLiked(false);
            setLikes(likes - 1);
        } else {
            setLiked(true);
            setLikes(likes + 1);
        }
    };

    return (
        <Box mb={10} marginTop={"auto"}>
            <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={4}>
                <Box onClick={handleLike} cursor={"pointer"} fontSize={18}>
                    {!liked ? <NotificationsLogo /> : <UnlikeLogo />}
                </Box>
                <Box cursor={"pointer"} fontSize={18}>
                    <CommentLogo />
                </Box>
            </Flex>
            <Text fontWeight={600} fontSize={"sm"}>
                {likes} likes
            </Text>
             {!isProfilePage && (
             <>
             <Text fontSize='sm'>
             <Text as='span' fontWeight={700}>{username}</Text>{" "}
             <Text as='span'>Feeling good</Text>
            </Text>
            <Text fontSize='sm' color={"gray"}>
                View all 1,000 comments
            </Text>
             </>
             )}
            <Flex alignItems={"center"} gap={2} justifyContent={"space-between"} w={"full"}>
                <InputGroup flex="1" endElement={
                    <Button
                        fontSize={14}
                        color={"blue.500"}
                        fontWeight={600}
                        cursor={"pointer"}
                        _hover={{ color: "white" }}
                        bg={"transparent"}
                    >
                        Post
                    </Button>
                }>
                    <Input
                        variant={"flushed"}
                        placeholder={"Add a comment..."}
                        fontSize={14}
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                    />
                </InputGroup>
            </Flex>
        </Box>
    );
};

export default PostFooter;