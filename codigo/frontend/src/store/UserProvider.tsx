import { createContext, useState } from "react";

export interface UserContextInterface {
  avatarUrl?: string | null;
}

export interface Context {
  globalUserContext: UserContextInterface;
  setGlobalUserContext: React.Dispatch<
    React.SetStateAction<UserContextInterface>
  >;
}

export const UserContext = createContext<Context | null>(null);

export const UserProvider: React.FC = ({ children }) => {
  const [
    globalUserContext,
    setGlobalUserContext,
  ] = useState<UserContextInterface>({});

  return (
    <UserContext.Provider value={{ globalUserContext, setGlobalUserContext }}>
      {children}
    </UserContext.Provider>
  );
};
