import { Button, ButtonGroup } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { AddIcon, SettingsIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Spacer } from "@chakra-ui/layout";
import { useColorMode } from "@chakra-ui/react";
import router from "next/dist/client/router";
import Link from "next/link";
import { FiChevronLeft, FiExternalLink } from "react-icons/fi";
import { ActionButtonProps } from "../../shared/interfaces/ActionButtonProps";
import { colors } from "../../styles/customTheme";

interface HeadingActionButtonProps {
  title: string;
  app_link?: string;
  backRoute: string;
}

export const BASE_URL = "/user/apps";

export const HeadingActionButton: React.FC<HeadingActionButtonProps> = ({
  title,
  app_link,
  backRoute,
}) => {
  const baseButtom = {
    p: "4",
    variant: "outline",
    color: colors.light.Nord6,
    _hover: {},
  };
  const { colorMode } = useColorMode();
  const preConfiguredApps = {
    href: `${BASE_URL}/plugins`,
    backgroundColor: colors.aurora.Nord10,
    label: "Apps Pré-configurados",
    icon: <SettingsIcon m="1" />,
    ...baseButtom,
  };

  const newApps = {
    href: `${BASE_URL}/newapp`,
    backgroundColor: colors.aurora.Nord14,
    label: "Nova Aplicação",
    icon: <AddIcon m="1" />,
    ...baseButtom,
  };

  const RenderButton: React.FC<ActionButtonProps> = (
    props: ActionButtonProps
  ) => (
    <Link href={props.href}>
      <Button {...props}>
        {props.label}
        {props.icon}
      </Button>
    </Link>
  );

  return (
    <Flex mb={10} width="full">
      <Flex p={4} justifyContent="space-evenly" alignItems="center">
        {title !== "Aplicações conectadas" && (
          <Button
            mr={"4"}
            as="a"
            _hover={{ cursor: "pointer" }}
            color={
              colorMode === "dark" ? colors.light.Nord6 : colors.dark.Nord2
            }
            onClick={() => {
              router.push(backRoute);
            }}
          >
            <Icon
              as={FiChevronLeft}
              boxSize={6}
              _hover={{ cursor: "pointer" }}
            />
          </Button>
        )}
        <Heading size="md">{title}</Heading>
        {app_link ? (
          <Flex ml={5} mb={1}>
            <Link href={app_link} passHref={true}>
              <Button rightIcon={<FiExternalLink />} variant="outline">
                Acessar
              </Button>
            </Link>
          </Flex>
        ) : (
          ""
        )}
      </Flex>
      <Spacer />
      <Box>
        <ButtonGroup size="md" mr="16">
          <RenderButton {...preConfiguredApps} />
          <RenderButton {...newApps} />
        </ButtonGroup>
      </Box>
    </Flex>
  );
};
