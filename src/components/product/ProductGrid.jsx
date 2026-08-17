import React from 'react';
import { ProductCard } from './ProductCard';
import { PackageSearch } from 'lucide-react';
import './ProductGrid.css';

export const ProductGrid = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className="empty-catalog glass-panel">
        <PackageSearch size={48} className="empty-icon" />
        <h3>Товарів не знайдено</h3>
        <p>Спробуйте змінити параметри пошуку або обрати іншу категорію.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
