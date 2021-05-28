import { useColorMode } from "@chakra-ui/color-mode";
import { Flex, Image, Text } from "@chakra-ui/react";

const LIGHT = "light";

const Logo = () => {
  const { colorMode } = useColorMode();
  return (
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
  );
};

export default Logo;
