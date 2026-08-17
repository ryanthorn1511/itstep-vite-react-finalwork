import { createContext, useContext, useReducer, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/mockProducts';

const STORAGE_KEY = 'shop_products';

const ProductContext = createContext();

const productReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return action.payload;
    case 'ADD_PRODUCT':
      return [action.payload, ...state];
    case 'EDIT_PRODUCT':
      return state.map(product => 
        product.id === action.payload.id ? { ...product, ...action.payload } : product
      );
    case 'DELETE_PRODUCT':
      return state.filter(product => product.id !== action.payload);
    default:
      return state;
  }
};

export const ProductProvider = ({ children }) => {
  const [products, dispatch] = useReducer(productReducer, [], () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error('Помилка зчитування товарів з LocalStorage:', err);
      }
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const addProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: Date.now().toString(),
      rating: 5.0,
      reviewsCount: 0,
      inStock: true
    };
    dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
    console.log('Товар додано:', newProduct.title);
  };

  const editProduct = (productData) => {
    dispatch({ type: 'EDIT_PRODUCT', payload: productData });
    console.log('Товар оновлено:', productData.title);
  };

  const deleteProduct = (id) => {
    dispatch({ type: 'DELETE_PRODUCT', payload: id });
    console.log('Товар видалено, id:', id);
  };

  const getProductById = (id) => {
    return products.find(p => p.id === id);
  };

  return (
    <ProductContext.Provider value={{
      products,
      addProduct,
      editProduct,
      deleteProduct,
      getProductById
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts має використовуватись всередині ProductProvider');
  }
  return context;
};
