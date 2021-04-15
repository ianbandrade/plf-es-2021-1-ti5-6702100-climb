import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Apps } from "../../components/Apps";
import { getCurrentUser } from "../../shared/auth/localStorageManager";
import { User } from "../../shared/interfaces/user";

const UserPage = () => {
  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  return (
    <Flex>
        <Apps/>
    </Flex>
  );
};

export default UserPage;