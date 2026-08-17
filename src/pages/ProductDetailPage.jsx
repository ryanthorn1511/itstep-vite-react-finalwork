import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatters';
import './ProductDetailPage.css';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById } = useProducts();
  const { addToCart, cartItems } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = getProductById(id);

  if (!product) {
    return (
      <div className="product-not-found glass-panel">
        <h2>Товар не знайдено</h2>
        <p>Запитуваний товар не існує або був видалений.</p>
        <Link to="/" className="btn btn-primary">
          Повернутися до каталогу
        </Link>
      </div>
    );
  }

  const isInCart = cartItems.some(item => item.product.id === product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="product-detail-page">
      <button onClick={() => navigate(-1)} className="btn btn-secondary back-btn">
        ← Назад
      </button>

      <div className="product-detail-container glass-panel">
        <div className="product-gallery">
          <img src={product.image} alt={product.title} className="detail-image" />
        </div>

        <div className="product-info">
          <span className="product-category">{product.category}</span>
          <h1 className="product-title">{product.title}</h1>

          <div className="price-section">
            <div className="price-wrapper">
              {product.oldPrice && (
                <span className="old-price">{formatPrice(product.oldPrice)}</span>
              )}
              <span className="current-price">{formatPrice(product.price)}</span>
            </div>
          </div>

          <p className="product-description">{product.description}</p>

          <div className="purchase-controls">
            <div className="quantity-selector">
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                className="qty-btn"
              >
                -
              </button>
              <span className="qty-value">{quantity}</span>
              <button 
                onClick={() => setQuantity(q => q + 1)}
                className="qty-btn"
              >
                +
              </button>
            </div>

            <button 
              onClick={handleAddToCart}
              className={`btn btn-primary add-to-cart-large ${isInCart ? 'in-cart' : ''}`}
            >
              {isInCart ? 'В кошику (Додати ще)' : 'Додати в кошик'}
            </button>
          </div>
        </div>
      </div>

      {product.specs && Object.keys(product.specs).length > 0 && (
        <div className="product-specs-section glass-panel">
          <h2>Характеристики</h2>
          <div className="specs-grid">
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key} className="spec-row">
                <span className="spec-name">{key}</span>
                <span className="spec-value">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
