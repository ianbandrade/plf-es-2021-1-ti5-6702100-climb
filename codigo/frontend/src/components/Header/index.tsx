import { useColorMode } from "@chakra-ui/color-mode";
import { Box, Flex } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import { colors } from "../../styles/customTheme";
import ThemeToggle from "../layout/ThemeToggle";
import AdminHeader from "./AdminHeader";
import RegularHeader from "./RegularHeader";

const LIGHT = "light";

const Header = () => {
  const router = useRouter();
  const isAdminPage = router.pathname.includes("/admin");
  const { colorMode } = useColorMode();

  function setHeaderBgColor() {
    if (isAdminPage && colorMode === LIGHT) {
      return colors.light.Nord5;
    } else if (isAdminPage && colorMode === "dark") {
      return colors.dark.Nord2;
    }
  }

  return (
    <Flex
      as="header"
      width="full"
      align="center"
      height="140px"
      backgroundColor={setHeaderBgColor()}
      padding={isAdminPage ? "26px" : "0"}
      paddingTop={isAdminPage ? "32px" : "0"}
    >
      {router.pathname === "/" ? (
        ""
      ) : isAdminPage ? (
        <AdminHeader />
      ) : (
        <RegularHeader />
      )}
      <Box marginLeft="auto">
        <ThemeToggle />
      </Box>
    </Flex>
  );
};

export default Header;
