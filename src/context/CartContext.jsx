import { createContext, useContext, useReducer, useEffect, useState } from 'react';

const STORAGE_KEY = 'shop_cart';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return action.payload;

    case 'ADD_TO_CART': {
      const { product, quantity } = action.payload;
      const existingIndex = state.findIndex(item => item.product.id === product.id);

      if (existingIndex > -1) {
        return state.map((item, index) => 
          index === existingIndex ? { ...item, quantity: item.quantity + quantity } : item
        );
      }

      return [...state, { product, quantity }];
    }

    case 'REMOVE_FROM_CART':
      return state.filter(item => item.product.id !== action.payload);

    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        return state.filter(item => item.product.id !== productId);
      }
      return state.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      );
    }

    case 'CLEAR_CART':
      return [];

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [toastMessage, setToastMessage] = useState(null);

  const [cartItems, dispatch] = useReducer(cartReducer, [], () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error('Помилка завантаження кошика з LocalStorage:', err);
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const addToCart = (product, quantity = 1) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } });
    showToast(`Товар "${product.title}" додано до кошика!`);
  };

  const removeFromCart = (productId) => {
    const item = cartItems.find(i => i.product.id === productId);
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    if (item) {
      showToast(`Товар "${item.product.title}" видалено`);
    }
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    showToast('Кошик очищено');
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const totalItemsCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalAmount,
      totalItemsCount,
      toastMessage
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart має використовуватись всередині CartProvider');
  }
  return context;
};
