import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Profile from "../../components/Profile";
import { getCurrentUser } from "../../shared/auth/localStorageManager";
import { User } from "../../shared/interfaces/user";

const UserPage = () => {
  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  return (
    <Flex>
      <Profile user={user} setUser={setUser} />
    </Flex>
  );
};

export default UserPage;
