import { Flex, Avatar, Heading, Button } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";
import { AiFillGithub } from "react-icons/ai";
import { RiGitlabFill } from "react-icons/ri";
import { useColorMode } from "@chakra-ui/react";
import { colors } from "../../styles/customTheme";
const LIGHT = "light";

interface User {
  name: string;
  userName: string;
  githubAcc?: string;
  gitlabAcc?: string;
  image?: string;
}

interface ProfileProps {
  user: User;
}

const Profile = ({ user: { name, userName } }: ProfileProps) => {
  const { colorMode } = useColorMode();

  function handleButtonBgColor() {
    return colorMode === LIGHT ? colors.dark.Nord2 : colors.light.Nord6;
  }

  function handleButtonTextColor() {
    return colorMode === LIGHT ? colors.light.Nord6 : colors.dark.Nord2;
  }

  return (
    <Flex ml="150px" mt="30px">
      <Flex>
        <Avatar width="100px" height="100px" mr="18px" />
      </Flex>
      <Flex flexDirection="column">
        <Heading>{name}</Heading>
        <Flex mt="15px" justifyContent="space-between" width="250px">
          <Button
            bgColor={handleButtonBgColor()}
            color={handleButtonTextColor()}
          >
            <Icon as={AiFillGithub} mr="10px" boxSize="24px" />
            GitHub
          </Button>
          <Button
            bgColor={handleButtonBgColor()}
            color={handleButtonTextColor()}
          >
            <Icon as={RiGitlabFill} mr="10px" boxSize="24px" color="#E24329" />
            GitLab
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Profile;
