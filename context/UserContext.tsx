import React, { createContext, useState } from "react";
import { useUser } from "@/hooks/user-reducer";
interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface UserContextProps {
  handleAddUser: (user: User) => void;
  deleteUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextProps>({
  deleteUser: () => {},
  handleAddUser: () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const state = useUser();

  const handleAddUser = (user: User) => {
    state.addUser(user);
  };
  const deleteUser = (user: User | null) => {};

  return (
    <UserContext.Provider value={{ deleteUser, handleAddUser }}>
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
