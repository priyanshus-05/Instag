import { useState } from "react";
import { Button, Flex, Text, VStack } from "@chakra-ui/react";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import useFollowUser from "../../hooks/useFollowUser";
import { Avatar, AvatarGroup } from "@/components/ui/avatar";
import {
  DialogRoot,
  DialogTrigger,
} from "@/components/ui/dialog"; // Import DialogRoot and DialogTrigger
import EditProfile from "./EditProfile";

const ProfileHeader = () => {
  const { userProfile } = useUserProfileStore();
  const authUser = useAuthStore((state) => state.user);
  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(
    userProfile?.uid
  );

  const visitingOwnProfileAndAuth =
    authUser && authUser.username === userProfile.username;
  const visitingAnotherProfileAndAuth =
    authUser && authUser.username !== userProfile.username;

  const [isOpen, setIsOpen] = useState(false); // State to manage dialog visibility

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <Flex gap={{ base: 4, sm: 10 }} py={10} direction={{ base: "column", sm: "row" }}>
      <AvatarGroup
        size={{ base: "xl", md: "2xl" }}
        justifySelf={"center"}
        alignSelf={"flex-start"}
        mx={"auto"}
      >
        <Avatar src={userProfile.profilePicURL} alt="As a programmer logo" />
      </AvatarGroup>

      <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
        <Flex
          gap={4}
          direction={{ base: "column", sm: "row" }}
          justifyContent={{ base: "center", sm: "flex-start" }}
          alignItems={"center"}
          w={"full"}
        >
          <Text fontSize={{ base: "sm", md: "lg" }}>{userProfile.username}</Text>
          {visitingOwnProfileAndAuth && (
            <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
              <DialogRoot>
                <DialogTrigger asChild>
                  <Button
                    bg={"white"}
                    color={"black"}
                    _hover={{ bg: "whiteAlpha.800" }}
                    size={{ base: "xs", md: "sm" }}
                    onClick={onOpen} // Open dialog on click
                  >
                    Edit Profile
                  </Button>
                </DialogTrigger>
                <EditProfile isOpen={isOpen} onClose={onClose} />
              </DialogRoot>
            </Flex>
          )}
          {visitingAnotherProfileAndAuth && (
            <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
              <Button
                bg={"blue.500"}
                color={"white"}
                _hover={{ bg: "blue.600" }}
                size={{ base: "xs", md: "sm" }}
                onClick={handleFollowUser}
                isLoading={isUpdating}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </Button>
            </Flex>
          )}
        </Flex>

        <Flex alignItems={"center"} gap={{ base: 2, sm: 4 }}>
          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as="span" fontWeight={"bold"} mr={1}>
              {userProfile.posts.length}
            </Text>
            Posts
          </Text>
          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as="span" fontWeight={"bold"} mr={1}>
              {userProfile.followers.length}
            </Text>
            Followers
          </Text>
          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as="span" fontWeight={"bold"} mr={1}>
              {userProfile.following.length}
            </Text>
            Following
          </Text>
        </Flex>
        <Flex alignItems={"center"} gap={4}>
          <Text fontSize={"sm"} fontWeight={"bold"}>
            {userProfile.fullName}
          </Text>
        </Flex>
        <Text fontSize={"sm"}>{userProfile.bio}</Text>
      </VStack>
    </Flex>
  );
};

// export default ProfileHeader;


// export default ProfileHeader;

// import { useState } from "react";
// import { Button, Flex, Text, VStack } from "@chakra-ui/react";
// import useUserProfileStore from "../../store/userProfileStore";
// import useAuthStore from "../../store/authStore";
// // import EditProfile from "./EditProfile";
// import useFollowUser from "../../hooks/useFollowUser";
// import { Avatar, AvatarGroup } from "@/components/ui/avatar"
// import UserProfileEdit from './EditProfile';

// const ProfileHeader = () => {
// 	const { userProfile } = useUserProfileStore();
// 	const authUser = useAuthStore((state) => state.user);
// 	const [isOpen, setIsOpen] = useState(false);
// 	const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(userProfile?.uid);
// 	const visitingOwnProfileAndAuth = authUser && authUser.username === userProfile.username;
// 	const visitingAnotherProfileAndAuth = authUser && authUser.username !== userProfile.username;

// 	const onOpen = () => setIsOpen(true);
// 	const onClose = () => setIsOpen(false);

// 	return (
// 		<Flex gap={{ base: 4, sm: 10 }} py={10} direction={{ base: "column", sm: "row" }}>
// 			<AvatarGroup size={{ base: "xl", md: "2xl" }} justifySelf={"center"} alignSelf={"flex-start"} mx={"auto"}>
// 				<Avatar src={userProfile.profilePicURL} alt='As a programmer logo' />
// 			</AvatarGroup>

// 			<VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
// 				<Flex
// 					gap={4}
// 					direction={{ base: "column", sm: "row" }}
// 					justifyContent={{ base: "center", sm: "flex-start" }}
// 					alignItems={"center"}
// 					w={"full"}
// 				>
// 					<Text fontSize={{ base: "sm", md: "lg" }}>{userProfile.username}</Text>
// 					{visitingOwnProfileAndAuth && (
// 						<Flex gap={4} alignItems={"center"} justifyContent={"center"}>
// 							<Button
// 								bg={"white"}
// 								color={"black"}
// 								_hover={{ bg: "whiteAlpha.800" }}
// 								size={{ base: "xs", md: "sm" }}
// 								onClick={onOpen}
// 							>
// 								Edit Profile
// 							</Button>
// 						</Flex>
// 					)}
// 					{visitingAnotherProfileAndAuth && (
// 						<Flex gap={4} alignItems={"center"} justifyContent={"center"}>
// 							<Button
// 								bg={"blue.500"}
// 								color={"white"}
// 								_hover={{ bg: "blue.600" }}
// 								size={{ base: "xs", md: "sm" }}
// 								onClick={handleFollowUser}
// 								isLoading={isUpdating}
// 							>
// 								{isFollowing ? "Unfollow" : "Follow"}
// 							</Button>
// 						</Flex>
// 					)}
// 				</Flex>

// 				<Flex alignItems={"center"} gap={{ base: 2, sm: 4 }}>
// 					<Text fontSize={{ base: "xs", md: "sm" }}>
// 						<Text as='span' fontWeight={"bold"} mr={1}>
// 							{userProfile.posts.length}
// 						</Text>
// 						Posts
// 					</Text>
// 					<Text fontSize={{ base: "xs", md: "sm" }}>
// 						<Text as='span' fontWeight={"bold"} mr={1}>
// 							{userProfile.followers.length}
// 						</Text>
// 						Followers
// 					</Text>
// 					<Text fontSize={{ base: "xs", md: "sm" }}>
// 						<Text as='span' fontWeight={"bold"} mr={1}>
// 							{userProfile.following.length}
// 						</Text>
// 						Following
// 					</Text>
// 				</Flex>
// 				<Flex alignItems={"center"} gap={4}>
// 					<Text fontSize={"sm"} fontWeight={"bold"}>
// 						{userProfile.fullName}
// 					</Text>
// 				</Flex>
// 				<Text fontSize={"sm"}>{userProfile.bio}</Text>
// 			</VStack>
// 			{isOpen && <UserProfileEdit isOpen={isOpen} onClose={onClose} />}
// 		</Flex>
// 	);
// };

// export default ProfileHeader;



// const ProfileHeader = () => {
// 	return (
// 		<Flex gap={{ base: 4, sm: 10 }} py={10} direction={{ base: "column", sm: "row" }}>
// 		  <AvatarGroup size={{ base: "xl", md: "2xl" }} justifySelf={"center"} alignSelf={"flex-start"} mx={"auto"}>
// 			<Avatar name="As a Programmer" src="/profilepic.png" alt="As a programmer logo" />
// 		  </AvatarGroup>
	  
// 		  <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
// 			<Flex
// 			  gap={4}
// 			  direction={{ base: "column", sm: "row" }}
// 			  justifyContent={{ base: "center", sm: "flex-start" }}
// 			  alignItems={"center"}
// 			  w={"full"}
// 			>
// 			  <Text fontSize={{ base: "sm", md: "lg" }}>asaprogrammer_</Text>
// 			  <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
// 				<Button bg={"white"} color={"black"} _hover={{ bg: "whiteAlpha.800" }} size={{ base: "xs", md: "sm" }}>
// 				  Edit Profile
// 				</Button>
// 			  </Flex>
// 			</Flex>
	  
// 			<Flex alignItems={"center"} gap={{base:2,sm:4}}>
// 			<Text fontSize={{base:"xs", md:"sm"}}>
//               <Text as='span' fontWeight={"bold"} mr={1}>4</Text>
//               Posts
// 			  </Text>
//               <Text fontSize={{base:"xs", md:"sm"}}>
//               <Text as='span' fontWeight={"bold"} mr={1}>149</Text>
//               Followers
// 			  </Text>
              
//               <Text fontSize={{base:"xs", md:"sm"}}>
//               <Text as='span' fontWeight={"bold"} mr={1}>175</Text>
//               Following
// 			  </Text>
              
//               <Text fontSize={"sm"} fontWeight={"bold"}>As a Programmer</Text>
// 			  </Flex>
// 			  <Flex>
// 				<Text fontSize={"sm"} fontWeight={"bold"} >
// 					As a Programmer
// 				</Text>
// 			  </Flex>
// 			  <Text fontSize={"sm"} >
// 					Tutorials that are meant to level up your Skills as a Programmer
// 				</Text>
// 		      </VStack>
// 		      </Flex>
// 	         );
//         }

export default ProfileHeader