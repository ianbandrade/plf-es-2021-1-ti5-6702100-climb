import { useState } from "react";
import { Flex } from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";
import LoginContent from "../components/LoginContent";
import LoginInput from "../components/LoginInput";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { colors } from "../styles/customTheme";

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
        <LoginForm formTitle="Entrar">
          <LoginInput
            label="E-mail"
            placeholder="E-mail"
            icon={<EmailIcon />}
            value={email}
            onChangeInput={handleChangeEmail}
          />
          <LoginInput
            label="Senha"
            placeholder="Senha"
            icon={<LockIcon />}
            value={password}
            onChangeInput={handleChangePass}
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
        </LoginForm>
      </Flex>
    </>
  );
};

export default Home;
