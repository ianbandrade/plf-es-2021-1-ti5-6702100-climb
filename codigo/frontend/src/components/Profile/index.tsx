import { Icon } from "@chakra-ui/icons";
import { Avatar, Button, Flex, Heading, useColorMode } from "@chakra-ui/react";
import { AiFillGithub } from "react-icons/ai";
import { RiGitlabFill } from "react-icons/ri";
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

  const color = colorMode === LIGHT ?
    {
      buttonBg: colors.dark.Nord2,
      buttonTxt: colors.light.Nord6,
      buttonHv: colors.dark.Nord0,
      avatarBg: colors.light.Nord4
    } : {
      buttonBg: colors.light.Nord6,
      buttonTxt: colors.dark.Nord2,
      buttonHv: colors.light.Nord4,
      avatarBg: colors.dark.Nord1
    }

  const sites = [{ site: "GitHub", "icon": AiFillGithub },
  { site: "GitLab", icon: RiGitlabFill, iconColor: "#E24329"}]

  const integrationButtons = sites
    .map(integration =>
      <Button
        _hover={{ bgColor: color.buttonHv }}
        bgColor={color.buttonBg}
        color={color.buttonTxt}
        key={integration.site}
      >
        <Icon as={integration.icon} mr="10px" boxSize="24px" color={integration.iconColor} />
        {integration.site}
      </Button>
    )

  return (
    <Flex ml="150px" mt="30px">
      <Flex>
        <Avatar
          width="100px"
          height="100px"
          mr="18px"
          bgColor={color.avatarBg}
        />
      </Flex>
      <Flex flexDirection="column">
        <Heading>{name}</Heading>
        <Flex mt="15px" justifyContent="space-between" width="250px">
          {integrationButtons}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Profile;
