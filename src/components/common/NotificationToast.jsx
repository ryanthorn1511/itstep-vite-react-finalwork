import React from 'react';
import { useCart } from '../../context/CartContext';
import { CheckCircle } from 'lucide-react';
import './NotificationToast.css';

export const NotificationToast = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="toast-container">
      <div className="toast-body">
        <CheckCircle size={20} className="toast-icon" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};
