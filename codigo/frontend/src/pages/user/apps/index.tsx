import { Flex } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { IconType } from "react-icons/lib";
import { RiGitlabFill } from "react-icons/ri";
import { RepoItem } from "../../../components/RepoItem/RepoItem";
import { HeadingActionButton } from "../../../components/SubHeading/ActionButton";
import apiClient from "../../../shared/api/api-client";
import { RepoItemProps } from "../../../shared/interfaces/RepoItemProps";
import { authService } from "../../../shared/services/authService";
import { getMessages } from "../../../shared/utils/toast-messages";
export const Apps = () => {
  const avaiableIcons: Record<string, IconType> = {
    GITHUB: AiFillGithub,
    GITLAB: RiGitlabFill,
  };
  const icon = (provider: string): IconType => avaiableIcons[provider];
  const [applications, setApplications] = useState<RepoItemProps.Items>();
  const toast = useToast();
  const router = useRouter();

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
        if (error?.response?.data) {
          getMessages(error.response.data).forEach((description, i) =>
            toast({
              title: "Erro!",
              description: `${description}`,
              status: "error",
              id: i,
              position: "bottom-left",
            })
          );
        } else
          toast({
            title: "Erro!",
            description:
              "Não foi possível comunicar com o servidor para carregar as aplicações.",
            id: 1,
            status: "error",
            position: "bottom-left",
          });
      });
  }

  const renderRepos = applications?.items.map(
    (repo: RepoItemProps.Application) => (
      <RepoItem {...repo} icon={icon(repo.provider)} key={repo.id} />
    )
  );

  return (
    <Flex flexDirection="column" padding="12" width="full">
      <HeadingActionButton title="Aplicações conectadas" />
      <Flex flexWrap="wrap">{renderRepos}</Flex>
    </Flex>
  );
};

export default Apps;
