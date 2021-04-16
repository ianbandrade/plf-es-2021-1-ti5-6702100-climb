import { Flex } from "@chakra-ui/react";
import NotLinkedGit from "../../../../components/NotLinkedGit";
import RepositoriesCard from "../../../../components/RepositoriesCard";
const data = {
  github: [
    {
      name: "GaMoCh",
      repositories: [
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
  return !data.github && !data.gitlab ? (
    <NotLinkedGit />
  ) : (
    <Flex justifyContent="center" alignItems="center" mt="55">
      <RepositoriesCard
        githubOrganizations={data.github}
        gitlabOrganizations={data.gitlab}
      />
    </Flex>
  );
};

export default NewApp;
