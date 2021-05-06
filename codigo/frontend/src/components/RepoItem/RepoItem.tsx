import { Button } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import Icon from "@chakra-ui/icon";
import { Box, Flex, Spacer, Text } from "@chakra-ui/layout";
import Link from "next/link";
import { RepoItemProps } from "../../shared/interfaces/RepoItemProps";
import { colors } from "../../styles/customTheme";

export const RepoItem = (props: RepoItemProps.Application) => {
  const { colorMode } = useColorMode();
  const color = (light: boolean) =>
    light ? colors.light.Nord4 : colors.dark.Nord2;
  const isLight = () => colorMode === "light";
  const textColor = color(!isLight());
  const bgcolor = color(isLight());

  return (
    <>
      <Flex
        borderWidth="1px"
        borderRadius="lg"
        _hover={{ transition: "0.3s ease-out", boxShadow: "dark-lg" }}
        overflow="hidden"
        flexDirection="column"
        p="4"
        bg={bgcolor}
        width="sm"
        m="4"
      >
        <Flex>
          <Box>
            <Text
              mt="1"
              fontWeight="extrabold"
              as="h3"
              lineHeight="tight"
              color={textColor}
              isTruncated
            >
              {props?.name}
            </Text>
          </Box>
          <Spacer />
          <Box>
            <Link href={`/user/apps/${props?.name}`}>
              <Button
                as="a"
                _hover={{ cursor: "pointer" }}
                background={colors.aurora.Nord14}
                color={colors.light.Nord6}
              >
                Acessar
              </Button>
            </Link>
          </Box>
        </Flex>
        <Flex>
          <Icon as={props.icon} mr="5px" boxSize="24px" />
          <Text
            mt="1"
            lineHeight="tight"
            color={textColor}
            margin="auto 0"
            isTruncated
          >
            {`${props.repositoryOwner}/${props.repositoryName}`}
          </Text>
        </Flex>
      </Flex>
    </>
  );
};
