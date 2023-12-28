import React, { createContext, useState } from "react";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  deleteUser: (user: User | null) => void;
  addUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => {},
  deleteUser: () => {},
  addUser: () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const addUser = (user: User | null) => {
    setUser(user);
  };
  const deleteUser = (user: User | null) => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, deleteUser, addUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
}
