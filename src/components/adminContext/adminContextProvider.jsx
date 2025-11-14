import { AdminContext } from "./adminContext";
import { useState } from "react";
import { AdminContextDialog } from "./adminContextDialog";

export const AdminContextProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <>
      <AdminContext value={{ isAdmin }}>{children}</AdminContext>
      {!isAdmin && <AdminContextDialog onSetIsAdmin={() => setIsAdmin(true)} />}
    </>
  );
};
