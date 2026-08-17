import React from 'react';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <span className="footer-title">ITSTEPMarket</span>
        <p className="footer-copyright">
          © {new Date().getFullYear()} ITSTEPMarket
        </p>
      </div>
    </footer>
  );
};
