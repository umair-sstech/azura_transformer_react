import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState(localStorage.getItem('name') || '');

  const updateUserProfileName = (name) => {
    setUserName(name);
    localStorage.setItem("name", name);
  };

  return (
    <UserContext.Provider value={{ userName, updateUserProfileName }}>
      {children}
    </UserContext.Provider>
  );
};