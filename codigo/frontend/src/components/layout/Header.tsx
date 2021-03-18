import { Box, Flex } from "@chakra-ui/layout";

import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <Flex mb={'4%'}as="header" width="full" align="center"> 
      <Box marginLeft="auto">
        <ThemeToggle />
      </Box>
    </Flex>
  );
};

export default Header;
