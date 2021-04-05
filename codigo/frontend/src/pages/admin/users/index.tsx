import { EmailIcon, Icon, LockIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Heading,
  Spacer,
  Table,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useColorMode,
} from "@chakra-ui/react";
import { useState } from "react";
import CSVReader from "react-csv-reader";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineUser,
} from "react-icons/ai";
import { FiUserPlus } from "react-icons/fi";
import Form from "../../../components/Form";
import Input from "../../../components/Input";
import ModalComponent from "../../../components/Modal";
import TableLine from "../../../components/TableLine";
import { colors } from "../../../styles/customTheme";

const LIGHT = "light";
const disabled: boolean = true;

export interface User {
  name: string;
  email: string;
  userName: string;
  password?: string;
  confirmPassword?: string;
}

const NUMBER_OF_USERS_PER_PAGE = 5;

const Users = () => {
  const { colorMode } = useColorMode();
  const formColor =
    colorMode === LIGHT ? colors.light.Nord6 : colors.dark.Nord2;
  const textColor =
    colorMode === LIGHT ? colors.light.Nord6 : colors.dark.Nord2;
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

  function setTableBgColor() {
    return colorMode === LIGHT ? colors.light.Nord5 : colors.dark.Nord1;
  }

  const usersList: User[] = [
    {
      name: "João Guilherme Martins Borborema",
      email: "jborborema@sga.pucminas",
      userName: "JoaoGuiMB",
    },
    {
      name: "João Guilherme Martins Borborema",
      email: "jborborema@sga.pucminas",
      userName: "JoaoGuiMB",
    },
    {
      name: "asdasd",
      email: "jborborema@sga.pucminas",
      userName: "JoaoGuiMB",
    },
    {
      name: "adsdorema",
      email: "jborborema@sga.pucminas",
      userName: "JoaoGuiMB",
    },
    {
      name: "João Guilherme Martins Borborema",
      email: "jborborema@sga.pucminas",
      userName: "JoaoGuiMB",
    },
    {
      name: "João Guilherme Martins Borborema",
      email: "jborborema@sga.pucminas",
      userName: "JoaoGuiMB",
    },
    {
      name: "João Guilherme Martins Borborema",
      email: "jborborema@sga.pucminas",
      userName: "JoaoGuiMB",
    },
    {
      name: "João Guilherme Martins Borborema",
      email: "jborborema@sga.pucminas",
      userName: "JoaoGuiMB",
    },
    {
      name: "asdasdsadema",
      email: "jborborema@sga.pucminas",
      userName: "JoaoGuiMB",
    },
    {
      name: "Jauuuuuuborema",
      email: "jborborema@sga.pucminas",
      userName: "qqqqqq",
    },
    {
      name: "João Guilherme Martins Borborema",
      email: "jborborema@sga.pucminas",
      userName: "JoaoGuiMB",
    },
    {
      name: "João Guilherme Martins Borborema",
      email: "jborborema@sga.pucminas",
      userName: "asdasdsd",
    },
  ];

  const [users, setUsers] = useState(usersList);
  const [numberOfPages, setNumberOfPages] = useState(
    Math.ceil(users.length / NUMBER_OF_USERS_PER_PAGE)
  );
  const [currentPage, setCurrentPage] = useState(1);

  const [nameField, setNameField] = useState("");
  const [emailField, setEmailField] = useState("");
  const [passField, setPassField] = useState("");
  const [confirmPassField, setConfirmPassField] = useState("");
  const [userNameField, setUserNameField] = useState("");
  const [selectedUser, setSelectedUser] = useState(0);
  const [selectedUserName, setSelectedUserName] = useState("");

  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  function handleNextPage() {
    setCurrentPage((prevState) => prevState + 1);
  }

  function handlePrevPage() {
    setCurrentPage((prevState) => prevState - 1);
  }

  function handleRenderUsers() {
    let userToRender = [];

    for (
      let i = (currentPage - 1) * NUMBER_OF_USERS_PER_PAGE;
      i < currentPage * NUMBER_OF_USERS_PER_PAGE && i < users.length;
      i++
    ) {
      const user = users[i];
      const newUserToRender = (
        <>
          <TableLine
            index={i}
            user={user}
            key={i}
            updateUser={(updatedUser) => handleUpdateUser(updatedUser, i)}
            deleteUser={(deletedUser) => handleDeleteUser(deletedUser, i)}
          />
        </>
      );
      userToRender.push(newUserToRender);
    }

    return userToRender;
  }

  function updateNumberOfPages() {
    setNumberOfPages(Math.ceil(users.length / NUMBER_OF_USERS_PER_PAGE));
  }

  function saveUser() {
    const newUser: User = {
      name: nameField,
      email: emailField,
      userName: "",
      password: passField,
      confirmPassword: confirmPassField,
    };
    setUsers([...users, newUser]);
    handleCloseModal();
    cleanFields();
    updateNumberOfPages();
  }
  function updateUser() {
    const updatedUser: User = {
      name: nameField,
      email: emailField,
      userName: userNameField,
    };
    const newArray = users.map((el, i) =>
      i === selectedUser ? Object.assign({}, el, updatedUser) : el
    );
    setUsers(newArray);
    handleCloseModal();
    updateNumberOfPages();
  }

  function deleteUser() {
    const newArray = users.filter((_el, i) => selectedUser !== i);
    setUsers(newArray);
    setIsDeleteModalOpen(false);
    updateNumberOfPages();
  }

  function handleConfirmModal() {
    if (isAddUserModalOpen) {
      saveUser();
    }
    if (isUpdateModalOpen) {
      updateUser();
    }
    if (isDeleteModalOpen) {
      deleteUser();
    }
  }

  function handleUpdateUser(user: User, index: number) {
    setIsUpdateModalOpen(true);
    setNameField(user.name);
    setEmailField(user.email);
    setUserNameField(user.userName);
    setSelectedUser(index);
  }

  function handleDeleteUser(user: User, index: number) {
    console.log(user);
    setSelectedUser(index);
    setSelectedUserName(user.name);
    setIsDeleteModalOpen(true);
  }

  function handleImportUsers(data: any[], fileInfo: Object) {
    let newUsers: User[] = [];
    for (let i = 1; i < data.length; i++) {
      const user = data[i];
      const newUser: User = {
        name: user[0],
        email: user[1],
        userName: user[2],
        password: user[3],
        confirmPassword: user[3],
      };
      newUsers.push(newUser);
    }
    setUsers((userLis) => userLis.concat(newUsers));
    const newPageNumber = Math.floor(data.length / NUMBER_OF_USERS_PER_PAGE);
    setNumberOfPages((prevState) => prevState + newPageNumber);
  }

  const parserOptions = {
    header: false,
    dynamicTyping: true,
    skipEmptyLines: true,
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

  function handleUserNameField(e: any) {
    setUserNameField(e.target.value);
  }

  function openAddUserModal() {
    setIsAddUserModalOpen(true);
  }

  function handleCloseModal() {
    if (isAddUserModalOpen) {
      setIsAddUserModalOpen(false);
    }
    if (isUpdateModalOpen) {
      setIsUpdateModalOpen(false);
    }
    if (isDeleteModalOpen) {
      setIsDeleteModalOpen(false);
    }
    cleanFields();
  }

  function cleanFields() {
    setNameField("");
    setEmailField("");
    setPassField("");
    setConfirmPassField("");
  }

  return (
    <>
      <ModalComponent
        isOpen={isDeleteModalOpen}
        onClose={() => handleCloseModal()}
      >
        <Text>Você deseja deletar {selectedUserName} ?</Text>
        <Flex justify="flex-end" mb="5%">
          <Button
            bgColor={colors.aurora.Nord14}
            color={inputTextColor}
            _hover={{
              bgColor: colors.aurora.Nord14,
            }}
            mr="8%"
            onClick={() => handleConfirmModal()}
          >
            Sim
          </Button>
          <Button
            onClick={() => handleCloseModal()}
            bgColor={colors.aurora.Nord11}
            color={inputTextColor}
            _hover={{
              bgColor: colors.aurora.Nord11,
            }}
          >
            Não
          </Button>
        </Flex>
      </ModalComponent>
      <ModalComponent
        isOpen={isAddUserModalOpen || isUpdateModalOpen}
        onClose={() => handleCloseModal()}
      >
        <Form style={{ bgColor: formColor, textColor }}>
          <Input
            type={"text"}
            label="Nome"
            placeholder="Nome"
            style={inputStyle}
            icon={<AiOutlineUser color={iconInputColor} />}
            onChangeInput={handleChangeName}
            value={nameField}
          />
          <Input
            type={"email"}
            label="E-mail"
            placeholder="Email"
            style={inputStyle}
            icon={<EmailIcon color={iconInputColor} />}
            onChangeInput={handleChangeEmail}
            value={emailField}
          />
          {!isUpdateModalOpen && (
            <>
              <Input
                type={"password"}
                label="Senha"
                placeholder="Senha"
                style={inputStyle}
                icon={<LockIcon color={iconInputColor} />}
                onChangeInput={handleChangPass}
                value={passField}
              />
              <Input
                type={"password"}
                label="Confirma senha"
                placeholder="Confirma senha"
                style={inputStyle}
                icon={<LockIcon color={iconInputColor} />}
                onChangeInput={handleChangeConfirmPass}
                value={confirmPassField}
              />
            </>
          )}

          {isUpdateModalOpen && (
            <Input
              type={"text"}
              label="Nome do usuário"
              placeholder="Nome do usuário"
              style={inputStyle}
              icon={<AiOutlineUser color={iconInputColor} />}
              onChangeInput={handleUserNameField}
              value={userNameField}
            />
          )}
        </Form>
        <Flex justify="flex-end" mb="5%">
          <Button
            bgColor={colors.aurora.Nord11}
            color={inputTextColor}
            _hover={{
              bgColor: colors.aurora.Nord11,
            }}
            mr="8%"
            onClick={() => handleConfirmModal()}
          >
            Salvar
          </Button>
          <Button
            onClick={() => handleCloseModal()}
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
              onClick={() => openAddUserModal()}
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
            h={"50%"}
          >
            <Thead>
              <Tr height="5px">
                <Th>Nome</Th>
                <Th>Email</Th>
                <Th>Usuário</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>{handleRenderUsers()} </Tbody>
            <Tfoot>
              <Tr height="5px">
                <Td colSpan={4}>
                  <Flex alignItems="center">
                    {currentPage === 1 ? (
                      <Button
                        isDisabled={disabled}
                        onClick={() => handlePrevPage()}
                      >
                        <AiOutlineArrowLeft />
                      </Button>
                    ) : (
                      <Button onClick={() => handlePrevPage()}>
                        <AiOutlineArrowLeft />
                      </Button>
                    )}

                    <Spacer />
                    <Heading fontSize="22px">{currentPage}</Heading>
                    <Spacer />

                    {currentPage === numberOfPages ? (
                      <Button
                        isDisabled={disabled}
                        onClick={() => handlePrevPage()}
                      >
                        <AiOutlineArrowRight />
                      </Button>
                    ) : (
                      <Button onClick={() => handleNextPage()}>
                        <AiOutlineArrowRight />
                      </Button>
                    )}
                  </Flex>
                </Td>
              </Tr>
            </Tfoot>
          </Table>
        </Flex>
      </Flex>
    </>
  );
};

export default Users;
