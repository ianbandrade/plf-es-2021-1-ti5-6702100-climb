import { Flex, Heading } from "@chakra-ui/react";
import { HiEmojiSad } from "react-icons/hi";
const NotLinkedGit = () => {
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      flex={1}
      mt="50"
      width="full"
    >
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <HiEmojiSad size="70" />
        <Heading fontSize={30}>Nenhum repositório encontrado</Heading>
      </Flex>
    </Flex>
  );
};

export default NotLinkedGit;
