import { Box, Flex } from "@chakra-ui/layout";
import { AiFillGithub } from "react-icons/ai";
import { RiGitlabFill } from "react-icons/ri";
import { RepoItem } from "../../../components/RepoItem/RepoItem";
import { HeadingActionButton } from "../../../components/SubHeading/ActionButton";
import { RepoItemProps } from "../../../shared/interfaces/RepoItemProps";

export const Apps = () => {
  const repos: RepoItemProps[] = [
    {
      link: "https://github.com/",
      logicalName: "my-repo",
      org: "my-org",
      title: "My Repo",
    },
    {
      link: "https://gitlab.com/2",
      logicalName: "my-repo",
      org: "my-org",
      title: "My Repo",
    },
    {
      link: "https://github.com/3",
      logicalName: "my-repo",
      org: "my-org",
      title: "My Repo",
    },
    {
      link: "https://github.com/4",
      logicalName: "my-repo",
      org: "my-org",
      title: "My Repo",
    },
  ];

  const renderRepos = repos.map((repo) => (
    <RepoItem
      {...repo}
      icon={repo.link.includes("github") ? AiFillGithub : RiGitlabFill}
      key={repo.link}
    />
  ));

  return (
    <Box display="flex" flexDirection="column" padding="12" width="full">
      <HeadingActionButton title="Aplicações conectadas" />
      <Flex flexWrap="wrap">{renderRepos}</Flex>
    </Box>
  );
};

export default Apps;
