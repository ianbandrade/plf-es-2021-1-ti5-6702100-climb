import { Box } from "@chakra-ui/layout";
import { ReactNode, useContext, useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "../Header";
import Meta from "./Meta";
import { useRouter } from "next/router";
import { authService } from "../../shared/services/authService";
import { UserContext } from "../../store/UserProvider";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const isAdminPage = router.pathname.includes("/admin");
  const isUserPage = router.pathname.includes("/user");
  const isLoginPage = router.pathname === "/";
  const { setUser, user } = useContext(UserContext);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    console.log("dokaok");
    if (isLoginPage) {
      authService
        .isAuthenticated(router, { success: "/user/profile" }, setUser)
        .then(setIsLogged);
    } else {
      authService
        .isAuthenticated(router, { useDefault: true }, setUser)
        .then(setIsLogged);
    }
  }, []);

  return (
    <Box margin="0 auto" transition="0.5s ease-out">
      <Meta />
      <Box margin={isAdminPage || isUserPage ? "0" : "8"}>
        {(isLogged || isLoginPage) && (
          <>
            <Header />
            <Box as="main" marginY={22}>
              {children}
            </Box>
            <Footer />
          </>
        )}
      </Box>
    </Box>
  );
};

export default Layout;
