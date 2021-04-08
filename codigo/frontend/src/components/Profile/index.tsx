import { Icon } from "@chakra-ui/icons";
import { Avatar, Button, Flex, Heading, useColorMode } from "@chakra-ui/react";
import { AiFillGithub } from "react-icons/ai";
import { RiGitlabFill } from "react-icons/ri";
import { colors } from "../../styles/customTheme";
import { useRouter } from "next/router";
import axios from "axios";

const LIGHT = "light";
const GITHUB_OAUTH = "https://github.com/login/oauth/authorize?";
const GITLAB_OAUTH = "https://gitlab.com/oauth/authorize?";

const redirectUrl = process.env.NEXT_PUBLIC_GIT_REDIRECT_URL || "";

const GITHUB_PARAMS = new URLSearchParams({
  state: 'github',
  scope: process.env.NEXT_PUBLIC_GITHUB_SCOPE || "",
  client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || "",
  redirect_uri: redirectUrl,
}).toString();

const GITLAB_PARAMS = new URLSearchParams({
  state: 'gitlab',
  response_type: 'code',
  scope: process.env.NEXT_PUBLIC_GITLAB_SCOPE || "",
  client_id: process.env.NEXT_PUBLIC_GITLAB_CLIENT_ID || "",
  redirect_uri: redirectUrl,
}).toString();

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

  const router = useRouter();
  const { code, state } = router.query;

  if (code) {
    const message = axios.post(`http://${process.env.NEXT_PUBLIC_API_HOST}/auth/signin`, {
      "email": "admin@example.com",
      "password": "password"
    }).then(response => response.data?.token).then(token =>
      axios.post(`http://${process.env.NEXT_PUBLIC_API_HOST}/version-control/${state}`,
        { code, redirectUrl, }, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(response => response.data?.message));
  }

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

  const sites = [{
    site: "GitHub", "icon": AiFillGithub,
    as: "a", href: `${GITHUB_OAUTH}${GITHUB_PARAMS}`,
  },
  {
    site: "GitLab", icon: RiGitlabFill, iconColor: "#E24329", as: "a", href: `${GITLAB_OAUTH}${GITLAB_PARAMS}`,
  }]


  const integrationButtons = sites
    .map(integration =>
      <Button
        _hover={{ bgColor: color.buttonHv }}
        bgColor={color.buttonBg}
        color={color.buttonTxt}
        key={integration.site}
        as="a"
        href={integration.href}

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
