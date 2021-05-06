import { createContext, useState } from "react";
import { User } from "../shared/interfaces/user";

export interface Context {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

export const UserContext = createContext<Context>({} as Context);

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>({
    id: "",
    email: "",
    name: "",
    role: "",
    status: false,
    gitHubToken: "",
    gitLabToken: "",
    gitHubAccount: "",
    gitLabAccount: "",
    image: "",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
