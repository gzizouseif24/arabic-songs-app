import React, { useState, useEffect } from 'react';
import './App.css';
import { songs } from './data/songs';
import SongList from './components/SongList';
import SongLyrics from './components/SongLyrics';

function App() {
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'lyrics'
  const [selectedSong, setSelectedSong] = useState(null);

  // Add Google Fonts for Arabic support
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const handleSongSelect = (song) => {
    setSelectedSong(song);
    setCurrentView('lyrics');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedSong(null);
  };

  return (
    <div className="App" dir="rtl">
      <header className="app-header">
        <h1>مكتبة الأغاني العربية</h1>
        <p className="subtitle">Arabic Songs Library</p>
      </header>

      <main className="app-main">
        {currentView === 'list' ? (
          <SongList 
            songs={songs} 
            onSongSelect={handleSongSelect}
          />
        ) : (
          <SongLyrics 
            song={selectedSong} 
            onBack={handleBackToList}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>© 2024 Arabic Songs App</p>
      </footer>
    </div>
  );
}

export default App;