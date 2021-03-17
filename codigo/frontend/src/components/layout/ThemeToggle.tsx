import { IconButton } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { RiMoonFill, RiSunLine } from "react-icons/ri";
import {colors} from '../../styles/customTheme'

const LIGHT = 'light';

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      aria-label="theme toggle"
      backgroundColor={colorMode === LIGHT? colors.light.Nord4: colors.dark.Nord2}
      icon={colorMode === LIGHT ? <RiMoonFill /> : <RiSunLine />}
      onClick={toggleColorMode}
    />
  );
};

export default ThemeToggle;
