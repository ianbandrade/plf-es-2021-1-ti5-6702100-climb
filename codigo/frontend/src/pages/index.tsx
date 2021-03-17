import { Box } from "@chakra-ui/layout";
import { useColorMode, Flex }  from '@chakra-ui/react'
import LoginForm from '../components/LoginForm'
const Home = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <h1>oi</h1>
      <LoginForm />
    </Flex>
  )
};

export default Home;
