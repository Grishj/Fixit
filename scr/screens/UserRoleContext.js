// UserRoleContext.js
import React, { createContext, useState } from 'react';

// Create the context
export const UserRoleContext = createContext();

// Create the provider
export const UserRoleProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null); // Or default to 'user' or 'serviceProvider'

  return (
    <UserRoleContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </UserRoleContext.Provider>
  );
};
