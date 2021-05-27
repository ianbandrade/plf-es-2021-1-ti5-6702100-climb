import { useColorMode } from "@chakra-ui/color-mode";
import { Flex } from "@chakra-ui/react";

const Monitor = (): JSX.Element => {
  const { colorMode } = useColorMode();
  return (
    <Flex>
      <iframe
        id="iframe"
        src={`${process.env.NEXT_PUBLIC_DASHBOARD_URL}?orgId=1&kiosk&theme=${colorMode}&from=now-5m&to=now&refresh=5s&var-interval=5m`}
      ></iframe>
    </Flex>
  );
};

export default Monitor;
