import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HeroCarousel from '../components/HeroCarousel';
import TrustBadges from '../components/TrustBadges';
import ShopByCategory from '../components/ShopByCategory';
import ProductCard from '../components/ProductCard';
import OurServicesSection from '../components/OurServicesSection';
import TutorialsSection from '../components/TutorialsSection';
import BrandMarquee from '../components/BrandMarquee';
import BlogSection from '../components/BlogSection';
import RecentlyViewedTray from '../components/RecentlyViewedTray';
import { Filter } from 'lucide-react';

export default function HomePage() {
  const dispatch = useDispatch();
  const { products, activeCategory, searchQuery } = useSelector((state) => state.products);

  const [sortOption, setSortOption] = useState('default');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedVoltage, setSelectedVoltage] = useState('all');

  const toggleBrand = (brandName) => {
    setSelectedBrands(prev => 
      prev.includes(brandName) ? prev.filter(b => b !== brandName) : [...prev, brandName]
    );
  };

  // Filter products
  const filteredProducts = products.filter(p => {
    if (activeCategory !== 'cat-all' && activeCategory !== 'all') {
      if (p.category !== activeCategory) return false;
    }
    if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) {
      return false;
    }
    if (inStockOnly) {
      const avail = p.stockOnHand - (p.stockReserved || 0);
      if (avail <= 0) return false;
    }
    if (selectedVoltage !== 'all') {
      const specsStr = JSON.stringify(p.specs || {}) + ' ' + (p.description || '');
      if (selectedVoltage === '3.3V' && !specsStr.includes('3.3V')) return false;
      if (selectedVoltage === '5V' && !specsStr.includes('5V')) return false;
      if (selectedVoltage === '12V-24V' && !specsStr.includes('12V') && !specsStr.includes('24V') && !specsStr.includes('35V')) return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchSku = p.sku.toLowerCase().includes(q);
      const matchBrand = p.brand.toLowerCase().includes(q);
      if (!matchTitle && !matchSku && !matchBrand) return false;
    }
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'price-low') return a.price - b.price;
    if (sortOption === 'price-high') return b.price - a.price;
    if (sortOption === 'rating') return (b.rating || 5) - (a.rating || 5);
    return 0;
  });

  return (
    <main style={{ flex: 1 }}>
      {/* 1. Hero 2-Column: Left 4 Quick Services + Right Promotional Banners */}
      <HeroCarousel />

      {/* 2. 3-Feature Value Proposition Strip */}
      <TrustBadges />

      {/* 3. Shop by Category Section */}
      <ShopByCategory />

      {/* 4. Featured Hardware Catalog & Filter Section */}
      <div id="robu-catalog-view" className="robu-container robu-section">
        <div className="robu-section-header">
          <h2 className="robu-section-title">
            <span style={{
              display: 'inline-block',
              width: '6px',
              height: '24px',
              backgroundColor: 'var(--robu-primary-orange)',
              borderRadius: '3px',
              marginRight: '4px'
            }} />
            <span>Featured Components & Hardware</span>
          </h2>
          <div style={{ fontSize: '13px', color: 'var(--robu-text-muted)' }}>
            Showing <strong>{sortedProducts.length}</strong> items
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '260px 1fr',
          gap: '24px',
          alignItems: 'start'
        }}>
          {/* Sidebar Filters */}
          <aside style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid var(--robu-border)',
            padding: '20px',
            boxShadow: 'var(--robu-shadow-sm)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 700,
              fontSize: '15px',
              color: 'var(--robu-text-heading)',
              paddingBottom: '14px',
              borderBottom: '1px solid var(--robu-border)'
            }}>
              <Filter size={16} color="var(--robu-purple)" />
              <span>Filter Catalog</span>
            </div>

            {/* Filter by Brand */}
            <div style={{ padding: '16px 0', borderBottom: '1px solid var(--robu-border-light)' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--robu-text-heading)', marginBottom: '10px' }}>
                Authorized Brands
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['Arduino', 'Raspberry Pi Foundation', 'Espressif Systems', 'STMicroelectronics', 'SparkFun', 'Adafruit'].map(b => (
                  <label key={b} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--robu-text-body)', cursor: 'pointer' }}>
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

            {/* Operating Voltage */}
            <div style={{ padding: '16px 0', borderBottom: '1px solid var(--robu-border-light)' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--robu-text-heading)', marginBottom: '10px' }}>
                Operating Voltage
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { id: 'all', label: 'All Logic Levels' },
                  { id: '3.3V', label: '3.3V Low-Power Logic' },
                  { id: '5V', label: '5V Standard TTL Logic' },
                  { id: '12V-24V', label: '12V - 24V High Voltage' }
                ].map(v => (
                  <label key={v.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--robu-text-body)', cursor: 'pointer' }}>
                    <input 
                      type="radio" 
                      name="voltageFilter"
                      checked={selectedVoltage === v.id}
                      onChange={() => setSelectedVoltage(v.id)}
                      style={{ accentColor: 'var(--robu-purple)' }}
                    />
                    <span>{v.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* In Stock Only */}
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

            {/* GST Compliance Note */}
            <div style={{ paddingTop: '16px', fontSize: '11.5px', color: 'var(--robu-text-muted)', lineHeight: '1.5' }}>
              All prices include GST. Commercial Tax Invoices with HSN and B2B Input Tax Credit (ITC) issued upon dispatch.
            </div>
          </aside>

          {/* Product Grid and Sorting Header */}
          <section>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
              backgroundColor: '#FFFFFF',
              padding: '10px 16px',
              borderRadius: '8px',
              border: '1px solid var(--robu-border)'
            }}>
              <div style={{ fontSize: '13px', color: 'var(--robu-text-muted)' }}>
                Displaying components matching filters
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <label style={{ fontSize: '13px', color: 'var(--robu-text-muted)', fontWeight: 600 }}>Sort By:</label>
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
                  <option value="default">Featured & Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                </select>
              </div>
            </div>

            {sortedProducts.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid var(--robu-border)'
              }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '6px', color: 'var(--robu-text-heading)' }}>
                  No matching components found
                </h3>
                <p style={{ color: 'var(--robu-text-muted)', fontSize: '14px' }}>
                  Try adjusting the brand filters or search terms.
                </p>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
                gap: '16px'
              }}>
                {sortedProducts.map(p => (
                  <ProductCard key={p._id || p.sku} product={p} />
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Recently Viewed Components Tray */}
        <RecentlyViewedTray />
      </div>

      {/* 5. Robu On-Demand Services */}
      <OurServicesSection />

      {/* 6. Two Minute Tutorials Section */}
      <TutorialsSection />

      {/* 7. Brand Logos Section */}
      <BrandMarquee />

      {/* 8. Blog / News Cards Section */}
      <BlogSection />
    </main>
  );
}
