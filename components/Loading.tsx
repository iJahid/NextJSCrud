import { Box, Center, Flex, Spinner } from "@chakra-ui/react";

export default function Loading({ msg }) {
  return (
    <>
      <Center height={"100vh"}>
        <Spinner
          thickness="6px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />

        {msg != "" ? <Box margin={3}>{msg}</Box> : ""}
      </Center>
    </>
  );
}
