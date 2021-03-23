import RegularHeader from "./RegularHeader";
import { Flex, Tabs, TabList, Tab } from "@chakra-ui/react";
import Link from "next/link";

import { colors } from "../../styles/customTheme";
import { useColorMode } from "@chakra-ui/color-mode";
import TabContainer from "../TabContainer";
const BASE_URL = "/admin";
const LIGHT = "light";

const AdminHeader = () => {
  return (
    <Flex flexDirection="column">
      <RegularHeader />
      <Tabs variant="soft-rounded" mt="12px">
        <TabList>
          <TabContainer text="Usuários" url={`${BASE_URL}/users`} />
          <TabContainer text="Aplicações" url={`${BASE_URL}/apps`} />
          <TabContainer text="Monitoramento" url={`${BASE_URL}/monitor`} />
        </TabList>
      </Tabs>
    </Flex>
  );
};

export default AdminHeader;
