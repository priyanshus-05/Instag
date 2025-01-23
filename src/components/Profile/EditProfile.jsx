import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  Center,
  HStack,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { Avatar } from "@/components/ui/avatar";
import useAuthStore from "../../store/authStore";
import usePreviewImg from "../../hooks/usePreviewImg";
import useEditProfile from "../../hooks/useEditProfile";
import useShowToast from "../../hooks/useShowToast";

const EditProfile = ({ isOpen, onClose }) => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    bio: "",
    email: "",
  });

  const authUser = useAuthStore((state) => state.user);
  const fileRef = useRef(null);
  const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
  const { isUpdating, editProfile } = useEditProfile();
  const showToast = useShowToast();

  const handleEditProfile = async () => {
    try {
      await editProfile(inputs, selectedFile);
      setSelectedFile(null);
      onClose(); // Close the dialog after successful submission
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return (
    isOpen && (
      <DialogContent size="md">
        <Flex direction="column" bg="black" p={6} rounded="md" boxShadow="lg">
          <DialogHeader>
            <DialogTitle>
              <Heading size="lg" color="white">
                User Profile Edit
              </Heading>
            </DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Center>
              <Stack spacing={6} w="full" maxW="lg">
                {/* Avatar Section */}
                <Center position="relative">
                  <Avatar
                    size="2xl"
                    src={selectedFile || authUser.profilePicURL}
                    border="2px solid white"
                  />
                  <Input
                    type="file"
                    ref={fileRef}
                    hidden
                    onChange={handleImageChange}
                  />
                </Center>
                <Button
                  w="full"
                  colorScheme="gray"
                  variant="outline"
                  onClick={() => fileRef.current.click()}
                >
                  Change Profile Picture
                </Button>

                {/* Form Fields */}
                <Stack spacing={4}>
                  <Stack>
                    <Heading size="sm" color="gray.400">
                      Full Name
                    </Heading>
                    <Input
                      placeholder="Full Name"
                      bg="gray.800"
                      borderColor="gray.600"
                      color="white"
                      value={inputs.fullName !== undefined ? inputs.fullName : authUser.fullName}
                      onChange={(e) =>
                        setInputs({ ...inputs, fullName: e.target.value })
                      }
                    />
                  </Stack>
                  <Stack>
                    <Heading size="sm" color="gray.400">
                      Username
                    </Heading>
                    <Input
                      placeholder="Username"
                      bg="gray.800"
                      borderColor="gray.600"
                      color="white"
                      value={inputs.username !== undefined ? inputs.username : authUser.username}
                      onChange={(e) =>
                        setInputs({ ...inputs, username: e.target.value })
                      }
                    />
                  </Stack>
                  <Stack>
                    <Heading size="sm" color="gray.400">
                      Email Address
                    </Heading>
                    <Input
                      placeholder="your-email@example.com"
                      bg="gray.800"
                      borderColor="gray.600"
                      color="white"
                      value={inputs.email}
                      onChange={(e) =>
                        setInputs({ ...inputs, email: e.target.value })
                      }
                    />
                  </Stack>
                  <Stack>
                    <Heading size="sm" color="gray.400">
                      Bio
                    </Heading>
                    <Input
                      placeholder="Bio"
                      bg="gray.800"
                      borderColor="gray.600"
                      color="white"
                      value={inputs.bio !== undefined ? inputs.bio : authUser.bio}
                      onChange={(e) =>
                        setInputs({ ...inputs, bio: e.target.value })
                      }
                    />
                  </Stack>
                </Stack>
              </Stack>
            </Center>
          </DialogBody>
          <DialogFooter>
            <HStack spacing={4} justify="flex-end">
              <Button colorScheme="red" onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                isLoading={isUpdating}
                onClick={handleEditProfile}
              >
                Submit
              </Button>
            </HStack>
          </DialogFooter>
        </Flex>
      </DialogContent>
    )
  );
};

export default EditProfile;

// import {
//   Button,
//   Flex,
//   Heading,
//   Input,
//   Stack,
//   // useColorModeValue,
//   HStack,
//   Badge,
//   IconButton,
//   Center,
// } from '@chakra-ui/react'
// import {
//   FormControl,
//   FormLabel,
// } from "@chakra-ui/form-control"
// import { useColorModeValue } from "@/components/ui/color-mode"
// import { CloseButton } from "@/components/ui/close-button"
// // import { SmallCloseIcon } from '@chakra-ui/icons'
// import { Avatar } from "@/components/ui/avatar"
// export default function UserProfileEdit() {
//   return (
//     <Flex
//       minH={'100vh'}  
//       align={'center'}
//       justify={'center'}
//       bg={useColorModeValue('gray.50', 'gray.800')}>
//       <Stack
//         spacing={4}
//         w={'full'}
//         maxW={'md'}
//         bg={useColorModeValue('white', 'gray.700')}
//         rounded={'xl'}
//         boxShadow={'lg'}
//         p={6}
//         my={12}>
//         <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
//           User Profile Edit
//         </Heading>
//         <FormControl id="userName">
//           <FormLabel>User Icon</FormLabel>
//           <Stack direction={['column', 'row']} spacing={6}>
//             <Center>
//               <Avatar size="xl" src="https://bit.ly/sage-adebayo">
//                 <Badge
//                   as={IconButton}
//                   size="sm"
//                   rounded="full"
//                   top="-10px"
//                   colorScheme="red"
//                   aria-label="remove Image"
//                   icon={<CloseButton />}
//                 />
//               </Avatar>
//             </Center>
//             <Center w="full">
//               <Button w="full">Change Icon</Button>
//             </Center>
//           </Stack>
//         </FormControl>
//         <FormControl id="userName" isRequired>
//           <FormLabel>User name</FormLabel>
//           <Input
//             placeholder="UserName"
//             _placeholder={{ color: 'gray.500' }}
//             type="text"
//           />
//         </FormControl>
//         <FormControl id="email" isRequired>
//           <FormLabel>Email address</FormLabel>
//           <Input
//             placeholder="your-email@example.com"
//             _placeholder={{ color: 'gray.500' }}
//             type="email"
//           />
//         </FormControl>
//         <FormControl id="password" isRequired>
//           <FormLabel>Password</FormLabel>
//           <Input
//             placeholder="password"
//             _placeholder={{ color: 'gray.500' }}
//             type="password"
//           />
//         </FormControl>
//         <Stack spacing={6} direction={['column', 'row']}>
//           <Button
//             bg={'red.400'}
//             color={'white'}
//             w="full"
//             _hover={{
//               bg: 'red.500',
//             }}>
//             Cancel
//           </Button>
//           <Button
//             bg={'blue.400'}
//             color={'white'}
//             w="full"
//             _hover={{
//               bg: 'blue.500',
//             }}>
//             Submit
//           </Button>
//         </Stack>
//       </Stack>
//     </Flex>
//   )
// }

// import {
// 	Avatar,
// 	Button,
// 	Center,
// 	Flex,
// 	FormControl,
// 	FormLabel,
// 	Heading,
// 	Input,
// 	Modal,
// 	ModalBody,
// 	ModalCloseButton,
// 	ModalContent,
// 	ModalHeader,
// 	ModalOverlay,
// 	Stack,
// } from "@chakra-ui/react";
// import { useRef, useState } from "react";
// import useAuthStore from "../../store/authStore";
// import usePreviewImg from "../../hooks/usePreviewImg";
// import useEditProfile from "../../hooks/useEditProfile";
// import useShowToast from "../../hooks/useShowToast";

// const EditProfile = ({ isOpen, onClose }) => {
// 	const [inputs, setInputs] = useState({
// 		fullName: "",
// 		username: "",
// 		bio: "",
// 	});
// 	const authUser = useAuthStore((state) => state.user);
// 	const fileRef = useRef(null);
// 	const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
// 	const { isUpdating, editProfile } = useEditProfile();
// 	const showToast = useShowToast();

// 	const handleEditProfile = async () => {
// 		try {
// 			await editProfile(inputs, selectedFile);
// 			setSelectedFile(null);
// 			onClose();
// 		} catch (error) {
// 			showToast("Error", error.message, "error");
// 		}
// 	};

// 	return (
// 		<>
// 			<Modal isOpen={isOpen} onClose={onClose}>
// 				<ModalOverlay />
// 				<ModalContent bg={"black"} boxShadow={"xl"} border={"1px solid gray"} mx={3}>
// 					<ModalHeader />
// 					<ModalCloseButton />
// 					<ModalBody>
// 						{/* Container Flex */}
// 						<Flex bg={"black"}>
// 							<Stack spacing={4} w={"full"} maxW={"md"} bg={"black"} p={6} my={0}>
// 								<Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
// 									Edit Profile
// 								</Heading>
// 								<FormControl>
// 									<Stack direction={["column", "row"]} spacing={6}>
// 										<Center>
// 											<Avatar
// 												size='xl'
// 												src={selectedFile || authUser.profilePicURL}
// 												border={"2px solid white "}
// 											/>
// 										</Center>
// 										<Center w='full'>
// 											<Button w='full' onClick={() => fileRef.current.click()}>
// 												Edit Profile Picture
// 											</Button>
// 										</Center>
// 										<Input type='file' hidden ref={fileRef} onChange={handleImageChange} />
// 									</Stack>
// 								</FormControl>

// 								<FormControl>
// 									<FormLabel fontSize={"sm"}>Full Name</FormLabel>
// 									<Input
// 										placeholder={"Full Name"}
// 										size={"sm"}
// 										type={"text"}
// 										value={inputs.fullName || authUser.fullName}
// 										onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
// 									/>
// 								</FormControl>

// 								<FormControl>
// 									<FormLabel fontSize={"sm"}>Username</FormLabel>
// 									<Input
// 										placeholder={"Username"}
// 										size={"sm"}
// 										type={"text"}
// 										value={inputs.username || authUser.username}
// 										onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
// 									/>
// 								</FormControl>

// 								<FormControl>
// 									<FormLabel fontSize={"sm"}>Bio</FormLabel>
// 									<Input
// 										placeholder={"Bio"}
// 										size={"sm"}
// 										type={"text"}
// 										value={inputs.bio || authUser.bio}
// 										onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
// 									/>
// 								</FormControl>

// 								<Stack spacing={6} direction={["column", "row"]}>
// 									<Button
// 										bg={"red.400"}
// 										color={"white"}
// 										w='full'
// 										size='sm'
// 										_hover={{ bg: "red.500" }}
// 										onClick={onClose}
// 									>
// 										Cancel
// 									</Button>
// 									<Button
// 										bg={"blue.400"}
// 										color={"white"}
// 										size='sm'
// 										w='full'
// 										_hover={{ bg: "blue.500" }}
// 										onClick={handleEditProfile}
// 										isLoading={isUpdating}
// 									>
// 										Submit
// 									</Button>
// 								</Stack>
// 							</Stack>
// 						</Flex>
// 					</ModalBody>
// 				</ModalContent>
// 			</Modal>
// 		</>
// 	);
// };

// export default EditProfile;

// COPY AND PASTE IT AS THE STARTED EDIT PROFILE MODAL
// import {
// 	Avatar,
// 	Button,
// 	Center,
// 	Flex,
// 	FormControl,
// 	FormLabel,
// 	Heading,
// 	Input,
// 	Modal,
// 	ModalBody,
// 	ModalCloseButton,
// 	ModalContent,
// 	ModalHeader,
// 	ModalOverlay,
// 	Stack,
// } from "@chakra-ui/react";

// const EditProfile = ({ isOpen, onClose }) => {
// 	return (
// 		<>
// 			<Modal isOpen={isOpen} onClose={onClose}>
// 				<ModalOverlay />
// 				<ModalContent bg={"black"} boxShadow={"xl"} border={"1px solid gray"} mx={3}>
// 					<ModalHeader />
// 					<ModalCloseButton />
// 					<ModalBody>
// 						{/* Container Flex */}
// 						<Flex bg={"black"}>
// 							<Stack spacing={4} w={"full"} maxW={"md"} bg={"black"} p={6} my={0}>
// 								<Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
// 									Edit Profile
// 								</Heading>
// 								<FormControl>
// 									<Stack direction={["column", "row"]} spacing={6}>
// 										<Center>
// 											<Avatar size='xl' src={""} border={"2px solid white "} />
// 										</Center>
// 										<Center w='full'>
// 											<Button w='full'>Edit Profile Picture</Button>
// 										</Center>
// 									</Stack>
// 								</FormControl>

// 								<FormControl>
// 									<FormLabel fontSize={"sm"}>Full Name</FormLabel>
// 									<Input placeholder={"Full Name"} size={"sm"} type={"text"} />
// 								</FormControl>

// 								<FormControl>
// 									<FormLabel fontSize={"sm"}>Username</FormLabel>
// 									<Input placeholder={"Username"} size={"sm"} type={"text"} />
// 								</FormControl>

// 								<FormControl>
// 									<FormLabel fontSize={"sm"}>Bio</FormLabel>
// 									<Input placeholder={"Bio"} size={"sm"} type={"text"} />
// 								</FormControl>

// 								<Stack spacing={6} direction={["column", "row"]}>
// 									<Button
// 										bg={"red.400"}
// 										color={"white"}
// 										w='full'
// 										size='sm'
// 										_hover={{ bg: "red.500" }}
// 									>
// 										Cancel
// 									</Button>
// 									<Button
// 										bg={"blue.400"}
// 										color={"white"}
// 										size='sm'
// 										w='full'
// 										_hover={{ bg: "blue.500" }}
// 									>
// 										Submit
// 									</Button>
// 								</Stack>
// 							</Stack>
// 						</Flex>
// 					</ModalBody>
// 				</ModalContent>
// 			</Modal>
// 		</>
// 	);
// };

// export default EditProfile;

// import React from 'react'

// const EditProfile = () => {
//   return (
// 	<div>EditProfile</div>
//   )
// }

// export default EditProfile