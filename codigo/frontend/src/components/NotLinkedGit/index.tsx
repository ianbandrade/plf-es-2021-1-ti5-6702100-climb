import { Flex, Text } from "@chakra-ui/react";

interface NotLinkedGitProps {
  title: string;
}
const NotLinkedGit: React.FC<NotLinkedGitProps> = ({
  title,
  children,
}): JSX.Element => {
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
        <Text mt={5} fontSize="2xl" fontWeight="bold">
          {title}
        </Text>
        {children}
      </Flex>
    </Flex>
  );
};

export default NotLinkedGit;
