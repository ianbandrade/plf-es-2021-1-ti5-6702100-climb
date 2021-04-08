import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  useColorMode,
  useToast,
  UseToastOptions,
} from "@chakra-ui/react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import { useState } from "react";
import Form from "../components/Form";
import Input from "../components/Input";
import LoginContent from "../components/LoginContent";
import { colors } from "../styles/customTheme";

const LIGHT = "light";
const DEFAULT_DURATION = 3600;

const AUTHURL = `/auth/signin`;
const backend = axios.create({
  baseURL: `http://${process.env.NEXT_PUBLIC_API_HOST}`,
});

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const router = useRouter();

  function handleChangeEmail(e: any) {
    setEmail(e.target.value);
  }
  function handleChangePass(e: any) {
    setPassword(e.target.value);
  }
  function submitForm(e: React.FormEvent) {
    e.preventDefault();
    if (isEmailOrPassEmpty())
      return showToast({
        title: "Atenção!",
        description: "Prencha os campos de e-mail e senha",
        status: "warning",
        id: "empty",
        position: "bottom-left",
      });
    if (isInvalidMail())
      return showToast({
        title: "Atenção!",
        description: "Email inválido",
        status: "warning",
        id: "mail",
        position: "bottom-left",
      });
    if (isInvalidPassword())
      return showToast({
        title: "Atenção!",
        description: "A senha deve conter 6 ou mais caracteres",
        status: "warning",
        id: "password",
        position: "bottom-left",
      });

    const body = { email: email.replace(" ", ""), password: password };
    backend
      .post(AUTHURL, body)
      .then((res) => {
        if (res.status === 201) {
          if (res.data?.token) {
            const user = jwtDecode(res.data.token);
            showToast({
              title: "Sucesso!",
              description: "Acesso autorizado",
              status: "success",
              id: "login",
              position: "bottom-left",
            });
            console.log(user);
            //router.push("user/profile");
          }
        }
      })
      .catch((e) =>
        getValue(e.response.data).forEach((description, i) =>
          showToast({
            title: "Erro!",
            description: `${description}`,
            status: "error",
            id: i,
            position: "bottom-left",
          })
        )
      );
  }

  const getValue = ({ message }: { message: string[] }) =>
    new Array().concat(message ?? []);

  const showToast = (data: UseToastOptions) => {
    if (data.id) if (toast.isActive(data.id)) return;
    toast({ ...data, duration: data.duration || DEFAULT_DURATION });
  };

  const isEmailOrPassEmpty = () => !(email && password);
  const isInvalidMail = () =>
    !/[^\.]\w+\.?\w+@\w+\.\w+[\.]{0,2}[\w]+/.test(email);
  const isInvalidPassword = () => password.length < 6;

  const { colorMode } = useColorMode();

  const { formColor, textColor, inputBgColor, inputTextColor, labelColor } =
    colorMode === LIGHT
      ? {
          formColor: colors.dark.Nord2,
          textColor: colors.light.Nord6,
          inputTextColor: colors.dark.Nord2,
          labelColor: colors.light.Nord6,
          inputBgColor: colors.light.Nord4,
        }
      : {
          formColor: colors.light.Nord6,
          textColor: colors.dark.Nord2,
          inputTextColor: colors.light.Nord6,
          labelColor: colors.dark.Nord2,
          inputBgColor: colors.dark.Nord0,
        };

  return (
    <>
      <Flex
        justifyContent="space-between"
        alignItems="flex-start"
        backgroundImage="url('/assets/background-image.png')"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
      >
        <LoginContent />
        <Form
          formTitle="Entrar"
          style={{
            bgColor: formColor,
            textColor: textColor,
            boxShadow: "dark-lg",
            rounded: "md",
          }}
        >
          <Input
            type="text"
            label="E-mail"
            placeholder="E-mail"
            icon={<EmailIcon />}
            value={email}
            onChangeInput={handleChangeEmail}
            style={{
              inputBgColor,
              inputTextColor,
              labelColor,
              marginBottom: "12%",
            }}
          />
          <Input
            type={"password"}
            label="Senha"
            placeholder="Senha"
            icon={<LockIcon />}
            value={password}
            onChangeInput={handleChangePass}
            style={{
              inputBgColor,
              inputTextColor,
              labelColor,
              marginBottom: "12%",
            }}
          />
          <Button
            type="submit"
            onSubmit={(e) => submitForm(e)}
            onClick={(e) => submitForm(e)}
            mt="4%"
            height="40px"
            _hover={{
              backgroundColor: "rgba(129, 161, 193, 0.9);",
            }}
            bgColor={colors.aurora.Nord9}
            textColor={colors.light.Nord4}
            boxShadow="2xl"
            rounded="md"
            size="lg"
            disabled={!(email && password)}
          >
            Entrar
          </Button>
        </Form>
      </Flex>
    </>
  );
};

export default Home;
