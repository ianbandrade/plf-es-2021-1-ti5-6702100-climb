import { useColorMode } from "@chakra-ui/color-mode";
import { Flex } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ActivitiesConfig from "../../../../components/ActivitiesConfig";
import { ApplicationConfig } from "../../../../components/ApplicationConfig";
import { HeadingActionButton } from "../../../../components/SubHeading/ActionButton";
import apiClient from "../../../../shared/api/api-client";
import { Activities } from "../../../../shared/interfaces/Activities";
import Environment from "../../../../shared/interfaces/environment";
import { getMessages } from "../../../../shared/utils/toast-messages";
import { colors } from "../../../../styles/customTheme";
const LIGHT = "light";

type Status = "info" | "warning" | "success" | "error" | undefined;

const activities: Activities = {
  activities: [
    {
      type: "SUCCESS",
      commit: "897ar077",
      error: null,
    },
    {
      type: "SUCCESS",
      commit: "897ar076",
      error: null,
    },
    {
      type: "SUCCESS",
      commit: "897ar075",
      error: null,
    },
    {
      type: "ROLLBACK",
      commit: "897ar077",
      error: null,
    },
    {
      type: "SUCCESS",
      commit: "897ar076",
      error: null,
    },
    {
      type: "SUCCESS",
      commit: "897ar075",
      error: null,
    },
    {
      type: "ROLLBACK",
      commit: "897ar077",
      error: null,
    },
    {
      type: "SUCCESS",
      commit: "897ar076",
      error: null,
    },
    {
      type: "SUCCESS",
      commit: "897ar075",
      error: null,
    },
    {
      type: "ROLLBACK",
      commit: "897ar077",
      error: null,
    },
    {
      type: "SUCCESS",
      commit: "897ar076",
      error: null,
    },
    {
      type: "SUCCESS",
      commit: "897ar075",
      error: null,
    },
  ],
};

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

interface ConfigAppState {
  name: string;
  id: string;
}

const ConfigApp = () => {
  const router = useRouter();
  const { id } = router.query;
  const [enviroments, setEnviroments] = useState<
    Map<string, Environment> | undefined
  >();
  const [appData, setAppData] = useState<ConfigAppState>();
  const toast = useToast();
  const { colorMode } = useColorMode();
  const { bgColor } =
    colorMode === LIGHT
      ? { bgColor: colors.light.Nord4 }
      : { bgColor: colors.dark.Nord1 };

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = (): void => {
    if (id) {
      apiClient
        .get<ApplicationResponse>(`/applications/name/${id}`)
        .then((res) => {
          const { data } = res;
          const envMap = new Map<string, Environment>();
          data.environments.forEach((env) => envMap.set(env.key, env));
          setEnviroments(envMap);
          setAppData(data);
        })
        .catch((error) => {
          if (error.response)
            return getMessages(error?.response.data).forEach(
              (description, i) => {
                showToast("Atenção!", description, "warning", i);
              }
            );

          showToast(
            "Erro!",
            `Falha ao conectar ao servidor: '${error}'`,
            "error",
            500
          );
        });
    }
  };

  const addNewEnv = (newEnv: Environment) => {
    if (enviroments) {
      if (newEnv.key.length < 1) {
        if (!toast.isActive(1))
          showToast("Atenção!", `A chave não pode ser vazia`, "warning");
        return;
      }
      if (enviroments.has(newEnv.key)) {
        showToast("Atenção!", `A chave '${newEnv.key}' já existe`, "warning");
        return;
      }
      setEnviroments((current) => {
        if (current) {
          showToast(
            "Sucesso!",
            `Chave '${newEnv.key}' foi adicionada`,
            "success"
          );
          return new Map(current).set(newEnv.key, newEnv);
        }
      });
    }
  };

  const removeEnv = (key: string) => {
    setEnviroments((current) => {
      if (current) {
        const newAppEnvs = new Map(current);
        newAppEnvs.delete(key);
        showToast("Sucesso!", `Chave '${key}' foi removida`, "success");
        return newAppEnvs;
      }
    });
  };

  const showToast = (
    title: string,
    description: string,
    status: Status,
    id = 1
  ) => {
    toast({
      title,
      description: `${description}`,
      status,
      position: "bottom-left",
      id,
    });
  };

  const submitEnvs = () => {
    apiClient
      .patch(`/applications/${appData?.id}`, {
        environments: Array.from(enviroments?.values() || []),
      })
      .then(() => {
        showToast("Sucesso!", "Variáveis de ambiente salvas.", "success");
      })
      .catch((error) => {
        getMessages(error?.response.data).forEach((description, i) => {
          showToast("Atenção!", description, "warning", i);
        });
      });
  };

  return (
    <Skeleton isLoaded={!!enviroments}>
      {appData && (
        <Flex flexDirection="column" padding="12" width="full">
          <HeadingActionButton title={appData.name} />
        </Flex>
      )}
      <Flex
        flexDirection="row"
        width="60%"
        height="100%"
        margin="0 auto;"
        bgColor={bgColor}
        boxShadow="2xl"
        borderRadius="12px"
        p={5}
      >
        {enviroments && (
          <ApplicationConfig
            environments={Array.from(enviroments.values())}
            addNewEnv={addNewEnv}
            removeEnv={removeEnv}
            submitEnv={submitEnvs}
          />
        )}

        <ActivitiesConfig activities={activities.activities} id={id} />
      </Flex>
    </Skeleton>
  );
};

export default ConfigApp;
