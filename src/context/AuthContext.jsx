import React, { createContext, useContext, useState, useEffect } from 'react';

const STORAGE_KEY = 'shop_admin_auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, isAdminLoggedIn.toString());
  }, [isAdminLoggedIn]);

  const login = (username, password) => {
    if (username === 'admin' && password === 'admin123') {
      setIsAdminLoggedIn(true);
      console.log('Адміністратор успішно авторизувався');
      return { success: true };
    }
    console.warn('Невдала спроба авторизації адміністратора');
    return { success: false, error: 'Невірний логін або пароль. Спробуйте логін: admin / пароль: admin123' };
  };

  const logout = () => {
    setIsAdminLoggedIn(false);
    console.log('Адміністратор вийшов із системи');
  };

  return (
    <AuthContext.Provider value={{
      isAdminLoggedIn,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth має використовуватись всередині AuthProvider');
  }
  return context;
};
