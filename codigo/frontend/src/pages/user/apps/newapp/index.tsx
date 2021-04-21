import { useState } from "react";
import { Flex } from "@chakra-ui/react";
import NotLinkedGit from "../../../../components/NotLinkedGit";
import RepositoriesCard from "../../../../components/RepositoriesCard";
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
  gitlab: null,
};

const NewApp = () => {
  const [gitProvider, setGitProvider] = useState<"github" | "gitlab">("github");

  function handleSelectGit(gitProvider: string) {
    gitProvider === "github"
      ? setGitProvider("github")
      : setGitProvider("gitlab");
  }

  return !data.github && !data.gitlab ? (
    <NotLinkedGit />
  ) : (
    <Flex justifyContent="center" alignItems="center" mt={"28"}>
      <RepositoriesCard
        gitOrganizations={data[gitProvider]}
        onSelectGit={handleSelectGit}
      />
    </Flex>
  );
};

export default NewApp;
