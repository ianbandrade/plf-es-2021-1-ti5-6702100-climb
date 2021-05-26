import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Icon } from "@chakra-ui/icons";
import { Button, Flex, useColorMode, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AiFillGithub } from "react-icons/ai";
import { RiGitlabFill } from "react-icons/ri";
import apiClient from "../../shared/api/api-client";
import { User } from "../../shared/interfaces/user";
import { authService } from "../../shared/services/authService";
import { colors } from "../../styles/customTheme";
import { getMessages } from "../../shared/utils/toast-messages";

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

interface GitButtonsProps {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  baseUrl: string;
}

const GitButtons = ({ user, setUser, baseUrl }: GitButtonsProps) => {
  const { colorMode } = useColorMode();
  const toast = useToast();
  const router = useRouter();
  const { code, state } = router.query;

  const toggleIntegrationButton = async (): Promise<void> => {
    if (code) {
      const body = { code, redirectUrl };

      await apiClient
        .post(`/version-control/${state}`, body)
        .then((res) => {
          authService.me().then((me) => {
            if (user) {
              setUser(user);
            } else {
              router.push(authService.LOGIN_PATH);
            }
          });

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
        })
        .finally(() => {
          router.replace(baseUrl);
        });
    }
  };

  useEffect(() => {
    toggleIntegrationButton();
  }, [code]);

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
  return <>{integrationButtons}</>;
};

export default GitButtons;
function setUser(user: User) {
  throw new Error("Function not implemented.");
}
