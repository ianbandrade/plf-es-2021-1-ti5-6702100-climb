import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Input,
  Tag,
  TagLabel,
  Text,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import api from "../../shared/api/api-client";
import { AccordionProps, Status } from "../../shared/interfaces/AccordionProps";
import { getMessages } from "../../shared/utils/toast-messages";
import { colors } from "../../styles/customTheme";

interface Tag {
  color: string;
  label: string;
}

type Action = {
  [key in Status]: string;
};

type Credentials = {
  [key in Status]: string;
};

type TagObject = {
  [key in Status]: Tag;
};

const REMOVE = "Remover";
const CREATING = "CREATING";
const LIGHT = "light";
const FAIL_TEXT =
  "Falha ao executar aplicação pré-configurada. Remova esta aplicação e tente novamente.";
const CREATING_TEXT = "Calma! A aplicação já está em processo de criação.";

const AccordionInstance: React.FC<AccordionProps> = ({
  instances,
  closeModal,
  pluginId,
}): JSX.Element => {
  const { colorMode } = useColorMode();
  const toast = useToast();
  const [name, setName] = useState<string>("");

  const action: Action = {
    FAIL: REMOVE,
    SUCCESS: REMOVE,
    CREATING: "",
  };

  const credentialText: Credentials = {
    SUCCESS: "",
    FAIL: FAIL_TEXT,
    CREATING: CREATING_TEXT,
  };

  const wichTag = (status: Status): Tag => {
    const tag: TagObject = {
      SUCCESS: {
        color: colors.aurora.Nord14,
        label: "Criado",
      },
      FAIL: {
        color: colors.aurora.Nord12,
        label: "Falhou",
      },
      CREATING: {
        color: colors.aurora.Nord9,
        label: "Em processamento",
      },
    };
    return tag[status];
  };

  const isInputEmpty = (input: string): boolean => {
    return input.length === 0 && input === "";
  };

  const toggleButtonInterruptApp = (index: number): void => {
    let current_instance_id = instances?.[index].id;
    let appName = instances?.[index].name;

    api
      .delete(`/plugins/instances/${current_instance_id}`)
      .then(() => {
        closeModal(false);
        toast({
          title: "Sucesso!",
          description: `A aplicação ${appName} foi removida da sua lista de aplicações.`,
          status: "success",
          duration: 3000,
          position: "bottom-left",
        });
      })
      .catch((error) => {
        getMessages(error?.response?.data).forEach((description, i) =>
          toast({
            title: "Erro!",
            description,
            status: "error",
            duration: 3000,
            position: "bottom-left",
            id: i,
          })
        );
      });
  };

  const toggleButtonCreateApp = (): void => {
    api
      .post(`/plugins/${pluginId}/instances`, { name })
      .then(() => {
        closeModal(false);
        toast({
          title: "Sucesso!",
          description: `A solicitação para a criação de ${name} foi recebida. Você já pode acompanhar o status da aplicação.`,
          status: "success",
          duration: 3000,
          position: "bottom-left",
        });
      })
      .catch((error) => {
        getMessages(error?.response?.data).forEach((description, i) =>
          toast({
            title: "Erro!",
            description,
            status: "error",
            duration: 3000,
            position: "bottom-left",
            id: i,
          })
        );
      });
  };

  return (
    <>
      <Flex mb={10} mt={5} justifyContent="center">
        <Box mr={5}>
          <Input
            bgColor={
              colorMode === LIGHT ? colors.light.Nord5 : colors.dark.Nord1
            }
            variant="filled"
            placeholder="Nome da aplicação"
            type="text"
            value={name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
              setName(event.target.value);
            }}
            _placeholder={{
              color: ` ${
                colorMode === LIGHT ? colors.dark.Nord0 : colors.light.Nord6
              }`,
            }}
          />
        </Box>
        <Box>
          <Button
            variant="solid"
            type="button"
            bgColor={colors.aurora.Nord14}
            color={colors.light.Nord6}
            _hover={{ bgColor: `${colors.aurora.Nord14}`, opacity: "0.85" }}
            onClick={(): void => {
              if (isInputEmpty(name)) {
                toast({
                  title: "Atenção!",
                  description: `O campo 'Nome da aplicação' não pode ser vazio`,
                  status: "warning",
                  duration: 3000,
                  position: "bottom-left",
                });
              } else {
                toggleButtonCreateApp();
              }
            }}
          >
            Adicionar aplicação
          </Button>
        </Box>
      </Flex>

      <Accordion width={750} mb={5} allowToggle>
        {instances?.length === 0 ? (
          <Flex justifyContent="center">
            <Text fontSize="xl" fontWeight="bold">
              Ainda não existem plugins pré-configuradas!
            </Text>
          </Flex>
        ) : (
          instances?.map((instance, instanceIndex) => {
            return (
              <AccordionItem key={instanceIndex}>
                <Flex>
                  <AccordionButton
                    as="div"
                    bgColor={
                      colorMode === LIGHT
                        ? colors.light.Nord5
                        : colors.dark.Nord1
                    }
                  >
                    <Box flex="1" textAlign="left" margin="0 auto">
                      <Text fontSize="2xl" fontWeight="semibold">
                        {instance.name}
                      </Text>
                    </Box>
                    <Tag
                      mr={2}
                      variant="solid"
                      bgColor={wichTag(instance.status).color}
                    >
                      <TagLabel>{wichTag(instance.status).label}</TagLabel>
                    </Tag>
                    {instance.status !== CREATING && (
                      <Button
                        mr={5}
                        size="sm"
                        variant="so"
                        color={colors.light.Nord6}
                        bgColor={colors.aurora.Nord11}
                        onClick={(event: any): void => {
                          event.stopPropagation();
                          toggleButtonInterruptApp(instanceIndex);
                        }}
                      >
                        {action[instance.status]}
                      </Button>
                    )}
                    <AccordionIcon />
                  </AccordionButton>
                </Flex>
                <AccordionPanel
                  pt={5}
                  bgColor={
                    colorMode === LIGHT ? colors.light.Nord4 : colors.dark.Nord0
                  }
                >
                  {instance.credentials?.length === 0 ? (
                    <Text fontWeight="bold" fontSize="md">
                      {credentialText[instance.status]}
                    </Text>
                  ) : (
                    instance.credentials?.map((credential, credentialIndex) => {
                      return (
                        <Flex key={credentialIndex} alignItems="center">
                          <Text fontWeight="bold" fontSize="xl" mr={2}>
                            {credential.key}:
                          </Text>
                          <Text fontSize="md">{credential.value}</Text>
                        </Flex>
                      );
                    })
                  )}
                </AccordionPanel>
              </AccordionItem>
            );
          })
        )}
      </Accordion>
    </>
  );
};

export default AccordionInstance;
