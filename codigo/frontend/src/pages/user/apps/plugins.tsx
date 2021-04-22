import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import AccordionInstance from "../../../components/AccordionInstance";
import Modal from "../../../components/Modal";
import PreConfigCard from "../../../components/PreConfigCard";
import { HeadingActionButton } from "../../../components/SubHeading/ActionButton";
import api from "../../../shared/api/api-client";
import { Instance } from "../../../shared/interfaces/AccordionProps";
import { Plugin } from "../../../shared/interfaces/PreConfigCardInterface";

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

  useEffect(() => {
    getPlugins();
  }, []);

  function getPlugins() {
    api
      .get<PluginsResponse>("/plugins")
      .then((res) => {
        setPlugins(res.data.plugins);
      })
      .catch((error) => {});
  }

  function getPluginInstances(selectedId: string) {
    api
      .get<InstancesResponse>(`/plugins/${selectedId}/instances`)
      .then((res) => {
        setInstances(res.data.instances);
        setFlag(true);
      })
      .catch();
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

  function renderCards() {
    return plugins?.map(
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
    );
  }

  return (
    <Flex flexDir="column">
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
        } // Req of specific instances from ID
      />
      <Flex flexWrap="wrap" justifyContent="center">
        {renderCards()}
      </Flex>
    </Flex>
  );
};

export default Plugins;
