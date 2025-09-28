import React, { createContext, useContext, useState } from 'react';

const SideMenuContext = createContext();

export const useSideMenu = () => {
  const context = useContext(SideMenuContext);
  if (!context) {
    throw new Error('useSideMenu must be used within a SideMenuProvider');
  }
  return context;
};

export const SideMenuProvider = ({ children }) => {
  const [sidePanel, setSidePanel] = useState(true);

  return (
    <SideMenuContext.Provider value={{ sidePanel, setSidePanel }}>
      {children}
    </SideMenuContext.Provider>
  );
};