import { useState, useEffect } from "react";
import { Flex, useToast } from "@chakra-ui/react";
import NotLinkedGit from "../../../../components/NotLinkedGit";
import RepositoriesCard from "../../../../components/RepositoriesCard";
import { HeadingActionButton } from "../../../../components/SubHeading/ActionButton";
import { GitProviders } from "../../../../shared/interfaces/GitProviders";
import { getMessages } from "../../../../shared/utils/toast-messages";

const data = {
  github: [
    {
      name: "GaMoCh",
      repositories: [
        {
          repositoryId: 1,
          name: "express-hello",
          url: "https://github.com/GaMoCh/express-hello.git",
          ref: "master",
          branchs: ["master", "develop"],
        },
        {
          repositoryId: 2,
          name: "adasdasd-hello",
          url: "https://github.com/GaMoCh/express-hello.git",
          ref: "master",
          branchs: ["master", "develop"],
        },
        {
          repositoryId: 3,
          name: "adasdasdasdasdasd-hello",
          url: "https://github.com/GaMoCh/express-hello.git",
          ref: "main",
          branchs: ["main", "develop"],
        },
      ],
    },
    {
      name: "Mira",
      repositories: [
        {
          repositoryId: 1,
          name: "test-hello",
          url: "https://github.com/GaMoCh/express-hello.git",
          ref: "master",
          branchs: ["master", "develop"],
        },
        {
          repositoryId: 2,
          name: "qqqq-hello",
          url: "https://github.com/GaMoCh/express-hello.git",
          ref: "master",
          branchs: ["master", "develop"],
        },
      ],
    },
  ],
  gitlab: [
    {
      name: "asdasd",
      repositories: [
        {
          repositoryId: 1,
          name: "edadasdsdxpress-hello",
          url: "https://github.com/GaMoCh/express-hello.git",
          ref: "master",
          branchs: ["master", "develop"],
        },
        {
          repositoryId: 2,
          name: "adasdasd-hello",
          url: "https://github.com/GaMoCh/express-hello.git",
          ref: "master",
          branchs: ["master", "develop"],
        },
        {
          repositoryId: 3,
          name: "adasdasdasdasdasd-hello",
          url: "https://github.com/GaMoCh/express-hello.git",
          ref: "main",
          branchs: ["main", "develop"],
        },
      ],
    },
    {
      name: "aaaaaaaaa",
      repositories: [
        {
          repositoryId: 1,
          name: "express-hello",
          url: "https://github.com/GaMoCh/express-hello.git",
          ref: "master",
          branchs: ["master", "develop"],
        },
        {
          repositoryId: 2,
          name: "adasdasd-hello",
          url: "https://github.com/GaMoCh/express-hello.git",
          ref: "master",
          branchs: ["master", "develop"],
        },
        {
          repositoryId: 3,
          name: "adasdasdasdasdasd-hello",
          url: "https://github.com/GaMoCh/express-hello.git",
          ref: "main",
          branchs: ["main", "develop"],
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
    //fetchData()
  }, []);
  /*
  async function fetchData() {
    Git api...
    await api
      .get("/algum git url")
      .then((res) => {
        const { data } = res;
        setProviders(data);
      })
      .catch(error) {
        getMessages(error?.response.data).forEach((description, i) => {
          toast({
            title: "Erro!",
            description: `${description}`,
            status: "error",
            id: i,
            position: "bottom-left",
          });
      };
  }
  */
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
