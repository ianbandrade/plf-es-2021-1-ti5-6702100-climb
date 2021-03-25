import { Flex } from "@chakra-ui/react";
import Profile from "../../components/Profile";
import { useState } from "react";
interface User {
  name: string;
  userName: string;
  githubAcc?: string;
  gitlabAcc?: string;
  image?: string;
}

const UserPage = () => {
  const [user, setUser] = useState<User>({
    name: "João Guilherme Martins Borborema",
    userName: "JoaoGuiMB",
  });
  return (
    <Flex width="100vw" height="75vh">
      <Profile user={user} />
    </Flex>
  );
};

export default UserPage;
