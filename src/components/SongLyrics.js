import React, { useState, useEffect } from 'react';
import { IoArrowBack, IoSunnyOutline, IoMoonOutline, IoArrowUp, IoStar, IoMusicalNote } from 'react-icons/io5';

const SongLyrics = ({ song, onBack, isDarkMode, setIsDarkMode }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [fontSize, setFontSize] = useState('medium');
  const [wakeLock, setWakeLock] = useState(null);

  // Load font size preference from localStorage
  useEffect(() => {
    const savedFontSize = localStorage.getItem('lyricsFontSize');
    if (savedFontSize && ['small', 'medium', 'large'].includes(savedFontSize)) {
      setFontSize(savedFontSize);
    }
  }, []);

  // Prevent screen sleep when viewing lyrics
  useEffect(() => {
    let wakeLockRef = null;
    let fallbackVideo = null;

    const requestWakeLock = async () => {
      try {
        // Modern browsers - Wake Lock API
        if ('wakeLock' in navigator) {
          wakeLockRef = await navigator.wakeLock.request('screen');
          setWakeLock(wakeLockRef);
          console.log('Screen wake lock activated');
          
          wakeLockRef.addEventListener('release', () => {
            console.log('Screen wake lock released');
          });
        } else {
          // Fallback for older browsers - invisible video loop
          fallbackVideo = document.createElement('video');
          fallbackVideo.setAttribute('muted', '');
          fallbackVideo.setAttribute('loop', '');
          fallbackVideo.setAttribute('playsinline', '');
          fallbackVideo.style.position = 'fixed';
          fallbackVideo.style.top = '-1px';
          fallbackVideo.style.left = '-1px';
          fallbackVideo.style.width = '1px';
          fallbackVideo.style.height = '1px';
          fallbackVideo.style.opacity = '0';
          fallbackVideo.style.pointerEvents = 'none';
          
          // Create a minimal video data URL
          fallbackVideo.src = 'data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMWF2YzEAAAAIZnJlZQAAAr1tZGF0AAACrgYF//+q3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE1MiByMjg1NCBlOWE1OTAzIC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAxNyAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTMgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MzoweDExMyBtZT1oZXggc3VibWU9NyBwc3k9MSBwc3lfcmQ9MS4wMDowLjAwIG1peGVkX3JlZj0xIG1lX3JhbmdlPTE2IGNocm9tYV9tZT0xIHRyZWxsaXM9MSA4eDhkY3Q9MSBjcW09MCBkZWFkem9uZT0yMSwxMSBmYXN0X3Bza2lwPTEgY2hyb21hX3FwX29mZnNldD0tMiB0aHJlYWRzPTMgbG9va2FoZWFkX3RocmVhZHM9MSBzbGljZWRfdGhyZWFkcz0wIG5yPTAgZGVjaW1hdGU9MSBpbnRlcmxhY2VkPTAgYmx1cmF5X2NvbXBhdD0wIGNvbnN0cmFpbmVkX2ludHJhPTAgYmZyYW1lcz0zIGJfcHlyYW1pZD0yIGJfYWRhcHQ9MSBiX2JpYXM9MCBkaXJlY3Q9MSB3ZWlnaHRiPTEgb3Blbl9nb3A9MCB3ZWlnaHRwPTIga2V5aW50PTI1MCBrZXlpbnRfbWluPTEwIHNjZW5lY3V0PTQwIGludHJhX3JlZnJlc2g9MCByY19sb29rYWhlYWQ9NDAgcmM9Y3JmIG1idHJlZT0xIGNyZj0yMy4wIHFjb21wPTAuNjAgcXBtaW49MCBxcG1heD02OSBxcHN0ZXA9NCBpcF9yYXRpbz0xLjQwIGFxPTE6MS4wMACAAAABWWWIhAA3//728P4FNjuY0JcRzeidDNmxmjKpN1n2+ADLEi+8N8cN8PnzDOXdu/NuXnv+U1OUWI2xjdxzEwYAAAADAAADAAADAAADAAAHgvugkks=';
          
          document.body.appendChild(fallbackVideo);
          
          const playPromise = fallbackVideo.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              console.log('Fallback video play failed - screen may sleep');
            });
          }
          
          console.log('Screen sleep prevention fallback activated');
        }
      } catch (err) {
        console.log('Wake lock request failed:', err);
      }
    };

    // Request wake lock when component mounts
    requestWakeLock();

    // Handle visibility change (when user switches tabs)
    const handleVisibilityChange = () => {
      if (wakeLockRef !== null && document.visibilityState === 'visible') {
        requestWakeLock();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup function
    return () => {
      if (wakeLockRef) {
        wakeLockRef.release();
        setWakeLock(null);
      }
      if (fallbackVideo && fallbackVideo.parentNode) {
        fallbackVideo.parentNode.removeChild(fallbackVideo);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

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

  const handleFontSizeChange = (newSize) => {
    setFontSize(newSize);
    localStorage.setItem('lyricsFontSize', newSize);
  };

  const getFontSize = () => {
    switch (fontSize) {
      case 'small': return '1.4rem';
      case 'medium': return '1.68rem';
      case 'large': return '2rem';
      default: return '1.68rem';
    }
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
      zIndex: 1000,
      paddingTop: '10px',
      paddingBottom: '15px',
      borderBottom: `1px solid ${isDarkMode ? '#333' : '#e0e0e0'}`,
      boxShadow: `0 2px 8px ${isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)'}`,
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      margin: '0 -10px',
      padding: '10px 20px 15px 20px',
    },
    topControls: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '15px',
      padding: '0 5px',
    },
    fontControls: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '15px',
      padding: '0 5px',
    },
    fontButton: {
      backgroundColor: 'transparent',
      color: isDarkMode ? '#FFD700' : '#B8860B',
      border: `1px solid ${isDarkMode ? '#FFD700' : '#B8860B'}`,
      borderRadius: '20px',
      padding: '6px 12px',
      fontSize: '0.85rem',
      fontWeight: '600',
      fontFamily: '"Cairo", sans-serif',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      minWidth: '35px',
      height: '32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    fontButtonActive: {
      backgroundColor: isDarkMode ? '#FFD700' : '#B8860B',
      color: isDarkMode ? '#000' : '#fff',
    },
    fontButtonHover: {
      backgroundColor: isDarkMode ? '#FFD70020' : '#B8860B20',
      transform: 'translateY(-1px)',
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
      fontSize: getFontSize(),
      lineHeight: '2',
      textAlign: 'center',
      whiteSpace: 'pre-wrap',
      fontFamily: '"Amiri", "Cairo", serif',
      fontWeight: '400',
      color: isDarkMode ? '#f0f0f0' : '#1a1a1a',
      letterSpacing: '0.3px',
      transition: 'font-size 0.3s ease',
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
  const [hoveredFontButton, setHoveredFontButton] = useState(null);

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

        <div style={styles.fontControls}>
          <button
            style={{
              ...styles.fontButton,
              ...(fontSize === 'small' ? styles.fontButtonActive : {}),
              ...(hoveredFontButton === 'small' ? styles.fontButtonHover : {})
            }}
            onClick={() => handleFontSizeChange('small')}
            onMouseEnter={() => setHoveredFontButton('small')}
            onMouseLeave={() => setHoveredFontButton(null)}
            aria-label="خط صغير"
          >
            A-
          </button>
          <button
            style={{
              ...styles.fontButton,
              ...(fontSize === 'medium' ? styles.fontButtonActive : {}),
              ...(hoveredFontButton === 'medium' ? styles.fontButtonHover : {})
            }}
            onClick={() => handleFontSizeChange('medium')}
            onMouseEnter={() => setHoveredFontButton('medium')}
            onMouseLeave={() => setHoveredFontButton(null)}
            aria-label="خط متوسط"
          >
            A
          </button>
          <button
            style={{
              ...styles.fontButton,
              ...(fontSize === 'large' ? styles.fontButtonActive : {}),
              ...(hoveredFontButton === 'large' ? styles.fontButtonHover : {})
            }}
            onClick={() => handleFontSizeChange('large')}
            onMouseEnter={() => setHoveredFontButton('large')}
            onMouseLeave={() => setHoveredFontButton(null)}
            aria-label="خط كبير"
          >
            A+
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