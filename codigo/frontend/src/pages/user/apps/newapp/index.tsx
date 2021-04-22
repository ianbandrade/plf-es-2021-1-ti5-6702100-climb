import { useState, useEffect } from "react";
import { Flex, useToast } from "@chakra-ui/react";
import NotLinkedGit from "../../../../components/NotLinkedGit";
import RepositoriesCard from "../../../../components/RepositoriesCard";
import { HeadingActionButton } from "../../../../components/SubHeading/ActionButton";
import { GitProviders } from "../../../../shared/interfaces/GitProviders";
import { githubService } from "../../../../shared/services/githubService";
import { getMessages } from "../../../../shared/utils/toast-messages";
const data = {
  github: [
    {
      name: "GaMoCh",
      repositories: [
        {
          name: "express-hello",
          isEmpty: false,
        },
        {
          name: "okoskd",
          isEmpty: true,
        },
        {
          name: "adasdasdasdasdasd-hello",
          isEmpty: true,
        },
      ],
    },
    {
      name: "Mira",
      repositories: [
        {
          name: "test-hello",
          isEmpty: true,
        },
        {
          name: "qqqq-hello",
          isEmpty: false,
        },
      ],
    },
  ],
  gitlab: [
    {
      name: "asdasd",
      repositories: [
        {
          name: "edadasdsdxpress-hello",
          isEmpty: true,
        },
        {
          name: "adasdasd-hello",
          isEmpty: true,
        },
        {
          name: "adasdasdasdasdasd-hello",
          isEmpty: false,
        },
      ],
    },
    {
      name: "aaaaaaaaa",
      repositories: [
        {
          name: "express-hello",
          isEmpty: true,
        },
        {
          name: "adasdasd-hello",
          isEmpty: true,
        },
        {
          name: "adasdasdasdasdasd-hello",
          isEmpty: true,
        },
      ],
    },
  ],
};

const NewApp = () => {
  const [gitProvider, setGitProvider] = useState<"github" | "gitlab">("github");
  const [providers, setProviders] = useState<GitProviders>(data);
  const toast = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    await githubService
      .getRepositories()
      .then((res) => {
        console.log(res);
        setProviders({ github: res.organizations });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleSelectGit(gitProvider: string) {
    gitProvider === "github"
      ? setGitProvider("github")
      : setGitProvider("gitlab");
  }

  return !providers.github && !providers.gitlab ? (
    <NotLinkedGit />
  ) : (
    <Flex flexDirection="column" padding="12" width="full">
      <HeadingActionButton title="Nova Aplicação" />
      <Flex justifyContent="center" alignItems="center">
        <RepositoriesCard
          gitOrganizations={providers[gitProvider]}
          onSelectGit={handleSelectGit}
        />
      </Flex>
    </Flex>
  );
};

export default NewApp;
