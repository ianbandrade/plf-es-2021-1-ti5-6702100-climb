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
  useToast,
} from "@chakra-ui/react";
import { Repository } from "../../../shared/interfaces/Repository";

import Input from "../../Input";
import { BiGitBranch } from "react-icons/bi";
import { IoIosApps, IoMdKey, IoIosAddCircle } from "react-icons/io";
import { GiStonePath, GiChest, GiTrashCan } from "react-icons/gi";
import { colors } from "../../../styles/customTheme";
import Enviroment from "../../../shared/interfaces/enviroment";
import { CreateApplication } from "../../../shared/interfaces/create-application";
import api from "../../../shared/api/api-client";
import { getMessages } from "../../../shared/utils/toast-messages";

interface ModalConfigProps {
  isOpen: boolean;
  onOpen: Function;
  onClose: () => void;
  repository: Repository;
  organizationName: string;
  provider: string;
}

const LIGHT = "light";

const ModalConfig = ({
  isOpen,
  onOpen,
  onClose,
  repository,
  organizationName,
  provider,
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

  const toast = useToast();

  const [keyInput, setKeyInput] = useState<string>("");
  const [valueInput, setValueInput] = useState<string>("");
  const [envs, setEnvs] = useState<Enviroment[] | []>([]);
  const [appNameInput, setAppNameInput] = useState("");
  const [branchNameSelect, setBranchNameSelect] = useState(repository.ref);
  const [pathInput, setPathInput] = useState("");
  const [invalidInputs, setInvalidInputs] = useState({
    name: false,
    path: false,
  });

  function handleAddEnv() {
    const newEnv = {
      key: keyInput,
      value: valueInput,
    };
    if (keyInput.length < 1) {
      toast({
        title: "Aviso!",
        description: "Não é possível ter chave vazia",
        status: "warning",
        id: keyInput,
        position: "bottom-left",
      });
    } else {
      setEnvs([...envs, newEnv]);
      clearEnvFields();
    }
  }

  function removeEnv(index: number) {
    const newArray = envs.filter((env, i) => i !== index);
    setEnvs(newArray);
  }

  function clearEnvFields() {
    setKeyInput("");
    setValueInput("");
  }

  function handleConfirmDeploy() {
    const newApplication: CreateApplication = {
      name: appNameInput,
      provider,
      repositoryId: repository.repositoryId,
      repositoryRef: branchNameSelect,
      repositoryPath: pathInput,
      repositoryUrl: repository.url,
      enviroments: envs,
    };

    if (validateFields(newApplication)) {
      //Make Request
      api
        .post("applications", { body: newApplication })
        .then(() => {
          toast({
            title: "Sucesso",
            status: "success",
            description: "Aplicação criada com sucesso",
            duration: 2000,
            position: "top-right",
          });
          onClose();
          clearAllFields();
        })
        .catch((error) => {
          getMessages(error?.response.data).forEach((description, i) => {
            toast({
              title: "Erro!",
              description: `${description}`,
              status: "error",
              id: i,
              position: "bottom-left",
            });
          });
        });
    }

    console.log(newApplication);
  }

  function clearAllFields() {
    setAppNameInput("");
    setEnvs([]);
    setPathInput("");
  }

  function validateNameFieldFormat(name: string) {
    return name.match(/^[a-z0-9-]+$/) ? true : false;
  }

  function validateFields(newApplication: CreateApplication) {
    const { name, repositoryPath } = newApplication;
    const auxInvalidInputs = {
      name: false,
      path: false,
    };

    if (name.length < 1) {
      toast({
        title: "Aviso!",
        description: "O nome da aplicação não pode ser vazio",
        status: "warning",
        id: 1,
      });
      auxInvalidInputs.name = true;
    } else if (!validateNameFieldFormat(name)) {
      toast({
        title: "Aviso!",
        description:
          "O nome da aplicação possui formato inválido, pode conter apenas letras minúsculas ou números",
        status: "warning",
        id: 2,
      });
      auxInvalidInputs.name = true;
    } else if (repositoryPath.length < 1) {
      toast({
        title: "Aviso!",
        description: "O caminho não pode ser vazio",
        status: "warning",
        id: 3,
      });
      auxInvalidInputs.path = true;
    }
    setInvalidInputs(auxInvalidInputs);
    if (auxInvalidInputs.name || auxInvalidInputs.path) {
      return false;
    }
    return true;
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
                  value={appNameInput}
                  onChangeInput={(e: any) => setAppNameInput(e.target.value)}
                  icon={<IoIosApps />}
                  style={{
                    marginLeft: "-2",
                    inputBgColor: inputBgColor,
                    inputTextColor: inputColor,
                  }}
                  validate={invalidInputs.name}
                  maxLength={50}
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
                  onChange={(e: any) => setBranchNameSelect(e.target.value)}
                >
                  {repository.branchs.map((branch: string, index: number) => (
                    <option
                      value={branch}
                      key={index}
                      style={{ color: inputBgColor }}
                    >
                      {branch}
                    </option>
                  ))}
                </Select>
              </Flex>
              <Input
                placeholder="Caminho"
                type="text"
                required={true}
                icon={<GiStonePath />}
                value={pathInput}
                onChangeInput={(e: any) => setPathInput(e.target.value)}
                style={{
                  marginBottom: "8",
                  inputBgColor: inputBgColor,
                  inputTextColor: inputColor,
                }}
                validate={invalidInputs.path}
              />
              <Accordion allowToggle>
                <AccordionItem
                  border={"1px"}
                  borderRadius={12}
                  color={colors.dark.Nord2}
                >
                  <AccordionButton bgColor={envButtonColor} borderRadius={12}>
                    <Flex
                      flex="1"
                      justifyContent="space-between"
                      alignItems="center"
                      textAlign="left"
                      color={inputBgColor}
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
                        icon={<IoMdKey color={inputBgColor} />}
                        style={{
                          inputBgColor: inputBgColor,
                          inputTextColor: inputColor,
                        }}
                      />
                      <Input
                        placeholder="Valor"
                        type="text"
                        required={true}
                        value={valueInput}
                        onChangeInput={(e: any) =>
                          setValueInput(e.target.value)
                        }
                        icon={<GiChest color={inputBgColor} />}
                        style={{
                          marginLeft: "4",
                          inputBgColor: inputBgColor,
                          inputTextColor: inputColor,
                        }}
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
                    <Table mt="4" variant="striped">
                      <Thead>
                        <Tr>
                          <Th>Chave</Th>
                          <Th>Valor</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {envs.length > 0 ? (
                          envs.map((env: Enviroment, index: number) => (
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
                                  onClick={() => removeEnv(index)}
                                />
                              </Th>
                            </Tr>
                          ))
                        ) : (
                          <Tr></Tr>
                        )}
                      </Tbody>
                    </Table>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </FormControl>
          </Flex>
        </ModalBody>
        <ModalFooter mt="6">
          <Button
            bgColor={colors.aurora.Nord11}
            color={colors.light.Nord6}
            _hover={{ bgColor: colors.aurora.Nord11 }}
            mr="4"
            onClick={() => onClose()}
          >
            Cancelar
          </Button>
          <Button
            bgColor={colors.aurora.Nord14}
            color={colors.light.Nord6}
            _hover={{ bgColor: colors.aurora.Nord14 }}
            onClick={() => handleConfirmDeploy()}
          >
            Deploy
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalConfig;
