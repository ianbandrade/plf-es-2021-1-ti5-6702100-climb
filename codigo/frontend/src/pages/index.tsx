import { Box } from "@chakra-ui/layout";
import { useColorMode, Flex } from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";
import LoginContent from "../components/LoginContent";

const Home = () => {
  const { colorMode, toggleColorMode } = useColorMode();
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
        <LoginForm />
      </Flex>
    </>
  );
};

export default Home;
