import { Flex, Image, Box, Text } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/color-mode";

const LoginContent = () => {
  const { colorMode, toggleColorMode } = useColorMode();
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
            colorMode === "light"
              ? "/assets/svg/light-flat.svg"
              : "/assets/svg/dark-flat.svg"
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
