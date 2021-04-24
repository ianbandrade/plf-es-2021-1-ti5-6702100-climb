import { Icon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { AiFillGithub } from "react-icons/ai";
import { RiGitlabFill } from "react-icons/ri";
import apiClient from "../../shared/api/api-client";
import { setCurrentUser } from "../../shared/auth/localStorageManager";
import { User } from "../../shared/interfaces/user";
import { getMessages } from "../../shared/utils/toast-messages";
import { colors } from "../../styles/customTheme";

const LIGHT = "light";
const GITHUB_OAUTH = "https://github.com/login/oauth/authorize?";
const GITLAB_OAUTH = "https://gitlab.com/oauth/authorize?";

const redirectUrl = process.env.NEXT_PUBLIC_GIT_REDIRECT_URL || "";

const GITHUB_PARAMS = new URLSearchParams({
  state: "github",
  scope: process.env.NEXT_PUBLIC_GITHUB_SCOPE || "",
  client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || "",
  redirect_uri: redirectUrl,
}).toString();

const GITLAB_PARAMS = new URLSearchParams({
  state: "gitlab",
  response_type: "code",
  scope: process.env.NEXT_PUBLIC_GITLAB_SCOPE || "",
  client_id: process.env.NEXT_PUBLIC_GITLAB_CLIENT_ID || "",
  redirect_uri: redirectUrl,
}).toString();

interface ProfileProps {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

const Profile = ({ user, setUser }: ProfileProps) => {
  const toast = useToast();
  const router = useRouter();
  const { code, state } = router.query;

  useEffect(() => {
    if (code) {
      const body = { code, redirectUrl };

      apiClient
        .post(`/version-control/${state}`, body)
        .then(async (res) => {
          const me = user;
          setCurrentUser(me);
          setUser(me);

          getMessages(res.data).forEach((description, i) =>
            toast({
              title: "Sucesso!",
              description,
              position: "bottom-left",
              status: "success",
              id: i,
            })
          );
        })
        .catch((e) => {
          getMessages(e?.response?.data).forEach((description, i) =>
            toast({
              title: "Erro!",
              description,
              position: "bottom-left",
              status: "error",
              id: i,
            })
          );
        });
    }
  }, [code]);

  const { colorMode } = useColorMode();

  const color =
    colorMode === LIGHT
      ? {
          buttonBg: colors.dark.Nord2,
          buttonTxt: colors.light.Nord6,
          buttonHv: colors.dark.Nord0,
          avatarBg: colors.light.Nord4,
        }
      : {
          buttonBg: colors.light.Nord6,
          buttonTxt: colors.dark.Nord2,
          buttonHv: colors.light.Nord4,
          avatarBg: colors.dark.Nord1,
        };

  const sites = [
    {
      site: "GitHub",
      icon: AiFillGithub,
      as: "a",
      href: `${GITHUB_OAUTH}${GITHUB_PARAMS}`,
      nick: user.gitHubAccount,
    },
    {
      site: "GitLab",
      icon: RiGitlabFill,
      iconColor: "#E24329",
      as: "a",
      href: `${GITLAB_OAUTH}${GITLAB_PARAMS}`,
      nick: user.gitLabAccount,
    },
  ];

  const integrationButtons = sites.map((integration) =>
    integration.nick ? (
      <Button
        _hover={{ bgColor: !integration.nick ? color.buttonHv : undefined }}
        bgColor={!integration.nick ? color.buttonBg : undefined}
        color={!integration.nick ? color.buttonTxt : color.buttonBg}
        disabled={!!integration.nick}
        key={integration.site}
        variant={!integration.nick ? "solid" : "ghost"}
        mt={2}
        mb={5}
      >
        <Icon
          as={integration.icon}
          mr="5px"
          boxSize="24px"
          color={integration.iconColor}
        />
        {integration.nick ?? integration.site}
      </Button>
    ) : (
      <Button
        _hover={{ bgColor: !integration.nick ? color.buttonHv : undefined }}
        bgColor={!integration.nick ? color.buttonBg : undefined}
        color={!integration.nick ? color.buttonTxt : color.buttonBg}
        disabled={!!integration.nick}
        key={integration.site}
        as="a"
        href={integration.href}
        variant={!integration.nick ? "solid" : "ghost"}
        mt={1}
        mb={6}
      >
        <Icon
          as={integration.icon}
          mr="5px"
          boxSize="24px"
          color={integration.iconColor}
        />
        {integration.nick ?? integration.site}
      </Button>
    )
  );

  return (
    <Flex ml="150px" mt="30px" justifyContent="center">
      <Box mr={5}>
        <Avatar width={120} height={120} bgColor={color.avatarBg} />
        <Heading mt={2} textAlign="center">
          {user.name}
        </Heading>
      </Box>
      <Flex flexDir="column">{integrationButtons}</Flex>
    </Flex>
  );
};

export default Profile;
