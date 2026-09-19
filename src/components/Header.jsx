import React from 'react';
import { Moon, Sun, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = ({ theme, toggleTheme }) => {
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 0',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <Code2 size={32} color="var(--text-primary)" />
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
          devfinder
        </h1>
      </div>
      
      <button
        onClick={toggleTheme}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'none',
          border: 'none',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          fontSize: '1rem',
          fontWeight: 'bold',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          padding: '0.5rem',
          transition: 'color 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
      >
        <span style={{ fontSize: '0.875rem' }}>
          {theme === 'light' ? 'DARK' : 'LIGHT'}
        </span>
        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      </button>
    </motion.header>
  );
};

export default Header;
