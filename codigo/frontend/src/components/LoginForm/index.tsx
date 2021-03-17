import {
  FormControl,
  FormLabel,
  Input,
  Text,
  Button,
  Flex,
} from "@chakra-ui/react";

import { useColorMode } from "@chakra-ui/color-mode";



const LoginForm = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const labelTextColor = colorMode === 'light'? '#D8DEE9': "#4C566A"
    const inputBackGroundColor = "white"
    const inputTextColor = "#4C566A"
    
  return (
    <FormControl w="25%" h="100%" mr="64px" p="12px" backgroundColor={colorMode === 'light'? '#4C566A': "#D8DEE9"}>
      <Flex flexDirection="column" justifyContent="space-between" alignContent="space-around" >
        <Text fontSize="4xl" color={ labelTextColor} >Entrar</Text>
        <FormLabel mb="5%" color={labelTextColor }>Login</FormLabel>
        <Input color={inputTextColor } backgroundColor={inputBackGroundColor} mb="5%" placeholder="Login" />
        <FormLabel mb="5%" color={labelTextColor }>Senha</FormLabel >
        <Input color={inputTextColor } backgroundColor={inputBackGroundColor}  mb="5%"placeholder="Senha" type="password" />
        <Button mb="5%" backgroundColor={labelTextColor} >Entrar</Button>
      </Flex>
    </FormControl>
  );
};

export default LoginForm;
