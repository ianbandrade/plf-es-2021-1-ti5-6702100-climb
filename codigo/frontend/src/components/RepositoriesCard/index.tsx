import { useState } from "react";
import {
  Flex,
  Select,
  Heading,
  useColorMode,
  Icon,
  Button,
} from "@chakra-ui/react";
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
    gitOrganizations === null ? null : gitOrganizations[0].repositories
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
          <Button width="12" height="12" mr="2">
            <Icon
              as={RiGitlabFill}
              boxSize="36px"
              color={"#E24329"}
              _hover={{ cursor: "pointer" }}
              onClick={() => handleSelectGit("gitlab")}
            />
          </Button>
        </Flex>
      </Flex>
      <Flex flexDirection="column" justifyContent="center" width="93%" mt="4">
        {gitOrganizations && gitOrganizations[orgIndex] !== null ? (
          filterInput.length > 1 && repositories ? (
            repositories.map((repository: Repository) => {
              return (
                <RepositoryItem
                  key={`${gitOrganizations[orgIndex].name}/${repository.name}`}
                  organizationName={gitOrganizations[orgIndex].name}
                  provider={gitOrganizationsName}
                  repository={repository}
                />
              );
            })
          ) : gitOrganizations === null ? null : (
            gitOrganizations[orgIndex].repositories.map(
              (repository: Repository) => {
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
          <NotLinkedGit />
        )}
      </Flex>
    </Flex>
  );
};

export default RepositoriesCard;
