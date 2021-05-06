import { Button } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import Icon from "@chakra-ui/icon";
import { Center, Flex, Heading, Text } from "@chakra-ui/layout";
import { Dispatch, SetStateAction, useState } from "react";
import { GiChest } from "react-icons/gi";
import { IoIosAddCircle, IoMdKey } from "react-icons/io";
import Environment from "../../shared/interfaces/environment";
import { colors } from "../../styles/customTheme";
import InputComponent from "../Input";
import { EnvList, EnvListProps } from "./envList";
const LIGHT = "light";

export interface ApplicationConfigProps {
  environments: Environment[];
  addNewEnv: (newEnv: Environment) => void;
  removeEnv: (key: string) => void;
  submitEnv: () => void;
}

interface InputStateMap {
  [key: string]: Dispatch<SetStateAction<string>>;
}

const keyInputId = "key-input";
const valueInputId = "value-input";

export const ApplicationConfig = (props: ApplicationConfigProps) => {
  const { colorMode } = useColorMode();
  const [keyInput, setKeyInput] = useState<string>("");
  const [valueInput, setValueInput] = useState<string>("");

  const updateStates: InputStateMap = {
    [keyInputId]: setKeyInput,
    [valueInputId]: setValueInput,
  };

  const addNewEnv = () => {
    props.addNewEnv({
      key: keyInput,
      value: valueInput,
    });
    Object.keys(updateStates).forEach((key) => updateStates[key](""));
  };

  const removeEnv = (key: string) => {
    props.removeEnv(key);
  };

  const updateInput = (e: any) => {
    updateStates[e.currentTarget.id](e.currentTarget.value);
  };

  const onKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") addNewEnv();
  };

  const { inputBgColor, inputColor } =
    colorMode === LIGHT
      ? {
          inputBgColor: colors.dark.Nord0,
          inputColor: colors.light.Nord6,
        }
      : {
          inputBgColor: colors.light.Nord4,
          inputColor: colors.dark.Nord2,
        };

  const baseInputConfigProps = {
    type: "text",
    required: true,
    style: {
      inputBgColor: inputBgColor,
      inputTextColor: inputColor,
    },
    onChangeInput: updateInput,
    onKeyDown: onKeyPress,
  };

  const inputsEnv = [
    {
      ...baseInputConfigProps,
      placeholder: "Chave",
      value: keyInput,
      icon: <IoMdKey />,
      id: keyInputId,
    },
    {
      ...baseInputConfigProps,
      placeholder: "Valor",
      value: valueInput,
      icon: <GiChest />,
      id: valueInputId,
    },
  ];

  const renderInputComponent = inputsEnv.map((input) => (
    <InputComponent key={input.id} {...input} />
  ));

  const propsEnvList: EnvListProps = {
    addNewEnv,
    environments: props.environments,
    inputColor,
    removeEnv,
  };

  return (
    <>
      <Flex flexDirection="column" w="60%" padding="1" mr={20}>
        <Center margin={5}>
          <Heading as="h3" size="lg">
            Configurações de Variáveis
          </Heading>
        </Center>
        <Flex>
          {renderInputComponent}
          <Icon
            alignSelf="center"
            as={IoIosAddCircle}
            color={colors.aurora.Nord14}
            boxSize="6"
            _hover={{ cursor: "pointer" }}
            ml="4"
            onClick={addNewEnv}
          />
        </Flex>
        <Center width="100%">
          {props.environments?.length > 0 ? (
            <EnvList {...propsEnvList} />
          ) : (
            <Text mt={10} fontSize="xl">
              Sem variáveis configuradas
            </Text>
          )}
        </Center>
        <Center mt={4}>
          <Button
            color={colors.light.Nord6}
            background={colors.aurora.Nord14}
            size="md"
            _hover={{ backgroundColor: "none", boxShadow: "lg" }}
            disabled={!props.environments?.length}
            onClick={props.submitEnv}
          >
            Salvar
          </Button>
        </Center>
      </Flex>
    </>
  );
};
