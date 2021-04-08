import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import Profile from "../../components/Profile";

interface User {
  name: string;
  userName: string;
  githubAcc?: string;
  gitlabAcc?: string;
  image?: string;
}

const UserPage = () => {
  const [user] = useState<User>({
    name: "João Guilherme Martins Borborema",
    userName: "JoaoGuiMB",
  });
  return (
    <Flex width="100vw">
      <Profile user={user} />
    </Flex>
  );
};

export default UserPage;