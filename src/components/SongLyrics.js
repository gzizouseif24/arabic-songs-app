import React, { useState } from 'react';

const SongLyrics = ({ song, onBack }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const styles = {
    container: {
      minHeight: '100vh',
      padding: '15px',
      paddingBottom: '30px',
      backgroundColor: isDarkMode ? '#000000' : '#FFFFFF',
      color: isDarkMode ? '#FFFFFF' : '#000000',
      transition: 'all 0.3s ease',
      fontFamily: '"Cairo", "Amiri", sans-serif',
    },
    header: {
      position: 'sticky',
      top: 0,
      backgroundColor: isDarkMode ? '#000000' : '#FFFFFF',
      zIndex: 10,
      paddingBottom: '15px',
      borderBottom: `3px solid ${isDarkMode ? '#FFD700' : '#B8860B'}`,
      marginBottom: '20px',
    },
    topControls: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '15px',
      flexWrap: 'wrap',
      gap: '10px',
    },
    backButton: {
      backgroundColor: '#FFD700',
      color: '#000000',
      border: 'none',
      borderRadius: '25px',
      padding: '12px 25px',
      fontSize: '1.1rem',
      fontWeight: '600',
      fontFamily: '"Cairo", sans-serif',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      boxShadow: '0 4px 10px rgba(255, 215, 0, 0.3)',
      transition: 'all 0.3s ease',
      minWidth: '120px',
    },
    backButtonHover: {
      transform: 'scale(1.05)',
      boxShadow: '0 6px 15px rgba(255, 215, 0, 0.5)',
    },
    themeToggle: {
      backgroundColor: isDarkMode ? '#FFFFFF' : '#000000',
      color: isDarkMode ? '#000000' : '#FFFFFF',
      border: `2px solid ${isDarkMode ? '#FFD700' : '#B8860B'}`,
      borderRadius: '25px',
      padding: '12px 20px',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.3s ease',
      fontFamily: '"Cairo", sans-serif',
      minWidth: '140px',
      justifyContent: 'center',
    },
    songInfo: {
      textAlign: 'center',
      marginBottom: '20px',
    },
    songTitle: {
      fontSize: '2rem',
      fontWeight: '700',
      color: isDarkMode ? '#FFD700' : '#B8860B',
      marginBottom: '10px',
      textShadow: isDarkMode ? '2px 2px 4px rgba(0, 0, 0, 0.5)' : '1px 1px 2px rgba(0, 0, 0, 0.2)',
      lineHeight: '1.4',
    },
    artistName: {
      fontSize: '1.3rem',
      color: isDarkMode ? '#B8860B' : '#8B6914',
      fontStyle: 'italic',
      marginBottom: '5px',
    },
    divider: {
      width: '80%',
      height: '2px',
      background: `linear-gradient(90deg, transparent, ${isDarkMode ? '#FFD700' : '#B8860B'}, transparent)`,
      margin: '20px auto',
    },
    lyricsContainer: {
      maxWidth: '100%',
      margin: '0 auto',
      padding: '20px 10px',
      backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
      borderRadius: '15px',
      border: `1px solid ${isDarkMode ? 'rgba(255, 215, 0, 0.2)' : 'rgba(184, 134, 11, 0.2)'}`,
    },
    lyricsText: {
      fontSize: '1.5rem', // Large font for mobile visibility
      lineHeight: '2.2',
      textAlign: 'center',
      whiteSpace: 'pre-wrap',
      fontFamily: '"Amiri", "Cairo", serif',
      fontWeight: '500',
      letterSpacing: '0.5px',
      color: isDarkMode ? '#FFFFFF' : '#000000',
      padding: '10px',
    },
    ornament: {
      textAlign: 'center',
      fontSize: '2rem',
      color: isDarkMode ? '#FFD700' : '#B8860B',
      margin: '20px 0',
      opacity: '0.6',
    },
    footer: {
      textAlign: 'center',
      marginTop: '40px',
      paddingTop: '20px',
      borderTop: `1px solid ${isDarkMode ? 'rgba(255, 215, 0, 0.3)' : 'rgba(184, 134, 11, 0.3)'}`,
    },
    scrollToTop: {
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      backgroundColor: '#FFD700',
      color: '#000000',
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      border: 'none',
      fontSize: '1.5rem',
      cursor: 'pointer',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
    }
  };

  const [isBackHovered, setIsBackHovered] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!song) return null;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.topControls}>
          <button 
            style={{
              ...styles.backButton,
              ...(isBackHovered ? styles.backButtonHover : {})
            }}
            onClick={onBack}
            onMouseEnter={() => setIsBackHovered(true)}
            onMouseLeave={() => setIsBackHovered(false)}
          >
            ← رجوع
          </button>
          
          <button
            style={styles.themeToggle}
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? '☀️ فاتح' : '🌙 داكن'}
          </button>
        </div>

        <div style={styles.songInfo}>
          <h1 style={styles.songTitle}>{song.title}</h1>
          <p style={styles.artistName}>{song.artist}</p>
        </div>
      </div>

      <div style={styles.ornament}>✦ ✦ ✦</div>

      <div style={styles.lyricsContainer}>
        <p style={styles.lyricsText}>
          {song.lyrics}
        </p>
      </div>

      <div style={styles.ornament}>✦ ✦ ✦</div>

      <div style={styles.footer}>
        <p style={{ color: isDarkMode ? '#B8860B' : '#8B6914' }}>
          🎵 نهاية الأغنية 🎵
        </p>
      </div>

      {showScrollTop && (
        <button
          style={styles.scrollToTop}
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default SongLyrics;