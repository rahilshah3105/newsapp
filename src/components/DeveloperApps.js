import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './DeveloperApps.css';

const APPS = [
  {
    title: 'Code Formatter',
    description: 'Format your code snippets with a simple interface supporting multiple languages and themes.',
    url: 'https://devmint-tools.vercel.app/',
    tag: 'Developer',
    icon: 'fa-code',
    color: '#9b59b6'
  },
  {
    title: 'Instagram Analyzer',
    description: 'Analyze your Instagram connections, unfollowers, requests, and profile interactions.',
    url: 'https://instautility.netlify.app/',
    tag: 'Social',
    icon: 'fa-instagram',
    color: '#e91e63'
  },
  {
    title: 'Password Manager',
    description: 'Generate secure passwords and manage them in a local vault with simple import/export support.',
    url: 'https://passgen-tools.vercel.app/',
    tag: 'Security',
    icon: 'fa-key',
    color: '#2ecc71'
  },
  {
    title: 'Word Utils',
    description: 'A handy suite of text and word utilities for quick formatting, cleanup, and content edits.',
    url: 'https://textmint.netlify.app/',
    tag: 'Text Helper',
    icon: 'fa-font',
    color: '#3498db'
  },
  {
    title: 'Task Manager',
    description: 'Plan your day with a clean task board for creating, tracking, and completing daily to-dos.',
    url: 'https://taskmint-tools.vercel.app/',
    tag: 'Productivity',
    icon: 'fa-clipboard-list',
    color: '#6366f1'
  },
  {
    title: 'NewsPulse',
    description: 'Read latest headlines by category with a responsive news reader featuring bookmarks and dark mode.',
    url: 'https://getyournewspulse.netlify.app/',
    tag: 'Information',
    icon: 'fa-newspaper',
    color: '#f1c40f'
  },
];

export default function DeveloperApps() {
  const { isDarkMode } = useTheme();

  return (
    <div className={`apps-page ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="container py-5">
        <header className="apps-header text-center mb-5">
          <h2 className="display-4 font-weight-bold">Recommended Apps</h2>
          <p className="lead text-muted">A curated list of external tools and platforms that pair nicely with your productivity stack.</p>
        </header>

        <div className="row g-4" style={{ paddingBottom: '40px' }}>
          {APPS.map((app, idx) => (
            <div key={idx} className="col-12 col-md-6 col-lg-4">
              <a
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="app-card-link"
              >
                <div className="app-card-modern p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="app-card-icon-wrap me-3" style={{ backgroundColor: `${app.color}15`, color: app.color }}>
                      <i className={`fas ${app.icon} fa-lg`}></i>
                    </div>
                    <div>
                      <span className="badge-tag mb-1" style={{ color: app.color, border: `1px solid ${app.color}30` }}>{app.tag}</span>
                      <h3 className="h5 mb-0 app-title-text">{app.title}</h3>
                    </div>
                  </div>
                  <p className="app-desc-text text-muted mb-0">{app.description}</p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
