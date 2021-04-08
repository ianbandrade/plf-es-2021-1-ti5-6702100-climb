import { EmailIcon, Icon, LockIcon } from "@chakra-ui/icons";
import {
  Button,
  Code,
  Flex,
  Heading,
  Spacer,
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useColorMode,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import CSVReader from "react-csv-reader";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineUser,
} from "react-icons/ai";
import { FiHelpCircle, FiUserPlus } from "react-icons/fi";
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
  githubAcc?: string;
  gitlabAcc?: string;
  password?: string;
  confirmPassword?: string;
}

const NUMBER_OF_USERS_PER_PAGE = 5;

const Users = () => {
  const { colorMode } = useColorMode();
  const toast = useToast();
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
    colorMode === LIGHT ? colors.light.Nord4 : colors.dark.Nord2;

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
      githubAcc: "JoaoGuiMB",
      gitlabAcc: "teste",
    },
    {
      name: "João Guilherme Martins Borborema",
      email: "jborborema@sga.pucminas",
      githubAcc: "JoaoGuiMB",
      gitlabAcc: "teste",
    },
    {
      name: "asdasd",
      email: "jborborema@sga.pucminas",
      githubAcc: "JoaoGuiMB",
      gitlabAcc: "teste",
    },
    {
      name: "adsdorema",
      email: "jborborema@sga.pucminas",
      githubAcc: "JoaoGuiMB",
      gitlabAcc: "teste",
    },
    {
      name: "João Guilherme Martins Borborema",
      email: "jborborema@sga.pucminas",
      githubAcc: "JoaoGuiMB",
      gitlabAcc: "teste",
    },
    {
      name: "João Guilherme Martins Borborema",
      email: "jborborema@sga.pucminas",
      githubAcc: "JoaoGuiMB",
      gitlabAcc: "teste",
    },
    {
      name: "João Guilherme Martins Borborema",
      email: "jborborema@sga.pucminas",
      githubAcc: "JoaoGuiMB",
      gitlabAcc: "teste",
    },
    {
      name: "João Guilherme Martins Borborema",
      email: "jborborema@sga.pucminas",
      githubAcc: "JoaoGuiMB",
      gitlabAcc: "teste",
    },
    {
      name: "asdasdsadema",
      email: "jborborema@sga.pucminas",
      githubAcc: "JoaoGuiMB",
      gitlabAcc: "teste",
    },
    {
      name: "Jauuuuuuborema",
      email: "jborborema@sga.pucminas",
      githubAcc: "qqqqqq",
      gitlabAcc: "teste",
    },
    {
      name: "João Guilherme Martins Borborema",
      email: "jborborema@sga.pucminas",
      githubAcc: "JoaoGuiMB",
      gitlabAcc: "teste",
    },
    {
      name: "João Guilherme Martins Borborema",
      email: "jborborema@sga.pucminas",
      githubAcc: "asdasdsd",
      gitlabAcc: "teste",
    },
  ];

  const [users, setUsers] = useState(usersList);
  const [numberOfPages, setNumberOfPages] = useState(
    Math.ceil(users.length / NUMBER_OF_USERS_PER_PAGE)
  );
  const [currentPage, setCurrentPage] = useState(1);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nameField, setNameField] = useState("");
  const [emailField, setEmailField] = useState("");
  const [passField, setPassField] = useState("");
  const [confirmPassField, setConfirmPassField] = useState("");
  const [selectedUser, setSelectedUser] = useState(0);
  const [selectedUserName, setSelectedUserName] = useState("");

  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isInputInvalid, setIsInputInvalid] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
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

  function isAddUserValid(newUser: User) {
    const { password } = newUser;
    const fieldsAndValues = Object.entries(newUser);

    let invalidFields = [];
    for (let i = 0; i < fieldsAndValues.length; i++) {
      const fields = fieldsAndValues[i];

      if (fields[1].length === 0) {
        console.log(fields);
        invalidFields.push(fields[0]);
      }
    }
    let aux = {
      name: false,
      email: false,
      password: false,
      confirmPassword: false,
    };

    if (invalidFields.length > 0) {
      for (let field of invalidFields) {
        let tranlatedField = null;
        console.log(field);
        switch (field) {
          case "name":
            aux.name = true;
            tranlatedField = "Nome";
            break;
          case "email":
            aux.email = true;
            tranlatedField = "Email";
            break;
          case "password":
            aux.password = true;
            tranlatedField = "Senha";
            break;
          case "confirmPassword":
            aux.confirmPassword = true;
            tranlatedField = "Confirmar senha";
            break;
        }
        toast({
          title: `Campo ${tranlatedField} está vazio`,
          status: "error",
          duration: 2000,
        });
      }
      setIsInputInvalid(aux);
      return false;
      // TODO = add more validation to password
    } else if (!isUpdateModalOpen && password !== confirmPassField) {
      aux.password = true;
      aux.confirmPassword = true;
      toast({
        title: `Campo senha e confirmar senha estão divergentes`,
        status: "error",
        duration: 2000,
      });
      setIsInputInvalid(aux);
      return false;
    } else if (
      !password?.match(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
      )
    ) {
      aux.password = true;
      aux.confirmPassword = true;
      setIsInputInvalid(aux);
      toast({
        title: `A senha deve ter no mínimo 8 caracteres, números, letras maiusculas e minusculas e caracteres especiais`,
        status: "error",
        duration: 2000,
      });

      return false;
    }
    return true;
  }

  function saveUser() {
    const newUser: User = {
      name: nameField,
      email: emailField,
      password: passField,
      confirmPassword: confirmPassField,
    };

    if (isAddUserValid(newUser)) {
      setUsers([...users, newUser]);
      handleCloseModal();
      cleanFields();
      updateNumberOfPages();
      toast({
        title: "Usuário criado com sucesso",
        description: `${newUser.name} cadastrado com sucesso`,
        status: "success",
        duration: 9000,
      });
    }
  }

  function updateUser() {
    const updatedUser: User = {
      name: nameField,
      email: emailField,
    };

    if (isAddUserValid(updatedUser)) {
      const newArray = users.map((el, i) =>
        i === selectedUser ? Object.assign({}, el, updatedUser) : el
      );

      setUsers(newArray);
      handleCloseModal();
      updateNumberOfPages();
    }
  }

  function deleteUser() {
    console.log(selectedUser);
    const newArray = users.filter((_el, i) => selectedUser !== i);

    toast({
      title: `Usuário ${selectedUserName} foi deletado com sucesso!`,
      status: "success",
      duration: 2000,
    });

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
        password: user[2],
        confirmPassword: user[2],
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

    setIsInputInvalid({
      name: false,
      email: false,
      password: false,
      confirmPassword: false,
    });
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
        title="Deletar usuário"
        isOpen={isDeleteModalOpen}
        userName={selectedUserName}
        onClose={() => handleCloseModal()}
      >
        <Flex justify="flex-end" mb={5} mt={5}>
          <Button
            bgColor={colors.aurora.Nord14}
            color={colors.light.Nord6}
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
            color={colors.light.Nord6}
            _hover={{
              bgColor: colors.aurora.Nord11,
            }}
          >
            Não
          </Button>
        </Flex>
      </ModalComponent>

      <ModalComponent
        title={isAddUserModalOpen ? "Adicionar usuário" : "Editar usuário"}
        isOpen={isAddUserModalOpen || isUpdateModalOpen}
        onClose={() => handleCloseModal()}
      >
        <Form style={{ bgColor: formColor, textColor }}>
          <Input
            type={"text"}
            label="Nome"
            placeholder="Nome"
            validate={isInputInvalid.name}
            style={inputStyle}
            icon={<AiOutlineUser color={iconInputColor} />}
            onChangeInput={handleChangeName}
            value={nameField}
          />
          <Input
            type={"email"}
            label="E-mail"
            validate={isInputInvalid.email}
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
                validate={isInputInvalid.password}
                placeholder="Senha"
                style={inputStyle}
                icon={<LockIcon color={iconInputColor} />}
                onChangeInput={handleChangPass}
                value={passField}
              />
              <Input
                type={"password"}
                label="Confirma senha"
                validate={isInputInvalid.confirmPassword}
                placeholder="Confirma senha"
                style={inputStyle}
                icon={<LockIcon color={iconInputColor} />}
                onChangeInput={handleChangeConfirmPass}
                value={confirmPassField}
              />
            </>
          )}
        </Form>
        <Flex justify="flex-end" mb="5%">
          <Button
            bgColor={colors.aurora.Nord11}
            color={colors.light.Nord6}
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
            color={colors.light.Nord6}
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

            <Icon
              as={FiHelpCircle}
              boxSize="20px"
              color={colors.aurora.Nord12}
              _hover={{ cursor: "pointer" }}
              ml="5%"
              onClick={onOpen}
            />

            <ModalComponent
              isOpen={isOpen}
              onClose={onClose}
              title="Exemplo CSV"
              width={650}
            >
              <Table variant="unstyled" m={[5, 2]}>
                <TableCaption>
                  Os itens devem ser separados por <Code>;</Code>
                </TableCaption>
                <Thead>
                  <Tr>
                    <Th>Nome;</Th>
                    <Th>Email;</Th>
                    <Th>Senha</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Joaquim da Silva Lobo;</Td>
                    <Td>joaquim@climb.com;</Td>
                    <Td>senha123</Td>
                  </Tr>
                  <Tr>
                    <Td>Patrick Antonio;</Td>
                    <Td>patricka@climb.com;</Td>
                    <Td>423!@$fpass</Td>
                  </Tr>
                </Tbody>
              </Table>
            </ModalComponent>
          </Flex>

          <Table
            boxShadow="dark-lg"
            variant="striped"
            bgColor={setTableBgColor()}
            borderRadius="6px"
            maxH="600px"
            minW="1000px"
            maxW="500px"
            size="lg"
            h={"50%"}
          >
            <Thead>
              <Tr height="5px">
                <Th>Nome</Th>
                <Th>Email</Th>
                <Th>Github</Th>
                <Th>Gitlab</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>{handleRenderUsers()} </Tbody>
            <Tfoot>
              <Tr height="5px">
                <Td colSpan={5}>
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
