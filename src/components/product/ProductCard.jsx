import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';
import './ProductCard.css';

export const ProductCard = ({ product }) => {
  const { addToCart, cartItems } = useCart();
  const isInCart = cartItems.some(item => item.product.id === product.id);

  return (
    <div className="product-card glass-panel">
      <div className="card-image-wrapper">
        <img 
          src={product.image} 
          alt={product.title} 
          className="card-image"
          loading="lazy" 
        />
        <div className="card-badges">
          {product.isNew && <span className="badge badge-new">Новинка</span>}
          {product.isPopular && <span className="badge badge-popular">Хіт</span>}
        </div>
      </div>

      <div className="card-content">
        <span className="card-category">{product.category}</span>
        
        <Link to={`/product/${product.id}`} className="card-title-link">
          <h3 className="card-title">{product.title}</h3>
        </Link>

        <div className="card-footer">
          <div className="price-block">
            {product.oldPrice && (
              <span className="old-price">{formatPrice(product.oldPrice)}</span>
            )}
            <span className="current-price">{formatPrice(product.price)}</span>
          </div>

          <button 
            onClick={() => addToCart(product, 1)}
            className={`btn btn-primary add-cart-btn ${isInCart ? 'in-cart' : ''}`}
          >
            {isInCart ? 'В кошику' : 'Купити'}
          </button>
        </div>
      </div>
    </div>
  );
};
