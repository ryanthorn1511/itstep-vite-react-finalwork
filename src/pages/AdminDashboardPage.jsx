import React, { useState, useMemo } from 'react';
import { Plus, Search, AlertTriangle, X } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { AdminProductTable } from '../components/admin/AdminProductTable';
import { ProductFormModal } from '../components/admin/ProductFormModal';
import './AdminDashboardPage.css';

export const AdminDashboardPage = () => {
  const { products, addProduct, editProduct, deleteProduct } = useProducts();

  const [searchTerm, setSearchTerm] = useState('');
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);

  const filteredProducts = useMemo(() => {
    return products.filter(product => 
      product.title.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );
  }, [products, searchTerm]);

  const handleOpenAddModal = () => {
    setProductToEdit(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setProductToEdit(product);
    setIsFormModalOpen(true);
  };

  const handleSaveProduct = (productData) => {
    if (productToEdit) {
      editProduct(productData);
    } else {
      addProduct(productData);
    }
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete.id);
      setProductToDelete(null);
    }
  };

  return (
    <div className="admin-dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Управління товарами</h1>
          <p className="dashboard-subtitle">Адміністративна панель для додавання, редагування та видалення товарів</p>
        </div>

        <button onClick={handleOpenAddModal} className="btn btn-primary add-product-btn">
          <Plus size={18} />
          <span>Додати новий товар</span>
        </button>
      </div>

      <div className="admin-controls-bar glass-panel">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Пошук у таблиці за назвою чи категорією..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <AdminProductTable 
        products={filteredProducts}
        onEdit={handleOpenEditModal}
        onDelete={(prod) => setProductToDelete(prod)}
      />

      <ProductFormModal 
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSave={handleSaveProduct}
        productToEdit={productToEdit}
      />

      {productToDelete && (
        <div className="modal-backdrop">
          <div className="modal-content glass-panel delete-modal">
            <div className="modal-header">
              <h2>Підтвердження видалення</h2>
              <button onClick={() => setProductToDelete(null)} className="btn btn-icon btn-secondary">
                <X size={20} />
              </button>
            </div>
            <div className="delete-modal-body">
              <div className="warning-icon-wrapper">
                <AlertTriangle size={48} className="warning-icon" />
              </div>
              <p>Ви дійсно бажаєте видалити товар <strong>"{productToDelete.title}"</strong>?</p>
              <p className="delete-subtext">Цю дію неможливо буде скасувати.</p>
            </div>
            <div className="modal-footer">
              <button onClick={() => setProductToDelete(null)} className="btn btn-secondary">
                Скасувати
              </button>
              <button onClick={handleConfirmDelete} className="btn btn-danger">
                Видалити товар
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
