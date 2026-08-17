import React from 'react';
import { PRODUCT_CATEGORIES } from '../../data/mockProducts';
import './ProductFilter.css';

export const ProductFilter = ({ 
  searchTerm, 
  onSearchChange, 
  selectedCategory, 
  onCategoryChange,
  sortBy,
  onSortChange,
  onReset
}) => {
  return (
    <div className="filter-bar">
      <div className="search-box">
        <input 
          type="text" 
          placeholder="Пошук товарів..." 
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="form-input search-input"
        />
      </div>

      <div className="filter-controls">
        <select 
          value={selectedCategory} 
          onChange={(e) => onCategoryChange(e.target.value)}
          className="form-select filter-select"
        >
          {PRODUCT_CATEGORIES.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <select 
          value={sortBy} 
          onChange={(e) => onSortChange(e.target.value)}
          className="form-select filter-select"
        >
          <option value="default">За умовчанням</option>
          <option value="price-asc">Спочатку дешевші</option>
          <option value="price-desc">Спочатку дорожчі</option>
          <option value="rating">За рейтингом</option>
          <option value="name">За назвою (А-Я)</option>
        </select>

        {(searchTerm || selectedCategory !== 'Усі категорії' || sortBy !== 'default') && (
          <button onClick={onReset} className="btn btn-secondary reset-btn">
            Скинути
          </button>
        )}
      </div>
    </div>
  );
};
