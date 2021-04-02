import { ReactNode } from "react";
import { FormControl, Text } from "@chakra-ui/react";
import { colors } from "../../styles/customTheme";
import { useColorMode } from "@chakra-ui/color-mode";

const LIGHT = "light";
interface LoginFormProps {
  formTitle: string;
  children?: ReactNode;
}

const LoginForm = ({ formTitle, children }: LoginFormProps) => {
  const { colorMode } = useColorMode();
  const formColor =
    colorMode === LIGHT ? colors.dark.Nord2 : colors.light.Nord6;
  const textColor =
    colorMode === LIGHT ? colors.light.Nord6 : colors.dark.Nord2;
  return (
    <FormControl
      as="form"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      backgroundColor={formColor}
      maxWidth="390px"
      maxHeight="450px"
      minWidth="350px"
      minHeight="400px"
      width="25%"
      mr="8%"
      padding="25px"
      borderRadius="20"
      fontFamily="Alatsi"
      boxShadow="dark-lg"
      rounded="md"
    >
      <Text
        fontWeight={"semibold"}
        fontSize="40px"
        marginBottom="5%"
        color={textColor}
      >
        {formTitle}
      </Text>
      {children}
    </FormControl>
  );
};

export default LoginForm;
