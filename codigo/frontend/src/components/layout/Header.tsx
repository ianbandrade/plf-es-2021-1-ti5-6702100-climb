import { useColorMode } from "@chakra-ui/color-mode";
import { Box, Flex } from "@chakra-ui/layout";
import { Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import ThemeToggle from "./ThemeToggle";

const LIGHT = `light`;

const Header = () => {
  const router = useRouter();
  const { colorMode } = useColorMode();

  return (
    <Flex mb={4} as="header" width="full" align="center">
      {router.pathname === "/" ? (
        ""
      ) : (
        <>
          <Box marginRight="auto">
            <Link href="/">
              <a>
                <Flex
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Image
                    src={
                      colorMode === LIGHT
                        ? "/assets/icon/light-flat.svg"
                        : "/assets/icon/dark-flat.svg"
                    }
                    alt="Logo"
                  />
                  <Text fontSize="2xl" fontFamily="Alatsi">
                    CLIMB
                  </Text>
                </Flex>
              </a>
            </Link>
          </Box>
        </>
      )}
      <Box marginLeft="auto">
        <ThemeToggle />
      </Box>
    </Flex>
  );
};

export default Header;
