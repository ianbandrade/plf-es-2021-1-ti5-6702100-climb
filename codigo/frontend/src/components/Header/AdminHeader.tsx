import RegularHeader from "./RegularHeader";
import { Flex, Tabs, TabList } from "@chakra-ui/react";
import TabContainer from "../TabContainer";
import { useRouter } from "next/router";

const BASE_URL = "/admin";
const pages = [{url:`${BASE_URL}/users`, text: "Usuários"}
              ,{url:`${BASE_URL}/apps`, text:"Aplicações"},{
                url:`${BASE_URL}/monitor`, text: "Monitoramento"}];

const AdminHeader = () => {

  const router = useRouter();
  const index = pages.findIndex(page => page.url === router.pathname);
  const renderedTabs = pages.map(page => <TabContainer key={page.url} text={page.text} url={page.url} />)

  return (
    <Flex flexDirection="column">
      <RegularHeader />
      <Tabs variant="soft-rounded" mt="12px" index={index}>
        <TabList>
          {renderedTabs}
        </TabList>
      </Tabs>
    </Flex>
  );
};

export default AdminHeader;
