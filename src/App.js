import React, { useState, useEffect } from 'react';
import './App.css';
import { songs } from './data/songs';
import SongList from './components/SongList';
import SongLyrics from './components/SongLyrics';



function App() {
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'lyrics'
  const [selectedSong, setSelectedSong] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Add Google Fonts for Arabic support
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&family=Amiri:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const handleSongSelect = (song) => {
    setSelectedSong(song);
    setCurrentView('lyrics');
    // Scroll to top when entering lyrics page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedSong(null);
    // Scroll to top when returning to song list
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`App ${isDarkMode ? 'app-dark' : 'app-light'}`} dir="rtl">
      <header className={`app-header ${isDarkMode ? 'app-header-dark' : 'app-header-light'}`}>
        <div className="header-content">
          <img 
            src="/logo_gs.png" 
            alt="GS Events Logo" 
            className="header-logo"
          />
        </div>
      </header>

      <main className="app-main">
        {currentView === 'list' ? (
          <SongList 
            songs={songs} 
            onSongSelect={handleSongSelect}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
          />
        ) : (
          <SongLyrics 
            song={selectedSong} 
            onBack={handleBackToList}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
          />
        )}
      </main>
    </div>
  );
}

export default App;