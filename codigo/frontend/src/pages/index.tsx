import { useState } from "react";
import { Flex, useColorMode } from "@chakra-ui/react";
import Form from "../components/Form";
import LoginContent from "../components/LoginContent";
import Input from "../components/Input";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { colors } from "../styles/customTheme";

const LIGHT = "light";

const Home = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  function handleChangeEmail(e: any) {
    setEmail(e.target.value);
  }
  function handleChangePass(e: any) {
    setPassword(e.target.value);
  }
  function submitForm(e: React.FormEvent) {}
  const { colorMode } = useColorMode();
  //Form
  const formColor =
    colorMode === LIGHT ? colors.dark.Nord2 : colors.light.Nord6;
  const textColor =
    colorMode === LIGHT ? colors.light.Nord6 : colors.dark.Nord2;
  //Input
  const inputTextColor =
    colorMode === LIGHT ? colors.dark.Nord2 : colors.light.Nord6;
  const labelColor =
    colorMode === LIGHT ? colors.light.Nord6 : colors.dark.Nord2;
  const inputBgColor =
    colorMode === LIGHT ? colors.light.Nord4 : colors.dark.Nord0;

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
          >
            Entrar
          </Button>
        </Form>
      </Flex>
    </>
  );
};

export default Home;
