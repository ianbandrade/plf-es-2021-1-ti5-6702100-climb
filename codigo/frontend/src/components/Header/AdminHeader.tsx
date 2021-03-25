import { Flex, TabList, Tabs } from "@chakra-ui/react";
import { useRouter } from "next/router";
import TabContainer from "../TabContainer";
import RegularHeader from "./RegularHeader";

const BASE_URL = "/admin";
const pages = [
  { url: `${BASE_URL}/users`, text: "Usuários" },
  { url: `${BASE_URL}/apps`, text: "Aplicações" },
  {
    url: `${BASE_URL}/monitor`,
    text: "Monitoramento",
  },
];

const AdminHeader = () => {
  const router = useRouter();
  const index = pages.findIndex((page) => page.url === router.pathname);
  const renderedTabs = pages.map((page) => (
    <TabContainer key={page.url} text={page.text} url={page.url} />
  ));

  return (
    <Flex flexDirection="column">
      <RegularHeader />
      <Tabs variant="soft-rounded" mt="1%" index={index}>
        <TabList>{renderedTabs}</TabList>
      </Tabs>
    </Flex>
  );
};

export default AdminHeader;
