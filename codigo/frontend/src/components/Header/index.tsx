import { useColorMode } from "@chakra-ui/color-mode";
import { Box, Flex } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import { colors } from "../../styles/customTheme";
import ThemeToggle from "../layout/ThemeToggle";
import AdminHeader from "./AdminHeader";
import RegularHeader from "./RegularHeader";
import { colors } from "../../styles/customTheme";
import UserHeader from "./UserHeader";
import { Avatar, AvatarBadge } from "@chakra-ui/react";



const LIGHT = "light";

const Header = () => {
  const router = useRouter();
  const isAdminPage = router.pathname.includes("/admin");
  const isUserPage = router.pathname.split("/")[1] === "user";

  const { colorMode } = useColorMode();

  function setHeaderBgColor() {
    if ((isAdminPage || isUserPage) && colorMode === LIGHT) {
      return colors.light.Nord5;
    } else if ((isAdminPage || isUserPage) && colorMode === "dark") {
      return colors.dark.Nord2;
    }
  }

  function handleRenderHeader() {
    if (router.pathname === "/") return "";
    else if (isAdminPage) return <AdminHeader />;
    else if (isUserPage) return <UserHeader />;
    else return <RegularHeader />;
  }

  return (
    <Flex
      as="header"
      width="full"
      align="center"
      height="140px"
      backgroundColor={setHeaderBgColor()}
      padding={isAdminPage || isUserPage ? "26px" : "0"}
      paddingTop={isAdminPage || isUserPage ? "32px" : "0"}
    >
      {handleRenderHeader()}
      <Box marginLeft="auto">
        {isUserPage && (
          <Avatar mr="18px">
            <AvatarBadge boxSize="1em" bg="green.500" />
          </Avatar>
        )}
        <ThemeToggle />
      </Box>
    </Flex>
  );
};

export default Header;
