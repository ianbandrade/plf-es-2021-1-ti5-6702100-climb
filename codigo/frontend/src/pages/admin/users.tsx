import { useState } from "react";
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
  Tfoot,
  useColorMode,
  Button,
  Heading,
} from "@chakra-ui/react";
import { FiUserPlus } from "react-icons/fi";
import { colors } from "../../styles/customTheme";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import CSVReader from "react-csv-reader";

const LIGHT = "light";

interface User {
  displayName: string;
  email: string;
  userName: string;
}

const Users = () => {
  const { colorMode } = useColorMode();

  function setTableBgColor() {
    return colorMode === LIGHT ? colors.light.Nord5 : colors.dark.Nord1;
  }

  const usersList: User[] = [
    {
      displayName: "João Guilherme Martins Borborema",
      email: "jborborema@sga.pucminas",
      userName: "JoaoGuiMB",
    },
    {
      displayName: "João Guilherme Martins Borborema",
      email: "jborborema@sga.pucminas",
      userName: "JoaoGuiMB",
    },
    {
      displayName: "asdasd",
      email: "jborborema@sga.pucminas",
      userName: "JoaoGuiMB",
    },
    {
      displayName: "adsdorema",
      email: "jborborema@sga.pucminas",
      userName: "JoaoGuiMB",
    },
    {
      displayName: "João Guilherme Martins Borborema",
      email: "jborborema@sga.pucminas",
      userName: "JoaoGuiMB",
    },
    {
      displayName: "João Guilherme Martins Borborema",
      email: "jborborema@sga.pucminas",
      userName: "JoaoGuiMB",
    },
    {
      displayName: "João Guilherme Martins Borborema",
      email: "jborborema@sga.pucminas",
      userName: "JoaoGuiMB",
    },
    {
      displayName: "João Guilherme Martins Borborema",
      email: "jborborema@sga.pucminas",
      userName: "JoaoGuiMB",
    },
    {
      displayName: "asdasdsadema",
      email: "jborborema@sga.pucminas",
      userName: "JoaoGuiMB",
    },
    {
      displayName: "Jauuuuuuborema",
      email: "jborborema@sga.pucminas",
      userName: "qqqqqq",
    },
    {
      displayName: "João Guilherme Martins Borborema",
      email: "jborborema@sga.pucminas",
      userName: "JoaoGuiMB",
    },
    {
      displayName: "João Guilherme Martins Borborema",
      email: "jborborema@sga.pucminas",
      userName: "asdasdsd",
    },
  ];

  const [users, setUsers] = useState(usersList);
  const [numberOfPages, setNumberOfPages] = useState(
    Math.ceil(users.length / 5)
  );
  const [currentPage, setCurrentPage] = useState(1);

  function handleNextPage() {
    setCurrentPage((prevState) => prevState + 1);
  }

  function handlePrevPage() {
    setCurrentPage((prevState) => prevState - 1);
  }

  const cellItemLength = "36ch";

  function handleRenderUsers() {
    let userToRender = [];

    for (
      let i = (currentPage - 1) * 5;
      i < currentPage * 5 && i < users.length;
      i++
    ) {
      const user = users[i];
      const newUserToRender = (
        <Tr key={Math.random()}>
          <Td maxWidth={cellItemLength} isTruncated title={user.displayName}>
            {user.displayName}
          </Td>
          <Td maxWidth={cellItemLength} isTruncated title={user.email}>
            {user.email}
          </Td>
          <Td maxWidth={cellItemLength} isTruncated title={user.email}>
            {user.userName}
          </Td>
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
      );
      userToRender.push(newUserToRender);
    }

    return userToRender;
  }

  function handleImportUsers(data: any[], fileInfo: Object) {
    let newUsers: User[] = [];
    for (let i = 1; i < data.length; i++) {
      const user = data[i];
      const newUser: User = {
        displayName: user[0],
        email: user[1],
        userName: user[2],
      };
      newUsers.push(newUser);
    }
    setUsers((users) => users.concat(newUsers));
    const newPageNumber = Math.floor(data.length / 5);
    setNumberOfPages((prevState) => prevState + newPageNumber);
  }

  const parserOptions = {
    header: false,
    dynamicTyping: true,
    skipEmptyLines: true,
  };

  return (
    <Flex justifyContent="center" alignItems="center" mt="2%">
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
            <CSVReader
              label="Importar Usuários"
              onFileLoaded={(data: any[], fileInfo: Object) =>
                handleImportUsers(data, fileInfo)
              }
              parserOptions={parserOptions}
              inputStyle={{ display: "none", cursor: "pointer", width: "100%" }}
              accept=".csv"
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
          <Tbody>{handleRenderUsers()}</Tbody>
          <Tfoot>
            <Tr width="100%">
              <Th>
                {currentPage === 1 ? (
                  ""
                ) : (
                  <Button onClick={() => handlePrevPage()}>
                    <AiOutlineArrowLeft />
                  </Button>
                )}
              </Th>
              <Th display="flex" justifyContent="center">
                <Heading fontSize="22px">{currentPage}</Heading>
              </Th>
              <Th></Th>
              <Th>
                {currentPage === numberOfPages ? (
                  ""
                ) : (
                  <Button onClick={() => handleNextPage()}>
                    <AiOutlineArrowRight />
                  </Button>
                )}
              </Th>
            </Tr>
          </Tfoot>
        </Table>
      </Flex>
    </Flex>
  );
};

export default Users;
