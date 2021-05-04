import { Flex } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import Profile from "../../components/Profile";
import { authService } from "../../shared/services/authService";
import { UserContext } from "../../store/UserProvider";

const UserPage = () => {
  const { user, setUser } = useContext(UserContext);
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
