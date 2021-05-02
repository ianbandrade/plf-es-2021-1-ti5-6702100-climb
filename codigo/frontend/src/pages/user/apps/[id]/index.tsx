import { useColorMode } from "@chakra-ui/color-mode";
import { Flex } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ApplicationConfig } from "../../../../components/ApplicationConfig";
import { HeadingActionButton } from "../../../../components/SubHeading/ActionButton";
import apiClient from "../../../../shared/api/api-client";
import { getMessages } from "../../../../shared/utils/toast-messages";
import { colors } from "../../../../styles/customTheme";
import Environment from "../../../../shared/interfaces/environment"
import { Skeleton } from "@chakra-ui/react"
const LIGHT = "light";

export interface ApplicationResponse {
  id: string;
  name: string;
  provider: string;
  repositoryId: string;
  repositoryRef: string;
  repositoryPath: string;
  repositoryURL: string;
  userId: string;
  environments: Environment[];
}

const ConfigApp = () => {
  const router = useRouter()
  const { id } = router.query;
  const [enviroments, setEnviroments] = useState<Map<string, Environment> | undefined>();
  const [appName, setAppName] = useState<string>("");
  const toast = useToast();
  const { colorMode } = useColorMode();
  const { bgColor } = colorMode === LIGHT ? { bgColor: colors.light.Nord4 } : { bgColor: colors.dark.Nord1, }

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = () => {
    if (id) {
      apiClient
        .get<ApplicationResponse>(`/applications/${id}`)
        .then((res) => {
          const { data } = res;
          const envMap = new Map<string, Environment>()
          data.environments.forEach(env => envMap.set(env.key, env))
          setEnviroments(envMap);
          setAppName(data.name)
        })
        .catch((error) => {
          getMessages(error?.response.data).forEach((description, i) => {
            showToast(description, i)
          });
        });
    }
  }

  const addNewEnv = (newEnv: Environment) => {
    if (enviroments) {
      if (newEnv.key.length < 1) {
        if (!toast.isActive(1))
          showToast(`A chave não pode ser vazia`)
        return;
      }
      if (enviroments.has(newEnv.key)) {
        showToast(`A chave '${newEnv.key}' já existe`,)
        return
      }
      setEnviroments(current => {
        if (current)
          return new Map(current).set(newEnv.key, newEnv);
      })
    }
  }

  const removeEnv = (key: string) => {
    setEnviroments(current => {
      if (current) {
        const newAppEnvs = new Map(current);
        newAppEnvs.delete(key);
        return newAppEnvs;
      }
    });
  }

  const showToast = (description: string, id = 1) => {
    toast({
      title: "Erro!",
      description: `${description}`,
      status: "error",
      position: "bottom-left",
      id
    });
  }

  return (
    <Skeleton isLoaded={!!enviroments} >
      <HeadingActionButton title={appName} />
      <Flex flexDirection="row"
        width="80%"
        height="100%"
        margin="0 auto;"
        bgColor={bgColor}>
        {enviroments &&
          <ApplicationConfig environments={Array.from(enviroments.values())} addNewEnv={addNewEnv} removeEnv={removeEnv} />
        }
      </Flex>
    </Skeleton>
  )
}

export default ConfigApp;