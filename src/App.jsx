import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import UserProfile from './components/UserProfile';
import BackgroundAnimation from './components/BackgroundAnimation';
import { fetchUserData, fetchUserRepos } from './services/githubApi';
import { motion, AnimatePresence } from 'framer-motion';
import './index.css';

function App() {
  const [theme, setTheme] = useState('dark');
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem('searchHistory');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    // Set initial theme on document
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleSearch = async (username) => {
    setIsLoading(true);
    setError(null);
    setUser(null);
    setRepos([]);

    try {
      const userData = await fetchUserData(username);
      setUser(userData);
      
      const userRepos = await fetchUserRepos(username);
      setRepos(userRepos);
      
      setSearchHistory(prev => {
        const updated = [username, ...prev.filter(u => u !== username)].slice(0, 5);
        localStorage.setItem('searchHistory', JSON.stringify(updated));
        return updated;
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <BackgroundAnimation />
      <div className="app-container">
        <Header theme={theme} toggleTheme={toggleTheme} />
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: '1rem',
            marginBottom: '1rem',
            minHeight: '35px',
            alignItems: 'center'
          }}
        >
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginRight: '0.5rem' }}>Recent:</span>
          {searchHistory.length === 0 ? (
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontStyle: 'italic' }}>No recent searches</span>
          ) : (
            searchHistory.map((historyItem, index) => (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                key={index}
                onClick={() => handleSearch(historyItem)}
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                  padding: '0.4rem 0.8rem',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--hover-bg)';
                  e.currentTarget.style.borderColor = 'var(--accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--card-bg)';
                  e.currentTarget.style.borderColor = 'var(--border)';
                }}
              >
                {historyItem}
              </motion.button>
            ))
          )}
        </div>
        
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}
            >
              Loading developer data...
            </motion.div>
          )}

          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="glass-panel"
              style={{
                color: '#ef4444',
                padding: '1.5rem',
                textAlign: 'center',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.2)'
              }}
            >
              {error}
            </motion.div>
          )}

          {user && !isLoading && !error && (
            <motion.div
              key="profile"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <UserProfile user={user} repos={repos} />
            </motion.div>
          )}
          
          {!user && !isLoading && !error && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '40vh',
                color: 'var(--text-secondary)',
                flexDirection: 'column',
                gap: '1rem',
                textAlign: 'center'
              }}
            >
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'normal' }}>
                Search for a GitHub user to see their profile
              </h2>
              <p style={{ maxWidth: '400px', lineHeight: '1.5' }}>
                View their analytics, followers, recent repositories and more in a beautifully designed interface.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;
