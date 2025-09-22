import React, { useState, useEffect } from 'react';
import './App.css';
import { songs } from './data/songs';
import SongList from './components/SongList';
import SongLyrics from './components/SongLyrics';
import WelcomeScreen from './components/WelcomeScreen';
import InstallPrompt from './components/InstallPrompt';



function App() {
  const [currentView, setCurrentView] = useState('welcome'); // 'welcome', 'list' or 'lyrics'
  const [selectedSong, setSelectedSong] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [savedScrollPosition, setSavedScrollPosition] = useState(0);
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  // Check if user has seen welcome screen before
  useEffect(() => {
    const welcomeSeen = localStorage.getItem('welcomeSeen');
    if (welcomeSeen) {
      setHasSeenWelcome(true);
      setCurrentView('list');
    }
  }, []);

  // PWA installation prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      // Show install button after user has used the app a bit
      setTimeout(() => {
        const installDismissed = localStorage.getItem('installPromptDismissed');
        if (!installDismissed) {
          setShowInstallPrompt(true);
        }
      }, 30000); // Show after 30 seconds
    };

    const handleAppInstalled = () => {
      console.log('PWA was installed');
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

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
        // Scroll to top when entering lyrics
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // If we're going back to list or initial load
        setCurrentView('list');
        setSelectedSong(null);
        // Restore scroll position when returning to list
        setTimeout(() => {
          window.scrollTo({ top: event.state?.scrollPosition || savedScrollPosition, behavior: 'smooth' });
        }, 100);
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
  }, [currentView, savedScrollPosition]);

  const handleSongSelect = (song) => {
    // Save current scroll position before leaving the list
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    setSavedScrollPosition(currentScrollPosition);

    setSelectedSong(song);
    setCurrentView('lyrics');

    // Add to browser history with saved scroll position
    window.history.pushState(
      {
        view: 'lyrics',
        song: song,
        scrollPosition: currentScrollPosition
      },
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
      // Fallback if no history - restore scroll position
      window.history.replaceState({ view: 'list', scrollPosition: savedScrollPosition }, '', '/');
      setTimeout(() => {
        window.scrollTo({ top: savedScrollPosition, behavior: 'smooth' });
      }, 100);
    }

    // Note: Scroll position restoration is handled in handlePopState
  };

  const handleEnterApp = () => {
    localStorage.setItem('welcomeSeen', 'true');
    setHasSeenWelcome(true);
    setCurrentView('list');
    window.history.replaceState({ view: 'list' }, '', '/');
  };

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      // Clear the deferredPrompt
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    }
  };

  const handleInstallDismiss = () => {
    setShowInstallPrompt(false);
    localStorage.setItem('installPromptDismissed', 'true');
  };

  // Show welcome screen if user hasn't seen it
  if (currentView === 'welcome' && !hasSeenWelcome) {
    return (
      <div className={`App ${isDarkMode ? 'app-dark' : 'app-light'}`} dir="rtl">
        <WelcomeScreen onEnter={handleEnterApp} isDarkMode={isDarkMode} />
      </div>
    );
  }

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

      {showInstallPrompt && (
        <InstallPrompt
          onInstall={handleInstallClick}
          onDismiss={handleInstallDismiss}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
}

export default App;