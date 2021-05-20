import { Flex, useToast } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import Profile from "../../components/Profile";
import { authService } from "../../shared/services/authService";
import { getMessages } from "../../shared/utils/toast-messages";
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
          getMessages(e.response.data).forEach((description, i) =>
            toast({
              title: "Erro!",
              description: `${description}`,
              status: "error",
              id: i,
              position: "bottom-left",
            })
          );
        } else
          toast({
            title: "Erro!",
            description:
              "Não foi possível comunicar com o servidor para carregar os dados do perfil.",
            id: 1,
            status: "error",
            position: "bottom-left",
          });
      });
  }, []);

  return (
    <Flex>
      <Profile user={user} setUser={setUser} />
    </Flex>
  );
};

export default UserPage;
