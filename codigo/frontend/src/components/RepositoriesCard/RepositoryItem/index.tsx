import { useState } from "react";
import {
  Flex,
  Text,
  Icon,
  Button,
  useDisclosure,
  useColorMode,
  Modal,
  ModalHeader,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { Repository } from "../../../shared/interfaces/Repository";
import { colors } from "../../../styles/customTheme";
import { GoRepo } from "react-icons/go";
import ModalConfig from "../ModalConfig";

interface RepositoryItem {
  organizationName: string;
  repository: Repository;
  provider: string;
}

const LIGHT = "light";

const RepositoryItem = ({
  repository,
  organizationName,
  provider,
}: RepositoryItem) => {
  const { colorMode } = useColorMode();
  const { itemColor, textColor, iconColor } =
    colorMode === LIGHT
      ? {
          itemColor: colors.dark.Nord1,
          textColor: colors.light.Nord4,
          iconColor: colors.light.Nord6,
        }
      : {
          itemColor: colors.light.Nord4,
          textColor: colors.dark.Nord0,
          iconColor: colors.dark.Nord2,
        };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <ModalConfig
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        repository={repository}
        organizationName={organizationName}
        provider={provider}
      />
      <Flex
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        height="12"
        px="8"
        mb="3"
        bgColor={itemColor}
        rounded="md"
      >
        <Flex justifyContent="space-between">
          <Icon as={GoRepo} color={iconColor} boxSize="6" mr="4" />
          <Text fontSize="md" alignSelf="center" color={textColor}>
            {`${organizationName}/${repository.name}`}
          </Text>
        </Flex>
        <Flex>
          <Button
            size="sm"
            bgColor={colors.aurora.Nord14}
            _hover={{ bgColor: colors.aurora.Nord14 }}
            color={colors.light.Nord4}
            onClick={onOpen}
          >
            Adicionar
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default RepositoryItem;
