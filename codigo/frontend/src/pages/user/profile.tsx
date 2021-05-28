import { Flex } from "@chakra-ui/react";
import { useContext } from "react";
import Profile from "../../components/Profile";
import { UserContext } from "../../store/UserProvider";

const UserPage = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <Flex>
      <Profile user={user} setUser={setUser} />
    </Flex>
  );
};

export default UserPage;
