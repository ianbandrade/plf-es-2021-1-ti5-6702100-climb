import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import Profile from "../../components/Profile";
import { authService } from "../../shared/services/authService";
import { UserContext } from "../../store/UserProvider";

const UserPage = () => {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    debugger;
    authService.me().then((user) => {
      if (user) {
        setUser(user);
      } else {
        router.push(authService.LOGIN_PATH);
      }
    });
  }, []);

  return (
    <Flex>
      <Profile user={user} setUser={setUser} />
    </Flex>
  );
};

export default UserPage;
