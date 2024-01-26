import { useState, createContext } from 'react';

export const ToastContext = createContext();

export const ToastContextProvider = ({ children }) => {
  const [showEmailSuccessToast, setShowEmailSuccessToast] = useState(false);
  const [showEmailErrorToast, setShowEmailErrorToast] = useState(false);
  const [showDeleteAccountToast, setShowDeleteAccountToast] = useState(false);
  const [deleteAccountBody, setDeleteAccountBody] = useState('');
  const [showDeleteUserToast, setShowDeleteUserToast] = useState(false);
  const [deleteUserTitle, setDeleteUserTitle] = useState('');
  const [deleteUserBody, setDeleteUserBody] = useState('');

  return (
    <ToastContext.Provider
      value={{
        showEmailSuccessToast,
        setShowEmailSuccessToast,
        showEmailErrorToast,
        setShowEmailErrorToast,
        showDeleteAccountToast,
        setShowDeleteAccountToast,
        deleteAccountBody,
        setDeleteAccountBody,
        showDeleteUserToast,
        setShowDeleteUserToast,
        deleteUserTitle,
        setDeleteUserTitle,
        deleteUserBody,
        setDeleteUserBody,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};
