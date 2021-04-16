import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import PreConfigCard from "../../../components/PreConfigCard";
import { HeadingActionButton } from "../../../components/SubHeading/ActionButton";
import { PreConfigCardRequestProps } from "../../../shared/interfaces/PreConfigCardInterface";

const plugins: PreConfigCardRequestProps[] = [
  {
    id: "1",
    name: "Redis",
    image: "https://cdn.iconscout.com/icon/free/png-256/redis-83994.png",
    description:
      "Redis é um armazenamento de estrutura de dados em memória, usado como um banco de dados em memória distribuído de chave-valor, cache e agente de mensagens, com durabilidade opcional.",
    selected: false,
  },
  {
    id: "2",
    name: "MongoDB",
    image: "https://cdn.iconscout.com/icon/free/png-256/mongodb-226029.png",
    description:
      "MongoDB é um software de banco de dados orientado a documentos livre, de código aberto e multiplataforma, escrito na linguagem C++. Classificado como um programa de banco de dados NoSQL, o MongoDB usa documentos semelhantes a JSON com esquemas.",
    selected: false,
  },
];

const Plugins = () => {
  const toggleCardSelect = (index: number) => {
    plugins[index].selected = !plugins[index].selected;
    console.log(plugins[index].selected);
  };

  return (
    <Box display="flex" flexDirection="column" padding="12" width="full">
      <HeadingActionButton title="Plugins pré-configurados" />
      <Flex flexWrap="wrap">
        {plugins.map((plugin, index) => (
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
              selected={plugin.selected}
            />
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

export default Plugins;
