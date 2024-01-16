import { useState, createContext } from 'react';

export const GamesContext = createContext();

export const GamesContextProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [okTyping, setOkTyping] = useState(true);
  const [showOk, setShowOk] = useState(true);
  const [questionsAmount, setQuestionsAmount] = useState(null);
  const [visible, setVisible] = useState(false);

  return (
    <GamesContext.Provider
      value={{
        score,
        setScore,
        okTyping,
        setOkTyping,
        showOk,
        setShowOk,
        questionsAmount,
        setQuestionsAmount,
        visible,
        setVisible,
      }}
    >
      {children}
    </GamesContext.Provider>
  );
};
