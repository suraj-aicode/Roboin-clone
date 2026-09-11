import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveCategory } from '../redux/slices/productSlice';
import { CATEGORIES_METADATA } from '../data/categoryData';
import ProductCard from './ProductCard';
import { 
  ChevronRight, 
  Home, 
  Filter, 
  LayoutGrid, 
  List, 
  RotateCcw, 
  CheckCircle2, 
  Search,
  BookOpen,
  Sparkles,
  SlidersHorizontal,
  ShoppingCart,
  Heart
} from 'lucide-react';
import { addToCart } from '../redux/slices/cartSlice';
import { setSelectedProduct } from '../redux/slices/productSlice';
import { toggleWishlist } from '../redux/slices/wishlistSlice';
import { toggleCompareItem } from '../redux/slices/comparisonSlice';

export default function CategoryPage({ categorySlug }) {
  const dispatch = useDispatch();
  const categoryMeta = CATEGORIES_METADATA[categorySlug] || CATEGORIES_METADATA['drone-parts'];
  const Icon = categoryMeta.icon;

  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const { items: compareItems } = useSelector((state) => state.comparison);

  // Filter & UI States
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceMax, setPriceMax] = useState(100000);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [sortOption, setSortOption] = useState('featured');
  const [localSearch, setLocalSearch] = useState('');

  // Handle Brand Toggle
  const toggleBrand = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  // Reset Filters
  const resetFilters = () => {
    setSelectedSubcategory('all');
    setSelectedBrands([]);
    setInStockOnly(false);
    setPriceMax(100000);
    setLocalSearch('');
    setSortOption('featured');
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    let list = categoryMeta.products || [];

    // Subcategory Filter
    if (selectedSubcategory !== 'all') {
      list = list.filter(p => p.subcategory === selectedSubcategory);
    }

    // Brands Filter
    if (selectedBrands.length > 0) {
      list = list.filter(p => selectedBrands.includes(p.brand));
    }

    // Stock Filter
    if (inStockOnly) {
      list = list.filter(p => (p.stockOnHand - (p.stockReserved || 0)) > 0);
    }

    // Price Filter
    list = list.filter(p => p.price <= priceMax);

    // Local Search
    if (localSearch.trim()) {
      const q = localSearch.toLowerCase();
      list = list.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.sku.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
      );
    }

    // Sorting
    return [...list].sort((a, b) => {
      if (sortOption === 'price-low') return a.price - b.price;
      if (sortOption === 'price-high') return b.price - a.price;
      if (sortOption === 'rating') return (b.rating || 5) - (a.rating || 5);
      return 0; // featured
    });
  }, [categoryMeta, selectedSubcategory, selectedBrands, inStockOnly, priceMax, localSearch, sortOption]);

  return (
    <div className="robu-container" style={{ paddingTop: '16px', paddingBottom: '48px' }}>
      {/* 1. Breadcrumbs */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '13px',
        color: 'var(--robu-text-muted)',
        marginBottom: '16px'
      }}>
        <button 
          onClick={() => dispatch(setActiveCategory('all'))}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            color: 'var(--robu-text-dark)',
            fontWeight: 600
          }}
        >
          <Home size={14} color="var(--robu-primary-orange)" />
          <span>Home</span>
        </button>

        <ChevronRight size={14} />

        <button 
          onClick={() => dispatch(setActiveCategory('all'))}
          style={{ color: 'var(--robu-text-dark)', fontWeight: 500 }}
        >
          Shop
        </button>

        <ChevronRight size={14} />

        <span style={{ color: 'var(--robu-primary-orange)', fontWeight: 700 }}>
          {categoryMeta.title}
        </span>

        {selectedSubcategory !== 'all' && (
          <>
            <ChevronRight size={14} />
            <span style={{ color: 'var(--robu-text-heading)', fontWeight: 600 }}>
              {selectedSubcategory}
            </span>
          </>
        )}
      </nav>

      {/* 2. Category Header Hero Banner */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid var(--robu-border)',
        padding: '28px 32px',
        boxShadow: 'var(--robu-shadow-sm)',
        marginBottom: '24px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle decorative accent circle */}
        <div style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          backgroundColor: 'var(--robu-bg-top)',
          zIndex: 0,
          opacity: 0.8
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '10px' }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '12px',
              backgroundColor: 'var(--robu-primary-orange)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(239, 65, 35, 0.3)'
            }}>
              <Icon size={28} />
            </div>

            <div>
              <h1 style={{
                fontSize: '28px',
                fontWeight: 800,
                color: 'var(--robu-text-heading)',
                fontFamily: 'var(--font-robu-heading)',
                lineHeight: 1.2
              }}>
                {categoryMeta.title}
              </h1>
              <div style={{
                fontSize: '13.5px',
                fontWeight: 600,
                color: 'var(--robu-primary-orange)'
              }}>
                {categoryMeta.tagline}
              </div>
            </div>
          </div>

          <p style={{
            fontSize: '13.5px',
            color: 'var(--robu-text-muted)',
            maxWidth: '880px',
            lineHeight: 1.6,
            marginBottom: '20px'
          }}>
            {categoryMeta.description}
          </p>

          {/* Subcategories Horizontal Pill Carousel */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--robu-text-heading)', textTransform: 'uppercase', marginBottom: '10px' }}>
              Browse by Subcategory
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              overflowX: 'auto',
              scrollbarWidth: 'none',
              paddingBottom: '4px'
            }}>
              <button
                onClick={() => setSelectedSubcategory('all')}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  backgroundColor: selectedSubcategory === 'all' ? 'var(--robu-primary-orange)' : 'var(--robu-bg-top)',
                  color: selectedSubcategory === 'all' ? '#FFFFFF' : 'var(--robu-text-dark)',
                  border: `1px solid ${selectedSubcategory === 'all' ? 'var(--robu-primary-orange)' : 'var(--robu-border)'}`,
                  transition: 'all 0.2s'
                }}
              >
                All {categoryMeta.title} ({categoryMeta.products.length})
              </button>

              {categoryMeta.subcategories.map(sub => {
                const count = categoryMeta.products.filter(p => p.subcategory === sub).length;
                const isSelected = selectedSubcategory === sub;
                return (
                  <button
                    key={sub}
                    onClick={() => setSelectedSubcategory(sub)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '20px',
                      fontSize: '12.5px',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                      cursor: 'pointer',
                      backgroundColor: isSelected ? 'var(--robu-primary-orange)' : 'var(--robu-bg-top)',
                      color: isSelected ? '#FFFFFF' : 'var(--robu-text-dark)',
                      border: `1px solid ${isSelected ? 'var(--robu-primary-orange)' : 'var(--robu-border)'}`,
                      transition: 'all 0.2s'
                    }}
                  >
                    {sub} {count > 0 ? `(${count})` : ''}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Catalog Area (Left Filter Sidebar + Right Product Listing) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '270px 1fr',
        gap: '24px',
        alignItems: 'start'
      }}>
        {/* Left Filter Sidebar */}
        <aside style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          border: '1px solid var(--robu-border)',
          padding: '20px',
          boxShadow: 'var(--robu-shadow-sm)',
          position: 'sticky',
          top: '64px'
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '14px',
            borderBottom: '1px solid var(--robu-border)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '15px', color: 'var(--robu-text-heading)' }}>
              <Filter size={16} color="var(--robu-purple)" />
              <span>Filters</span>
            </div>

            <button
              onClick={resetFilters}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '11.5px',
                color: 'var(--robu-primary-orange)',
                fontWeight: 600,
                cursor: 'pointer'
              }}
              title="Reset all filters"
            >
              <RotateCcw size={12} />
              <span>Reset</span>
            </button>
          </div>

          {/* In-Category Search */}
          <div style={{ padding: '14px 0', borderBottom: '1px solid var(--robu-border-light)' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'var(--robu-bg-top)',
              borderRadius: '6px',
              border: '1px solid var(--robu-border)',
              padding: '6px 10px',
              gap: '6px'
            }}>
              <Search size={14} color="var(--robu-text-muted)" />
              <input
                type="text"
                placeholder={`Search in ${categoryMeta.title}...`}
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                style={{
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'transparent',
                  fontSize: '12.5px',
                  width: '100%',
                  color: 'var(--robu-text-heading)'
                }}
              />
            </div>
          </div>

          {/* Subcategories Filter List */}
          <div style={{ padding: '16px 0', borderBottom: '1px solid var(--robu-border-light)' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--robu-text-heading)', marginBottom: '10px' }}>
              Subcategories
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '180px', overflowY: 'auto' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: 'var(--robu-text-body)', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="subcat_filter"
                  checked={selectedSubcategory === 'all'}
                  onChange={() => setSelectedSubcategory('all')}
                  style={{ accentColor: 'var(--robu-primary-orange)' }}
                />
                <span>All Subcategories</span>
              </label>

              {categoryMeta.subcategories.map(sub => (
                <label key={sub} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: 'var(--robu-text-body)', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="subcat_filter"
                    checked={selectedSubcategory === sub}
                    onChange={() => setSelectedSubcategory(sub)}
                    style={{ accentColor: 'var(--robu-primary-orange)' }}
                  />
                  <span>{sub}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Brands Filter */}
          <div style={{ padding: '16px 0', borderBottom: '1px solid var(--robu-border-light)' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--robu-text-heading)', marginBottom: '10px' }}>
              Authorized Brands
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '180px', overflowY: 'auto' }}>
              {categoryMeta.brands.map(b => (
                <label key={b} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: 'var(--robu-text-body)', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(b)}
                    onChange={() => toggleBrand(b)}
                    style={{ accentColor: 'var(--robu-primary-orange)' }}
                  />
                  <span>{b}</span>
                </label>
              ))}
            </div>
          </div>

          {/* In-Stock Only */}
          <div style={{ padding: '16px 0', borderBottom: '1px solid var(--robu-border-light)' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--robu-text-body)', cursor: 'pointer', fontWeight: 600 }}>
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                style={{ accentColor: 'var(--robu-primary-orange)' }}
              />
              <span>In Stock Only</span>
            </label>
          </div>

          {/* Price Range */}
          <div style={{ paddingTop: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', fontWeight: 700, color: 'var(--robu-text-heading)', marginBottom: '8px' }}>
              <span>Max Price</span>
              <span style={{ color: 'var(--robu-primary-orange)', fontWeight: 800 }}>
                {priceMax >= 100000 ? 'All' : `₹${priceMax.toLocaleString('en-IN')}`}
              </span>
            </div>
            <input
              type="range"
              min="100"
              max="100000"
              step="500"
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--robu-primary-orange)' }}
            />
          </div>
        </aside>

        {/* Right Product Listing Area */}
        <section>
          {/* Header Controls Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            border: '1px solid var(--robu-border)',
            padding: '10px 18px',
            marginBottom: '18px',
            boxShadow: 'var(--robu-shadow-sm)',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ fontSize: '13.5px', color: 'var(--robu-text-muted)' }}>
              Showing <strong style={{ color: 'var(--robu-text-heading)' }}>{filteredProducts.length}</strong> items in <strong>{categoryMeta.title}</strong>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {/* Grid / List View Toggle */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'var(--robu-bg-top)',
                borderRadius: '6px',
                padding: '2px',
                border: '1px solid var(--robu-border)'
              }}>
                <button
                  onClick={() => setViewMode('grid')}
                  style={{
                    padding: '5px 8px',
                    borderRadius: '4px',
                    backgroundColor: viewMode === 'grid' ? '#FFFFFF' : 'transparent',
                    color: viewMode === 'grid' ? 'var(--robu-primary-orange)' : 'var(--robu-text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    boxShadow: viewMode === 'grid' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                  }}
                  title="Grid View"
                >
                  <LayoutGrid size={16} />
                </button>

                <button
                  onClick={() => setViewMode('list')}
                  style={{
                    padding: '5px 8px',
                    borderRadius: '4px',
                    backgroundColor: viewMode === 'list' ? '#FFFFFF' : 'transparent',
                    color: viewMode === 'list' ? 'var(--robu-primary-orange)' : 'var(--robu-text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    boxShadow: viewMode === 'list' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                  }}
                  title="List View"
                >
                  <List size={16} />
                </button>
              </div>

              {/* Sort Dropdown */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <label style={{ fontSize: '13px', color: 'var(--robu-text-muted)', fontWeight: 600 }}>Sort:</label>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  style={{
                    backgroundColor: 'var(--robu-bg-top)',
                    border: '1px solid var(--robu-border)',
                    borderRadius: '6px',
                    padding: '5px 10px',
                    fontSize: '13px',
                    color: 'var(--robu-text-dark)',
                    cursor: 'pointer'
                  }}
                >
                  <option value="featured">Featured / Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                </select>
              </div>
            </div>
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 ? (
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid var(--robu-border)',
              padding: '60px 20px',
              textAlign: 'center'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--robu-text-heading)', marginBottom: '8px' }}>
                No components found matching current filters
              </h3>
              <p style={{ fontSize: '13.5px', color: 'var(--robu-text-muted)', marginBottom: '18px' }}>
                Try clearing selected brand filters or widening your price threshold.
              </p>
              <button
                onClick={resetFilters}
                className="robu-btn-orange"
                style={{ fontSize: '13px' }}
              >
                Clear All Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            /* Grid View (3 or 4 cards per row) */
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '18px'
            }}>
              {filteredProducts.map(prod => (
                <ProductCard key={prod._id || prod.sku} product={prod} />
              ))}
            </div>
          ) : (
            /* List View (Detailed horizontal product rows) */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {filteredProducts.map(prod => {
                const available = prod.stockOnHand - (prod.stockReserved || 0);
                const isWishlisted = wishlistItems.some(i => i._id === prod._id || i.sku === prod.sku);
                const isComparing = compareItems.some(i => i._id === prod._id);

                return (
                  <div
                    key={prod._id || prod.sku}
                    className="robu-card-lift"
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '10px',
                      border: '1px solid var(--robu-border)',
                      padding: '16px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '20px',
                      boxShadow: 'var(--robu-shadow-sm)'
                    }}
                  >
                    {/* Image */}
                    <div 
                      onClick={() => dispatch(setSelectedProduct(prod))}
                      style={{
                        width: '120px',
                        height: '110px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        flexShrink: 0
                      }}
                    >
                      <img 
                        src={prod.image} 
                        alt={prod.title}
                        style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                        onError={(e) => { e.currentTarget.src = '/assets/images/arduino_uno_r4.jpg'; }}
                      />
                    </div>

                    {/* Middle Details */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--robu-text-muted)', textTransform: 'uppercase' }}>
                          {prod.brand}
                        </span>
                        <span style={{ fontSize: '11px', color: 'var(--robu-border)' }}>|</span>
                        <span style={{ fontSize: '11px', fontFamily: 'monospace', color: 'var(--robu-text-muted)' }}>
                          {prod.sku}
                        </span>
                      </div>

                      <h4 
                        onClick={() => dispatch(setSelectedProduct(prod))}
                        style={{
                          fontSize: '15px',
                          fontWeight: 700,
                          color: 'var(--robu-text-heading)',
                          cursor: 'pointer',
                          marginBottom: '6px'
                        }}
                      >
                        {prod.title}
                      </h4>

                      {/* Specs tags */}
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
                        {Object.entries(prod.specs || {}).slice(0, 3).map(([k, v], idx) => (
                          <span key={idx} style={{ fontSize: '11px', backgroundColor: 'var(--robu-bg-top)', padding: '2px 8px', borderRadius: '4px', border: '1px solid var(--robu-border-light)' }}>
                            <strong>{k}:</strong> {v}
                          </span>
                        ))}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px' }}>
                        {available > 0 ? (
                          <span style={{ color: '#059669', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <CheckCircle2 size={13} />
                            <span>In Stock ({available} units available in Pune/Bangalore Warehouse)</span>
                          </span>
                        ) : (
                          <span style={{ color: '#DC2626', fontWeight: 600 }}>Out of Stock</span>
                        )}
                      </div>
                    </div>

                    {/* Right Pricing & Actions */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      gap: '10px',
                      flexShrink: 0,
                      borderLeft: '1px solid var(--robu-border-light)',
                      paddingLeft: '20px'
                    }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--robu-primary-orange)' }}>
                          ₹{prod.price.toLocaleString('en-IN')}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--robu-text-muted)' }}>
                          (Incl. {Math.round((prod.gstRate || 0.18) * 100)}% GST)
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          onClick={() => dispatch(toggleWishlist(prod))}
                          style={{
                            width: '34px',
                            height: '34px',
                            borderRadius: '6px',
                            border: '1px solid var(--robu-border)',
                            backgroundColor: isWishlisted ? 'var(--robu-orange-light)' : '#FFFFFF',
                            color: isWishlisted ? 'var(--robu-primary-orange)' : 'var(--robu-text-muted)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                          title="Wishlist"
                        >
                          <Heart size={15} fill={isWishlisted ? 'var(--robu-primary-orange)' : 'none'} />
                        </button>

                        <button
                          onClick={() => dispatch(toggleCompareItem(prod))}
                          style={{
                            width: '34px',
                            height: '34px',
                            borderRadius: '6px',
                            border: '1px solid var(--robu-border)',
                            backgroundColor: isComparing ? 'var(--robu-purple-light)' : '#FFFFFF',
                            color: isComparing ? 'var(--robu-purple)' : 'var(--robu-text-muted)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                          title="Compare"
                        >
                          <SlidersHorizontal size={15} />
                        </button>

                        <button
                          disabled={available <= 0}
                          onClick={() => dispatch(addToCart({ product: prod, quantity: 1 }))}
                          style={{
                            backgroundColor: available <= 0 ? 'var(--robu-border)' : 'var(--robu-primary-orange)',
                            color: '#FFFFFF',
                            borderRadius: '6px',
                            padding: '8px 16px',
                            fontSize: '13px',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            cursor: available <= 0 ? 'not-allowed' : 'pointer'
                          }}
                        >
                          <ShoppingCart size={15} />
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>

      {/* 4. Technical Buyer's Guide & SEO Section */}
      <div style={{
        marginTop: '48px',
        backgroundColor: '#FFFFFF',
        borderRadius: '14px',
        border: '1px solid var(--robu-border)',
        padding: '28px 32px',
        boxShadow: 'var(--robu-shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <BookOpen size={20} color="var(--robu-purple)" />
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--robu-text-heading)' }}>
            {categoryMeta.guide.title}
          </h3>
        </div>

        <p style={{ fontSize: '13.5px', color: 'var(--robu-text-muted)', lineHeight: 1.7, marginBottom: '16px' }}>
          {categoryMeta.guide.text}
        </p>

        <div style={{
          backgroundColor: 'var(--robu-bg-top)',
          borderRadius: '8px',
          padding: '14px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '13px',
          color: 'var(--robu-text-dark)'
        }}>
          <Sparkles size={18} color="var(--robu-primary-orange)" style={{ flexShrink: 0 }} />
          <span>
            Need industrial volume discounts or customized manufacturing for {categoryMeta.title}? Contact our VoltCart B2B engineering team for HSN quotation and tax invoice credit.
          </span>
        </div>
      </div>
    </div>
  );
}
