import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { PreConfigCardProps } from "../../shared/interfaces/PreConfigCardInterface";
import { colors } from "../../styles/customTheme";

const LIGHT = "light";
const PreConfigCard: React.FC<PreConfigCardProps> = ({
  name,
  image,
  description,
  selected,
}) => {
  const { colorMode } = useColorMode();

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
      backgroundColor={
        colorMode === LIGHT ? colors.light.Nord4 : colors.dark.Nord1
      }
      alignItems="center"
      textAlign="center"
      borderRadius={10}
      _hover={{ transition: "0.3s ease-out", boxShadow: "dark-lg" }}
      {...(selected && { backgroundColor: "blue" })}
    >
      <Box>
        <Heading fontSize="3xl">{name}</Heading>
      </Box>
      <Image maxW={120} maxH={120} src={image} alt={`${name} icon`} />
      <Box>
        <Text>{description}</Text>
      </Box>
    </Flex>
  );
};

export default PreConfigCard;
