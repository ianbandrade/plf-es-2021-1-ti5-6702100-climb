import { useColorMode } from "@chakra-ui/color-mode";
import { Flex } from "@chakra-ui/layout";
import {
  Avatar,
  AvatarBadge,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { logout } from "../../shared/auth/localStorageManager";
import { UserContext } from "../../store/UserProvider";
import { colors } from "../../styles/customTheme";
import ThemeToggle from "../layout/ThemeToggle";
import RegularHeader from "./RegularHeader";
import UserHeader from "./UserHeader";

const LIGHT = "light";
const DARK = "dark";

const Header = () => {
  const router = useRouter();
  const isUserPage = router.pathname.split("/")[1] === "user";
  const { colorMode } = useColorMode();
  const { user } = useContext(UserContext);

  const setHeaderBgColor = (): string | undefined => {
    if (isUserPage && colorMode === LIGHT) {
      return colors.light.Nord5;
    } else if (isUserPage && colorMode === DARK) {
      return colors.dark.Nord1;
    }
  };

  const handleRenderHeader = (): JSX.Element | string => {
    if (router.pathname === "/") return "";
    else if (isUserPage) return <UserHeader />;
    return <RegularHeader />;
  };

  return (
    <Flex
      as="header"
      width="full"
      align="center"
      height="140px"
      backgroundColor={setHeaderBgColor()}
      boxShadow={isUserPage ? "base" : ""}
      rounded={isUserPage ? "md" : ""}
      padding={isUserPage ? "26px" : "0"}
      paddingTop={isUserPage ? "32px" : "0"}
    >
      {handleRenderHeader()}
      <Flex marginLeft="auto" alignItems="center">
        {isUserPage && (
          <>
            <Menu>
              <MenuButton
                as={Avatar}
                src={user.image}
                mr={30}
                bgColor={
                  colorMode === LIGHT ? colors.light.Nord4 : colors.dark.Nord1
                }
                _hover={{ cursor: "pointer" }}
                colorScheme="pink"
              >
                <AvatarBadge
                  boxSize="1em"
                  bg={colors.aurora.Nord14}
                  borderColor={
                    colorMode === LIGHT ? colors.light.Nord4 : colors.dark.Nord1
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuGroup title="Perfil">
                  <MenuItem
                    onClick={() => {
                      router.replace("/user/profile");
                    }}
                  >
                    Meu perfil
                  </MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup title="Sessão">
                  <MenuItem
                    onClick={() => {
                      logout();
                      router.replace("/");
                    }}
                  >
                    Sair
                  </MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </>
        )}
        <ThemeToggle />
      </Flex>
    </Flex>
  );
};

export default Header;
