import { useColorMode } from "@chakra-ui/color-mode";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { colors } from "../../styles/customTheme";
import Logo from "../Logo";
const LIGHT = "light";

const LoginContent = () => {
  const { colorMode } = useColorMode();
  return (
    <Flex
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      w="45%"
      h={"auto"}
      ml="3%"
    >
      <Logo />
      <Box rounded="lg">
        <Text
          fontSize="3xl"
          textAlign="start"
          fontWeight="extrabold"
          maxWidth={600}
          color={
            colorMode === LIGHT
              ? `${colors.dark.Nord0}`
              : `${colors.light.Nord6}`
          }
        >
          A plataforma de desenvolvimento que simplifica o processo de
          configurar, subir, escalar e gerenciar as soluções do dia a dia em
          ambientes on premisses.
        </Text>
      </Box>
    </Flex>
  );
};

export default LoginContent;
