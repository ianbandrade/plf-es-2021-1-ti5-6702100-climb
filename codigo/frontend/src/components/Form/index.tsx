import { ReactNode } from "react";
import { FormControl, Text } from "@chakra-ui/react";
import { colors } from "../../styles/customTheme";
import { useColorMode } from "@chakra-ui/color-mode";

const LIGHT = "light";
interface FormProps {
  children?: ReactNode;
  formTitle?: string;
  style?: {
    bgColor?: string;
    textColor?: string;
    boxShadow?: string;
    rounded?: string;
  };
}

const Form = ({ children, style, formTitle }: FormProps) => {
  const { colorMode } = useColorMode();

  return (
    <FormControl
      as="form"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      backgroundColor={style?.bgColor}
      maxWidth="390px"
      maxHeight="450px"
      minWidth="350px"
      minHeight="400px"
      width="25%"
      mr="8%"
      padding="25px"
      borderRadius="20"
      fontFamily="Alatsi"
      boxShadow={style?.boxShadow}
      rounded={style?.rounded}
    >
      <Text
        fontWeight={"semibold"}
        fontSize="40px"
        marginBottom="5%"
        color={style?.textColor}
      >
        {formTitle}
      </Text>
      {children}
    </FormControl>
  );
};

export default Form;
