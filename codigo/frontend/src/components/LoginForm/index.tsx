import {
  FormControl,
  FormLabel,
  Input,
  Text,
  Button,
  InputGroup,
  InputLeftAddon,
  useStyleConfig,
} from "@chakra-ui/react";
import { EmailIcon, LockIcon  } from '@chakra-ui/icons';

import {colors} from '../../styles/customTheme';

const LoginForm = () => {
  const styles = useStyleConfig("FormControl");

  return (
    <FormControl as="form" sx={styles}>
      <Text fontWeight={'semibold'}  as="text">Entrar</Text>
      <FormLabel>Email</FormLabel>
      <InputGroup >
        <InputLeftAddon as="group" children={<EmailIcon />}/>
        <Input as="input" placeholder="Email" />
      </InputGroup>
      <FormLabel>Senha</FormLabel>
      <InputGroup >
        <InputLeftAddon as="group" children={<LockIcon />}/>
        <Input as="input" placeholder="Senha" type="password" />
      </InputGroup>
      
      <Button _hover={
        {
          backgroundColor: 'rgba(129, 161, 193, 0.9);',
        }
      } bgColor={colors.aurora.Nord9} textColor={colors.light.Nord4} as="button">Entrar</Button>
    </FormControl>
  );
};

export default LoginForm;
