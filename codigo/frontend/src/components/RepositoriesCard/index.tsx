import { Button, Flex, Icon, Select, useColorMode } from "@chakra-ui/react";
import { useState } from "react";
import { AiFillGithub, AiOutlineSearch } from "react-icons/ai";
import { RiGitlabFill } from "react-icons/ri";
import { Organization } from "../../shared/interfaces/Organization";
import {
  BasicRepository,
  Repository,
} from "../../shared/interfaces/Repository";
import { colors } from "../../styles/customTheme";
import Input from "../Input";
import NotLinkedGit from "../NotLinkedGit";
import RepositoryItem from "./RepositoryItem";

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
  const { cardColor, inputBgColor, inputColor } =
    colorMode === LIGHT
      ? {
          cardColor: colors.light.Nord4,
          inputBgColor: colors.dark.Nord0,
          inputColor: colors.light.Nord6,
        }
      : {
          cardColor: colors.dark.Nord2,
          inputBgColor: colors.light.Nord4,
          inputColor: colors.dark.Nord2,
        };
  const [filterInput, setFilterInput] = useState("");
  const [gitOrganizationsName, setgitOrganizationsName] = useState("github");

  const [repositories, setRepositories] = useState(
    gitOrganizations === null || gitOrganizations?.length === 0
      ? null
      : gitOrganizations[0].repositories
  );

  const [orgIndex, setOrgIndex] = useState<number>(0);

  function handleSelectOrganization(e: any) {
    const index = Number(e.target.value);
    setOrgIndex(index);
  }

  function handleFilterChange(e: any) {
    setFilterInput(e.target.value);
    const newFilteredRepositories =
      gitOrganizations === null
        ? null
        : gitOrganizations[orgIndex]?.repositories.filter((repo) =>
            repo.name.toLowerCase().includes(filterInput.toLowerCase())
          );

    if (newFilteredRepositories) setRepositories(newFilteredRepositories);
  }

  function handleSelectGit(provider: string) {
    setgitOrganizationsName(provider);

    return onSelectGit(provider);
  }
  console.log(gitOrganizations);
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
      <Flex width="100%" justifyContent="space-evenly" px="6">
        <Select
          ml="2"
          onChange={(e) => handleSelectOrganization(e)}
          bgColor={inputBgColor}
          color={inputColor}
        >
          {gitOrganizations === null
            ? ""
            : gitOrganizations?.map(
                (organization: Organization, index: number) => {
                  return (
                    <option
                      value={index}
                      key={index}
                      style={{ color: inputBgColor }}
                    >
                      {organization.name}{" "}
                    </option>
                  );
                }
              )}
        </Select>
        <Input
          type="text"
          placeholder="Buscar por repositório"
          value={filterInput}
          icon={<AiOutlineSearch size="25" />}
          onChangeInput={(e: any) => handleFilterChange(e)}
          style={{ inputBgColor: inputBgColor, inputTextColor: inputColor }}
        />
        <Flex ml={8} justifyContent="space-between">
          <Button
            width="12"
            height="12"
            mr="4"
            onClick={() => handleSelectGit("github")}
          >
            <Icon as={AiFillGithub} boxSize="36px" />
          </Button>
          <Button
            width="12"
            height="12"
            mr="2"
            color={"#E24329"}
            _hover={{ cursor: "pointer" }}
            onClick={() => handleSelectGit("gitlab")}
          >
            <Icon as={RiGitlabFill} boxSize="36px" />
          </Button>
        </Flex>
      </Flex>
      <Flex flexDirection="column" justifyContent="center" width="93%" mt="4">
        {gitOrganizations && gitOrganizations[orgIndex] !== null ? (
          filterInput.length > 1 && repositories ? (
            repositories.map((repository: BasicRepository) => {
              return (
                <RepositoryItem
                  key={`${gitOrganizations[orgIndex].name}/${repository.name}`}
                  organizationName={gitOrganizations[orgIndex].name}
                  provider={gitOrganizationsName}
                  repository={repository}
                />
              );
            })
          ) : gitOrganizations === null ||
            gitOrganizations.length === 0 ? null : (
            gitOrganizations[orgIndex].repositories.map(
              (repository: BasicRepository) => {
                return (
                  <RepositoryItem
                    key={`${gitOrganizations[orgIndex].name}/${repository.name}`}
                    organizationName={gitOrganizations[orgIndex].name}
                    provider={gitOrganizationsName}
                    repository={repository}
                  />
                );
              }
            )
          )
        ) : (
          <NotLinkedGit
            title={`Conta do ${gitOrganizationsName} não está associada!`}
          />
        )}
      </Flex>
    </Flex>
  );
};

export default RepositoriesCard;
