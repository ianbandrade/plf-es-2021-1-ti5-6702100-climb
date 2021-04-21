import { Button, ButtonGroup } from "@chakra-ui/button";
import { AddIcon, SettingsIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Spacer } from "@chakra-ui/layout";
import {
  ActionButtonProps,
  HeadingActionButtonProps,
} from "../../shared/interfaces/ActionButtonProps";
import { colors } from "../../styles/customTheme";

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
    backgroundColor: colors.aurora.Nord10,
    label: "Apps Pré-configurados",
    icon: <SettingsIcon m="1" />,
    ...baseButtom,
  };

  const newApps = {
    backgroundColor: colors.aurora.Nord14,
    label: "Nova Aplicação",
    icon: <AddIcon m="1" />,
    ...baseButtom,
  };

  const RenderButton: React.FC<ActionButtonProps> = (
    props: ActionButtonProps
  ) => (
    <Button {...props}>
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
