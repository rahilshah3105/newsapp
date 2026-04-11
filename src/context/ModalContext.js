import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import AppModal from '../components/AppModal';

const ModalContext = createContext();

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState(null);
  const resolverRef = useRef(null);

  const closeModal = useCallback(() => {
    setModal(null);
    resolverRef.current = null;
  }, []);

  const confirm = useCallback((config) => {
    return new Promise((resolve) => {
      resolverRef.current = resolve;
      setModal({
        type: 'confirm',
        title: config?.title || 'Please confirm',
        message: config?.message || 'Are you sure?',
        confirmText: config?.confirmText || 'Confirm',
        cancelText: config?.cancelText || 'Cancel'
      });
    });
  }, []);

  const openShare = useCallback((config) => {
    setModal({
      type: 'share',
      title: config?.title || 'Share Article',
      message: config?.message || '',
      url: config?.url || '',
      onCopy: config?.onCopy,
      openText: config?.openText || 'Open Article',
      copyText: config?.copyText || 'Copy Link'
    });
  }, []);

  const openInfo = useCallback((config) => {
    setModal({
      type: 'info',
      title: config?.title || 'Information',
      message: config?.message || '',
      confirmText: config?.confirmText || 'OK'
    });
  }, []);

  const handleConfirm = useCallback(() => {
    if (modal?.type === 'confirm' && resolverRef.current) {
      resolverRef.current(true);
      closeModal();
      return;
    }

    closeModal();
  }, [closeModal, modal]);

  const handleCancel = useCallback(() => {
    if (modal?.type === 'confirm' && resolverRef.current) {
      resolverRef.current(false);
    }

    closeModal();
  }, [closeModal, modal]);

  const value = useMemo(() => ({
    confirm,
    openShare,
    openInfo,
    closeModal
  }), [confirm, openInfo, openShare, closeModal]);

  return (
    <ModalContext.Provider value={value}>
      {children}
      <AppModal
        modal={modal}
        onClose={handleCancel}
        onConfirm={handleConfirm}
      />
    </ModalContext.Provider>
  );
};
