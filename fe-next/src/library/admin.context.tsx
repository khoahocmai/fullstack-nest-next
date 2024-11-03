"use client";

import { createContext, useContext, useState } from "react";

interface IAdminContext {
  collapseMenu: boolean;
  setCollapseMenu: (v: boolean) => void;
}

export const AdminContext = createContext<IAdminContext | null>(null);

export const AdminContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [collapseMenu, setCollapseMenu] = useState(false);

  return (
    <AdminContext.Provider value={{ collapseMenu, setCollapseMenu }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => useContext(AdminContext);
