import { useColorMode } from "@chakra-ui/color-mode";
import { Box, Flex, Image, Text } from "@chakra-ui/react";

const LIGHT = "light";

const LoginContent = () => {
  const { colorMode } = useColorMode();
  return (
    <Flex
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      w="45%"
      h="500px"
      ml="3%"
    >
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <Image
          src={
            colorMode === LIGHT
              ? "/assets/icon/light-flat.svg"
              : "/assets/icon/dark-flat.svg"
          }
          alt="Logo"
        />
        <Text fontSize="6xl" fontFamily="Alatsi">
          CLIMB
        </Text>
      </Flex>

      <Box>
        <Text fontSize="2xl" textAlign="start">
          Mais além do princípio de prazer, o limite teórico das ruturas de
          campo interpretativas se acompanha então de inconvenientes não
          negligenciáveis que delimita o campo de intervenção do analista
        </Text>
      </Box>
    </Flex>
  );
};

export default LoginContent;
