import { useState, createContext } from 'react';

export const SocialContext = createContext();

export const SocialContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  return (
    <SocialContext.Provider
      value={{
        posts,
        setPosts,
      }}
    >
      {children}
    </SocialContext.Provider>
  );
};
