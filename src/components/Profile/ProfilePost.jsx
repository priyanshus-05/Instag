import {
	Button,
	Flex,
	GridItem,
	Image,
	Text,
	VStack,
	useDisclosure,
} from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar"
// import {
// 	Modal,
// 	ModalOverlay,
// 	ModalContent,
// 	ModalHeader,
// 	ModalFooter,
// 	ModalBody,
// 	ModalCloseButton,
//   } from '@chakra-ui/react'
import Modal from "../Modals/Modal";
import { AiFillHeart } from "react-icons/ai";
import Comment from "../Comment/Comment";
import PostFooter from "../FeedPosts/PostFooter";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

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

const ProfilePost = ({ img }) => {
	const [isOpen, setIsOpen] = useState(false);
  
	const onOpen = () => setIsOpen(true);
	const onClose = () => setIsOpen(false);
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
				onClick={onOpen}
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
								7
							</Text>
						</Flex>

						<Flex>
							<FaComment size={20} />
							<Text fontWeight={"bold"} ml={2}>
								7
							</Text>
						</Flex>
					</Flex>
				</Flex>

				<Image src={img} alt='profile post' w={"100%"} h={"100%"} objectFit={"cover"} />
			</GridItem>

			<Modal isOpen={isOpen} onClose={onClose}>
        <Flex
          gap='4'
          w={{ base: "90%", sm: "70%", md: "full" }}
          mx={"auto"}
          maxH={"90vh"}
          minH={"50vh"}
        >
          <Flex
            borderRadius={4}
            overflow={"hidden"}
            border={"1px solid"}
            borderColor={"whiteAlpha.300"}
            flex={1.5}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Image src={img} alt='profile post' />
          </Flex>
          <Flex 
            flex={1} 
            flexDir={"column"} 
            px={10} 
            display={{ base: "none", md: "flex" }}
            divideY="1px"
            divideColor="gray.500"
          >
            <Flex alignItems={"center"} justifyContent={"space-between"}>
              <Flex alignItems={"center"} gap={4}>
                <Avatar src={"/profile.png"} size={"sm"} name='As a Programmer' />
                <Text fontWeight={"bold"} fontSize={12}>
                  as a programmer
                </Text>
              </Flex>
            </Flex>

            <VStack w='full' alignItems={"start"} maxH={"350px"} overflowY={"auto"}>
              <Comment 
                createdAt='1d ago'
                username='as a programmer'
                profilePic='/img1.png'
                text={"Dummy images from upstairs"}
              />
              <Comment 
                createdAt='1d ago'
                username='as a programmer'
                profilePic='/img2.png'
                text={"Dummy images from upstairs"}
              />
              <Comment 
                createdAt='1d ago'
                username='as a programmer'
                profilePic='/img3.png'
                text={"Dummy images from upstairs"}
              />
            </VStack>

            <PostFooter isProfilePage={true} />
          </Flex>
        </Flex>
      </Modal>
		</>
	);
};
 

export default ProfilePost

