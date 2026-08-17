import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, User, KeyRound, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './AdminLoginPage.css';

export const AdminLoginPage = () => {
  const { login, isAdminLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState(null);

  if (isAdminLoggedIn) {
    navigate('/admin', { replace: true });
    return null;
  }

  const validate = () => {
    const errs = {};
    if (!username.trim()) {
      errs.username = "Введіть ім'я користувача";
    }
    if (!password) {
      errs.password = 'Введіть пароль';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAuthError(null);

    if (!validate()) return;

    const result = login(username.trim(), password);
    if (result.success) {
      navigate('/admin');
    } else {
      setAuthError(result.error);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-card glass-panel">
        <div className="login-header">
          <div className="login-icon-box">
            <ShieldCheck size={36} />
          </div>
          <h2>Вхід в Панель Адміністратора</h2>
          <p>Введіть облікові дані для управління товарами магазину</p>
        </div>

        {authError && (
          <div className="auth-error-alert">
            <AlertCircle size={16} className="alert-icon" />
            <span>{authError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label">Логін</label>
            <div className="input-with-icon">
              <User size={18} className="input-icon" />
              <input 
                type="text" 
                placeholder="Введіть логін" 
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (errors.username) setErrors({ ...errors, username: null });
                }}
                className={`form-input icon-input ${errors.username ? 'is-invalid' : ''}`}
              />
            </div>
            {errors.username && <span className="form-error">{errors.username}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Пароль</label>
            <div className="input-with-icon">
              <KeyRound size={18} className="input-icon" />
              <input 
                type="password" 
                placeholder="Введіть пароль" 
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: null });
                }}
                className={`form-input icon-input ${errors.password ? 'is-invalid' : ''}`}
              />
            </div>
            {errors.password && <span className="form-error">{errors.password}</span>}
          </div>

          <button type="submit" className="btn btn-primary login-btn">
            <Lock size={18} />
            <span>Увійти в систему</span>
          </button>
        </form>
      </div>
    </div>
  );
};
