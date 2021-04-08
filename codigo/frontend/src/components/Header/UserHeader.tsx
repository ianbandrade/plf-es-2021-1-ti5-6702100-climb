import { Flex, TabList, Tabs } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../shared/auth/localStorageManager";
import TabContainer from "../TabContainer";
import RegularHeader from "./RegularHeader";

const BASE_URL = "/user";

const UserHeader = () => {
  const router = useRouter();

  const [pages, setPages] = useState([
    { url: `${BASE_URL}/profile`, text: "Perfil" },
    { url: `${BASE_URL}/apps`, text: "Aplicações" },
    { url: `${BASE_URL}/monitor`, text: "Monitoramento" },
  ]);

  const index = pages.findIndex((page) => page.url === router.pathname);

  useEffect(() => {
    const currentUser = getCurrentUser();

    if (currentUser.role === 'ADMIN') {
      setPages([...pages, { url: `/admin/users`, text: "Administração" }])
    }
  }, [])

  const renderedTabs = pages.map((page) => (
    <TabContainer key={page.url} text={page.text} url={page.url} />
  ));

  return (
    <Flex flexDirection="column">
      <RegularHeader />
      <Tabs variant="soft-rounded" mt="12px" ml="3%" index={index}>
        <TabList>{renderedTabs}</TabList>
      </Tabs>
    </Flex>
  );
};

export default UserHeader;
