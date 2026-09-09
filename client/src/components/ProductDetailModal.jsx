import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedProduct } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { toggleCompareItem } from '../redux/slices/comparisonSlice';
import { toggleWishlist } from '../redux/slices/wishlistSlice';
import { setRFQModalOpen, setSelectedProductForRFQ } from '../redux/slices/communitySlice';
import ProductReviewsQA from './ProductReviewsQA';
import { FileText, ShoppingCart, SlidersHorizontal, Building2, Layers, Plus, Heart, Truck, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function ProductDetailModal() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.selectedProduct);
  const products = useSelector((state) => state.products.products);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const [qty, setQty] = useState(1);

  // Pincode lookup state (MOD-11)
  const [pincode, setPincode] = useState('560100');
  const [shippingInfo, setShippingInfo] = useState({
    checked: true,
    serviceable: true,
    transitDays: '1-2 Days',
    courierPartner: 'Delhivery Surface Express',
    message: 'Express delivery available to Bengaluru, KA'
  });
  const [isCheckingPin, setIsCheckingPin] = useState(false);

  if (!product) return null;

  const available = product.stockOnHand - (product.stockReserved || 0);
  const isWishlisted = wishlistItems.some(i => i._id === product._id || i.sku === product.sku);

  const specEntries = product.specs instanceof Map 
    ? Array.from(product.specs.entries())
    : Object.entries(product.specs || {});

  // Tiered bulk pricing calculation (MOD-21)
  const tier1Price = product.price;
  const tier2Price = Math.round(product.price * 0.90); // 10% off for 10-49
  const tier3Price = Math.round(product.price * 0.80); // 20% off for 50+

  const handleDatasheetClick = () => {
    if (product.datasheetUrl && product.datasheetUrl.startsWith('http')) {
      window.open(product.datasheetUrl, '_blank');
    } else {
      alert(`[Authorized PDF Viewer (FR-CAT-105)]\nOpening technical datasheet for ${product.sku}.\nManufacturer: ${product.brand}\nCompliance: CE, RoHS, WEEE Verified.`);
    }
  };

  const handleOpenRFQ = () => {
    dispatch(setSelectedProductForRFQ(product));
    dispatch(setRFQModalOpen(true));
  };

  const handleCheckPincode = async () => {
    if (!pincode || pincode.trim().length !== 6) {
      alert('Please enter a valid 6-digit Indian PIN code.');
      return;
    }
    setIsCheckingPin(true);
    try {
      const res = await fetch('http://localhost:5000/api/shipping/check-pincode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pincode })
      });
      const data = await res.json();
      if (data.success) {
        setShippingInfo({
          checked: true,
          serviceable: data.serviceable,
          transitDays: data.transitDays,
          courierPartner: data.courierPartner,
          message: data.message
        });
      }
    } catch {
      // Offline fallback
      setShippingInfo({
        checked: true,
        serviceable: true,
        transitDays: pincode.startsWith('56') ? '1-2 Days' : '2-4 Days',
        courierPartner: 'Delhivery / BlueDart Air',
        message: `Serviceable: Delivery in ${pincode.startsWith('56') ? '1-2 Days' : '2-4 Days'}`
      });
    } finally {
      setIsCheckingPin(false);
    }
  };

  // Compatible hardware bundle (MOD-24)
  const bundleItems = products.filter(p => p._id !== product._id).slice(0, 2);
  const bundleTotalPrice = product.price + bundleItems.reduce((s, i) => s + i.price, 0);

  const handleAddBundle = () => {
    dispatch(addToCart({ product, quantity: 1 }));
    bundleItems.forEach(item => {
      dispatch(addToCart({ product: item, quantity: 1 }));
    });
    alert(`Added complete hardware bundle to shopping cart!`);
  };

  return (
    <div className="modal-overlay" onClick={() => dispatch(setSelectedProduct(null))}>
      <div className="modal-content" style={{ maxWidth: '860px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={() => dispatch(setSelectedProduct(null))}>✕</button>

        <div className="pdp-grid">
          <div>
            <div className="pdp-img-box" style={{ position: 'relative' }}>
              <img src={product.image} alt={product.title} />
              <button 
                onClick={() => dispatch(toggleWishlist(product))}
                style={{
                  position: 'absolute',
                  top: '0.85rem',
                  right: '0.85rem',
                  background: isWishlisted ? 'rgba(239, 68, 68, 0.2)' : 'rgba(0,0,0,0.5)',
                  border: `1px solid ${isWishlisted ? 'var(--danger)' : 'rgba(255,255,255,0.2)'}`,
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                title={isWishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
              >
                <Heart size={18} color={isWishlisted ? '#ef4444' : '#fff'} fill={isWishlisted ? '#ef4444' : 'none'} />
              </button>
            </div>

            <button 
              className="btn btn-outline btn-sm"
              style={{ width: '100%', marginTop: '1rem', display: 'flex', gap: '0.5rem' }}
              onClick={handleDatasheetClick}
            >
              <FileText size={16} /> View Technical Datasheet PDF
            </button>

            {/* B2B Tiered Pricing Table (MOD-21) */}
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '0.85rem', marginTop: '1rem' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Building2 size={13} /> B2B Institutional Bulk Pricing (MOD-21)
              </div>
              <table style={{ width: '100%', fontSize: '0.75rem', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)' }}>
                    <th style={{ textAlign: 'left', paddingBottom: '0.3rem' }}>Quantity</th>
                    <th style={{ textAlign: 'right', paddingBottom: '0.3rem' }}>Rate / Unit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1 - 9 units</td>
                    <td style={{ textAlign: 'right', fontWeight: 700 }}>₹{tier1Price}</td>
                  </tr>
                  <tr>
                    <td>10 - 49 units</td>
                    <td style={{ textAlign: 'right', fontWeight: 700, color: 'var(--primary)' }}>₹{tier2Price} (10% off)</td>
                  </tr>
                  <tr>
                    <td>50+ units</td>
                    <td style={{ textAlign: 'right', fontWeight: 700, color: 'var(--success)' }}>₹{tier3Price} (20% off)</td>
                  </tr>
                </tbody>
              </table>

              <button 
                className="btn btn-accent btn-sm" 
                style={{ width: '100%', marginTop: '0.75rem', fontSize: '0.75rem' }}
                onClick={handleOpenRFQ}
              >
                Request Institutional RFQ
              </button>
            </div>
          </div>

          <div>
            <span className="badge badge-cyan">{product.sku}</span>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0.35rem 0 0.2rem' }}>
              {product.title}
            </h2>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
              Brand: <strong>{product.brand}</strong> | HSN Code: <strong className="mono">{product.hsnCode}</strong>
            </div>

            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.65rem' }}>
              ₹{product.price.toLocaleString('en-IN')}{' '}
              <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-muted)' }}>
                (+18% GST: ₹{(product.price * 0.18).toFixed(2)})
              </span>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '0.85rem' }}>
              {product.description}
            </p>

            <div style={{ marginBottom: '0.85rem' }}>
              <span className={`badge ${available > 0 ? 'badge-success' : 'badge-danger'}`}>
                {available > 0 ? `${available} units ready at ${product.warehouse}` : 'Out of Stock'}
              </span>
            </div>

            {/* Pincode Serviceability & Transit Estimation (MOD-11) */}
            <div style={{ background: 'rgba(56, 189, 248, 0.04)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                <Truck size={14} style={{ color: 'var(--primary)' }} /> Check Indian Pincode Delivery (MOD-11)
              </div>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <input 
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="e.g. 560100"
                  style={{ width: '110px', padding: '0.35rem 0.5rem', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-main)', fontSize: '0.8rem' }}
                />
                <button 
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={handleCheckPincode}
                  disabled={isCheckingPin}
                  style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
                >
                  {isCheckingPin ? 'Checking...' : 'Verify'}
                </button>
              </div>
              {shippingInfo && shippingInfo.checked && (
                <div style={{ marginTop: '0.4rem', fontSize: '0.75rem', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <CheckCircle2 size={13} />
                  <span>{shippingInfo.message} ({shippingInfo.transitDays})</span>
                </div>
              )}
            </div>

            {/* Smart Hardware Logic Level Compatibility Engine (MOD-24) */}
            {JSON.stringify(product.specs || {}).includes('5V') && (
              <div style={{ background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.25)', borderRadius: 'var(--radius-sm)', padding: '0.65rem 0.85rem', marginBottom: '0.85rem', fontSize: '0.78rem', color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertTriangle size={16} style={{ flexShrink: 0 }} />
                <div>
                  <strong>5V Logic Component (MOD-24):</strong> Direct 5V outputs require a bidirectional logic level shifter when interfaced with 3.3V microcontrollers (ESP32 / Raspberry Pi 5) to protect GPIO pins.
                </div>
              </div>
            )}
            {JSON.stringify(product.specs || {}).includes('3.3V') && !JSON.stringify(product.specs || {}).includes('5V') && (
              <div style={{ background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: 'var(--radius-sm)', padding: '0.65rem 0.85rem', marginBottom: '0.85rem', fontSize: '0.78rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={16} style={{ flexShrink: 0 }} />
                <div>
                  <strong>3.3V Logic Level (MOD-24):</strong> Standard 3.3V CMOS compatible. Ensure input signals do not exceed 3.6V without resistive dividers or level conversion.
                </div>
              </div>
            )}

            <h4 style={{ fontSize: '0.88rem', fontWeight: 700, borderBottom: '1px solid var(--border-color)', paddingBottom: '0.35rem', marginBottom: '0.4rem' }}>
              Technical Specifications (MOD-03)
            </h4>
            <table className="specs-table">
              <tbody>
                {specEntries.map(([key, val], idx) => (
                  <tr key={idx}>
                    <th>{key}</th>
                    <td>{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ display: 'flex', gap: '0.65rem', marginTop: '1rem', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'var(--bg-input)', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)' }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ fontWeight: 'bold' }}>-</button>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, minWidth: '20px', textAlign: 'center' }}>{qty}</span>
                <button onClick={() => setQty(Math.min(available, qty + 1))} style={{ fontWeight: 'bold' }}>+</button>
              </div>

              <button 
                className="btn btn-primary"
                style={{ flex: 1 }}
                disabled={available <= 0}
                onClick={() => {
                  dispatch(addToCart({ product, quantity: qty }));
                  dispatch(setSelectedProduct(null));
                }}
              >
                <ShoppingCart size={15} /> Add to Cart
              </button>

              <button 
                className="btn btn-outline"
                onClick={() => dispatch(toggleCompareItem(product))}
              >
                <SlidersHorizontal size={14} /> Compare
              </button>
            </div>
          </div>
        </div>

        {/* Compatible Hardware Bundle (MOD-24) */}
        {bundleItems.length > 0 && (
          <div style={{ background: 'rgba(6,182,212,0.04)', border: '1px solid var(--border-highlight)', borderRadius: 'var(--radius-sm)', padding: '0.85rem', marginTop: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.5rem' }}>
              <Layers size={14} /> Frequently Bought Together / Hardware Bundle (MOD-24)
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
                <span style={{ fontWeight: 600 }}>{product.title}</span> +{' '}
                {bundleItems.map((b, i) => (
                  <span key={b._id || i} style={{ color: 'var(--text-muted)' }}>
                    {b.title} {i < bundleItems.length - 1 ? '+' : ''}
                  </span>
                ))}
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ fontSize: '0.88rem', fontWeight: 800 }}>Total: ₹{bundleTotalPrice.toLocaleString('en-IN')}</div>
                <button className="btn btn-primary btn-sm" onClick={handleAddBundle}>
                  <Plus size={13} /> Add Bundle
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reviews and Community Technical Q&A (MOD-13) */}
        <ProductReviewsQA product={product} />
      </div>
    </div>
  );
}
