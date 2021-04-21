import { Button, ButtonGroup } from "@chakra-ui/button";
import { AddIcon, SettingsIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Spacer } from "@chakra-ui/layout";
import {
  ActionButtonProps
} from "../../shared/interfaces/ActionButtonProps";
import { colors } from "../../styles/customTheme";

interface HeadingActionButtonProps{
  title:string;
}

export const BASE_URL = "/user/apps";

export const HeadingActionButton: React.FC<HeadingActionButtonProps> = ({
  title,
}) => {
  const baseButtom = {
    p: "4",
    variant: "outline",
    color: colors.light.Nord6,
    _hover: {},
  };

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
    <Button as="a" {...props}>
      {props.label}
      {props.icon}
    </Button>
  );

  return (
    <Flex mb={10}>
      <Box p={4}>
        <Heading size="md">{title}</Heading>
      </Box>
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
