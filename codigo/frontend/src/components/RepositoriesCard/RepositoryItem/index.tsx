import { Flex, Text, Icon } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { Organization } from "../../../shared/interfaces/Organization";
import { colors } from "../../../styles/customTheme";

interface RepositoryItem {
  organizations: Organization[] | null;
}

const RepositoryItem = ({ organizations }: RepositoryItem) => {
  return organizations?.map((organization) => {
    return organization.repositories.map((repository) => (
      <Flex
        justifyContent="space-between"
        alignItems="center"
        width="85%"
        p="12px"
      >
        <Text fontSize="md" alignSelf="center">
          Organização/Repositório
        </Text>
        <Flex>
          <Icon as={FiPlus} color={colors.aurora.Nord9} />
        </Flex>
      </Flex>
    ));
  });
};

export default RepositoryItem;
