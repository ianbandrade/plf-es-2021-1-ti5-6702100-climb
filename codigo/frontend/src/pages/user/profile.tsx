import { Flex, useToast, UseToastOptions } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import Profile from "../../components/Profile";
import { authService } from "../../shared/services/authService";
import { messageFactory, showDefaultFetchError } from "../../shared/utils/toast-messages";
import { UserContext } from "../../store/UserProvider";

const UserPage = () => {
  const toast = useToast();
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    authService
      .me()
      .then((user) => setUser(user))
      .catch((e) => {
        if (e?.response?.data) {
          messageFactory(e.response.data, 'warning').forEach((message, i) => showToastMessage(message, i))
        } else
          showToastMessage(showDefaultFetchError("para carregar os dados do perfil."))
      })
  }, []);

  function showToastMessage(message: UseToastOptions, id = 1) {
    if (!toast.isActive(id))
      toast(message)
  }

  return (
    <Flex>
      <Profile user={user} setUser={setUser} />
    </Flex>
  );
};

export default UserPage;
