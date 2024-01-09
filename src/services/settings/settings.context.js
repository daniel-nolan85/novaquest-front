import { useState, createContext } from 'react';

export const SettingsContext = createContext();

export const SettingsContextProvider = ({ children }) => {
  const [reportedPosts, setReportedPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  return (
    <SettingsContext.Provider
      value={{
        reportedPosts,
        setReportedPosts,
        posts,
        setPosts,
        users,
        setUsers,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
