import { Flex, Text, Icon, useColorMode } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { Repository } from "../../../shared/interfaces/Repository";
import { colors } from "../../../styles/customTheme";
import { GoRepo } from "react-icons/go";

interface RepositoryItem {
  organizationName: string | null;
  repository: Repository;
}

const LIGHT = "light";

const RepositoryItem = ({ repository, organizationName }: RepositoryItem) => {
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

  return (
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
        <Icon
          as={FiPlus}
          color={colors.aurora.Nord14}
          _hover={{ cursor: "pointer" }}
        />
      </Flex>
    </Flex>
  );
};

export default RepositoryItem;
