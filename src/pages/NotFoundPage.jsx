import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Home } from 'lucide-react';
import './NotFoundPage.css';

export const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-card glass-panel">
        <div className="not-found-icon">
          <AlertCircle size={64} />
        </div>
        <h1 className="not-found-code">404</h1>
        <h2>Сторінку не знайдено</h2>
        <p>На жаль, запрашувана сторінка не існує або була переміщена.</p>
        <Link to="/" className="btn btn-primary">
          <Home size={18} />
          <span>На головну сторінку</span>
        </Link>
      </div>
    </div>
  );
};
