import { createContext } from "react";

export const AdminContext = createContext({
  isAdmin: false,
  toggleIsAdmin: () => {},
});
