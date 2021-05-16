import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import Profile from "../../components/Profile";
import { getCurrentUser } from "../../shared/auth/localStorageManager";
import { authService } from "../../shared/services/authService";
import { UserContext } from "../../store/UserProvider";

const UserPage = () => {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    authService
      .isAuthenticated(router, { error: authService.LOGIN_PATH })
      .then(() => {
        const user = getCurrentUser();
        if (user) setUser(user);
      });
  }, []);

  return (
    <Flex>
      <Profile user={user} setUser={setUser} />
    </Flex>
  );
};

export default UserPage;
