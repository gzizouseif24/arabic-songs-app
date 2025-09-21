import React, { useState, useEffect } from 'react';
import { IoArrowBack, IoSunnyOutline, IoMoonOutline, IoArrowUp, IoStar, IoMusicalNote } from 'react-icons/io5';

const SongLyrics = ({ song, onBack }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const styles = {
    container: {
      minHeight: '100vh',
      padding: '10px',
      paddingBottom: '30px',
      backgroundColor: isDarkMode ? '#0a0a0a' : '#fafafa',
      color: isDarkMode ? '#ffffff' : '#1a1a1a',
      transition: 'all 0.3s ease',
      fontFamily: '"Cairo", "Amiri", sans-serif',
    },
    header: {
      position: 'sticky',
      top: 0,
      backgroundColor: isDarkMode ? '#0a0a0a' : '#fafafa',
      zIndex: 10,
      paddingTop: '10px',
      paddingBottom: '15px',
      borderBottom: `1px solid ${isDarkMode ? '#333' : '#e0e0e0'}`,
    },
    topControls: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      padding: '0 5px',
    },
    iconButton: {
      backgroundColor: 'transparent',
      color: isDarkMode ? '#FFD700' : '#B8860B',
      border: `1px solid ${isDarkMode ? '#FFD700' : '#B8860B'}`,
      borderRadius: '20px',
      padding: '8px 16px',
      fontSize: '0.9rem',
      fontWeight: '500',
      fontFamily: '"Cairo", sans-serif',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      transition: 'all 0.2s ease',
      minWidth: 'auto',
    },
    iconButtonHover: {
      backgroundColor: isDarkMode ? '#FFD70015' : '#B8860B15',
      transform: 'translateY(-1px)',
    },
    songInfo: {
      textAlign: 'center',
      padding: '0 10px',
    },
    songTitle: {
      fontSize: '1.8rem',
      fontWeight: '600',
      color: isDarkMode ? '#FFD700' : '#B8860B',
      marginBottom: '8px',
      lineHeight: '1.3',
    },
    artistName: {
      fontSize: '1.1rem',
      color: isDarkMode ? '#999' : '#666',
      fontWeight: '400',
    },
    decorativeElement: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '15px',
      margin: '20px 0',
      color: isDarkMode ? '#FFD700' : '#B8860B',
      opacity: 0.4,
    },
    lyricsContainer: {
      maxWidth: '100%',
      margin: '0 auto',
      padding: '20px 15px',
    },
    lyricsText: {
      fontSize: '1.4rem', // Still large for visibility
      lineHeight: '2',
      textAlign: 'center',
      whiteSpace: 'pre-wrap',
      fontFamily: '"Amiri", "Cairo", serif',
      fontWeight: '400',
      color: isDarkMode ? '#f0f0f0' : '#1a1a1a',
      letterSpacing: '0.3px',
    },
    footer: {
      textAlign: 'center',
      marginTop: '40px',
      paddingTop: '20px',
      borderTop: `1px solid ${isDarkMode ? '#333' : '#e0e0e0'}`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px',
      color: isDarkMode ? '#666' : '#999',
      fontSize: '0.9rem',
    },
    scrollToTop: {
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      backgroundColor: isDarkMode ? '#FFD700' : '#B8860B',
      color: isDarkMode ? '#000' : '#fff',
      width: '45px',
      height: '45px',
      borderRadius: '50%',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
      opacity: showScrollTop ? 1 : 0,
      pointerEvents: showScrollTop ? 'auto' : 'none',
    }
  };

  const [isBackHovered, setIsBackHovered] = useState(false);
  const [isThemeHovered, setIsThemeHovered] = useState(false);

  if (!song) return null;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.topControls}>
          <button
            style={{
              ...styles.iconButton,
              ...(isBackHovered ? styles.iconButtonHover : {})
            }}
            onClick={onBack}
            onMouseEnter={() => setIsBackHovered(true)}
            onMouseLeave={() => setIsBackHovered(false)}
            aria-label="رجوع"
          >
            <IoArrowBack size={20} />
            <span>رجوع</span>
          </button>

          <button
            style={{
              ...styles.iconButton,
              ...(isThemeHovered ? styles.iconButtonHover : {})
            }}
            onClick={() => setIsDarkMode(!isDarkMode)}
            onMouseEnter={() => setIsThemeHovered(true)}
            onMouseLeave={() => setIsThemeHovered(false)}
            aria-label="تبديل الوضع"
          >
            {isDarkMode ? <IoSunnyOutline size={18} /> : <IoMoonOutline size={18} />}
            <span>{isDarkMode ? 'فاتح' : 'داكن'}</span>
          </button>
        </div>

        <div style={styles.songInfo}>
          <h1 style={styles.songTitle}>{song.title}</h1>
          <p style={styles.artistName}>{song.artist}</p>
        </div>
      </div>

      <div style={styles.decorativeElement}>
        <IoStar size={16} />
        <IoStar size={16} />
        <IoStar size={16} />
      </div>

      <div style={styles.lyricsContainer}>
        <p style={styles.lyricsText}>
          {song.lyrics}
        </p>
      </div>

      <div style={styles.decorativeElement}>
        <IoStar size={16} />
        <IoStar size={16} />
        <IoStar size={16} />
      </div>

      <div style={styles.footer}>
        <IoMusicalNote size={16} />
        <span>نهاية الأغنية</span>
        <IoMusicalNote size={16} />
      </div>

      <button
        style={styles.scrollToTop}
        onClick={scrollToTop}
        aria-label="العودة للأعلى"
      >
        <IoArrowUp size={24} />
      </button>
    </div>
  );
};

export default SongLyrics;