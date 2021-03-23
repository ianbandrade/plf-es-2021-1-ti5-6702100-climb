import { Box } from "@chakra-ui/layout";
import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "../Header";
import Meta from "./Meta";
import { useRouter } from "next/router";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const isAdminPage = router.pathname.includes("/admin");
  return (
    <Box margin="0 auto" maxWidth={2048} transition="0.5s ease-out">
      <Meta />
      <Box margin={isAdminPage ? "0" : "8"}>
        <Header />
        <Box as="main" marginY={22}>
          {children}
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
