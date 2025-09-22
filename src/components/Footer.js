import React from 'react';
import { IoMail, IoCall, IoMusicalNote } from 'react-icons/io5';

const Footer = ({ isDarkMode }) => {
  const styles = {
    footer: {
      background: isDarkMode ? '#1a1a1a' : '#f5f5f5',
      borderTop: `1px solid ${isDarkMode ? '#333' : '#e0e0e0'}`,
      padding: '25px 15px',
      marginTop: '30px',
      textAlign: 'center',
      fontFamily: '"Cairo", sans-serif',
    },
    container: {
      maxWidth: '400px',
      margin: '0 auto',
    },
    title: {
      fontSize: '1.1rem',
      fontWeight: '600',
      color: isDarkMode ? '#FFD700' : '#B8860B',
      marginBottom: '15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
    },
    contactInfo: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      marginBottom: '15px',
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      fontSize: '0.9rem',
      color: isDarkMode ? '#ccc' : '#666',
      textDecoration: 'none',
      transition: 'all 0.2s ease',
      padding: '8px',
      borderRadius: '8px',
    },
    contactItemHover: {
      color: isDarkMode ? '#FFD700' : '#B8860B',
      backgroundColor: isDarkMode ? '#FFD70010' : '#B8860B10',
      transform: 'translateY(-1px)',
    },
    divider: {
      width: '60px',
      height: '2px',
      background: `linear-gradient(90deg, transparent, ${isDarkMode ? '#FFD700' : '#B8860B'}, transparent)`,
      margin: '15px auto',
      borderRadius: '1px',
    },
    copyright: {
      fontSize: '0.8rem',
      color: isDarkMode ? '#888' : '#999',
      fontWeight: '400',
    }
  };

  const [hoveredItem, setHoveredItem] = React.useState(null);

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.title}>
          <IoMusicalNote size={20} />
          <span>GS Events</span>
          <IoMusicalNote size={20} />
        </div>
        
        <div style={styles.contactInfo}>
          <a
            href="mailto:Gsevents64@gmail.com"
            style={{
              ...styles.contactItem,
              ...(hoveredItem === 'email' ? styles.contactItemHover : {})
            }}
            onMouseEnter={() => setHoveredItem('email')}
            onMouseLeave={() => setHoveredItem(null)}
            onTouchStart={() => setHoveredItem('email')}
            onTouchEnd={() => setHoveredItem(null)}
          >
            <IoMail size={16} />
            <span>Gsevents64@gmail.com</span>
          </a>
          
          <a
            href="tel:48104810"
            style={{
              ...styles.contactItem,
              ...(hoveredItem === 'phone' ? styles.contactItemHover : {})
            }}
            onMouseEnter={() => setHoveredItem('phone')}
            onMouseLeave={() => setHoveredItem(null)}
            onTouchStart={() => setHoveredItem('phone')}
            onTouchEnd={() => setHoveredItem(null)}
          >
            <IoCall size={16} />
            <span>48104810</span>
          </a>
        </div>

        <div style={styles.divider}></div>
        
        <div style={styles.copyright}>
          © 2025 GS Events - تنظيم الفعاليات والحفلات
        </div>
      </div>
    </footer>
  );
};

export default Footer;