import {
	Box,
	Button,
	Flex,
	Input,
	useDisclosure,
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
} from "@chakra-ui/form-control";
import { DialogRoot, DialogTrigger, DialogContent, DialogHeader, DialogBody, DialogFooter, DialogCloseTrigger, DialogTitle } from "@/components/ui/dialog";
import { SearchLogo } from "../../assets/constants";
import { Tooltip } from "@/components/ui/tooltip";
import useSearchUser from "../../hooks/useSearchUser";
import { useRef, useState } from "react";
import SuggestedUser from "../SuggestedUsers/SuggestedUser";

const Search = () => {
	const [isOpen, setIsOpen] = useState(false);
	const onOpen = () => setIsOpen(true); // ** Open the dialog **
	const onClose = () => setIsOpen(false); // ** Close the dialog **
	const searchRef = useRef(null);
	const { user, isLoading, getUserProfile, setUser } = useSearchUser();

	const handleSearchUser = (e) => {
		e.preventDefault();
		getUserProfile(searchRef.current.value);
	};

	console.log("Initial dialog open state:", isOpen);

	return (
		<>
			<Tooltip
				hasArrow
				label={"Search"}
				placement='right'
				ml={1}
				openDelay={500}
				display={{ base: "block", md: "none" }}
			>
				<Flex
					alignItems={"center"}
					gap={4}
					_hover={{ bg: "whiteAlpha.400" }}
					borderRadius={6}
					p={2}
					w={{ base: 10, md: "full" }}
					justifyContent={{ base: "center", md: "flex-start" }}
					onClick={onOpen} 
				>
					<SearchLogo />
					<Box display={{ base: "none", md: "block" }}>Search</Box>
				</Flex>
			</Tooltip>
           
			{isOpen && ( // ** Render the dialog conditionally based on isOpen **
        <DialogRoot open={isOpen} onOpenChange={onClose} size="md" motionPreset="slide-in-left">
          <DialogContent bg="black" border="1px solid gray" maxW="400px">
            <DialogHeader>
              <DialogTitle>Search User</DialogTitle>
			  <DialogCloseTrigger asChild>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Close
               </Button>
               </DialogCloseTrigger>
            </DialogHeader>

            <DialogBody pb={6}>
              <form onSubmit={handleSearchUser}>
                <FormControl>
                  <FormLabel>Username</FormLabel>
                  <Input placeholder="asaprogrammer" ref={searchRef} />
                </FormControl>

                <Flex w="full" justifyContent="flex-end">
                  <Button type="submit" ml="auto" size="sm" my={4} isLoading={isLoading}>
                    Search
                  </Button>
                </Flex>
              </form>

              {user && <SuggestedUser user={user} setUser={setUser} />}
            </DialogBody>
          </DialogContent>
        </DialogRoot>
      )}
		</>
	);
};

export default Search;

// COPY AND PASTE AS THE STARTER CODE FOR THE SEARCH COMPONENT
// import { Box, Flex, Tooltip } from "@chakra-ui/react";
// import { SearchLogo } from "../../assets/constants";

// const Search = () => {
// 	return (
// 		<>
// 			<Tooltip
// 				hasArrow
// 				label={"Search"}
// 				placement='right'
// 				ml={1}
// 				openDelay={500}
// 				display={{ base: "block", md: "none" }}
// 			>
// 				<Flex
// 					alignItems={"center"}
// 					gap={4}
// 					_hover={{ bg: "whiteAlpha.400" }}
// 					borderRadius={6}
// 					p={2}
// 					w={{ base: 10, md: "full" }}
// 					justifyContent={{ base: "center", md: "flex-start" }}
// 				>
// 					<SearchLogo />
// 					<Box display={{ base: "none", md: "block" }}>Search</Box>
// 				</Flex>
// 			</Tooltip>
// 		</>
// 	);
// };

// export default Search;

