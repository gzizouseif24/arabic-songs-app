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

  // Handle browser back button
  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.view === 'lyrics') {
        // If we're going to lyrics page via back button
        setCurrentView('lyrics');
        setSelectedSong(event.state.song);
      } else {
        // If we're going back to list or initial load
        setCurrentView('list');
        setSelectedSong(null);
      }
    };

    // Listen for back/forward button clicks
    window.addEventListener('popstate', handlePopState);

    // Set initial history state
    if (currentView === 'list') {
      window.history.replaceState({ view: 'list' }, '', '/');
    }

    // Cleanup
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [currentView]);

  const handleSongSelect = (song) => {
    setSelectedSong(song);
    setCurrentView('lyrics');
    
    // Add to browser history so back button works
    window.history.pushState(
      { view: 'lyrics', song: song }, 
      '', 
      `/song/${song.id}`
    );
    
    // Scroll to top when entering lyrics page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedSong(null);
    
    // Use browser back instead of direct navigation
    // This ensures the history stack is correct
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // Fallback if no history
      window.history.replaceState({ view: 'list' }, '', '/');
    }
    
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