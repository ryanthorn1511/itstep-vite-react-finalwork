import { useState } from 'react';
import { ArrowRight, Tag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';
import './CartSummary.css';

export const CartSummary = ({ onCheckout }) => {
  const { totalAmount, totalItemsCount, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState(null);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'TECH10') {
      setDiscount(0.1);
      setPromoMessage({ type: 'success', text: 'Знижка 10% застосована' });
    } else {
      setDiscount(0);
      setPromoMessage({ type: 'error', text: 'Недійсний промокод' });
    }
  };

  const discountAmount = totalAmount * discount;
  const finalTotal = totalAmount - discountAmount;

  return (
    <div className="cart-summary glass-panel">
      <h3 className="summary-title">Разом</h3>

      <div className="summary-details">
        <div className="summary-row">
          <span>Товарів:</span>
          <span className="summary-val">{totalItemsCount} шт.</span>
        </div>

        <div className="summary-row">
          <span>Вартість:</span>
          <span className="summary-val">{formatPrice(totalAmount)}</span>
        </div>

        {discount > 0 && (
          <div className="summary-row discount-row">
            <span>Знижка (10%):</span>
            <span className="summary-val">-{formatPrice(discountAmount)}</span>
          </div>
        )}

        <form onSubmit={handleApplyPromo} className="promo-form">
          <div className="promo-input-group">
            <input 
              type="text" 
              placeholder="Промокод (TECH10)" 
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="form-input promo-input"
            />
            <button type="submit" className="btn btn-secondary promo-btn">
              <Tag size={14} />
            </button>
          </div>
          {promoMessage && (
            <div className={`promo-msg ${promoMessage.type}`}>
              {promoMessage.text}
            </div>
          )}
        </form>

        <div className="summary-divider"></div>

        <div className="summary-row total-row">
          <span>Загальна сума:</span>
          <span className="total-val">{formatPrice(finalTotal)}</span>
        </div>
      </div>

      <button onClick={() => onCheckout(finalTotal)} className="btn btn-primary checkout-btn">
        <span>Оформити замовлення</span>
        <ArrowRight size={16} />
      </button>

      <button onClick={clearCart} className="btn btn-secondary clear-cart-btn">
        Очистити кошик
      </button>
    </div>
  );
};
