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

const LoginForm = () => {
  const styles = useStyleConfig("FormControl");

  return (
    <FormControl as="form" sx={styles}>
      <Text as="text">Entrar</Text>
      <FormLabel>Email</FormLabel>
      <InputGroup >
        <InputLeftAddon as="inputGroup" children={<EmailIcon />}/>
        <Input as="input" placeholder="Email" />
      </InputGroup>
      <FormLabel>Senha</FormLabel>
      <InputGroup >
        <InputLeftAddon as="inputGroup" children={<LockIcon />}/>
        <Input as="input" placeholder="Senha" type="password" />
      </InputGroup>
      
      <Button as="button">Entrar</Button>
    </FormControl>
  );
};

export default LoginForm;
