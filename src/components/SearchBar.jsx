import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

const SearchBar = ({ onSearch, isLoading }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
    }
  };

  return (
    <motion.form
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      onSubmit={handleSubmit}
      className="glass-panel"
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0.5rem 0.5rem 0.5rem 1.5rem',
        gap: '1rem',
        marginTop: '1rem',
        transition: 'box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = 'var(--shadow-hover)')}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'var(--shadow)')}
    >
      <Search color="var(--accent)" size={24} />
      <input
        type="text"
        placeholder="Search GitHub username..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{
          flex: 1,
          background: 'transparent',
          border: 'none',
          outline: 'none',
          color: 'var(--text-primary)',
          fontSize: '1.1rem',
          padding: '0.5rem',
        }}
      />
      <button
        type="submit"
        disabled={isLoading}
        style={{
          background: 'var(--accent)',
          color: '#fff',
          border: 'none',
          padding: '0.8rem 1.5rem',
          borderRadius: '16px',
          fontWeight: 'bold',
          fontSize: '1rem',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          transition: 'background 0.2s',
          opacity: isLoading ? 0.7 : 1,
        }}
        onMouseEnter={(e) => {
          if (!isLoading) e.currentTarget.style.background = 'var(--accent-hover)';
        }}
        onMouseLeave={(e) => {
          if (!isLoading) e.currentTarget.style.background = 'var(--accent)';
        }}
      >
        Search
      </button>
    </motion.form>
  );
};

export default SearchBar;
