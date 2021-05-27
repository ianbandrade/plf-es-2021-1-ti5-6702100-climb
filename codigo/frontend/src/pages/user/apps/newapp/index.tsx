import { Flex, Spinner, Stack, useToast } from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";
import NotLinkedGit from "../../../../components/NotLinkedGit";
import RepositoriesCard from "../../../../components/RepositoriesCard";
import { HeadingActionButton } from "../../../../components/SubHeading/ActionButton";
import { getCurrentUser } from "../../../../shared/auth/localStorageManager";
import { GitProviders } from "../../../../shared/interfaces/GitProviders";
import { githubService } from "../../../../shared/services/githubService";
import { gitlabService } from "../../../../shared/services/gitlabService";
import { getMessages } from "../../../../shared/utils/toast-messages";
import { useRouter } from "next/router";
import GitButtons from "../../../../components/GitButtons";
import { UserContext } from "../../../../store/UserProvider";
const data = {
  github: null,
  gitlab: null,
};

const NewApp = () => {
  const [gitProvider, setGitProvider] = useState<"github" | "gitlab">("github");
  const [providers, setProviders] = useState<GitProviders>(data);
  const toast = useToast();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    if (getCurrentUser()?.gitHubAccount) {
      await githubService
        .getRepositories()
        .then((res) => {
          setProviders({ github: res.organizations, gitlab: null });
          setGitProvider("github");
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

    if (getCurrentUser()?.gitLabAccount) {
      await gitlabService
        .getRepositories()
        .then((res) => {
          setProviders((prevState) => {
            prevState.gitlab = res.organizations;
            return prevState;
          });
          if (gitProvider !== "github") setGitProvider("gitlab");
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
  }

  function handleSelectGit(gitProvider: string) {
    gitProvider === "github"
      ? setGitProvider("github")
      : setGitProvider("gitlab");
  }

  return !getCurrentUser()?.gitHubToken && !getCurrentUser()?.gitLabToken ? (
    <NotLinkedGit
      title={"Nenhum git vinculado, por favor vincule o seu git"}
      children={
        <Flex justifyContent={"space-between"} width="sm" mt="5">
          <GitButtons
            user={user}
            setUser={setUser}
            baseUrl={"/user/apps/newapp"}
          />
        </Flex>
      }
    />
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
