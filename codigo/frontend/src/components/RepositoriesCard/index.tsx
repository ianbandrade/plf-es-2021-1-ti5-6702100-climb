import { Flex, Select, Heading, useColorMode, Icon } from "@chakra-ui/react";
import { colors } from "../../styles/customTheme";
import Input from "../Input";
import { AiFillGithub, AiOutlineSearch } from "react-icons/ai";
import { RiGitlabFill } from "react-icons/ri";
import { Organization } from "../../shared/interfaces/Organization";
import RepositoryItem from "./RepositoryItem";

const LIGHT = "light";
interface RepositoriesProps {
  githubOrganizations: Organization[] | null;
  gitlabOrganizations: Organization[] | null;
}

const RepositoriesCard = ({
  githubOrganizations,
  gitlabOrganizations,
}: RepositoriesProps) => {
  const { colorMode } = useColorMode();
  const { cardColor } =
    colorMode === LIGHT
      ? {
          cardColor: colors.light.Nord4,
        }
      : {
          cardColor: colors.dark.Nord2,
        };
  console.log(githubOrganizations);
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgColor={cardColor}
      width="60%"
      rounded={10}
      padding="5"
    >
      <Heading fontSize="2xl" alignSelf="flex-start" pb="8">
        Nova aplicação
      </Heading>
      <Flex width="100%" justifyContent="space-evenly" px="6">
        <Select placeholder="Selecione o repositório">
          {githubOrganizations?.map((organization) => {
            return organization.repositories.map((repository) => (
              <option value={`${organization.name}/${repository.name}`}>
                {organization.name}/{repository.name}
              </option>
            ));
          })}
        </Select>
        <Input
          type="text"
          placeholder="Buscar por repositório"
          value=""
          icon={<AiOutlineSearch size="25" />}
          onChangeInput={() => {}}
        />
        <Flex ml={8} justifyContent="space-between">
          <Icon
            as={AiFillGithub}
            boxSize="36px"
            mr="3"
            _hover={{ cursor: "pointer" }}
          />
          <Icon
            as={RiGitlabFill}
            boxSize="36px"
            color={"#E24329"}
            _hover={{ cursor: "pointer" }}
          />
        </Flex>
      </Flex>
      <Flex flexDirection="column" width="100%">
        <RepositoryItem organizations={githubOrganizations} />
      </Flex>
    </Flex>
  );
};

export default RepositoriesCard;
