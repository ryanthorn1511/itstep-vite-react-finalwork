import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { NotificationToast } from '../common/NotificationToast';

export const Layout = ({ children }) => {
  return (
    <div className="page-wrapper">
      <Header />
      <main className="main-content">
        <div className="container">
          {children}
        </div>
      </main>
      <Footer />
      <NotificationToast />
    </div>
  );
};
