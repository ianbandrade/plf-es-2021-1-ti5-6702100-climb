import { Flex } from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";
import LoginContent from "../components/LoginContent";

const Home = () => {
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