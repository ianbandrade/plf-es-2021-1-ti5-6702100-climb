import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { PreConfigCardProps } from "../../shared/interfaces/PreConfigCardInterface";
import { colors } from "../../styles/customTheme";

const LIGHT = "light";
const PreConfigCard: React.FC<PreConfigCardProps> = ({
  name,
  image,
  description,
}) => {
  const { colorMode } = useColorMode();

  const theme = (): string => {
    return colorMode === LIGHT ? colors.light.Nord4 : colors.dark.Nord1;
  };

  return (
    <Flex
      flexDirection="column"
      maxW="sm"
      maxH="sm"
      boxShadow="base"
      overflow="hidden"
      p={5}
      mr={10}
      mb={10}
      backgroundColor={theme()}
      alignItems="center"
      textAlign="center"
      borderRadius={10}
      _hover={{ transition: "0.3s ease-out", boxShadow: "2xl" }}
    >
      <Flex>
        <Heading fontSize="3xl" m="auto 0" textAlign="center">
          {name}
        </Heading>
      </Flex>

      <Image maxW={120} maxH={120} src={image} alt={`${name} icon`} />
      <Box>
        <Text>{description}</Text>
      </Box>
    </Flex>
  );
};

export default PreConfigCard;
