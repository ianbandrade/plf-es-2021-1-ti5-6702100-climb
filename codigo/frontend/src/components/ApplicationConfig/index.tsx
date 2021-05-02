import { useColorMode } from "@chakra-ui/color-mode"
import Icon from "@chakra-ui/icon"
import { InputElementProps } from "@chakra-ui/input"
import { Center, Flex, Heading, Text } from "@chakra-ui/layout"
import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/table"
import { ChangeEvent, Dispatch, KeyboardEventHandler, SetStateAction, useState } from "react"
import { GiChest, GiTrashCan } from "react-icons/gi"
import { IoIosAddCircle, IoMdKey } from "react-icons/io"
import Environment from "../../shared/interfaces/environment"
import { colors } from "../../styles/customTheme"
import InputComponent from "../Input"
const LIGHT = "light";

export interface ApplicationConfigProps {
    environments: Environment[];
    addNewEnv: (newEnv: Environment) => void
    removeEnv: (key: string) => void
}

interface InputStateMap {
    [key: string]: Dispatch<SetStateAction<string>>
}

const keyInputId = "key-input"
const valueInputId = "value-input"

export const ApplicationConfig = (props: ApplicationConfigProps) => {
    const { colorMode } = useColorMode();
    const [keyInput, setKeyInput] = useState<string>("");
    const [valueInput, setValueInput] = useState<string>("");

    const updateStates: InputStateMap = {
        [keyInputId]: setKeyInput,
        [valueInputId]: setValueInput,
    }

    const addNewEnv = () => {
        props.addNewEnv({
            key: keyInput,
            value: valueInput,
        })
        Object.keys(updateStates).forEach(key => updateStates[key](""))
    }

    const removeEnv = (key:string) => {
        props.removeEnv(key)
    }


    const updateInput = (e: any) => {
        updateStates[e.currentTarget.id](e.currentTarget.value)
    }

    const onKeyPress = (e:KeyboardEvent) => {
        if (e.key === 'Enter')
            addNewEnv();
    }

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
    }

    const inputsEnv =
        [{...baseInputConfigProps, placeholder:"Chave", value:keyInput, icon: <IoMdKey/>, id: keyInputId},
        {...baseInputConfigProps, placeholder:"Valor", value:valueInput, icon: <GiChest/>, id: valueInputId},]

    const renderInputComponent = inputsEnv.map( input => <InputComponent key={input.id} {...input}/>)

    return (
        <>
            <Flex
                flexDirection="column"
                padding="1"
            >
                <Center margin="5">
                    <Heading as="h3" size="lg">Configurações de Variáveis</Heading>
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
                <Center margin="2">
                    {props.environments?.length > 0 ? (<Table mt="4" variant="striped" bgColor={inputColor}>
                        <Thead>
                            <Tr>
                                <Th>Chave</Th>
                                <Th>Valor</Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                props.environments.map((env: Environment, index: number) => (
                                    <Tr key={index}>
                                        <Th textAlign="left" maxW="52">
                                            {env.key}
                                        </Th>
                                        <Th maxW="52">{env.value}</Th>
                                        <Th textAlign="right">
                                            <Icon
                                                alignSelf="flex-end"
                                                as={GiTrashCan}
                                                boxSize="6"
                                                color={colors.aurora.Nord11}
                                                _hover={{ cursor: "pointer" }}
                                                onClick={() => removeEnv(env.key)}
                                            />
                                        </Th>
                                    </Tr>
                                ))
                            }
                        </Tbody>
                    </Table>)
                        : <Text fontSize="xl">Sem variáveis configuradas</Text>
                    }
                </Center>
            </Flex>
        </>)
}