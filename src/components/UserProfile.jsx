import React from 'react';
import { MapPin, Link as LinkIcon, MessageCircle, Building2, Users, Star, BookOpen, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const UserProfile = ({ user, repos }) => {
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}
    >
      {/* Profile Header Card */}
      <motion.div variants={itemVariants} className="glass-panel" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <img
            src={user.avatar_url}
            alt={user.name || user.login}
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              border: '4px solid var(--accent)',
              objectFit: 'cover'
            }}
          />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                  {user.name || user.login}
                </h2>
                <a href={user.html_url} target="_blank" rel="noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: '1.1rem' }}>
                  @{user.login}
                </a>
              </div>
              <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                <Clock size={18} /> Joined {formatDate(user.created_at)}
              </span>
            </div>
            
            <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              {user.bio || 'This profile has no bio'}
            </p>
          </div>
        </div>

        {/* Stats Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '1rem',
          background: 'var(--bg-secondary)',
          padding: '1.5rem',
          borderRadius: '16px',
          marginTop: '2rem',
          boxShadow: 'var(--shadow)',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Repos</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{user.public_repos}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Followers</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{user.followers}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Following</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{user.following}</span>
          </div>
        </div>

        {/* Links Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginTop: '2rem',
          color: 'var(--text-secondary)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', opacity: user.location ? 1 : 0.5 }}>
            <MapPin size={20} /> <span>{user.location || 'Not Available'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', opacity: user.blog ? 1 : 0.5 }}>
            <LinkIcon size={20} /> 
            {user.blog ? (
              <a href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                {user.blog}
              </a>
            ) : <span>Not Available</span>}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', opacity: user.twitter_username ? 1 : 0.5 }}>
            <MessageCircle size={20} /> 
            {user.twitter_username ? (
              <a href={`https://twitter.com/${user.twitter_username}`} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                {user.twitter_username}
              </a>
            ) : <span>Not Available</span>}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', opacity: user.company ? 1 : 0.5 }}>
            <Building2 size={20} /> <span>{user.company || 'Not Available'}</span>
          </div>
        </div>
      </motion.div>

      {/* Repositories */}
      {repos && repos.length > 0 && (
        <motion.div variants={itemVariants}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BookOpen size={24} color="var(--accent)"/> Recent Projects
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {repos.map((repo, index) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="glass-panel"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                style={{
                  padding: '1.5rem',
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow)';
                }}
              >
                <h4 style={{ color: 'var(--accent)', fontSize: '1.1rem', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {repo.name}
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', flex: 1, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                  {repo.description || 'No description provided.'}
                </p>
                <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--accent)' }}></div>
                    {repo.language || 'Unknown'}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)' }}>
                    <Star size={14} /> {repo.stargazers_count}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default UserProfile;
