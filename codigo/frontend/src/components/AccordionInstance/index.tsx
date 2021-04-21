import { Heading } from "@chakra-ui/layout";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Tag,
  TagLabel,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { AccordionProps, Status } from "../../shared/interfaces/AccordionProps";
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
const CANCEL = "Cancelar";
const LIGHT = "light";
const FAIL_TEXT =
  "Falha ao executar aplicação pré-configurada. Remova esta aplicação e tente novamente.";
const CREATING_TEXT = "Calma! A aplicação já está em processo de criação.";

const AccordionInstance: React.FC<AccordionProps> = ({
  instances,
}): JSX.Element => {
  const { colorMode } = useColorMode();

  const action: Action = {
    fail: REMOVE,
    success: REMOVE,
    creating: CANCEL,
  };

  const credentialText: Credentials = {
    success: "",
    fail: FAIL_TEXT,
    creating: CREATING_TEXT,
  };

  const wichTag = (status: Status): Tag => {
    const tag: TagObject = {
      success: {
        color: colors.aurora.Nord14,
        label: "Criado",
      },
      fail: {
        color: colors.aurora.Nord12,
        label: "Falhou",
      },
      creating: {
        color: colors.aurora.Nord9,
        label: "Em processamento",
      },
    };
    return tag[status];
  };

  return (
    <>
      <Accordion width={750} mb={5} allowToggle>
        {instances.map((instance, index) => {
          return (
            <AccordionItem key={index}>
              <Flex>
                <AccordionButton
                  bgColor={
                    colorMode === LIGHT ? colors.light.Nord5 : colors.dark.Nord1
                  }
                >
                  <Box flex="1" textAlign="left" margin="0 auto">
                    <Heading>{instance.name}</Heading>
                  </Box>
                  <Tag
                    mr={2}
                    variant="solid"
                    bgColor={wichTag(instance.status).color}
                  >
                    <TagLabel>{wichTag(instance.status).label}</TagLabel>
                  </Tag>
                  <Button
                    mr={5}
                    size="sm"
                    variant="so"
                    color={colors.light.Nord6}
                    bgColor={colors.aurora.Nord11}
                    onClick={(event): void => {
                      event.stopPropagation();
                      alert("HI ANDREW");
                    }}
                  >
                    {action[instance.status]}
                  </Button>
                  <AccordionIcon />
                </AccordionButton>
              </Flex>
              <AccordionPanel
                pt={5}
                bgColor={
                  colorMode === LIGHT ? colors.light.Nord4 : colors.dark.Nord0
                }
              >
                {instance.credentials === null ? (
                  <Text fontWeight="bold" fontSize="md">
                    {credentialText[instance.status]}
                  </Text>
                ) : (
                  instance.credentials?.map((credential) => {
                    return (
                      <>
                        <Flex alignItems="center">
                          <Text fontWeight="bold" fontSize="xl" mr={2}>
                            {credential.key}:
                          </Text>
                          <Text fontSize="md">{credential.value}</Text>
                        </Flex>
                      </>
                    );
                  })
                )}
              </AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
};

export default AccordionInstance;
