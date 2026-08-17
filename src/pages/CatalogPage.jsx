import React, { useState, useMemo } from 'react';
import { useProducts } from '../context/ProductContext';
import { ProductFilter } from '../components/product/ProductFilter';
import { ProductGrid } from '../components/product/ProductGrid';
import './CatalogPage.css';

export const CatalogPage = () => {
  const { products } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Усі категорії');
  const [sortBy, setSortBy] = useState('default');

  const filteredAndSortedProducts = useMemo(() => {
    return products
      .filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
                              product.description.toLowerCase().includes(searchTerm.toLowerCase().trim());
        const matchesCategory = selectedCategory === 'Усі категорії' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        if (sortBy === 'name') return a.title.localeCompare(b.title, 'uk');
        return 0;
      });
  }, [products, searchTerm, selectedCategory, sortBy]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('Усі категорії');
    setSortBy('default');
  };

  return (
    <div className="catalog-page">
      <div className="catalog-header">
        <h1 className="page-title">Каталог товарів</h1>
        <span className="results-count">Знайдено: {filteredAndSortedProducts.length} позицій</span>
      </div>

      <ProductFilter 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onReset={handleResetFilters}
      />

      <ProductGrid products={filteredAndSortedProducts} />
    </div>
  );
};
