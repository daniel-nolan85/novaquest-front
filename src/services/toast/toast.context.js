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
  const [blockUserBody, setBlockUserBody] = useState('');
  const [allianceTitle, setAllianceTitle] = useState('');
  const [revokeTitle, setRevokeTitle] = useState('');

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
        blockUserBody,
        setBlockUserBody,
        allianceTitle,
        setAllianceTitle,
        revokeTitle,
        setRevokeTitle,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};
