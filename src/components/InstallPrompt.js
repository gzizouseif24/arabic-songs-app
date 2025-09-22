import React from 'react';
import { IoDownload, IoClose } from 'react-icons/io5';

const InstallPrompt = ({ onInstall, onDismiss, isDarkMode }) => {
  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px',
    },
    modal: {
      background: isDarkMode ? '#1a1a1a' : '#ffffff',
      borderRadius: '15px',
      padding: '25px',
      maxWidth: '350px',
      width: '100%',
      textAlign: 'center',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
      border: `1px solid ${isDarkMode ? '#333' : '#e0e0e0'}`,
    },
    title: {
      fontSize: '1.3rem',
      fontWeight: '600',
      color: isDarkMode ? '#FFD700' : '#B8860B',
      marginBottom: '15px',
      fontFamily: '"Cairo", sans-serif',
    },
    description: {
      fontSize: '1rem',
      color: isDarkMode ? '#ccc' : '#666',
      marginBottom: '25px',
      lineHeight: '1.5',
      fontFamily: '"Cairo", sans-serif',
    },
    buttons: {
      display: 'flex',
      gap: '10px',
      justifyContent: 'center',
    },
    installButton: {
      background: isDarkMode ? '#FFD700' : '#B8860B',
      color: isDarkMode ? '#000' : '#fff',
      border: 'none',
      borderRadius: '25px',
      padding: '12px 20px',
      fontSize: '1rem',
      fontWeight: '600',
      fontFamily: '"Cairo", sans-serif',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    dismissButton: {
      background: 'transparent',
      color: isDarkMode ? '#888' : '#666',
      border: `1px solid ${isDarkMode ? '#444' : '#ccc'}`,
      borderRadius: '25px',
      padding: '12px 20px',
      fontSize: '1rem',
      fontWeight: '600',
      fontFamily: '"Cairo", sans-serif',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
  };

  return (
    <div style={styles.overlay} onClick={onDismiss}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3 style={styles.title}>تثبيت التطبيق</h3>
        <p style={styles.description}>
          ثبت التطبيق على هاتفك للوصول السريع والاستخدام بدون إنترنت
        </p>
        <div style={styles.buttons}>
          <button style={styles.installButton} onClick={onInstall}>
            <IoDownload size={18} />
            تثبيت
          </button>
          <button style={styles.dismissButton} onClick={onDismiss}>
            <IoClose size={18} />
            لاحقاً
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstallPrompt;