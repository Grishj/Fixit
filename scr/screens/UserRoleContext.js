// UserRoleContext.js
import React, { createContext, useState } from "react";

// Create the context
export const UserRoleContext = createContext();

// Create the provider
export const UserRoleProvider = ({ children }) => {
  const [userRole, setUserRole] = useState("provider"); // Or default to 'user' or 'serviceProvider'//yo le landing page change garxa according to user

  return (
    <UserRoleContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </UserRoleContext.Provider>
  );
};
