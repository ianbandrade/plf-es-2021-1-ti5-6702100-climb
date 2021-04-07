import { useState } from "react";
import { Flex, useColorMode, useToast, UseToastOptions } from "@chakra-ui/react";
import Form from "../components/Form";
import LoginContent from "../components/LoginContent";
import Input from "../components/Input";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { colors } from "../styles/customTheme";
import axios from "axios";

const LIGHT = "light";
const DEFAULT_DURATION = 3600;
const AUTHURL = `http://${process.env.NEXT_PUBLIC_API_HOST}/auth/signin`;

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  function handleChangeEmail(e: any) {
    setEmail(e.target.value);
  }
  function handleChangePass(e: any) {
    setPassword(e.target.value);
  }
  function submitForm(e: React.FormEvent) {
    e.preventDefault();
    if (isEmailOrPassEmpty()) return showToast({ title: "Prencha os campos de e-mail e senha", status: "warning", id: "login" });
    if (isInvalidMail()) return showToast({ title: "E-mail inválido", status: "warning", id: "login" });

    const body = { email: email.replace(" ", ""), password: password }
    axios.post(`${AUTHURL}`, body).then(
      res => {
        if (res.status === 201)
          showToast({ title: "Acesso autorizado", status: "success" })
      }
    ).catch(e => showToast({ title: "Falha na conexão", description: e.message, status: "error", id: "login" }))
  }

  const showToast = (data: UseToastOptions) => {
    if (data.id)
      if (toast.isActive(data.id))
        return;
    toast({ ...data, duration: data.duration || DEFAULT_DURATION })
  }

  const isEmailOrPassEmpty = () => !(email && password);
  const isInvalidMail = () => !/[^\.]\w+\.?\w+@\w+\.\w+[\.]{0,2}[\w]+/.test(email)

  const { colorMode } = useColorMode();

  const { formColor, textColor, inputBgColor, inputTextColor, labelColor } = colorMode === LIGHT ? {
    formColor: colors.dark.Nord2,
    textColor: colors.light.Nord6,
    inputTextColor: colors.dark.Nord2,
    labelColor: colors.light.Nord6,
    inputBgColor: colors.light.Nord4
  } :
    {
      formColor: colors.light.Nord6,
      textColor: colors.dark.Nord2,
      inputTextColor: colors.light.Nord6,
      labelColor: colors.dark.Nord2,
      inputBgColor: colors.dark.Nord0
    }

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
