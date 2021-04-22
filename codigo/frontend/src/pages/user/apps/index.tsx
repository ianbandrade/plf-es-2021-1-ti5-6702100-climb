import { Box, Flex } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/react";
import { AiFillGithub } from "react-icons/ai";
import { RiGitlabFill } from "react-icons/ri";
import { RepoItem } from "../../../components/RepoItem/RepoItem";
import { IconType } from "react-icons/lib";
import { HeadingActionButton } from "../../../components/SubHeading/ActionButton";
import { RepoItemProps } from "../../../shared/interfaces/RepoItemProps";
import apiClient from "../../../shared/api/api-client";
import { useEffect, useState } from "react";
import { getMessages } from "../../../shared/utils/toast-messages";
export const Apps = () => {
  const avaiableIcons: Record<string, IconType> = {
    GITHUB: AiFillGithub,
    GITLAB: RiGitlabFill,
  };
  const icon = (provider: string): IconType => avaiableIcons[provider];
  const [applications, setApplications] = useState<RepoItemProps.Items>();
  const toast = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    await apiClient
      .get("/applications")
      .then((res) => {
        const { data } = res;
        setApplications(data);
      })
      .catch((error) => {
        getMessages(error?.response.data).forEach((description, i) => {
          toast({
            title: "Erro!",
            description: `${description}`,
            status: "error",
            id: i,
            position: "bottom-left",
          });
        });
      });
  }

  const renderRepos = applications?.items.map(
    (repo: RepoItemProps.Application) => (
      <RepoItem {...repo} icon={icon(repo.provider)} key={repo.id} />
    )
  );

  return (
    <Box display="flex" flexDirection="column" padding="12" width="full">
      <HeadingActionButton title="Aplicações conectadas" />
      <Flex flexWrap="wrap">{renderRepos}</Flex>
    </Box>
  );
};

export default Apps;
