import { useState } from "react";
import { DeleteIcon, EditIcon, Icon } from "@chakra-ui/icons";
import {
  Flex,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  Tfoot,
  useColorMode,
  Button,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import { FiUserPlus } from "react-icons/fi";
import { colors } from "../../styles/customTheme";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineUser,
} from "react-icons/ai";
import CSVReader from "react-csv-reader";
import TableLine from "../../components/TableLine";
import ModalComponent from "../../components/Modal";
import Form from "../../components/Form";
import Input from "../../components/Input";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";

const LIGHT = "light";

export interface User {
  displayName: string;
  email: string;
  userName: string;
}

const NUMBER_OF_USERS_PER_PAGE = 5;

const Users = () => {
  const { colorMode } = useColorMode();
  const formColor =
    colorMode === LIGHT ? colors.light.Nord6 : colors.dark.Nord2;
  const textColor =
    colorMode === LIGHT ? colors.light.Nord6 : colors.dark.Nord2;

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
    Math.ceil(users.length / NUMBER_OF_USERS_PER_PAGE)
  );

  const [nameField, setNameField] = useState("");
  const [emailField, setEmailField] = useState("");
  const [passField, setPassField] = useState("");
  const [confirmPassField, setConfirmPassField] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  function handleNextPage() {
    setCurrentPage((prevState) => prevState + 1);
  }

  function handlePrevPage() {
    setCurrentPage((prevState) => prevState - 1);
  }

  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleRenderUsers() {
    let userToRender = [];

    for (
      let i = (currentPage - 1) * NUMBER_OF_USERS_PER_PAGE;
      i < currentPage * NUMBER_OF_USERS_PER_PAGE && i < users.length;
      i++
    ) {
      const user = users[i];
      const newUserToRender = <TableLine user={user} key={i} />;
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
    const newPageNumber = Math.floor(data.length / NUMBER_OF_USERS_PER_PAGE);
    setNumberOfPages((prevState) => prevState + newPageNumber);
  }

  const parserOptions = {
    header: false,
    dynamicTyping: true,
    skipEmptyLines: true,
  };

  const inputTextColor =
    colorMode === LIGHT ? colors.light.Nord6 : colors.dark.Nord2;
  const labelColor =
    colorMode === LIGHT ? colors.dark.Nord2 : colors.light.Nord6;
  const inputBgColor =
    colorMode === LIGHT ? colors.dark.Nord0 : colors.light.Nord4;
  const iconInputColor =
    colorMode === LIGHT ? colors.dark.Nord0 : colors.dark.Nord2;
  const inputStyle = {
    inputTextColor,
    labelColor,
    inputBgColor,
    marginBottom: "5%",
  };

  function handleChangeName(e: any) {
    setNameField(e.target.value);
  }
  function handleChangeEmail(e: any) {
    setEmailField(e.target.value);
  }
  function handleChangPass(e: any) {
    setPassField(e.target.value);
  }
  function handleChangeConfirmPass(e: any) {
    setConfirmPassField(e.target.value);
  }

  function saveUser() {
    const newUser: User = {
      displayName: nameField,
      email: emailField,
      userName: "",
    };
    setUsers([...users, newUser]);
    onClose();
    cleanFields();
  }
  function cleanFields() {
    setNameField("");
    setEmailField("");
    setPassField("");
    setConfirmPassField("");
  }

  function closeModal() {
    onClose();
    cleanFields();
  }

  return (
    <>
      <ModalComponent isOpen={isOpen} onClose={onClose}>
        <Form style={{ bgColor: formColor, textColor }}>
          <Input
            label="Nome"
            placeholder="Nome"
            style={inputStyle}
            icon={<AiOutlineUser color={iconInputColor} />}
            onChangeInput={handleChangeName}
            value={nameField}
          />
          <Input
            label="E-mail"
            placeholder="Email"
            style={inputStyle}
            icon={<EmailIcon color={iconInputColor} />}
            onChangeInput={handleChangeEmail}
            value={emailField}
          />
          <Input
            label="Senha"
            placeholder="Senha"
            style={inputStyle}
            icon={<LockIcon color={iconInputColor} />}
            onChangeInput={handleChangPass}
            value={passField}
          />
          <Input
            label="Confirma senha"
            placeholder="Confirma senha"
            style={inputStyle}
            icon={<LockIcon color={iconInputColor} />}
            onChangeInput={handleChangeConfirmPass}
            value={confirmPassField}
          />
        </Form>
        <Flex justify="flex-end" mb="5%">
          <Button
            bgColor={colors.aurora.Nord11}
            color={inputTextColor}
            _hover={{
              bgColor: colors.aurora.Nord11,
            }}
            mr="8%"
            onClick={() => saveUser()}
          >
            Salvar
          </Button>
          <Button
            onClick={() => closeModal()}
            bgColor={colors.aurora.Nord14}
            color={inputTextColor}
            _hover={{
              bgColor: colors.aurora.Nord14,
            }}
          >
            Cancelar
          </Button>
        </Flex>
      </ModalComponent>
      <Flex justifyContent="center" alignItems="center" mt="2%">
        <Flex flexDirection="column" alignItems="flex-end">
          <Flex justifyContent="space-between" alignItems="center" mb="3%">
            <Icon
              as={FiUserPlus}
              boxSize="25px"
              color={colors.aurora.Nord14}
              _hover={{ cursor: "pointer" }}
              mr="12px"
              onClick={onOpen}
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
                inputStyle={{
                  display: "none",
                  cursor: "pointer",
                  width: "100%",
                }}
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
    </>
  );
};

export default Users;
