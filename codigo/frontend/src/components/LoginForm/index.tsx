import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  useStyleConfig,
} from "@chakra-ui/react";
import { colors } from "../../styles/customTheme";

const INPUT_GROUP = "i";

const LoginForm = () => {
  const styles = useStyleConfig("FormControl");

  return (
    <FormControl
      as="form"
      sx={styles}
      fontFamily="Alatsi"
      boxShadow="dark-lg"
      rounded="md"
    >
      <Text fontWeight={"semibold"} as="text">
        Entrar
      </Text>
      <FormLabel>E-mail</FormLabel>
      <InputGroup>
        <InputLeftAddon as={INPUT_GROUP} children={<EmailIcon />} />
        <Input as="input" placeholder="E-mail" />
      </InputGroup>
      <FormLabel>Senha</FormLabel>
      <InputGroup>
        <InputLeftAddon as={INPUT_GROUP} children={<LockIcon />} />
        <Input as="input" placeholder="Senha" type="password" />
      </InputGroup>

      <Button
        _hover={{
          backgroundColor: "rgba(129, 161, 193, 0.9);",
        }}
        bgColor={colors.aurora.Nord9}
        textColor={colors.light.Nord4}
        boxShadow="2xl"
        rounded="md"
        as="button"
        size="lg"
      >
        Entrar
      </Button>
    </FormControl>
  );
};

export default LoginForm;
