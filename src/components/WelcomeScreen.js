import React from 'react';

const WelcomeScreen = ({ onEnter, isDarkMode }) => {
  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      background: isDarkMode ? '#0a0a0a' : '#fafafa',
      textAlign: 'center',
    },
    poster: {
      maxWidth: '90%',
      maxHeight: '70vh',
      width: 'auto',
      height: 'auto',
      borderRadius: '12px',
      boxShadow: isDarkMode 
        ? '0 8px 32px rgba(255, 215, 0, 0.1)' 
        : '0 8px 32px rgba(0, 0, 0, 0.1)',
      marginBottom: '30px',
      objectFit: 'contain',
    },
    enterButton: {
      background: isDarkMode ? '#FFD700' : '#B8860B',
      color: isDarkMode ? '#0a0a0a' : '#ffffff',
      border: 'none',
      borderRadius: '25px',
      padding: '15px 40px',
      fontSize: '1.2rem',
      fontWeight: '600',
      fontFamily: '"Cairo", sans-serif',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
      minWidth: '200px',
    },
    enterButtonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
    },
    fallbackText: {
      color: isDarkMode ? '#FFD700' : '#B8860B',
      fontSize: '1.5rem',
      fontWeight: '600',
      fontFamily: '"Cairo", sans-serif',
      marginBottom: '30px',
    }
  };

  const [isHovered, setIsHovered] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  return (
    <div style={styles.container}>
      {!imageError ? (
        <img 
          src="/event_poster.png" 
          alt="Event Poster" 
          style={styles.poster}
          onError={() => setImageError(true)}
        />
      ) : (
        <div style={styles.fallbackText}>
          🎵 Arabic Songs Event 🎵
        </div>
      )}
      
      <button
        style={{
          ...styles.enterButton,
          ...(isHovered ? styles.enterButtonHover : {})
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
        onClick={onEnter}
      >
        دخول
      </button>
    </div>
  );
};

export default WelcomeScreen;