import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';
import './CartItem.css';

export const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;
  const itemTotal = product.price * quantity;

  return (
    <div className="cart-item glass-panel">
      <div className="cart-item-image-wrapper">
        <img src={product.image} alt={product.title} className="cart-item-image" />
      </div>

      <div className="cart-item-info">
        <span className="cart-item-category">{product.category}</span>
        <Link to={`/product/${product.id}`} className="cart-item-title">
          {product.title}
        </Link>
        <div className="cart-item-unit-price">
          Ціна: {formatPrice(product.price)}
        </div>
      </div>

      <div className="cart-item-actions">
        <div className="quantity-controls">
          <button 
            onClick={() => updateQuantity(product.id, quantity - 1)} 
            disabled={quantity <= 1}
            className="qty-btn"
            title="Зменшити"
          >
            <Minus size={14} />
          </button>
          <span className="qty-value">{quantity}</span>
          <button 
            onClick={() => updateQuantity(product.id, quantity + 1)} 
            className="qty-btn"
            title="Збільшити"
          >
            <Plus size={14} />
          </button>
        </div>

        <div className="cart-item-total">
          {formatPrice(itemTotal)}
        </div>

        <button 
          onClick={() => removeFromCart(product.id)}
          className="btn btn-icon btn-secondary remove-btn"
          title="Видалити"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};
