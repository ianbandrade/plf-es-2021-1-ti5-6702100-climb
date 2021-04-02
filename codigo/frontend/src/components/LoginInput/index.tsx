import { ReactNode } from "react";
import { FormLabel, Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import { colors } from "../../styles/customTheme";
import { useColorMode } from "@chakra-ui/color-mode";
const LIGHT = "light";

interface LoginInput {
  placeholder: string;
  icon?: ReactNode;
  label: string;
  value?: string;
  onChangeInput: Function;
}

const LoginInput = ({
  label,
  placeholder,
  icon,
  value,
  onChangeInput,
}: LoginInput) => {
  const { colorMode } = useColorMode();
  const formColor =
    colorMode === LIGHT ? colors.dark.Nord2 : colors.light.Nord6;
  const textColor =
    colorMode === LIGHT ? colors.light.Nord6 : colors.dark.Nord2;
  const inputBgColor =
    colorMode === LIGHT ? colors.light.Nord4 : colors.dark.Nord0;
  return (
    <>
      <FormLabel color={textColor} fontSize="15px" fontWeight="light">
        {label}
      </FormLabel>
      <InputGroup
        backgroundColor={textColor}
        height="40px"
        mb="12%"
        rounded="md"
      >
        <InputLeftAddon children={icon} />
        <Input
          placeholder={placeholder}
          color={formColor}
          backgroundColor={inputBgColor}
          _placeholder={{
            color: formColor,
          }}
          value={value}
          onChange={(e) => onChangeInput(e)}
        />
      </InputGroup>
    </>
  );
};

export default LoginInput;
