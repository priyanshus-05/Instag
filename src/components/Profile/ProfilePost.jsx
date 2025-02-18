import {
	Button,
	// Divider,
	Flex,
	GridItem,
	Image,
	Text,
	VStack,
} from "@chakra-ui/react";
import {
	DialogRoot,
	// DialogOverlay,
	DialogContent,
	DialogCloseTrigger,
	DialogBody,
} from "@/components/ui/dialog";
import { Avatar } from "@/components/ui/avatar";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Comment from "../Comment/Comment";
import PostFooter from "../FeedPosts/PostFooter";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import useShowToast from "../../hooks/useShowToast";
import { useState } from "react";
import { deleteObject, ref } from "firebase/storage";
import { firestore, storage } from "../../firebase/firebase";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import usePostStore from "../../store/postStore";
import Caption from "../Comment/Caption";

const ProfilePost = ({ post }) => {

	const [isOpen, setIsOpen] = useState(false);
	const userProfile = useUserProfileStore((state) => state.userProfile);
	const authUser = useAuthStore((state) => state.user);
	const showToast = useShowToast();
	const [isDeleting, setIsDeleting] = useState(false);
	const deletePost = usePostStore((state) => state.deletePost);
	const decrementPostsCount = useUserProfileStore((state) => state.deletePost);

	const handleDeletePost = async () => {
		if (!window.confirm("Are you sure you want to delete this post?")) return;
		if (isDeleting) return;

		try {
			const imageRef = ref(storage, `posts/${post.id}`);
			await deleteObject(imageRef);
			const userRef = doc(firestore, "users", authUser.uid);
			await deleteDoc(doc(firestore, "posts", post.id));

			await updateDoc(userRef, {
				posts: arrayRemove(post.id),
			});

			deletePost(post.id);
			decrementPostsCount(post.id);
			showToast("Success", "Post deleted successfully", "success");
		} catch (error) {
			showToast("Error", error.message, "error");
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<>
			<GridItem
				cursor={"pointer"}
				borderRadius={4}
				overflow={"hidden"}
				border={"1px solid"}
				borderColor={"whiteAlpha.300"}
				position={"relative"}
				aspectRatio={1 / 1}
				onClick={() => setIsOpen(true)}
			>
				<Flex
					opacity={0}
					_hover={{ opacity: 1 }}
					position={"absolute"}
					top={0}
					left={0}
					right={0}
					bottom={0}
					bg={"blackAlpha.700"}
					transition={"all 0.3s ease"}
					zIndex={1}
					justifyContent={"center"}
				>
					<Flex alignItems={"center"} justifyContent={"center"} gap={50}>
						<Flex>
							<AiFillHeart size={20} />
							<Text fontWeight={"bold"} ml={2}>
								{post.likes.length}
							</Text>
						</Flex>

						<Flex>
							<FaComment size={20} />
							<Text fontWeight={"bold"} ml={2}>
								{post.comments.length}
							</Text>
						</Flex>
					</Flex>
				</Flex>

				<Image
					src={post.imageURL}
					alt="profile post"
					w={"100%"}
					h={"100%"}
					objectFit={"cover"}
				/>
			</GridItem>
			{isOpen && (
				<DialogRoot
					open={isOpen}
					onOpenChange={(state) => onClose(state)}
					isCentered
				>
					{/* <DialogOverlay /> */}
					<DialogContent
						bg="black"
						size={{ base: "3xl", md: "5xl" }}
						maxH="90vh"
						minH="50vh"
						borderRadius="md"
					>
						<DialogCloseTrigger asChild>
							<Button
								position="absolute"
								top="10px"
								right="10px"
								variant="unstyled"
								_hover={{ bg: "whiteAlpha.200" }}
								_focus={{ boxShadow: "none" }}
								onClick={() => setIsOpen(false)}
							>
								Close
							</Button>
						</DialogCloseTrigger>
						<DialogBody pb={5}>
							<Flex
								gap="4"
								w={{ base: "90%", sm: "70%", md: "full" }}
								mx="auto"
								maxH="90vh"
								minH="50vh"
							>
								{/* Left Section */}
								<Flex
									borderRadius={4}
									overflow="hidden"
									border="1px solid"
									borderColor="whiteAlpha.300"
									flex={1.5}
									justifyContent="center"
									alignItems="center"
								>
									<Image src={post.imageURL} alt="profile post" />
								</Flex>

								{/* Right Section */}
								<Flex
									flex={1}
									flexDir="column"
									px={10}
									display={{ base: "none", md: "flex" }}
								>
									{/* Header */}
									<Flex alignItems="center" justifyContent="space-between">
										<Flex alignItems="center" gap={4}>
											<Avatar
												src={userProfile.profilePicURL}
												size="sm"
												name="As a Programmer"
											/>
											<Text fontWeight="bold" fontSize={12}>
												{userProfile.username}
											</Text>
										</Flex>
										{authUser?.uid === userProfile.uid && (
											<Button
												size="sm"
												bg="transparent"
												_hover={{
													bg: "whiteAlpha.300",
													color: "red.600",
												}}
												borderRadius={4}
												p={1}
												onClick={handleDeletePost}
												isLoading={isDeleting}
											>
												<MdDelete size={20} cursor="pointer" />
											</Button>
										)}
									</Flex>

									{/* <Divider my={4} bg="gray.500" /> */}

									{/* Content */}
									<VStack
										w="full"
										alignItems="start"
										maxH="350px"
										overflowY="auto"
									>
										{/* Caption */}
										{post.caption && <Caption post={post} />}
										{/* Comments */}
										{post.comments.map((comment) => (
											<Comment key={comment.id} comment={comment} />
										))}
									</VStack>

									{/* <Divider my={4} bg="gray.800" /> */}

									{/* Footer */}
									<PostFooter isProfilePage={true} post={post} />
								</Flex>
							</Flex>
						</DialogBody>
					</DialogContent>
				</DialogRoot>
			)}
		</>
	);
};

export default ProfilePost;










// import {
// 	Button,
// 	Flex,
// 	GridItem,
// 	Image,
// 	Text,
// 	VStack,
// 	useDisclosure,
// } from "@chakra-ui/react";
// import { Avatar } from "@/components/ui/avatar"
// import {
// 	Modal,
// 	ModalOverlay,
// 	ModalContent,
// 	ModalHeader,
// 	ModalFooter,
// 	ModalBody,
// 	ModalCloseButton,
//   } from '@chakra-ui/react'
// import Modal from "../Modals/Modal";
// import { AiFillHeart } from "react-icons/ai";
// import Comment from "../Comment/Comment";
// import PostFooter from "../FeedPosts/PostFooter";
// import { FaComment } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// import { useState } from "react";
// import { useEffect } from 'react';
// import { createPortal } from 'react-dom';

// First, add this CSS to your styles file
// const modalStyles = {
//   overlay: {
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(0, 0, 0, 0.7)',
//     zIndex: 1000,
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   modal: {
//     position: 'relative',
//     backgroundColor: 'black',
//     borderRadius: '4px',
//     width: '90%',
//     maxWidth: '1200px',
//     maxHeight: '90vh',
//     margin: '20px',
//   },
//   closeButton: {
//     position: 'absolute',
//     top: '10px',
//     right: '10px',
//     background: 'transparent',
//     border: 'none',
//     color: 'white',
//     cursor: 'pointer',
//     fontSize: '24px',
//     zIndex: 1,
//   }
// };

// const CustomModal = ({ isOpen, onClose, children }) => {
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//     }
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [isOpen]);

//   if (!isOpen) return null;

//   return createPortal(
//     <div 
//       style={modalStyles.overlay} 
//       onClick={onClose}
//     >
//       <div 
//         style={modalStyles.modal} 
//         onClick={e => e.stopPropagation()}
//       >
//         <button 
//           style={modalStyles.closeButton}
//           onClick={onClose}
//         >
//           ×
//         </button>
//         {children}
//       </div>
//     </div>,
//     document.body
//   );
// };

// const ProfilePost = ({ img }) => {
// 	const [isOpen, setIsOpen] = useState(false);
  
// 	const onOpen = () => setIsOpen(true);
// 	const onClose = () => setIsOpen(false);
// 	return (
// 		<>
// 			<GridItem
// 				cursor={"pointer"}
// 				borderRadius={4}
// 				overflow={"hidden"}
// 				border={"1px solid"}
// 				borderColor={"whiteAlpha.300"}
// 				position={"relative"}
// 				aspectRatio={1 / 1}
// 				onClick={onOpen}
// 			>
// 				<Flex
// 					opacity={0}
// 					_hover={{ opacity: 1 }}
// 					position={"absolute"}
// 					top={0}
// 					left={0}
// 					right={0}
// 					bottom={0}
// 					bg={"blackAlpha.700"}
// 					transition={"all 0.3s ease"}
// 					zIndex={1}
// 					justifyContent={"center"}
// 				>
// 					<Flex alignItems={"center"} justifyContent={"center"} gap={50}>
// 						<Flex>
// 							<AiFillHeart size={20} />
// 							<Text fontWeight={"bold"} ml={2}>
// 								7
// 							</Text>
// 						</Flex>

// 						<Flex>
// 							<FaComment size={20} />
// 							<Text fontWeight={"bold"} ml={2}>
// 								7
// 							</Text>
// 						</Flex>
// 					</Flex>
// 				</Flex>

// 				<Image src={img} alt='profile post' w={"100%"} h={"100%"} objectFit={"cover"} />
// 			</GridItem>

// 			<Modal isOpen={isOpen} onClose={onClose}>
//         <Flex
//           gap='4'
//           w={{ base: "90%", sm: "70%", md: "full" }}
//           mx={"auto"}
//           maxH={"90vh"}
//           minH={"50vh"}
//         >
//           <Flex
//             borderRadius={4}
//             overflow={"hidden"}
//             border={"1px solid"}
//             borderColor={"whiteAlpha.300"}
//             flex={1.5}
//             justifyContent={"center"}
//             alignItems={"center"}
//           >
//             <Image src={img} alt='profile post' />
//           </Flex>
//           <Flex 
//             flex={1} 
//             flexDir={"column"} 
//             px={10} 
//             display={{ base: "none", md: "flex" }}
//             divideY="1px"
//             divideColor="gray.500"
//           >
//             <Flex alignItems={"center"} justifyContent={"space-between"}>
//               <Flex alignItems={"center"} gap={4}>
//                 <Avatar src={"/profile.png"} size={"sm"} name='As a Programmer' />
//                 <Text fontWeight={"bold"} fontSize={12}>
//                   as a programmer
//                 </Text>
//               </Flex>
//             </Flex>

//             <VStack w='full' alignItems={"start"} maxH={"350px"} overflowY={"auto"}>
//               <Comment 
//                 createdAt='1d ago'
//                 username='as a programmer'
//                 profilePic='/img1.png'
//                 text={"Dummy images from upstairs"}
//               />
//               <Comment 
//                 createdAt='1d ago'
//                 username='as a programmer'
//                 profilePic='/img2.png'
//                 text={"Dummy images from upstairs"}
//               />
//               <Comment 
//                 createdAt='1d ago'
//                 username='as a programmer'
//                 profilePic='/img3.png'
//                 text={"Dummy images from upstairs"}
//               />
//             </VStack>

//             <PostFooter isProfilePage={true} />
//           </Flex>
//         </Flex>
//       </Modal>
// 		</>
// 	);
// };
 

// export default ProfilePost

