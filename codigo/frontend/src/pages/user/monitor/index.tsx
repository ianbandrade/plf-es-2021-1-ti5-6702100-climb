import { useColorMode } from "@chakra-ui/color-mode";

const Monitor = (): JSX.Element => {
  const { colorMode } = useColorMode();
  return (
    <iframe
      id="iframe"
      src={`http://climb.codes:3000/d/3ipsWfViz/traefik?orgId=1&kiosk&theme=${colorMode}&from=now-5m&to=now&refresh=5s&var-interval=5m`}
    ></iframe>
  );
};

export default Monitor;
