import { DeleteIcon, EditIcon, Icon } from "@chakra-ui/icons";
import {
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  useColorMode,
} from "@chakra-ui/react";
import { FiUserPlus } from "react-icons/fi";
import { colors } from "../../styles/customTheme";
const LIGHT = "light";

const Users = () => {
  const { colorMode } = useColorMode();

  function setTableBgColor() {
    return colorMode === LIGHT ? colors.light.Nord5 : colors.dark.Nord1;
  }

  return (
    <Flex justifyContent="center" alignItems="center" mt="4%">
      <Flex flexDirection="column" alignItems="flex-end">
        <Flex justifyContent="space-between" alignItems="center" mb="3%">
          <Icon
            as={FiUserPlus}
            boxSize="25px"
            color={colors.aurora.Nord14}
            _hover={{ cursor: "pointer" }}
            mr="12px"
          />
          <label
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "40px",
              width: "160px",
              cursor: "pointer",
              color: colors.light.Nord6,
              backgroundColor: colors.aurora.Nord14,
              borderRadius: "8px",
            }}
          >
            Importar Usuários
            <input
              type="file"
              style={{
                width: "100px",
                backgroundColor: colors.aurora.Nord14,
                display: "none",
              }}
            />
          </label>
        </Flex>

        <Table
          boxShadow="dark-lg"
          variant="striped"
          bgColor={setTableBgColor()}
          borderRadius="6px"
          maxH="600px"
          size="lg"
        >
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Email</Th>
              <Th>Usuário</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>João Guilherme Martins Borborema</Td>
              <Td>jborborema@sga.pucminas.br</Td>
              <Td>JoaoGuiMB</Td>
              <Td>
                <Flex justifyContent="space-around">
                  <Tooltip label="Editar usuário" placement="top">
                    <EditIcon
                      color={colors.aurora.Nord13}
                      _hover={{ cursor: "pointer" }}
                      onClick={() => alert("oi")}
                      boxSize="18px"
                    />
                  </Tooltip>
                  <Tooltip label="Deletar usuário" placement="top">
                    <DeleteIcon
                      color={colors.aurora.Nord11}
                      _hover={{ cursor: "pointer" }}
                      onClick={() => alert("oi")}
                      boxSize="18px"
                    />
                  </Tooltip>
                </Flex>
              </Td>
            </Tr>
            <Tr>
              <Td>João Guilherme Martins Borborema</Td>
              <Td>jborborema@sga.pucminas.br</Td>
              <Td>JoaoGuiMB</Td>
              <Td>
                <Flex justifyContent="space-around">
                  <Tooltip label="Editar usuário" placement="top">
                    <EditIcon
                      color={colors.aurora.Nord13}
                      _hover={{ cursor: "pointer" }}
                      onClick={() => alert("oi")}
                      boxSize="18px"
                    />
                  </Tooltip>
                  <Tooltip label="Deletar usuário" placement="top">
                    <DeleteIcon
                      color={colors.aurora.Nord11}
                      _hover={{ cursor: "pointer" }}
                      onClick={() => alert("oi")}
                      boxSize="18px"
                    />
                  </Tooltip>
                </Flex>
              </Td>
            </Tr>
            <Tr>
              <Td>João Guilherme Martins Borborema</Td>
              <Td>jborborema@sga.pucminas.br</Td>
              <Td>JoaoGuiMB</Td>
              <Td>
                <Flex justifyContent="space-around">
                  <Tooltip label="Editar usuário" placement="top">
                    <EditIcon
                      color={colors.aurora.Nord13}
                      _hover={{ cursor: "pointer" }}
                      onClick={() => alert("oi")}
                      boxSize="18px"
                    />
                  </Tooltip>
                  <Tooltip label="Deletar usuário" placement="top">
                    <DeleteIcon
                      color={colors.aurora.Nord11}
                      _hover={{ cursor: "pointer" }}
                      onClick={() => alert("oi")}
                      boxSize="18px"
                    />
                  </Tooltip>
                </Flex>
              </Td>
            </Tr>
            <Tr>
              <Td>João Guilherme Martins Borborema</Td>
              <Td>jborborema@sga.pucminas.br</Td>
              <Td>JoaoGuiMB</Td>
              <Td>
                <Flex justifyContent="space-around">
                  <Tooltip label="Editar usuário" placement="top">
                    <EditIcon
                      color={colors.aurora.Nord13}
                      _hover={{ cursor: "pointer" }}
                      onClick={() => alert("oi")}
                      boxSize="18px"
                    />
                  </Tooltip>
                  <Tooltip label="Deletar usuário" placement="top">
                    <DeleteIcon
                      color={colors.aurora.Nord11}
                      _hover={{ cursor: "pointer" }}
                      onClick={() => alert("oi")}
                      boxSize="18px"
                    />
                  </Tooltip>
                </Flex>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Flex>
    </Flex>
  );
};

export default Users;
