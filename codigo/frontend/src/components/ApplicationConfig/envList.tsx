import Icon from "@chakra-ui/icon";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { GiTrashCan } from "react-icons/gi";
import Environment from "../../shared/interfaces/environment";
import { colors } from "../../styles/customTheme";

export interface EnvListProps{
    inputColor: any;
    environments: Environment[];
    addNewEnv: (newEnv: Environment) => void;
    removeEnv: (key: string) => void;
}

export const EnvList = ({addNewEnv,inputColor,removeEnv,environments}:EnvListProps) =>
(
    <Flex direction="column" width="100%" padding={1}>
        <Flex width="95%" bgColor={inputColor} borderRadius="6px" marginTop={1} marginBottom={1}>
            <Box width="50%" padding={2}>
                Chave
            </Box>
            <Box width="50%" padding={2}>
                Valor
            </Box>
        </Flex>
        <Flex direction="column" overflow="auto" height="14em">
            {environments
                .map((env: Environment) => (
                    <Flex width="100%" key={env.key} marginTop={1} marginBottom={1}>
                        <Box width="50%" padding={2} marginRight={1} bgColor={inputColor}>
                            <Text isTruncated maxW="24ch">{env.key}</Text>
                        </Box>
                        <Box width="50%" padding={2} bgColor={inputColor}>
                            <Text isTruncated maxW="24ch">{env.value}</Text>
                        </Box>
                        <Flex width="6%" border="2px solid" borderColor={inputColor} borderRadius="4px">
                            <Icon
                                alignSelf="flex-end"
                                as={GiTrashCan}
                                boxSize="6"
                                margin="auto"
                                color={colors.aurora.Nord11}
                                _hover={{ cursor: "pointer"}}
                                onClick={() => removeEnv(env.key)}
                            />
                        </Flex>
                    </Flex>
                ))}
        </Flex>
    </Flex>
)