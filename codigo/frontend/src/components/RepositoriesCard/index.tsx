import { useState } from "react";
import { Flex, Select, Heading, useColorMode, Icon } from "@chakra-ui/react";
import { colors } from "../../styles/customTheme";
import Input from "../Input";
import { AiFillGithub, AiOutlineSearch } from "react-icons/ai";
import { RiGitlabFill } from "react-icons/ri";
import { Organization } from "../../shared/interfaces/Organization";
import RepositoryItem from "./RepositoryItem";
import NotLinkedGit from "../NotLinkedGit";
import { Repository } from "../../shared/interfaces/Repository";

const LIGHT = "light";
interface RepositoriesProps {
  gitOrganizations: Organization[] | null;
  onSelectGit: Function;
}

const RepositoriesCard = ({
  gitOrganizations,
  onSelectGit,
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

  const [
    actualOrganization,
    setActualOrganization,
  ] = useState<Organization | null>(
    gitOrganizations === null ? null : gitOrganizations[0]
  );

  function handleSelectOrganization(e: any) {
    const index = Number(e.target.value);
    console.log(index);
    setActualOrganization(
      gitOrganizations === null ? null : gitOrganizations[index]
    );
  }

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgColor={cardColor}
      width="60%"
      rounded={10}
      padding="5"
      height="100%"
      overflowY="auto"
    >
      <Heading fontSize="2xl" alignSelf="flex-start" pb="8">
        Nova aplicação
      </Heading>
      <Flex width="100%" justifyContent="space-evenly" px="6">
        <Select onChange={(e) => handleSelectOrganization(e)}>
          {gitOrganizations === null
            ? ""
            : gitOrganizations?.map(
                (organization: Organization, index: number) => {
                  return <option value={index}>{organization.name} </option>;
                }
              )}
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
            onClick={() => onSelectGit("github")}
          />
          <Icon
            as={RiGitlabFill}
            boxSize="36px"
            color={"#E24329"}
            _hover={{ cursor: "pointer" }}
            onClick={() => onSelectGit("gitlab")}
          />
        </Flex>
      </Flex>
      <Flex flexDirection="column" justifyContent="center" width="93%" mt="4">
        {gitOrganizations && actualOrganization !== null ? (
          actualOrganization.repositories.map((repository: Repository) => (
            <RepositoryItem
              key={`${actualOrganization.name}/${repository}`}
              organizationName={actualOrganization.name}
              repository={repository}
            />
          ))
        ) : (
          <NotLinkedGit />
        )}
      </Flex>
    </Flex>
  );
};

export default RepositoriesCard;
