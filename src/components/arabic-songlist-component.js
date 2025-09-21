import React from 'react';

const SongList = ({ songs, onSongSelect }) => {
  const styles = {
    container: {
      padding: '20px',
      maxWidth: '100%',
      margin: '0 auto',
      minHeight: 'calc(100vh - 200px)',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
    },
    title: {
      textAlign: 'center',
      color: '#FFD700',
      fontSize: '2rem',
      fontFamily: '"Cairo", "Amiri", sans-serif',
      fontWeight: '700',
      marginBottom: '30px',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
      borderBottom: '2px solid #FFD700',
      paddingBottom: '15px',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '20px',
      padding: '10px',
    },
    songCard: {
      background: 'linear-gradient(145deg, #2a2a2a, #1a1a1a)',
      border: '2px solid #FFD700',
      borderRadius: '15px',
      padding: '20px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)',
      minHeight: '120px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    },
    songCardHover: {
      transform: 'translateY(-5px) scale(1.02)',
      boxShadow: '0 10px 30px rgba(255, 215, 0, 0.3)',
      background: 'linear-gradient(145deg, #3a3a3a, #2a2a2a)',
    },
    songNumber: {
      position: 'absolute',
      top: '10px',
      left: '10px',
      width: '35px',
      height: '35px',
      borderRadius: '50%',
      background: '#FFD700',
      color: '#000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      fontSize: '1.1rem',
      fontFamily: '"Cairo", sans-serif',
      boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.3)',
    },
    songTitle: {
      fontSize: '1.3rem',
      fontWeight: '600',
      color: '#FFD700',
      marginBottom: '10px',
      fontFamily: '"Cairo", "Amiri", sans-serif',
      textAlign: 'center',
      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
    },
    artistName: {
      fontSize: '1rem',
      color: '#B8860B',
      textAlign: 'center',
      fontFamily: '"Cairo", sans-serif',
      fontStyle: 'italic',
      opacity: '0.9',
    },
    decorativeBorder: {
      position: 'absolute',
      bottom: '0',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '60%',
      height: '2px',
      background: 'linear-gradient(90deg, transparent, #FFD700, transparent)',
    },
    ornament: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      fontSize: '1.5rem',
      color: '#FFD700',
      opacity: '0.3',
    }
  };

  const [hoveredCard, setHoveredCard] = React.useState(null);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🎵 اختر أغنية 🎵</h2>
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
          >
            <span style={styles.songNumber}>{song.id}</span>
            <span style={styles.ornament}>✦</span>
            <h3 style={styles.songTitle}>{song.title}</h3>
            <p style={styles.artistName}>{song.artist}</p>
            <div style={styles.decorativeBorder}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongList;