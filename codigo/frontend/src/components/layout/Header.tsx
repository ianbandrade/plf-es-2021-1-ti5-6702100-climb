import { Box, Flex } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const router = useRouter();
  return (
    <Flex mb={4} as="header" width="full" align="center">
      <Box marginRight="auto">
        {router.pathname === "/" ? (
          ""
        ) : (
          <Link href="/">
            <Button
              variant="unstyled"
              fontFamily="Alatsi"
              fontSize="4xl"
              fontWeight="bold"
            >
              CLIMB
            </Button>
          </Link>
        )}
      </Box>
      <Box marginLeft="auto">
        <ThemeToggle />
      </Box>
    </Flex>
  );
};

export default Header;
