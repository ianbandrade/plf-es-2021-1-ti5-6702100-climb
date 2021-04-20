import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
  Flex,
  FormControl,
  Icon,
  useColorMode,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
} from "@chakra-ui/react";
import { Repository } from "../../../shared/interfaces/Repository";

import Input from "../../Input";
import { BiGitBranch } from "react-icons/bi";
import { IoIosApps, IoMdKey, IoIosAddCircle } from "react-icons/io";
import { GiStonePath, GiChest, GiTrashCan } from "react-icons/gi";
import { colors } from "../../../styles/customTheme";

interface ModalConfigProps {
  isOpen: boolean;
  onOpen: Function;
  onClose: () => void;
  repository: Repository;
  organizationName: string;
}

interface Env {
  key: string;
  value: string;
}

const LIGHT = "light";

const ModalConfig = ({
  isOpen,
  onOpen,
  onClose,
  repository,
  organizationName,
}: ModalConfigProps) => {
  const { colorMode } = useColorMode();

  const { addonInputColor, inputBgColor, inputColor, envButtonColor } =
    colorMode === LIGHT
      ? {
          addonInputColor: colors.light.Nord5,
          inputBgColor: colors.dark.Nord0,
          inputColor: colors.light.Nord6,
          envButtonColor: colors.light.Nord6,
        }
      : {
          addonInputColor: colors.dark.Nord2,
          inputBgColor: colors.light.Nord4,
          inputColor: colors.dark.Nord2,
          envButtonColor: colors.dark.Nord0,
        };

  const [keyInput, setKeyInput] = useState<string>("");
  const [valueInput, setValueInput] = useState<string>("");
  const [envs, setEnvs] = useState<Env[] | []>([]);

  function handleAddEnv() {
    const newEnv = {
      key: keyInput,
      value: valueInput,
    };

    setEnvs([...envs, newEnv]);
    clearEnvFields();
  }

  function removeEnv(index: number) {
    const newArray = envs.filter((env, i) => i !== index);
    setEnvs(newArray);
  }

  function clearEnvFields() {
    setKeyInput("");
    setValueInput("");
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Configurar Aplicação
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody display="flex" justifyContent="center">
          <Flex width="2xl" flexDirection="column" justifyContent="center">
            <FormControl
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Flex justifyContent="space-between" mb="8">
                <Input
                  placeholder="Nome da aplicação"
                  type="text"
                  required={true}
                  onChangeInput={() => {}}
                  icon={<IoIosApps />}
                  style={{
                    marginLeft: "-2",
                    inputBgColor: inputBgColor,
                    inputTextColor: inputColor,
                  }}
                />
                <Flex
                  bgColor={addonInputColor}
                  style={{
                    borderTopLeftRadius: 9,
                    borderBottomLeftRadius: 9,
                    borderRight: 5,
                  }}
                  justifyContent="center"
                  alignContent="center"
                  width="24"
                  ml="6"
                >
                  <Icon as={BiGitBranch} alignSelf="center" />
                </Flex>
                <Select
                  defaultValue={repository.ref}
                  bgColor={inputBgColor}
                  color={inputColor}
                >
                  {repository.branchs.map((branch: string, index: number) => (
                    <>
                      <option
                        value={index}
                        key={index}
                        style={{ color: inputBgColor }}
                      >
                        {branch}
                      </option>
                    </>
                  ))}
                </Select>
              </Flex>
              <Input
                placeholder="Caminho"
                type="text"
                required={true}
                icon={<GiStonePath />}
                onChangeInput={() => {}}
                style={{
                  marginBottom: "8",
                  inputBgColor: inputBgColor,
                  inputTextColor: inputColor,
                }}
              />
              <Accordion allowToggle>
                <AccordionItem>
                  <AccordionButton bgColor={envButtonColor}>
                    <Flex
                      flex="1"
                      justifyContent="space-between"
                      alignItems="center"
                      textAlign="left"
                    >
                      Variáveis de ambiente
                      <AccordionIcon />
                    </Flex>
                  </AccordionButton>
                  <AccordionPanel>
                    <Flex>
                      <Input
                        placeholder="Chave"
                        type="text"
                        required={true}
                        value={keyInput}
                        onChangeInput={(e: any) => setKeyInput(e.target.value)}
                        icon={<IoMdKey />}
                      />
                      <Input
                        placeholder="Valor"
                        type="text"
                        required={true}
                        value={valueInput}
                        onChangeInput={(e: any) =>
                          setValueInput(e.target.value)
                        }
                        icon={<GiChest />}
                        style={{ marginLeft: "4" }}
                      />

                      <Icon
                        alignSelf="center"
                        as={IoIosAddCircle}
                        color={colors.aurora.Nord14}
                        boxSize="6"
                        _hover={{ cursor: "pointer" }}
                        ml="4"
                        onClick={() => handleAddEnv()}
                      />
                    </Flex>
                    <Table mt="4">
                      <Thead>
                        <Tr>
                          <Th>Chave</Th>
                          <Th>Valor</Th>
                          <Th></Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {envs.length > 0
                          ? envs.map((env: Env, index: number) => (
                              <Tr key={index}>
                                <Th textAlign="left">{env.key}</Th>
                                <Th>{env.value}</Th>
                                <Th>
                                  <Icon
                                    as={GiTrashCan}
                                    boxSize="6"
                                    color={colors.aurora.Nord11}
                                    _hover={{ cursor: "pointer" }}
                                    onClick={() => removeEnv(index)}
                                  />
                                </Th>
                              </Tr>
                            ))
                          : ""}
                      </Tbody>
                    </Table>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </FormControl>
          </Flex>
        </ModalBody>
        <ModalFooter display="flex" justifyContent="space-between" mt="6">
          <Button
            bgColor={colors.aurora.Nord11}
            color={colors.light.Nord6}
            _hover={{ bgColor: colors.aurora.Nord11 }}
          >
            Cancelar
          </Button>
          <Button
            bgColor={colors.aurora.Nord14}
            color={colors.light.Nord6}
            _hover={{ bgColor: colors.aurora.Nord14 }}
          >
            Deploy
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalConfig;
