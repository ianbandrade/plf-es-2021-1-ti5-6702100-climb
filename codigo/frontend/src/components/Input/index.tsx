import { ReactNode } from "react";
import { FormLabel, Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import { MutableRefObject } from "react";

interface InputProps {
  placeholder: string;
  icon?: ReactNode;
  label?: string;
  value?: string;
  onChangeInput: Function;
  style?: {
    marginLeft?: string;
    inputTextColor?: string;
    labelColor?: string;
    inputBgColor?: string;
    marginBottom?: string;
    marginRight?: string;
  };
  type: string;
  required?: boolean;
  validate?: boolean;
}

const InputComponent = ({
  label,
  placeholder,
  icon,
  value,
  onChangeInput,
  style,
  type,
  required,
  validate,
}: InputProps) => {
  return (
    <>
      <FormLabel color={style?.labelColor} fontSize="15px" fontWeight="light">
        {label}
      </FormLabel>
      <InputGroup
        backgroundColor={style?.labelColor}
        height="40px"
        ml={style?.marginLeft}
        mb={style?.marginBottom}
        mr={style?.marginRight}
        rounded="md"
      >
        <InputLeftAddon children={icon} />
        <Input
          isInvalid={validate}
          required={required}
          type={type}
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
