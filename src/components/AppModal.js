import React from 'react';
import './AppModal.css';

const AppModal = ({ modal, onClose, onConfirm }) => {
  if (!modal) return null;

  const isConfirm = modal.type === 'confirm';
  const isShare = modal.type === 'share';

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('app-modal-backdrop')) {
      onClose();
    }
  };

  return (
    <div className="app-modal-backdrop" onClick={handleBackdropClick} role="dialog" aria-modal="true">
      <div className="app-modal-card">
        <div className="app-modal-header">
          <h3 className="app-modal-title">{modal.title}</h3>
          <button type="button" className="app-modal-close" onClick={onClose} aria-label="Close">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="app-modal-body">
          {modal.message && <p className="app-modal-message">{modal.message}</p>}

          {isShare && (
            <div className="app-share-box">
              <div className="app-share-url">{modal.url}</div>
            </div>
          )}
        </div>

        <div className="app-modal-actions">
          {isShare && (
            <>
              <button
                type="button"
                className="app-modal-btn app-modal-btn-secondary"
                onClick={async () => {
                  if (modal.onCopy) {
                    await modal.onCopy();
                  }
                }}
              >
                <i className="fas fa-copy"></i>
                {modal.copyText || 'Copy Link'}
              </button>
              <a
                className="app-modal-btn app-modal-btn-primary"
                href={modal.url}
                target="_blank"
                rel="noreferrer"
              >
                <i className="fas fa-external-link-alt"></i>
                {modal.openText || 'Open Article'}
              </a>
              <button type="button" className="app-modal-btn app-modal-btn-neutral" onClick={onClose}>
                Close
              </button>
            </>
          )}

          {!isShare && (
            <>
              {isConfirm && (
                <button type="button" className="app-modal-btn app-modal-btn-neutral" onClick={onClose}>
                  {modal.cancelText || 'Cancel'}
                </button>
              )}
              <button type="button" className="app-modal-btn app-modal-btn-primary" onClick={onConfirm}>
                {modal.confirmText || 'OK'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppModal;
