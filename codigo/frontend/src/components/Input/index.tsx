import { ReactNode } from "react";
import { FormLabel, Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import { colors } from "../../styles/customTheme";
import { useColorMode } from "@chakra-ui/color-mode";
const LIGHT = "light";

interface InputProps {
  placeholder: string;
  icon?: ReactNode;
  label: string;
  value?: string;
  onChangeInput: Function;
  style?: {
    inputTextColor?: string;
    labelColor?: string;
    inputBgColor?: string;
    marginBottom?: string;
  };
}

const InputComponent = ({
  label,
  placeholder,
  icon,
  value,
  onChangeInput,
  style,
}: InputProps) => {
  return (
    <>
      <FormLabel color={style?.labelColor} fontSize="15px" fontWeight="light">
        {label}
      </FormLabel>
      <InputGroup
        backgroundColor={style?.labelColor}
        height="40px"
        mb={style?.marginBottom}
        rounded="md"
      >
        <InputLeftAddon children={icon} />
        <Input
          placeholder={placeholder}
          color={style?.inputTextColor}
          backgroundColor={style?.inputBgColor}
          _placeholder={{
            color: style?.inputTextColor,
          }}
          value={value}
          onChange={(e) => onChangeInput(e)}
        />
      </InputGroup>
    </>
  );
};

export default InputComponent;
