import { useColorMode } from "@chakra-ui/color-mode";
import Icon from "@chakra-ui/icon";
import { Box, Flex, Spacer, Text } from "@chakra-ui/layout";
import { Button, Tooltip, useToast } from "@chakra-ui/react";
import router from "next/dist/client/router";
import React from "react";
import { FiChevronRight, FiTrash } from "react-icons/fi";
import apiClient from "../../shared/api/api-client";
import { RepoItemProps } from "../../shared/interfaces/RepoItemProps";
import { getMessages } from "../../shared/utils/toast-messages";
import { colors } from "../../styles/customTheme";

export const RepoItem = (props: RepoItemProps.Application) => {
  const toast = useToast();
  const { colorMode } = useColorMode();
  const color = (light: boolean) =>
    light ? colors.light.Nord4 : colors.dark.Nord2;
  const isLight = () => colorMode === "light";
  const textColor = color(!isLight());
  const bgcolor = color(isLight());

  const removeApp = () => {
    apiClient
      .delete(`/applications/${props.id}`)
      .then(({ data }) => {
        toast({
          title: "Sucesso!",
          description: data.message,
          status: "success",
          id: props.id,
          position: "bottom-left",
        });
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
  };

  return (
    <>
      <Flex
        borderWidth="1px"
        borderRadius="lg"
        _hover={{ transition: "0.3s ease-out", boxShadow: "dark-lg" }}
        overflow="hidden"
        flexDirection="column"
        p="4"
        bg={bgcolor}
        width="sm"
        m="4"
      >
        <Flex>
          <Box>
            <Text
              mt="1"
              fontWeight="extrabold"
              as="h3"
              lineHeight="tight"
              color={textColor}
              isTruncated
            >
              {props?.name}
            </Text>
          </Box>
          <Spacer />
          <Box>
            <Tooltip label="Excluir aplicação" fontSize="sm">
              <Button onClick={() => removeApp()} variant="ghost">
                <Icon
                  as={FiTrash}
                  boxSize={5}
                  color={colors.aurora.Nord11}
                  _hover={{ cursor: "pointer" }}
                />
              </Button>
            </Tooltip>
          </Box>
        </Flex>
        <Flex mt={5} justifyContent="center">
          <Icon as={props.icon} mr={2} boxSize={10} justifyItems="center" />
          <Text
            mt="1"
            lineHeight="tight"
            color={textColor}
            margin="auto 0"
            isTruncated
          >
            {`${props.repositoryOwner}/${props.repositoryName}`}
          </Text>
          <Spacer />
          <Tooltip label="Acessar aplicação" fontSize="sm">
            <Button
              as="a"
              _hover={{ cursor: "pointer" }}
              background={colors.aurora.Nord14}
              color={colors.light.Nord6}
              onClick={() => {
                router.push(`/user/apps/${props?.name}`);
              }}
            >
              <Icon
                as={FiChevronRight}
                boxSize={6}
                color={colors.light.Nord6}
                _hover={{ cursor: "pointer" }}
              />
            </Button>
          </Tooltip>
        </Flex>
      </Flex>
    </>
  );
};
