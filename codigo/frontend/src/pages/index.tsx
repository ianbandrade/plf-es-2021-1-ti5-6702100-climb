import { Flex, useColorMode } from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";

const Home = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        backgroundImage="url('/assets/background-image.png')"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
      >
        <h1>oi</h1>
        <LoginForm />
      </Flex>
    </>
  );
};

export default Home;
