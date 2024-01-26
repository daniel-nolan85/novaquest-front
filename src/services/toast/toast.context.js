import { useState, createContext } from 'react';

export const ToastContext = createContext();

export const ToastContextProvider = ({ children }) => {
  const [showEmailSuccessToast, setShowEmailSuccessToast] = useState(false);
  const [showEmailErrorToast, setShowEmailErrorToast] = useState(false);
  const [showDeleteAccountToast, setShowDeleteAccountToast] = useState(false);
  const [deleteAccountBody, setDeleteAccountBody] = useState('');
  const [blockUserBody, setBlockUserBody] = useState('');
  const [showAllianceToast, setShowAllianceToast] = useState(false);
  const [allianceTitle, setAllianceTitle] = useState('');
  const [showRevokeToast, setShowRevokeToast] = useState(false);
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
        blockUserBody,
        setBlockUserBody,
        showAllianceToast,
        setShowAllianceToast,
        allianceTitle,
        setAllianceTitle,
        showRevokeToast,
        setShowRevokeToast,
        revokeTitle,
        setRevokeTitle,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};
