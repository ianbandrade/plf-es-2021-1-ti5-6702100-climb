import { Button, Flex, useBoolean } from "@chakra-ui/react";
import React, { useState } from "react";
import Modal from "../../../components/Modal";
import PreConfigCard from "../../../components/PreConfigCard";
import { HeadingActionButton } from "../../../components/SubHeading/ActionButton";
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

const Plugins = (): JSX.Element => {
  const [id, setId] = useState<string>("");
  const [flag, setFlag] = useBoolean(false);

  const toggleCardSelect = (index: number): void => {
    const selectedId = plugins[index].id;
    setId(selectedId === id ? "" : selectedId);
  };

  const renderCards = plugins.map(
    (plugin, index): JSX.Element => {
      return (
        <Flex
          key={index}
          onClick={() => toggleCardSelect(index)}
          cursor="pointer"
        >
          <PreConfigCard
            id={plugin.id}
            key={index}
            name={plugin.name}
            description={plugin.description}
            image={plugin.image}
            selected={id === plugin.id}
            handleModal={setFlag.toggle}
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
        title="Title"
        onClose={setFlag.off}
        width={800}
        children
      />
      <Flex flexWrap="wrap" justifyContent="center">
        {renderCards}
      </Flex>
      <Flex justifyContent="flex-end">
        <Button maxW={100} mr={20}>
          Configurar
        </Button>
      </Flex>
    </Flex>
  );
};

export default Plugins;
