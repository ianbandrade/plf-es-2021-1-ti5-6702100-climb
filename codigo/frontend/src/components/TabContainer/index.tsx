import { Tab } from "@chakra-ui/react";
import Link from "next/link";

import { colors } from "../../styles/customTheme";
import { useColorMode } from "@chakra-ui/color-mode";

const LIGHT = "light";

interface TabContainerProps {
  text: string;
  url: string;
}

const TabContainer = ({ text, url }: TabContainerProps) => {
  const { colorMode } = useColorMode();
  function setTabColor() {
    if (colorMode === "light") return colors.dark.Nord2;
    else return colors.light.Nord4;
  }

  function setTabTextColor() {
    if (colorMode !== "light") return colors.dark.Nord2;
    else return colors.light.Nord6;
  }
  return (
    <Tab
      _selected={{ bgColor: setTabColor(), color: setTabTextColor() }}
      color={setTabColor()}
    >
      <Link href={url}>
        <a>{text}</a>
      </Link>
    </Tab>
  );
};

export default TabContainer;
