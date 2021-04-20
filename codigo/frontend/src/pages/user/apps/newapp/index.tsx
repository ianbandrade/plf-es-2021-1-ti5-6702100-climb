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
          name: "adsad-hello",
          url: "https://github.com/GaMoCh/express-hello.git",
          branchs: ["master", "develop"],
        },
        {
          name: "express-hello",
          url: "https://github.com/GaMoCh/express-hello.git",
          branchs: ["master", "develop"],
        },
      ],
    },
    {
      name: "Mira",
      repositories: [
        {
          name: "test-hello",
          url: "https://github.com/GaMoCh/express-hello.git",
          branchs: ["master", "develop"],
        },
      ],
    },
  ],
  gitlab: null,
};

const NewApp = () => {
  const [selectedOrganization, setSelectedOrganization] = useState<
    "github" | "gitlab"
  >("github");

  function handleSelectGit(gitOrganization: string) {
    gitOrganization === "github"
      ? setSelectedOrganization("github")
      : setSelectedOrganization("gitlab");
  }

  return !data.github && !data.gitlab ? (
    <NotLinkedGit />
  ) : (
    <Flex justifyContent="center" alignItems="center" mt={"28"}>
      <RepositoriesCard
        gitOrganizations={data[selectedOrganization]}
        onSelectGit={handleSelectGit}
      />
    </Flex>
  );
};

export default NewApp;
