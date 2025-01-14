import { EmailIcon, Icon, LockIcon } from "@chakra-ui/icons";
import { Text } from "@chakra-ui/layout";
import {
  Button,
  Code,
  Flex,
  Skeleton,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  useColorMode,
  useDisclosure,
  useToast,
  UseToastOptions,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CSVReader from "react-csv-reader";
import { AiOutlineUser } from "react-icons/ai";
import { FiAlertCircle, FiUserPlus } from "react-icons/fi";
import Form from "../../../components/Form";
import Input from "../../../components/Input";
import ModalComponent from "../../../components/Modal";
import { UserTable, UserTableProps } from "../../../components/UserTable";
import { UserRole } from "../../../shared/enum/user-role";
import { CreateUser } from "../../../shared/interfaces/create-user";
import { UpdateUser } from "../../../shared/interfaces/update-user";
import { User } from "../../../shared/interfaces/user";
import { authService } from "../../../shared/services/authService";
import { userService } from "../../../shared/services/userService";
import { messageFactory, showDefaultFetchError, newBaseToast } from "../../../shared/utils/toast-messages";
import { colors } from "../../../styles/customTheme";

const LIGHT = "light";

const Users = () => {
  const { colorMode } = useColorMode();
  const toast = useToast();

  const {
    formColor,
    textColor,
    inputTextColor,
    labelColor,
    inputBgColor,
    iconInputColor,
  } =
    colorMode === LIGHT
      ? {
          formColor: colors.light.Nord6,
          textColor: colors.light.Nord6,
          inputTextColor: colors.light.Nord6,
          labelColor: colors.light.Nord6,
          inputBgColor: colors.dark.Nord2,
          iconInputColor: colors.dark.Nord0,
        }
      : {
          formColor: colors.dark.Nord2,
          textColor: colors.dark.Nord2,
          inputTextColor: colors.dark.Nord2,
          labelColor: colors.light.Nord6,
          inputBgColor: colors.light.Nord4,
          iconInputColor: colors.dark.Nord2,
        };

  const inputStyle = {
    inputTextColor,
    labelColor,
    inputBgColor,
    marginBottom: "5%",
  };

  const usersList: User[] = [];
  const [users, setUsers] = useState(usersList);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userId, setId] = useState("");
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
    passwordConfirmation: false,
  });

  const router = useRouter();

  useEffect(() => {
    userService
      .getAll({ role: UserRole.USER })
      .then((res) => {
        const { data } = res;
        setUsers(data.items);
      })
      .catch((e) => {
        if (e?.response?.data) {
          messageFactory(e.response.data,"warning").forEach((message,i) => showToastMessage(message,i))
        } else
          showDefaultFetchError("para carregar os usuários.")});
  }, []);

  const isAddUserValid = (newUser: CreateUser): boolean => {
    const { password } = newUser;
    const fieldsAndValues = Object.entries(newUser);

    let invalidFields = [];
    for (let i = 0; i < fieldsAndValues.length; i++) {
      const fields = fieldsAndValues[i];

      if (fields[1].length === 0) invalidFields.push(fields[0]);
    }
    let aux = {
      name: false,
      email: false,
      password: false,
      passwordConfirmation: false,
    };

    if (invalidFields.length > 0) {
      for (let field of invalidFields) {
        let tranlatedField = null;
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
          case "passwordConfirmation":
            aux.passwordConfirmation = true;
            tranlatedField = "Confirmar senha";
            break;
        }
        showToast(`Campo '${tranlatedField}' está vazio`, "warning");
      }
      setIsInputInvalid(aux);

      return false;
    } else if (!isUpdateModalOpen && password !== confirmPassField) {
      aux.password = true;
      aux.passwordConfirmation = true;
      showToast(
        `O campo 'Senha' e 'Confirmar senha' estão diferentes`,
        "warning"
      );
      setIsInputInvalid(aux);
      return false;
    }

    return true;
  };

  const saveUser = () => {
    const newUser: CreateUser = {
      name: nameField,
      email: emailField,
      password: passField,
      passwordConfirmation: confirmPassField,
      role: UserRole.USER,
    };

    if (isAddUserValid(newUser)) {
      userService
        .create(newUser)
        .then((res) => {
          const user = res.data.user as User;
          setUsers([...users, user]);
          handleCloseModal();
          cleanFields();
          showToast(`${newUser.name} cadastrado com sucesso`, "success");
        })
        .catch((e) => {
          messageFactory(e.response.data,"warning").forEach((message,i) => showToastMessage(message,i))
        });
    }
  };

  const updateUser = (): void => {
    const updatedUser: UpdateUser = {
      name: nameField,
      email: emailField,
    };

    userService
      .update(userId, updatedUser)
      .then(() => {
        const newArray = users.map((el, i) =>
          i === selectedUser ? Object.assign({}, el, updatedUser) : el
        );
        setUsers(newArray);
        handleCloseModal();
        showToast(`${nameField} atualizado`, "success");
      })
      .catch((e) => {
        messageFactory(e.response.data,"warning").forEach((message,i) => showToastMessage(message,i))
      });
  };

  const deleteUser = (): void => {
    userService
      .delete(userId)
      .then(() => {
        const newArray = users.filter((_el, i) => selectedUser !== i);
        showToast(`Usuário ${selectedUserName} foi deletado`, "success");
        setUsers(newArray);
        setIsDeleteModalOpen(false);
      })
      .catch((e) => {
        messageFactory(e.response.data,"warning").forEach((message,i) => showToastMessage(message,i))
      });
  };

  function showToast(
    description: string,
    status: "error" | "warning" | "success",
    id: number = 1
  ) {
    if (!toast.isActive(id)) {
      toast({
        description,
        id,
        ...newBaseToast(status),
      });
    }
  }

  function showToastMessage(message:UseToastOptions, id = 1){
    if (!toast.isActive(id))
      toast(message)
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
    setId(user.id);
    setSelectedUser(index);
  }

  function handleDeleteUser(user: User, index: number) {
    setSelectedUser(index);
    setSelectedUserName(user.name);
    setId(user.id);
    setIsDeleteModalOpen(true);
  }

  async function handleImportUsers(data: any[], fileInfo: Object) {
    const newUsers: CreateUser[] = data.map((user: any[]) => ({
      name: user[0],
      email: user[1],
      password: user[2],
      passwordConfirmation: user[2],
      role: UserRole.USER,
    }));

    const requestBody = {
      users: newUsers,
    };

    userService.createMany(requestBody).then((res) => {
      userService.getAll({ role: UserRole.USER }).then(({ data }) => {
        setUsers(data.items);
      });
    });
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

  const handleChangeConfirmPass = (e: any): void =>
    setConfirmPassField(e.target.value);

  const openAddUserModal = (): void => setIsAddUserModalOpen(true);

  const handleCloseModal = (): void => {
    if (isAddUserModalOpen) setIsAddUserModalOpen(false);
    else if (isUpdateModalOpen) setIsUpdateModalOpen(false);
    else if (isDeleteModalOpen) setIsDeleteModalOpen(false);

    setIsInputInvalid({
      name: false,
      email: false,
      password: false,
      passwordConfirmation: false,
    });
    cleanFields();
  };

  const cleanFields = (): void => {
    setNameField("");
    setEmailField("");
    setPassField("");
    setConfirmPassField("");
  };

  const iconTooltip = (child: JSX.Element, label: string) => (
    <Tooltip label={label} fontSize="md" placement="bottom">
      <span>{child}</span>
    </Tooltip>
  );

  const addUserComponent = iconTooltip(
    <Icon
      as={FiUserPlus}
      boxSize={25}
      color={colors.aurora.Nord14}
      _hover={{ cursor: "pointer" }}
      m={2}
      onClick={(): void => openAddUserModal()}
    />,
    "Adicionar Usuário"
  );

  const importUserInfo = iconTooltip(
    <Icon
      as={FiAlertCircle}
      boxSize={5}
      color={colors.aurora.Nord12}
      _hover={{ cursor: "pointer" }}
      ml={2}
      onClick={onOpen}
    />,
    "Informações"
  );

  const userTableProps: UserTableProps = {
    handleDeleteUser,
    handleUpdateUser,
    users,
  };

  return (
    <>
      <ModalComponent
        title="Deletar usuário"
        isOpen={isDeleteModalOpen}
        userName={selectedUserName}
        onClose={(): void => handleCloseModal()}
      >
        <Flex justify="flex-end" mb={5} mt={5}>
          <Button
            mr={4}
            onClick={(): void => handleCloseModal()}
            bgColor={colors.aurora.Nord11}
            color={colors.light.Nord6}
            _hover={{
              bgColor: colors.aurora.Nord11,
            }}
          >
            Não
          </Button>
          <Button
            bgColor={colors.aurora.Nord14}
            color={colors.light.Nord6}
            _hover={{
              bgColor: colors.aurora.Nord14,
            }}
            onClick={(): void => handleConfirmModal()}
          >
            Sim
          </Button>
        </Flex>
      </ModalComponent>

      <ModalComponent
        title={isAddUserModalOpen ? "Adicionar usuário" : "Editar usuário"}
        isOpen={isAddUserModalOpen || isUpdateModalOpen}
        onClose={(): void => handleCloseModal()}
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
                validate={isInputInvalid.passwordConfirmation}
                placeholder="Confirma senha"
                style={inputStyle}
                icon={<LockIcon color={iconInputColor} />}
                onChangeInput={handleChangeConfirmPass}
                value={confirmPassField}
              />
            </>
          )}
        </Form>
        <Flex justify="flex-end" mb={5}>
          <Button
            onClick={(): void => handleCloseModal()}
            bgColor={colors.aurora.Nord11}
            color={colors.light.Nord6}
            _hover={{
              bgColor: colors.aurora.Nord11,
            }}
            mr={4}
          >
            Cancelar
          </Button>
          <Button
            bgColor={colors.aurora.Nord14}
            color={colors.light.Nord6}
            _hover={{
              bgColor: colors.aurora.Nord14,
            }}
            onClick={(): void => handleConfirmModal()}
          >
            Salvar
          </Button>
        </Flex>
      </ModalComponent>

      <Flex justifyContent="center" alignItems="center" mt="2%">
        <Flex flexDirection="column" alignItems="flex-end" minW="75%">
          <Flex justifyContent="space-between" alignItems="center" mb="3%">
            {addUserComponent}
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
                onFileLoaded={(data: any[], fileInfo: Object): any =>
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
            {importUserInfo}
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

          <Skeleton isLoaded={!!users} margin="auto">
            {users.length !== 0 ? (
              <UserTable {...userTableProps} />
            ) : (
              <Text fontSize="2xl">
                Sem usuários para serem listados, importe por <code>.csv</code>{" "}
                ou crie um usuário
              </Text>
            )}
          </Skeleton>
        </Flex>
      </Flex>
    </>
  );
};

export default Users;
