import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Spacer,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { FiTool } from "react-icons/fi";
import { PreConfigCardProps } from "../../shared/interfaces/PreConfigCardInterface";
import { colors } from "../../styles/customTheme";

const LIGHT = "light";
const PreConfigCard: React.FC<PreConfigCardProps> = ({
  name,
  image,
  description,
  selected,
  handleModal,
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
      {...(selected && { boxShadow: "dark-lg", border: "2px solid" })}
      _hover={{ transition: "0.3s ease-out", boxShadow: "2xl" }}
    >
      <Flex
        {...(selected && {
          width: "100%",
        })}
      >
        <Box>
          <Heading fontSize="3xl">{name}</Heading>
        </Box>
        <Spacer />
        {selected && (
          <Box>
            <Button
              borderRadius={10}
              variant="ghost"
              onClick={(event) => {
                event.stopPropagation();
                handleModal();
              }}
              size="sm"
            >
              <FiTool />
            </Button>
          </Box>
        )}
      </Flex>

      <Image maxW={120} maxH={120} src={image} alt={`${name} icon`} />
      <Box>
        <Text>{description}</Text>
      </Box>
    </Flex>
  );
};

export default PreConfigCard;
