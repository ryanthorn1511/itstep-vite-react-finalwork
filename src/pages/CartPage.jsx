import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, CheckCircle2, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CartItem } from '../components/cart/CartItem';
import { CartSummary } from '../components/cart/CartSummary';
import { formatPrice } from '../utils/formatters';
import './CartPage.css';

export const CartPage = () => {
  const { cartItems, clearCart } = useCart();
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [checkoutAmount, setCheckoutAmount] = useState(0);

  const [customerData, setCustomerData] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'card'
  });

  const [formErrors, setFormErrors] = useState({});

  const handleCheckoutOpen = (total) => {
    setCheckoutAmount(total);
    setIsCheckoutModalOpen(true);
  };

  const validateForm = () => {
    const errors = {};
    if (!customerData.name.trim()) {
      errors.name = "Введіть ім'я та прізвище";
    }
    if (!customerData.phone.trim()) {
      errors.phone = 'Введіть номер телефону';
    } else if (!/^\+?[0-9]{10,12}$/.test(customerData.phone.replace(/[\s()-]/g, ''))) {
      errors.phone = 'Некоректний номер телефону';
    }
    if (!customerData.address.trim()) {
      errors.address = 'Введіть адресу доставки';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsOrderPlaced(true);
    clearCart();
  };

  const closeCheckoutModal = () => {
    setIsCheckoutModalOpen(false);
    setIsOrderPlaced(false);
    setFormErrors({});
  };

  if (cartItems.length === 0 && !isOrderPlaced) {
    return (
      <div className="cart-page">
        <h1 className="page-title">Ваш кошик</h1>
        <div className="empty-cart glass-panel">
          <div className="empty-cart-icon">
            <ShoppingBag size={48} />
          </div>
          <h2>Кошик порожній</h2>
          <p>Перегляньте каталог та оберіть товари.</p>
          <Link to="/" className="btn btn-primary">
            <ArrowLeft size={16} />
            <span>Перейти до каталогу</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="page-header">
        <h1 className="page-title">Ваш кошик</h1>
        <Link to="/" className="btn btn-secondary">
          <ArrowLeft size={16} />
          <span>Продовжити покупки</span>
        </Link>
      </div>

      <div className="cart-layout">
        <div className="cart-items-list">
          {cartItems.map(item => (
            <CartItem key={item.product.id} item={item} />
          ))}
        </div>

        <div className="cart-summary-wrapper">
          <CartSummary onCheckout={handleCheckoutOpen} />
        </div>
      </div>

      {isCheckoutModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-content glass-panel checkout-modal">
            <div className="modal-header">
              <h2>{isOrderPlaced ? 'Замовлення прийнято' : 'Оформлення замовлення'}</h2>
              <button onClick={closeCheckoutModal} className="btn btn-icon btn-secondary">
                <X size={18} />
              </button>
            </div>

            {isOrderPlaced ? (
              <div className="order-success-content">
                <div className="success-icon-wrapper">
                  <CheckCircle2 size={54} className="success-icon" />
                </div>
                <h3>Дякуємо за замовлення, {customerData.name}!</h3>
                <p className="order-number">Номер замовлення: #{Math.floor(100000 + Math.random() * 900000)}</p>
                <p className="order-info">
                  До сплати: <strong>{formatPrice(checkoutAmount)}</strong>
                </p>
                <p className="order-desc">
                  Менеджер зв'яжеться з вами за номером {customerData.phone} для підтвердження.
                </p>
                <button onClick={closeCheckoutModal} className="btn btn-primary finish-btn">
                  Повернутися до каталогу
                </button>
              </div>
            ) : (
              <form onSubmit={handleOrderSubmit} className="checkout-form">
                <div className="form-group">
                  <label className="form-label">ПІБ одержувача *</label>
                  <input 
                    type="text" 
                    placeholder="Іванов Іван" 
                    value={customerData.name}
                    onChange={(e) => {
                      setCustomerData({ ...customerData, name: e.target.value });
                      if (formErrors.name) setFormErrors({ ...formErrors, name: null });
                    }}
                    className={`form-input ${formErrors.name ? 'is-invalid' : ''}`}
                  />
                  {formErrors.name && <span className="form-error">{formErrors.name}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Номер телефону *</label>
                  <input 
                    type="text" 
                    placeholder="+380991234567" 
                    value={customerData.phone}
                    onChange={(e) => {
                      setCustomerData({ ...customerData, phone: e.target.value });
                      if (formErrors.phone) setFormErrors({ ...formErrors, phone: null });
                    }}
                    className={`form-input ${formErrors.phone ? 'is-invalid' : ''}`}
                  />
                  {formErrors.phone && <span className="form-error">{formErrors.phone}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Адреса доставки / Нова Пошта *</label>
                  <input 
                    type="text" 
                    placeholder="м. Київ, Відділення №1" 
                    value={customerData.address}
                    onChange={(e) => {
                      setCustomerData({ ...customerData, address: e.target.value });
                      if (formErrors.address) setFormErrors({ ...formErrors, address: null });
                    }}
                    className={`form-input ${formErrors.address ? 'is-invalid' : ''}`}
                  />
                  {formErrors.address && <span className="form-error">{formErrors.address}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Спосіб оплати</label>
                  <select 
                    value={customerData.paymentMethod}
                    onChange={(e) => setCustomerData({ ...customerData, paymentMethod: e.target.value })}
                    className="form-select"
                  >
                    <option value="card">Онлайн оплата карткою</option>
                    <option value="cash">Оплата при отриманні</option>
                  </select>
                </div>

                <div className="checkout-summary-bar">
                  <span>До сплати:</span>
                  <span className="checkout-total-val">{formatPrice(checkoutAmount)}</span>
                </div>

                <div className="modal-footer">
                  <button type="button" onClick={closeCheckoutModal} className="btn btn-secondary">
                    Скасувати
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Підтвердити замовлення
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
