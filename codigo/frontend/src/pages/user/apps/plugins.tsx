import { Flex, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import AccordionInstance from "../../../components/AccordionInstance";
import Modal from "../../../components/Modal";
import PreConfigCard from "../../../components/PreConfigCard";
import { HeadingActionButton } from "../../../components/SubHeading/ActionButton";
import api from "../../../shared/api/api-client";
import { Instance } from "../../../shared/interfaces/AccordionProps";
import { Plugin } from "../../../shared/interfaces/PreConfigCardInterface";
import { getMessages } from "../../../shared/utils/toast-messages";

interface PluginsResponse {
  plugins: Plugin[];
}

interface InstancesResponse {
  instances: Instance[];
}

const Plugins = (): JSX.Element => {
  const [id, setId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [flag, setFlag] = useState<boolean>(false);
  const [plugins, setPlugins] = useState<Plugin[]>([]);
  const [instances, setInstances] = useState<Instance[]>([]);
  const toast = useToast();

  useEffect(() => {
    getPlugins();
  }, []);

  async function getPlugins() {
    await api
      .get<PluginsResponse>("/plugins")
      .then((res) => {
        setPlugins(res.data.plugins);
      })
      .catch((e) => {
        if (e?.response?.data) {
          getMessages(e.response.data).forEach((description, i) =>
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
              "Não foi possível comunicar com o servidor para carregar os plugins pré-configurados.",
            id: 1,
            status: "error",
            position: "bottom-left",
          });
      });
  }

  async function getPluginInstances(selectedId: string) {
    await api
      .get<InstancesResponse>(`/plugins/${selectedId}/instances`)
      .then((res) => {
        setInstances(res.data.instances);
        setFlag(true);
      })
      .catch((e) => {
        if (e?.response?.data) {
          getMessages(e.response.data).forEach((description, i) =>
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
              "Não foi possível comunicar com o servidor para carregar os plugins pré-configurados.",
            id: 1,
            status: "error",
            position: "bottom-left",
          });
      });
  }

  const toggleCardSelect = (index: number): void => {
    let selectedId = plugins[index].id;
    let selectedTitle = plugins[index].name;
    getPluginInstances(selectedId);
    setToggleStates(selectedId, selectedTitle);
  };

  const setToggleStates = (selectedId: string, selectedTitle: string): void => {
    setId(selectedId);
    setTitle(selectedTitle);
  };

  return (
    <Flex flexDirection="column" padding="12" width="full">
      <HeadingActionButton title="Plugins pré-configurados" />
      <Modal
        isOpen={flag}
        title={title}
        onClose={(): void => setFlag(false)}
        width={800}
        children={
          <AccordionInstance
            instances={instances}
            pluginId={id}
            closeModal={setFlag}
          />
        }
      />
      <Flex flexWrap="wrap" justifyContent="center">
        {plugins.length !== 0 ? (
          plugins?.map(
            (plugin, index): JSX.Element => {
              return (
                <Flex
                  justifyContent="center"
                  key={index}
                  onClick={(): void => {
                    toggleCardSelect(index);
                  }}
                  cursor="pointer"
                >
                  <PreConfigCard
                    id={plugin.id}
                    key={index}
                    name={plugin.name}
                    description={plugin.description}
                    image={plugin.image}
                  />
                </Flex>
              );
            }
          )
        ) : (
          <Text mt={5} fontSize="3xl" fontWeight="bold">
            Ainda não existem plugins pré-configurados!
          </Text>
        )}
      </Flex>
    </Flex>
  );
};

export default Plugins;
