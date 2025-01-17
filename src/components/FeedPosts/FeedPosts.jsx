import { Box, Container, Flex, Text, VStack } from "@chakra-ui/react";
import { Skeleton, SkeletonCircle } from "@/components/ui/skeleton"
import FeedPost from "./FeedPost";
import { useState, useEffect } from "react";


const FeedPosts = () => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 2000);
	}, []);

	return (
		<Container maxW={"container.sm"} py={10} px={2}>
			{/* {isLoading &&
				[0, 1, 2].map((_, idx) => (
					<VStack key={idx} gap={4} alignItems={"flex-start"} mb={10}>
						<Flex gap='2'>
							<SkeletonCircle size='10' />
							<VStack gap={2} alignItems={"flex-start"}>
								<Skeleton height='10px' w={"200px"} />
								<Skeleton height='10px' w={"200px"} />
							</VStack>
						</Flex>
						<Skeleton w={"full"}>
							<Box h={"400px"}>contents wrapped</Box>
						</Skeleton>
					</VStack>
				))}

			{!isLoading && posts.length > 0 && posts.map((post) => <FeedPost key={post.id} post={post} />)}
			{!isLoading && posts.length === 0 && (
				<>
					<Text fontSize={"md"} color={"red.400"}>
						Dayuum. Looks like you don&apos;t have any friends.
					</Text>
					<Text color={"red.400"}>Stop coding and go make some!!</Text>
				</>
			)} */}
			{isLoading &&
				[0, 1, 2].map((_, idx) => (
					<VStack key={idx} gap={4} alignItems={"flex-start"} mb={10}>
						<Flex gap='2'>
							<SkeletonCircle size='10' />
							<VStack gap={2} alignItems={"flex-start"}>
								<Skeleton height='10px' w={"200px"} />
								<Skeleton height='10px' w={"200px"} />
							</VStack>
						</Flex>
						<Skeleton w={"full"}>
							<Box h={"400px"}>contents wrapped</Box>
						</Skeleton>
					</VStack>
				))}

				{!isLoading &&(
                  <>
				    <FeedPost img ="/img1.png" username="Priyanshu" avatar="/img1.png"/>
                    <FeedPost img ="/img2.png" username="sharmaji" avatar="/img2.png"/>
                    <FeedPost img ="/img3.png" username="John Doe" avatar="/img3.png"/>
                    <FeedPost img ="/img4.png" username="John Doe" avatar="/img4.png"/>
				  </>
				)}

            
		</Container>
	);
};

export default FeedPosts;
