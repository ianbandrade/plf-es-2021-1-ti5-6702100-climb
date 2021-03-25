import { useColorMode } from "@chakra-ui/color-mode";
import { Center, Flex, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { RiHome2Fill } from "react-icons/ri";
import { colors } from ".././styles/customTheme";

const LIGHT = "light";

const Page404 = () => {
  const { colorMode } = useColorMode();

  return (
    <>
      <Center
        width="600px"
        height="500px"
        position="absolute"
        top="calc(50vh - 300px)"
        left="calc(50vw - 300px)"
      >
        <Flex
          flexDirection="column"
          textAlign="center"
          fontFamily="Alatsi"
          alignItems="center"
          boxShadow="2xl"
          rounded="md"
          p={16}
          borderRadius={20}
          bgColor={
            colorMode === LIGHT
              ? `${colors.light.Nord4}`
              : `${colors.dark.Nord1}`
          }
        >
          <Text fontSize="8xl">Opsss...</Text>
          <Text fontSize="4xl">P&aacute;gina n&atilde;o encontrada!</Text>
          <Link href="/">
            <Button
              size="lg"
              fontSize="3xl"
              fontWeight={500}
              borderRadius={15}
              mt={5}
              bgColor={
                colorMode === LIGHT
                  ? `${colors.light.Nord4}`
                  : `${colors.dark.Nord1}`
              }
              textColor={
                colorMode === LIGHT
                  ? `${colors.dark.Nord2}`
                  : `${colors.light.Nord6}`
              }
              _hover={{
                backgroundColor:
                  colorMode === LIGHT
                    ? `${colors.light.Nord5}`
                    : `${colors.dark.Nord2}`,
              }}
            >
              <RiHome2Fill />
            </Button>
          </Link>
        </Flex>
      </Center>
    </>
  );
};

export default Page404;
