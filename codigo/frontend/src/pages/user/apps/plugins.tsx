import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import AccordionInstance from "../../../components/AccordionInstance";
import Modal from "../../../components/Modal";
import PreConfigCard from "../../../components/PreConfigCard";
import { HeadingActionButton } from "../../../components/SubHeading/ActionButton";
import { Instance } from "../../../shared/interfaces/AccordionProps";
import { PreConfigCardRequestProps } from "../../../shared/interfaces/PreConfigCardInterface";

const plugins: PreConfigCardRequestProps[] = [
  {
    id: "176879897",
    name: "Redis",
    image: "https://cdn.iconscout.com/icon/free/png-256/redis-83994.png",
    description:
      "Redis é um armazenamento de estrutura de dados em memória, usado como um banco de dados em memória distribuído de chave-valor, cache e agente de mensagens, com durabilidade opcional.",
  },
  {
    id: "2438320854023",
    name: "MongoDB",
    image:
      "https://icons-for-free.com/iconfiles/png/512/vscode+icons+type+mongo-1324451391614529822.png",
    description:
      "MongoDB é um software de banco de dados orientado a documentos livre, de código aberto e multiplataforma, escrito na linguagem C++. Classificado como um programa de banco de dados NoSQL, o MongoDB usa documentos semelhantes a JSON com esquemas.",
  },
  {
    id: "365465876",
    name: "MongoDB",
    image:
      "https://icons-for-free.com/iconfiles/png/512/vscode+icons+type+mongo-1324451391614529822.png",
    description:
      "MongoDB é um software de banco de dados orientado a documentos livre, de código aberto e multiplataforma, escrito na linguagem C++. Classificado como um programa de banco de dados NoSQL, o MongoDB usa documentos semelhantes a JSON com esquemas.",
  },
  {
    id: "4",
    name: "MongoDB",
    image:
      "https://icons-for-free.com/iconfiles/png/512/vscode+icons+type+mongo-1324451391614529822.png",
    description:
      "MongoDB é um software de banco de dados orientado a documentos livre, de código aberto e multiplataforma, escrito na linguagem C++. Classificado como um programa de banco de dados NoSQL, o MongoDB usa documentos semelhantes a JSON com esquemas.",
  },
  {
    id: "5",
    name: "MongoDB",
    image:
      "https://icons-for-free.com/iconfiles/png/512/vscode+icons+type+mongo-1324451391614529822.png",
    description:
      "MongoDB é um software de banco de dados orientado a documentos livre, de código aberto e multiplataforma, escrito na linguagem C++. Classificado como um programa de banco de dados NoSQL, o MongoDB usa documentos semelhantes a JSON com esquemas.",
  },
  {
    id: "6",
    name: "MongoDB",
    image:
      "https://icons-for-free.com/iconfiles/png/512/vscode+icons+type+mongo-1324451391614529822.png",
    description:
      "MongoDB é um software de banco de dados orientado a documentos livre, de código aberto e multiplataforma, escrito na linguagem C++. Classificado como um programa de banco de dados NoSQL, o MongoDB usa documentos semelhantes a JSON com esquemas.",
  },
];

const instancesArray: Instance[] = [
  {
    id: "4123872f-1235-4f18-2153-41f5ff17947b",
    name: "redis-tis",
    status: "creating",
    credentials: null,
  },
  {
    id: "11231233-1235-4f18-2153-41f5ff17947b",
    name: "redis-lab",
    status: "success",
    credentials: [
      { key: "username", value: "xtpo" },
      { key: "username", value: "xtpo" },
      { key: "username", value: "xtpo" },
    ],
  },
  {
    id: "11231233-1235-4f18-2153-41f5ff17947b",
    name: "redis-damd",
    status: "fail",
    credentials: null,
  },
];

const Plugins = (): JSX.Element => {
  const [id, setId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [flag, setFlag] = useState<boolean>(false);

  const toggleCardSelect = (index: number): void => {
    let selectedId = plugins[index].id;
    let selectedTitle = plugins[index].name;
    setToggleStates(selectedId, selectedTitle);
  };

  const setToggleStates = (selectedId: string, selectedTitle: string): void => {
    setId(selectedId === id ? "" : selectedId);
    setTitle(selectedTitle);
    setFlag(true);
  };

  const renderCards = plugins.map(
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

  return (
    <Flex flexDir="column">
      <HeadingActionButton title="Plugins pré-configurados" />
      <Modal
        isOpen={flag}
        title={title}
        onClose={(): void => setFlag(false)}
        width={800}
        children={<AccordionInstance instances={instancesArray} />}
      />

      <Flex flexWrap="wrap" justifyContent="center">
        {renderCards}
      </Flex>
    </Flex>
  );
};

export default Plugins;
