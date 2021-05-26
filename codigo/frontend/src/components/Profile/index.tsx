import {
  Avatar,
  Button,
  Flex,
  Heading,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { User } from "../../shared/interfaces/user";
import { authService } from "../../shared/services/authService";
import { colors } from "../../styles/customTheme";
import GitButtons from "../GitButtons";

const LIGHT = "light";

interface ProfileProps {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

const Profile = ({ user, setUser }: ProfileProps) => {
  const router = useRouter();

  useEffect(() => {
    authService.isAuthenticated(router, { useDefault: true }, setUser);
  }, []);

  const verifyAndUpdateAvatar = (): void => {};

  useEffect(() => {
    verifyAndUpdateAvatar();
  }, [user]);

  const { colorMode } = useColorMode();

  const color =
    colorMode === LIGHT
      ? {
          buttonBg: colors.dark.Nord2,
          buttonTxt: colors.light.Nord6,
          buttonHv: colors.dark.Nord0,
          avatarBg: colors.light.Nord4,
        }
      : {
          buttonBg: colors.light.Nord6,
          buttonTxt: colors.dark.Nord2,
          buttonHv: colors.light.Nord4,
          avatarBg: colors.dark.Nord1,
        };

  return (
    <Flex ml={50} mt={30} justifyContent="center">
      <Flex mr={5} flexDir="column">
        <Avatar
          margin="0 auto"
          width={120}
          height={120}
          bgColor={color.avatarBg}
          src={user.image}
        />
        <Heading mt={2} textAlign="center">
          {user.name?.length > 10 ? splitAt(`${user.name}`, 10) : user.name}
        </Heading>
      </Flex>
      <Flex flexDir="column">
        {<GitButtons user={user} setUser={setUser} baseUrl={"/user/profile"} />}
      </Flex>
    </Flex>
  );
};

export default Profile;

const splitAt = (value: string, index: number): string => {
  return value.split(new RegExp(`(?<=^.{${index}})`))[0] + "...";
};
