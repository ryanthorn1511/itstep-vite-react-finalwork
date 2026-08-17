import React, { useState, useEffect } from 'react';
import { X, Save, Plus } from 'lucide-react';
import { PRODUCT_CATEGORIES } from '../../data/mockProducts';
import './ProductFormModal.css';

export const ProductFormModal = ({ isOpen, onClose, onSave, productToEdit }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: PRODUCT_CATEGORIES[1] || 'Смартфони',
    price: '',
    oldPrice: '',
    stockCount: '10',
    image: '',
    description: '',
    isNew: false,
    isPopular: false
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        title: productToEdit.title || '',
        category: productToEdit.category || PRODUCT_CATEGORIES[1],
        price: productToEdit.price ? productToEdit.price.toString() : '',
        oldPrice: productToEdit.oldPrice ? productToEdit.oldPrice.toString() : '',
        stockCount: productToEdit.stockCount ? productToEdit.stockCount.toString() : '10',
        image: productToEdit.image || '',
        description: productToEdit.description || '',
        isNew: productToEdit.isNew || false,
        isPopular: productToEdit.isPopular || false
      });
    } else {
      setFormData({
        title: '',
        category: PRODUCT_CATEGORIES[1] || 'Смартфони',
        price: '',
        oldPrice: '',
        stockCount: '10',
        image: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=800&q=80',
        description: '',
        isNew: true,
        isPopular: false
      });
    }
    setErrors({});
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Введіть назву товару';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Назва повинна містити як мінімум 3 символи';
    }

    if (!formData.category) {
      newErrors.category = 'Оберіть категорію';
    }

    if (!formData.price) {
      newErrors.price = 'Введіть ціну товару';
    } else if (isNaN(formData.price) || Number(formData.price) <= 0) {
      newErrors.price = 'Ціна повинна бути додатним числом';
    }

    if (formData.oldPrice && (isNaN(formData.oldPrice) || Number(formData.oldPrice) <= 0)) {
      newErrors.oldPrice = 'Стара ціна повинна бути додатним числом';
    }

    if (!formData.image.trim()) {
      newErrors.image = 'Вкажіть посилання на зображення товару';
    } else if (!formData.image.startsWith('http://') && !formData.image.startsWith('https://')) {
      newErrors.image = 'Посилання повинно починатися з http:// або https://';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Додайте опис товару';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Опис повинен містити не менше 10 символів';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      ...productToEdit,
      title: formData.title.trim(),
      category: formData.category,
      price: Number(formData.price),
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
      stockCount: Number(formData.stockCount) || 10,
      inStock: Number(formData.stockCount) > 0,
      image: formData.image.trim(),
      description: formData.description.trim(),
      isNew: formData.isNew,
      isPopular: formData.isPopular
    };

    onSave(payload);
    onClose();
  };

  const availableCategories = PRODUCT_CATEGORIES.filter(c => c !== 'Усі категорії');

  return (
    <div className="modal-backdrop">
      <div className="modal-content glass-panel">
        <div className="modal-header">
          <h2>{productToEdit ? 'Редагування товару' : 'Додавання нового товару'}</h2>
          <button onClick={onClose} className="btn btn-icon btn-secondary close-btn">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label">Назва товару *</label>
            <input 
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Наприклад: Смартфон Samsung Galaxy S24"
              className={`form-input ${errors.title ? 'is-invalid' : ''}`}
            />
            {errors.title && <span className="form-error">{errors.title}</span>}
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label className="form-label">Категорія *</label>
              <select 
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`form-select ${errors.category ? 'is-invalid' : ''}`}
              >
                {availableCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && <span className="form-error">{errors.category}</span>}
            </div>

            <div className="form-group flex-1">
              <label className="form-label">Кількість на складі</label>
              <input 
                type="number"
                name="stockCount"
                value={formData.stockCount}
                onChange={handleChange}
                placeholder="10"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label className="form-label">Ціна (₴) *</label>
              <input 
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="25000"
                className={`form-input ${errors.price ? 'is-invalid' : ''}`}
              />
              {errors.price && <span className="form-error">{errors.price}</span>}
            </div>

            <div className="form-group flex-1">
              <label className="form-label">Стара ціна (опціонально)</label>
              <input 
                type="number"
                name="oldPrice"
                value={formData.oldPrice}
                onChange={handleChange}
                placeholder="28000"
                className={`form-input ${errors.oldPrice ? 'is-invalid' : ''}`}
              />
              {errors.oldPrice && <span className="form-error">{errors.oldPrice}</span>}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">URL зображення *</label>
            <input 
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/..."
              className={`form-input ${errors.image ? 'is-invalid' : ''}`}
            />
            {errors.image && <span className="form-error">{errors.image}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Опис товару *</label>
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Детальний опис технічних характеристик та особливостей товару..."
              className={`form-textarea ${errors.description ? 'is-invalid' : ''}`}
            />
            {errors.description && <span className="form-error">{errors.description}</span>}
          </div>

          <div className="form-checkbox-row">
            <label className="checkbox-label">
              <input 
                type="checkbox"
                name="isNew"
                checked={formData.isNew}
                onChange={handleChange}
              />
              <span>Позначити як "Новинка"</span>
            </label>

            <label className="checkbox-label">
              <input 
                type="checkbox"
                name="isPopular"
                checked={formData.isPopular}
                onChange={handleChange}
              />
              <span>Позначити як "Хіт продажів"</span>
            </label>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Скасувати
            </button>
            <button type="submit" className="btn btn-primary">
              {productToEdit ? <Save size={18} /> : <Plus size={18} />}
              <span>{productToEdit ? 'Зберегти зміни' : 'Додати товар'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
