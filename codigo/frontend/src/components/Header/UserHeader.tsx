import { Flex, TabList, Tabs } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TabContainer from "../TabContainer";
import RegularHeader from "./RegularHeader";
import { User } from "../../shared/interfaces/user";
import { UserRole } from "../../shared/enum/user-role";

interface UserHeaderProps {
  user: User;
}

const BASE_URL = "/user";

const UserHeader = ({ user }: UserHeaderProps) => {
  const router = useRouter();

  const [pages, setPages] = useState([
    { url: `${BASE_URL}/profile`, text: "Perfil" },
    { url: `${BASE_URL}/apps`, text: "Aplicações" },
    { url: `${BASE_URL}/monitor`, text: "Monitoramento" },
  ]);

  const index = pages.findIndex((page) => router.pathname.includes(page.url));

  useEffect(() => {
    if (
      user?.role === UserRole.ADMIN &&
      !pages.some((item) => item.text === "Administração")
    ) {
      setPages([...pages, { url: `/user/admin`, text: "Administração" }]);
    }
  }, [user]);

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
