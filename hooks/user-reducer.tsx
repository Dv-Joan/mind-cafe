import { create } from "zustand";

type TUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

interface UserState {
  users: TUser[];
  addUser: (user: TUser) => void;
  deleteUser: (id: string) => void;
  updateUser: (user: TUser) => void;
}
export const useUser = create<UserState>((set) => ({
  users: [],
  addUser: (user: TUser) => set((state) => ({ users: [...state.users, user] })),
  deleteUser: (id: string) =>
    set((state) => ({ users: state.users.filter((user) => user.id !== id) })),
  updateUser: (user: TUser) =>
    set((state) => ({
      users: state.users.map((existingUser) =>
        existingUser.id === user.id ? user : existingUser
      ),
    })),
}));
