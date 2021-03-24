import RegularHeader from "./RegularHeader";
import { Flex, Tabs, TabList } from "@chakra-ui/react";
import TabContainer from "../TabContainer";
import {useState,useEffect} from "react";
const BASE_URL = "/admin";

const pages = [{url:"users", text: "Usuários"}
              ,{url:"apps", text:"Aplicações"},{
                url:"monitor", text: "Monitoramento"}];

const AdminHeader = () => {

  const [path,setPath] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setPath(window.location.pathname.split("/").pop() || "");
  });

  
  useEffect(() => {
    setIndex(pages.findIndex(page => page.url === path) || 0);
  },[path]);

  const renderedTabs = pages.map(page => <TabContainer key={page.url} text={page.text} url={`${BASE_URL}/${page.url}`} />)

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
