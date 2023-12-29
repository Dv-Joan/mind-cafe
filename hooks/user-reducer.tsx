import { create } from "zustand";

type TUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

interface UserState {
  user: TUser;
  addUser: (user: TUser) => void;
}
export const useUser = create<UserState>((set) => ({
  user: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  },
  addUser: (user: TUser) => set(() => ({ user })),
}));
