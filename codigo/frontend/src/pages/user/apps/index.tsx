import { Box, Flex } from "@chakra-ui/layout";
import { AiFillGithub } from "react-icons/ai";
import { RiGitlabFill } from "react-icons/ri";
import { RepoItemProps } from "../../../shared/interfaces/RepoItemProps";
import { RepoItem } from "../../../components/RepoItem/RepoItem";
import { ActionButton } from "../../../components/SubHeading/ActionButton";
import { IconType } from "react-icons/lib";

export const Apps = () => {

  const avaiableIcons: Record<string, IconType> = {
    "github": AiFillGithub,
    "gitlab": RiGitlabFill,
  }
  const icon = (provider: string): IconType => avaiableIcons[provider];

  const repos: RepoItemProps.RootObject = {
    applications: [
      {
        id: "6e67872f-c459-4f18-2153-41f5ff17947b",
        name: "express-pack",
        repository: "express-hello",
        url: "://example.com/hello.git",
        provider: "github",
        branch: "master",
        path: "/",
        environments: [
          {
            key: "DATABASE_PORT",
            value: "5432"
          }
        ]
      },
    ]
  }

  const renderRepos = repos.applications
    .map((repo: RepoItemProps.Application) =>
      <RepoItem {...repo}
        icon={icon(repo.provider)}
        key={repo.id}
      />
    )

  return (
    <Box display="flex" flexDirection="column" padding="12" width="full" >
      <ActionButton />
      <Flex flexWrap="wrap">
        {renderRepos}
      </Flex >
    </Box>)
}

export default Apps;