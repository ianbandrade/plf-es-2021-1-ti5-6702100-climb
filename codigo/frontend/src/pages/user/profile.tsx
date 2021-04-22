import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Profile from "../../components/Profile";
import { getCurrentUser } from "../../shared/auth/localStorageManager";
import { User } from "../../shared/interfaces/user";
import { authService } from "../../shared/services/authService";

const UserPage = () => {
  const [user, setUser] = useState<User>({} as User);
  useEffect(() => {
    authService.me().then((user) => setUser(user));
  }, []);

  return (
    <Flex>
      <Profile user={user} setUser={setUser} />
    </Flex>
  );
};

export default UserPage;
