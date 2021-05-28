import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  useColorMode,
  useToast,
  UseToastOptions,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import Form from "../components/Form";
import Input from "../components/Input";
import LoginContent from "../components/LoginContent";
import { authService } from "../shared/services/authService";
import {
  showDefaultFetchError,
  messageFactory,
  newBaseToast,
} from "../shared/utils/toast-messages";
import { colors } from "../styles/customTheme";
const LIGHT = "light";
const DEFAULT_DURATION = 3600;

const PROFILE_PATH = "user/profile";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const router = useRouter();

  const createWarningToast = (
    description: string,
    id: string | number
  ): UseToastOptions => ({
    description,
    id,
    ...newBaseToast("warning"),
  });

  const validate = () => {
    isEmailOrPassEmpty();
    isInvalidMail();
    isInvalidPassword();
  };

  function handleChangeEmail(e: any) {
    setEmail(e.target.value);
  }
  function handleChangePass(e: any) {
    setPassword(e.target.value);
  }
  function submitForm(e: React.FormEvent) {
    e.preventDefault();

    try {
      validate();
    } catch (e) {
      return showToastMessage(createWarningToast(e, 1));
    }
    const body = { email: email.replace(" ", ""), password: password };
    authService
      .signIn(body)
      .then((res) => {
        if (res) {
          showToastMessage({
            title: "Sucesso!",
            description: "Acesso autorizado",
            id: "login",
            ...newBaseToast("success"),
          });
          router.push(PROFILE_PATH);
        }
      })
      .catch((e) => {
        if (e?.response?.data) {
          messageFactory(e.response.data, "warning").forEach((message) =>
            showToastMessage(message)
          );
        } else showDefaultFetchError("para efetuar o acesso");
      });
  }

  const showToastMessage = (data: UseToastOptions) => {
    if (data.id) if (toast.isActive(data.id)) return;
    toast({ ...data, duration: data.duration || DEFAULT_DURATION });
  };

  const isEmailOrPassEmpty = () => {
    if (!(email && password)) throw "Prencha os campos de e-mail e senha";
  };
  const isInvalidMail = () => {
    if (!/[^\.]\w+\.?\w+@\w+\.\w+[\.]{0,2}[\w]+/.test(email))
      throw "Email inválido";
  };
  const isInvalidPassword = () => {
    if (password.length < 6) throw "A senha deve conter 6 ou mais caracteres";
  };

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
