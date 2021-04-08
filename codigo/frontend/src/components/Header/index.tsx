import { useColorMode } from "@chakra-ui/color-mode";
import { Box, Flex } from "@chakra-ui/layout";
import { Avatar, AvatarBadge } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { logout } from "../../shared/auth/localStorageManager";
import { colors } from "../../styles/customTheme";
import ThemeToggle from "../layout/ThemeToggle";
import AdminHeader from "./AdminHeader";
import RegularHeader from "./RegularHeader";
import UserHeader from "./UserHeader";

const LIGHT = "light";
const DARK = "dark";

const Header = () => {
  const router = useRouter();
  const isAdminPage = router.pathname.includes("/admin");
  const isUserPage = router.pathname.split("/")[1] === "user";

  const { colorMode } = useColorMode();

  function setHeaderBgColor() {
    if ((isAdminPage || isUserPage) && colorMode === LIGHT) {
      return colors.light.Nord5;
    } else if ((isAdminPage || isUserPage) && colorMode === DARK) {
      return colors.dark.Nord1;
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
      boxShadow={isAdminPage || isUserPage ? "base" : ""}
      rounded={isAdminPage || isUserPage ? "md" : ""}
      padding={isAdminPage || isUserPage ? "26px" : "0"}
      paddingTop={isAdminPage || isUserPage ? "32px" : "0"}
    >
      {handleRenderHeader()}
      <Box marginLeft="auto">
        {isUserPage && (
          <Avatar
            mr="35px"
            bgColor={
              colorMode === LIGHT ? colors.light.Nord4 : colors.dark.Nord1
            }
            _hover={{ cursor: 'pointer' }}
            onClick={() => {
              logout();
              router.replace('/');
            }}
          >
            <AvatarBadge
              boxSize="1em"
              bg={colors.aurora.Nord14}
              borderColor={
                colorMode === LIGHT ? colors.light.Nord4 : colors.dark.Nord1
              }
            />
          </Avatar>
        )}
        <ThemeToggle />
      </Box>
    </Flex>
  );
};

export default Header;
