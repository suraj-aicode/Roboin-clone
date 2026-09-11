import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setProducts } from './redux/slices/productSlice';
import { setOrders, setAdminView } from './redux/slices/orderSlice';
import { setTutorialsModalOpen } from './redux/slices/communitySlice';
import { ShieldAlert } from 'lucide-react';
import { API_URL } from './config/api';

// 12 Robu.in Exact Rebuilt Components
import Navbar from './components/Navbar';
import HeroCarousel from './components/HeroCarousel';
import ServiceQuickStrip from './components/ServiceQuickStrip';
import ShopByCategory from './components/ShopByCategory';
import ProductCard from './components/ProductCard';
import TutorialsSection from './components/TutorialsSection';
import TrustBadges from './components/TrustBadges';
import OurServicesSection from './components/OurServicesSection';
import BrandMarquee from './components/BrandMarquee';
import BlogSection from './components/BlogSection';
import RobuFooter from './components/RobuFooter';
import RecentlyViewedTray from './components/RecentlyViewedTray';
import CategoryPage from './components/CategoryPage';
import { CATEGORIES_METADATA, ALL_CATALOG_PRODUCTS } from './data/categoryData';

// Functional Modals & Drawers
import ProductDetailModal from './components/ProductDetailModal';
import ComparisonModal from './components/ComparisonModal';
import CartDrawer from './components/CartDrawer';
import CartNotificationToast from './components/CartNotificationToast';
import CheckoutModal from './components/CheckoutModal';
import InvoiceModal from './components/InvoiceModal';
import AdminDashboard from './components/AdminDashboard';
import B2BQuoteModal from './components/B2BQuoteModal';
import SupportTicketModal from './components/SupportTicketModal';
import ReturnModal from './components/ReturnModal';
import TutorialsHubModal from './components/TutorialsHubModal';
import AuthModal from './components/AuthModal';
import WishlistDrawer from './components/WishlistDrawer';
import OrderHistoryModal from './components/OrderHistoryModal';
import CreditNoteModal from './components/CreditNoteModal';
import NotificationDrawer from './components/NotificationDrawer';
import AbandonedCartModal from './components/AbandonedCartModal';

import { Filter, SlidersHorizontal, Sparkles } from 'lucide-react';

// Fallback initial electronics data if server is restarting
const FALLBACK_PRODUCTS = [
  {
    _id: 'prod-001',
    title: 'Arduino Uno R4 WiFi Microcontroller Board',
    sku: 'SKU-ARD-R4-WIFI',
    category: 'microcontrollers',
    brand: 'Arduino',
    price: 2499,
    gstRate: 0.18,
    hsnCode: '85423190',
    stockOnHand: 45,
    stockReserved: 3,
    warehouse: 'WH-BLR-01',
    image: '/assets/images/arduino_uno_r4.jpg',
    description: 'The Arduino Uno R4 WiFi pairs the RA4M1 32-bit ARM Cortex-M4 processor from Renesas with an ESP32-S3 module for Wi-Fi and Bluetooth connectivity, plus an integrated 12x8 LED matrix.',
    specs: {
      'Processor Architecture': 'Renesas RA4M1 (ARM Cortex-M4 @ 48 MHz)',
      'Operating Voltage': '5V DC',
      'Input Voltage (VIN)': '6V - 24V DC',
      'Flash Memory': '256 KB',
      'SRAM': '32 KB',
      'Wireless Connectivity': 'Wi-Fi 802.11 b/g/n + Bluetooth 5.0 (ESP32-S3)',
      'Digital I/O Pins': '14 pins (6 PWM outputs)',
      'Analog Input Pins': '6 channels (14-bit ADC)',
      'LED Matrix': '12x8 Red Matrix'
    },
    datasheetUrl: 'https://docs.arduino.cc/resources/datasheets/ABX00087-datasheet.pdf'
  },
  {
    _id: 'prod-002',
    title: 'Raspberry Pi 5 - 8GB RAM Single Board Computer',
    sku: 'SKU-RPI-5-8GB',
    category: 'single-board-computers',
    brand: 'Raspberry Pi Foundation',
    price: 7999,
    gstRate: 0.18,
    hsnCode: '84713010',
    stockOnHand: 22,
    stockReserved: 2,
    warehouse: 'WH-BLR-01',
    image: '/assets/images/raspberry_pi_5.jpg',
    description: 'Featuring a 64-bit quad-core Arm Cortex-A76 processor running at 2.4GHz, Raspberry Pi 5 delivers a 2-3x increase in CPU performance relative to Raspberry Pi 4.',
    specs: {
      'CPU Architecture': 'Broadcom BCM2712 Quad-core ARM Cortex-A76 @ 2.4GHz',
      'System Memory (RAM)': '8GB LPDDR4X-4267 SDRAM',
      'GPU Video Engine': 'VideoCore VII @ 800MHz (Vulkan 1.2)',
      'Display Connectors': 'Dual 4Kp60 micro-HDMI outputs with HDR',
      'PCIe Expansion': 'PCIe 2.0 x1 interface for NVMe SSD',
      'Wireless Connectivity': 'Dual-band 802.11ac Wi-Fi + Bluetooth 5.0'
    },
    datasheetUrl: 'https://datasheets.raspberrypi.com/rpi5/raspberry-pi-5-product-brief.pdf'
  },
  {
    _id: 'prod-003',
    title: 'ESP32-WROOM-32U Development Board (Dual Core + BLE)',
    sku: 'SKU-ESP32-WROOM-32U',
    category: 'microcontrollers',
    brand: 'Espressif Systems',
    price: 349,
    gstRate: 0.18,
    hsnCode: '85423190',
    stockOnHand: 150,
    stockReserved: 5,
    warehouse: 'WH-DEL-02',
    image: '/assets/images/esp32_dev_board.jpg',
    description: 'Ultra-versatile 32-bit dual-core Tensilica Xtensa LX6 microcontroller with integrated 802.11 b/g/n Wi-Fi and Bluetooth v4.2 BR/EDR & BLE.',
    specs: {
      'Microcontroller Core': 'Xtensa 32-bit LX6 Dual-Core @ 240 MHz',
      'Operating Voltage': '3.3V DC',
      'Internal SRAM': '520 KB',
      'External Flash': '4 MB SPI Flash',
      'Wireless Protocols': '802.11 b/g/n + Bluetooth v4.2 BR/EDR & BLE'
    },
    datasheetUrl: 'https://www.espressif.com/sites/default/files/documentation/esp32-wroom-32d_esp32-wroom-32u_datasheet_en.pdf'
  },
  {
    _id: 'prod-004',
    title: 'L298N Dual H-Bridge High-Power DC Stepper Motor Driver',
    sku: 'SKU-DRV-L298N',
    category: 'motors-drivers',
    brand: 'STMicroelectronics',
    price: 189,
    gstRate: 0.18,
    hsnCode: '85371000',
    stockOnHand: 85,
    stockReserved: 0,
    warehouse: 'WH-DEL-02',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    description: 'High voltage, high current dual full-bridge driver designed to accept standard TTL logic levels and drive inductive loads.',
    specs: {
      'Driver Chipset': 'STMicroelectronics L298N Dual H-Bridge',
      'Motor Voltage Range': '5V to 35V DC',
      'Continuous Output Current': '2A per channel'
    },
    datasheetUrl: 'https://www.st.com/resource/en/datasheet/l298.pdf'
  },
  {
    _id: 'prod-005',
    title: 'HC-SR04 Ultrasonic Distance Sensor Module',
    sku: 'SKU-SNS-HC-SR04',
    category: 'sensors',
    brand: 'SparkFun',
    price: 99,
    gstRate: 0.18,
    hsnCode: '90318000',
    stockOnHand: 220,
    stockReserved: 10,
    warehouse: 'WH-BLR-01',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    description: 'Non-contact ultrasonic range detection module providing 2cm to 400cm measurement capability with 3mm precision.',
    specs: {
      'Operating Voltage': '5V DC',
      'Working Frequency': '40 kHz',
      'Max Range': '400 cm (4 meters)'
    },
    datasheetUrl: 'https://cdn.sparkfun.com/datasheets/Sensors/Proximity/HCSR04.pdf'
  },
  {
    _id: 'prod-006',
    title: '18650 3.7V 2600mAh High-Drain Rechargeable Li-Ion Cell',
    sku: 'SKU-BAT-18650-2600',
    category: 'power-batteries',
    brand: 'Adafruit',
    price: 299,
    gstRate: 0.18,
    hsnCode: '85076000',
    stockOnHand: 310,
    stockReserved: 15,
    warehouse: 'WH-BLR-01',
    image: 'https://images.unsplash.com/photo-1619725002198-6a689b72f41d?auto=format&fit=crop&w=600&q=80',
    description: 'High-drain 18650 Lithium-Ion cylindrical battery with genuine 2600mAh capacity for mobile robotics power packs.',
    specs: {
      'Nominal Voltage': '3.7V DC',
      'Full Charge Cutoff': '4.2V DC',
      'Capacity': '2600 mAh'
    },
    datasheetUrl: 'https://cdn-shop.adafruit.com/product-files/1781/18650_datasheet.pdf'
  }
];

export default function App() {
  const dispatch = useDispatch();
  const { products, activeCategory, searchQuery } = useSelector((state) => state.products);
  const { adminView } = useSelector((state) => state.order);
  const { isTutorialsModalOpen } = useSelector((state) => state.community);
  const { currentRole } = useSelector((state) => state.auth);

  const isAdminUser = ['super_admin', 'admin', 'catalog_manager', 'inventory_manager', 'order_manager', 'support_agent', 'marketing_manager'].includes(currentRole);

  // Auto-protect back-office: if customer or guest, force storefront view
  useEffect(() => {
    if (!isAdminUser && adminView === 'admin') {
      dispatch(setAdminView('storefront'));
    }
  }, [isAdminUser, adminView, dispatch]);

  const [sortOption, setSortOption] = useState('default');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedVoltage, setSelectedVoltage] = useState('all');

  // Fetch initial products and orders from server API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/api/products`);
        const data = await res.json();
        if (data.success && data.data && data.data.length > 0) {
          dispatch(setProducts(data.data));
        } else {
          dispatch(setProducts(ALL_CATALOG_PRODUCTS.length > 0 ? ALL_CATALOG_PRODUCTS : FALLBACK_PRODUCTS));
        }

        const orderRes = await fetch(`${API_URL}/api/orders`);
        const orderData = await orderRes.json();
        if (orderData.success && orderData.data) {
          dispatch(setOrders(orderData.data));
        }
      } catch (err) {
        console.warn('Backend offline or connecting; utilizing local state baseline', err);
        dispatch(setProducts(ALL_CATALOG_PRODUCTS.length > 0 ? ALL_CATALOG_PRODUCTS : FALLBACK_PRODUCTS));
      }
    };

    fetchData();
  }, [dispatch]);

  // Filter products
  const filteredProducts = products.filter(p => {
    // Category filter
    if (activeCategory !== 'cat-all' && activeCategory !== 'all') {
      if (p.category !== activeCategory) return false;
    }
    // Brand filter
    if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) {
      return false;
    }
    // Stock filter
    if (inStockOnly) {
      const avail = p.stockOnHand - (p.stockReserved || 0);
      if (avail <= 0) return false;
    }
    // Operating Voltage Facet Filter
    if (selectedVoltage !== 'all') {
      const specsStr = JSON.stringify(p.specs || {}) + ' ' + (p.description || '');
      if (selectedVoltage === '3.3V' && !specsStr.includes('3.3V')) return false;
      if (selectedVoltage === '5V' && !specsStr.includes('5V')) return false;
      if (selectedVoltage === '12V-24V' && !specsStr.includes('12V') && !specsStr.includes('24V') && !specsStr.includes('35V')) return false;
    }
    // Search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchSku = p.sku.toLowerCase().includes(q);
      const matchBrand = p.brand.toLowerCase().includes(q);
      if (!matchTitle && !matchSku && !matchBrand) return false;
    }
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'price-low') return a.price - b.price;
    if (sortOption === 'price-high') return b.price - a.price;
    if (sortOption === 'rating') return (b.rating || 5) - (a.rating || 5);
    return 0;
  });

  const toggleBrand = (brandName) => {
    setSelectedBrands(prev => 
      prev.includes(brandName) ? prev.filter(b => b !== brandName) : [...prev, brandName]
    );
  };

  const isDedicatedCategoryPage = Boolean(CATEGORIES_METADATA[activeCategory]);

  return (
    <div style={{ backgroundColor: 'var(--robu-bg-body)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 1, 2, 3: Top Utility Bar + Main Header + Sticky Category Navigation */}
      <Navbar />

      {adminView === 'storefront' ? (
        isDedicatedCategoryPage ? (
          <main style={{ flex: 1 }}>
            <CategoryPage categorySlug={activeCategory} />
          </main>
        ) : (
          <main style={{ flex: 1 }}>
            {/* 4. Hero Carousel Section */}
            <HeroCarousel />

          {/* 5. Service Quick Strip */}
          <ServiceQuickStrip />

          {/* 6. Shop by Category Section */}
          <ShopByCategory />

          {/* Featured Hardware Catalog & Filter Section */}
          <div id="robu-catalog-view" className="robu-container robu-section">
            <div className="robu-section-header">
              <h2 className="robu-section-title">
                <Sparkles size={24} color="var(--robu-primary-orange)" />
                <span>Featured Robotics & Electronics Components</span>
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

          {/* 7. Two Minute Tutorials Section */}
          <TutorialsSection />

          {/* 8. Trust Badge Strip */}
          <TrustBadges />

          {/* 9. Our Services Section */}
          <OurServicesSection />

          {/* 10. Brand Logos Section */}
          <BrandMarquee />

          {/* 11. Blog / News Cards Section */}
          <BlogSection />
        </main>
        )
      ) : (
        <main className="robu-container" style={{ margin: '30px auto' }}>
          {isAdminUser ? (
            <AdminDashboard />
          ) : (
            <div style={{
              maxWidth: '620px',
              margin: '60px auto',
              padding: '36px',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #FCA5A5',
              boxShadow: '0 20px 25px -5px rgba(239, 68, 68, 0.1)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#FEE2E2',
                color: '#DC2626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}>
                <ShieldAlert size={32} />
              </div>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#991B1B', marginBottom: '8px' }}>
                Access Restricted (403 Forbidden)
              </h2>
              <p style={{ color: '#64748B', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px' }}>
                Your current account is registered as a <strong>Customer</strong>. Customers have access to storefront shopping, order tracking, and GST tax invoices. Administrative portals are strictly reserved for verified staff and administrators.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button
                  className="robu-btn-primary"
                  onClick={() => dispatch(setAdminView('storefront'))}
                >
                  Return to Storefront
                </button>
              </div>
            </div>
          )}
        </main>
      )}

      {/* Modals & Drawers */}
      <ProductDetailModal />
      <ComparisonModal />
      <CartDrawer />
      <CartNotificationToast />
      <CheckoutModal />
      <InvoiceModal />
      <B2BQuoteModal />
      <SupportTicketModal />
      <ReturnModal />
      <AuthModal />
      <WishlistDrawer />
      <OrderHistoryModal />
      <CreditNoteModal />
      <NotificationDrawer />
      <AbandonedCartModal />
      <TutorialsHubModal 
        isOpen={isTutorialsModalOpen} 
        onClose={() => dispatch(setTutorialsModalOpen(false))} 
      />

      {/* 12. Footer */}
      <RobuFooter />
    </div>
  );
}
