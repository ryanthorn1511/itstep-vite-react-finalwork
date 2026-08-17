import { Pencil, Trash2, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/formatters';
import './AdminProductTable.css';

export const AdminProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <div className="table-responsive glass-panel">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Зображення</th>
            <th>Назва</th>
            <th>Категорія</th>
            <th>Ціна</th>
            <th>Наявність</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="6" className="empty-table-cell">
                Товари відсутні
              </td>
            </tr>
          ) : (
            products.map(product => (
              <tr key={product.id}>
                <td>
                  <img src={product.image} alt={product.title} className="table-img" />
                </td>
                <td>
                  <div className="table-product-title">
                    <span>{product.title}</span>
                    <Link to={`/product/${product.id}`} className="view-product-link" title="Переглянути">
                      <ExternalLink size={14} />
                    </Link>
                  </div>
                </td>
                <td>
                  <span className="table-category">{product.category}</span>
                </td>
                <td className="table-price">
                  {formatPrice(product.price)}
                </td>
                <td>
                  {product.inStock ? (
                    <span className="stock-badge available">В наявності ({product.stockCount || 10})</span>
                  ) : (
                    <span className="stock-badge unavailable">Немає</span>
                  )}
                </td>
                <td>
                  <div className="table-actions">
                    <button 
                      onClick={() => onEdit(product)} 
                      className="btn btn-icon btn-secondary action-edit"
                      title="Редагувати"
                    >
                      <Pencil size={15} />
                    </button>
                    <button 
                      onClick={() => onDelete(product)} 
                      className="btn btn-icon btn-secondary action-delete"
                      title="Видалити"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
