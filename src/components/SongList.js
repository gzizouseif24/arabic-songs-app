import React, { useState } from 'react';
import { IoMusicalNote, IoPlay } from 'react-icons/io5';

const SongList = ({ songs, onSongSelect, isDarkMode, setIsDarkMode }) => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const styles = {
    container: {
      padding: '20px 15px',
      maxWidth: '100%',
      margin: '0 auto',
      minHeight: 'calc(100vh - 180px)',
      background: isDarkMode ? '#0a0a0a' : '#fafafa',
    },

    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '12px',
      padding: '5px',
    },
    songCard: {
      background: isDarkMode ? '#1a1a1a' : '#f0f0f0',
      border: isDarkMode ? '1px solid #333' : '1px solid #ddd',
      borderRadius: '12px',
      padding: '18px 15px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      minHeight: '100px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      textAlign: 'center',
      width: '100%',
      maxWidth: '400px',
      margin: '0 auto',
    },
    songCardHover: {
      transform: 'translateY(-2px)',
      borderColor: isDarkMode ? '#FFD700' : '#B8860B',
      background: isDarkMode ? '#1f1f1f' : '#e8e8e8',
      boxShadow: `0 4px 12px ${isDarkMode ? 'rgba(255, 215, 0, 0.15)' : 'rgba(184, 134, 11, 0.15)'}`,
    },
    songNumber: {
      position: 'absolute',
      top: '8px',
      left: '8px',
      width: '24px',
      height: '24px',
      borderRadius: '6px',
      background: isDarkMode ? 'rgba(255, 215, 0, 0.1)' : 'rgba(184, 134, 11, 0.1)',
      color: isDarkMode ? '#FFD700' : '#B8860B',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.75rem',
      fontWeight: '600',
      fontFamily: '"Cairo", sans-serif',
    },
    songTitle: {
      fontSize: '1rem',
      fontWeight: '500',
      color: isDarkMode ? '#FFD700' : '#B8860B',
      marginBottom: '6px',
      fontFamily: '"Cairo", "Amiri", sans-serif',
      lineHeight: '1.3',
    },
    artistName: {
      fontSize: '0.85rem',
      color: isDarkMode ? '#999' : '#666',
      fontFamily: '"Cairo", sans-serif',
      fontWeight: '400',
    },
    playIconContainer: {
      position: 'absolute',
      top: '8px',
      right: '8px',
      color: isDarkMode ? '#FFD700' : '#B8860B',
      opacity: 0,
      transition: 'opacity 0.2s ease',
    },
    playIconVisible: {
      opacity: 0.6,
    },
    decorativeIcon: {
      position: 'absolute',
      bottom: '8px',
      right: '8px',
    }
  };

  return (
    <div style={styles.container}>

      <div style={styles.grid}>
        {songs.map((song) => (
          <div
            key={song.id}
            style={{
              ...styles.songCard,
              ...(hoveredCard === song.id ? styles.songCardHover : {})
            }}
            onMouseEnter={() => setHoveredCard(song.id)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => onSongSelect(song)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onSongSelect(song);
              }
            }}
            aria-label={`${song.title} - ${song.artist}`}
          >
            <span style={styles.songNumber}>{song.id}</span>
            <div
              style={{
                ...styles.playIconContainer,
                ...(hoveredCard === song.id ? styles.playIconVisible : {})
              }}
            >
              <IoPlay size={16} />
            </div>
            <h3 style={styles.songTitle}>{song.title}</h3>
            <p style={styles.artistName}>{song.artist}</p>
            <div style={styles.decorativeIcon}>
              <IoMusicalNote size={14} style={{ opacity: 0.3 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongList;