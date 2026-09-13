import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { toggleWishlist } from '../redux/slices/wishlistSlice';
import { toggleCompareItem } from '../redux/slices/comparisonSlice';
import { setRFQModalOpen, setSelectedProductForRFQ } from '../redux/slices/communitySlice';
import ProductReviewsQA from '../components/ProductReviewsQA';
import ProductCard from '../components/ProductCard';
import { 
  ShoppingCart, 
  Heart, 
  SlidersHorizontal, 
  Truck, 
  ShieldCheck, 
  FileText, 
  ChevronRight, 
  Home, 
  CheckCircle2, 
  Layers, 
  Sparkles,
  Building2,
  AlertTriangle,
  ArrowLeft,
  Share2
} from 'lucide-react';
import { API_URL } from '../config/api';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const { items: compareItems } = useSelector((state) => state.comparison);

  const [qty, setQty] = useState(1);
  const [copied, setCopied] = useState(false);
  const [isAddedToast, setIsAddedToast] = useState(false);

  // Pincode lookup state
  const [pincode, setPincode] = useState('560100');
  const [shippingInfo, setShippingInfo] = useState({
    checked: true,
    serviceable: true,
    transitDays: '1-2 Days',
    courierPartner: 'Delhivery Surface Express',
    message: 'Express delivery available to Bengaluru, KA'
  });
  const [isCheckingPin, setIsCheckingPin] = useState(false);

  // Find product by id or sku
  const product = products.find(p => p._id === id || p.sku === id) || products[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!product) {
    return (
      <div className="robu-container" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <p style={{ color: 'var(--robu-text-muted)', margin: '12px 0 24px' }}>The component you are looking for may be discontinued or unavailable.</p>
        <Link to="/" style={{ padding: '10px 20px', backgroundColor: 'var(--robu-primary-orange)', color: '#FFFFFF', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>
          Back to Storefront
        </Link>
      </div>
    );
  }

  const available = product.stockOnHand - (product.stockReserved || 0);
  const isWishlisted = wishlistItems.some(i => i._id === product._id || i.sku === product.sku);
  const isComparing = compareItems.some(i => i._id === product._id);

  const specEntries = product.specs instanceof Map 
    ? Array.from(product.specs.entries())
    : Object.entries(product.specs || {});

  // Tiered bulk pricing calculation
  const tier1Price = product.price;
  const tier2Price = Math.round(product.price * 0.90);
  const tier3Price = Math.round(product.price * 0.80);

  // Price calculations
  const gstRate = product.gstRate || 0.18;
  const basePrice = Math.round(product.price / (1 + gstRate));
  const gstAmount = product.price - basePrice;

  const handleAddToCart = () => {
    if (available <= 0) return;
    dispatch(addToCart({ product, quantity: qty }));
    setIsAddedToast(true);
    setTimeout(() => setIsAddedToast(false), 2000);
  };

  const handleBuyNow = () => {
    if (available <= 0) return;
    dispatch(addToCart({ product, quantity: qty }));
    navigate('/checkout');
  };

  const handleDatasheetClick = () => {
    if (product.datasheetUrl && product.datasheetUrl.startsWith('http')) {
      window.open(product.datasheetUrl, '_blank');
    } else {
      alert(`Opening technical datasheet for ${product.sku}.\nManufacturer: ${product.brand}\nCompliance: CE, RoHS, WEEE Verified.`);
    }
  };

  const handleOpenRFQ = () => {
    dispatch(setSelectedProductForRFQ(product));
    dispatch(setRFQModalOpen(true));
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCheckPincode = async () => {
    if (!pincode || pincode.trim().length !== 6) {
      alert('Please enter a valid 6-digit Indian PIN code.');
      return;
    }
    setIsCheckingPin(true);
    try {
      const res = await fetch(`${API_URL}/api/shipping/check-pincode`, {
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

  // Related products from same category
  const relatedProducts = products
    .filter(p => p._id !== product._id && (p.category === product.category || p.brand === product.brand))
    .slice(0, 4);

  return (
    <main style={{ flex: 1, backgroundColor: 'var(--robu-bg-body)', paddingBottom: '60px' }}>
      {/* Breadcrumbs */}
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--robu-border)', padding: '10px 0' }}>
        <div className="robu-container" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--robu-text-muted)' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--robu-text-body)', textDecoration: 'none' }}>
            <Home size={14} />
            <span>Home</span>
          </Link>
          <ChevronRight size={14} />
          <Link to={`/category/${product.category || 'microcontrollers'}`} style={{ color: 'var(--robu-text-body)', textDecoration: 'none', textTransform: 'capitalize' }}>
            {product.category ? product.category.replace(/-/g, ' ') : 'Category'}
          </Link>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--robu-text-dark)', fontWeight: 600, maxWidth: '320px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {product.title}
          </span>
        </div>
      </div>

      <div className="robu-container" style={{ marginTop: '24px' }}>
        {/* Back Link */}
        <button 
          onClick={() => navigate(-1)} 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px', 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer', 
            fontSize: '13px', 
            fontWeight: 600, 
            color: 'var(--robu-text-muted)',
            marginBottom: '16px'
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to Catalog</span>
        </button>

        {/* Main Product Card */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid var(--robu-border)',
          boxShadow: 'var(--robu-shadow-sm)',
          padding: '32px',
          display: 'grid',
          gridTemplateColumns: '460px 1fr',
          gap: '40px',
          alignItems: 'start'
        }}>
          {/* Left Column: Image & Badges */}
          <div>
            <div style={{
              height: '380px',
              backgroundColor: '#F8FAFC',
              borderRadius: '12px',
              border: '1px solid var(--robu-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <img 
                src={product.image || '/assets/images/arduino_uno_r4.jpg'} 
                alt={product.title} 
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                onError={(e) => { e.target.src = '/assets/images/arduino_uno_r4.jpg'; }}
              />

              {/* Verified Tag */}
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                backgroundColor: '#ECFDF5',
                color: '#047857',
                border: '1px solid #A7F3D0',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <ShieldCheck size={14} />
                <span>100% Genuine Certified</span>
              </div>
            </div>

            {/* Quick Actions Under Image */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
              <button 
                onClick={() => dispatch(toggleWishlist(product))}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid var(--robu-border)',
                  backgroundColor: isWishlisted ? 'var(--robu-orange-light)' : '#FFFFFF',
                  color: isWishlisted ? 'var(--robu-primary-orange)' : 'var(--robu-text-dark)',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: 600
                }}
              >
                <Heart size={16} fill={isWishlisted ? 'var(--robu-primary-orange)' : 'none'} />
                <span>{isWishlisted ? 'In Wishlist' : 'Add to Wishlist'}</span>
              </button>

              <button 
                onClick={() => dispatch(toggleCompareItem(product))}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid var(--robu-border)',
                  backgroundColor: isComparing ? 'var(--robu-purple-light)' : '#FFFFFF',
                  color: isComparing ? 'var(--robu-purple)' : 'var(--robu-text-dark)',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: 600
                }}
              >
                <SlidersHorizontal size={16} />
                <span>{isComparing ? 'Comparing' : 'Compare Specs'}</span>
              </button>

              <button 
                onClick={handleShare}
                title="Share link"
                style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid var(--robu-border)',
                  backgroundColor: '#FFFFFF',
                  color: 'var(--robu-text-dark)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Share2 size={16} />
              </button>
            </div>
            {copied && (
              <div style={{ fontSize: '12px', color: '#047857', textAlign: 'center', marginTop: '6px' }}>
                URL copied to clipboard!
              </div>
            )}
          </div>

          {/* Right Column: Title, Pricing, Stock, Order Controls */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ backgroundColor: '#F1F5F9', color: '#475569', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                {product.brand}
              </span>
              <span style={{ fontSize: '12px', color: 'var(--robu-text-muted)' }}>
                SKU: <strong>{product.sku}</strong>
              </span>
              {product.hsnCode && (
                <span style={{ fontSize: '12px', color: 'var(--robu-text-muted)' }}>
                  | HSN: <strong>{product.hsnCode}</strong>
                </span>
              )}
            </div>

            <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--robu-text-heading)', margin: '0 0 16px', lineHeight: '1.3' }}>
              {product.title}
            </h1>

            {/* Price Row */}
            <div style={{
              backgroundColor: '#F8FAFC',
              borderRadius: '12px',
              padding: '16px 20px',
              marginBottom: '20px',
              border: '1px solid var(--robu-border)'
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                <span style={{ fontSize: '32px', fontWeight: 800, color: 'var(--robu-primary-orange)' }}>
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span style={{ fontSize: '14px', color: 'var(--robu-text-muted)', textDecoration: 'line-through' }}>
                  ₹{Math.round(product.price * 1.25).toLocaleString('en-IN')}
                </span>
                <span style={{ backgroundColor: '#DEF7EC', color: '#03543F', fontSize: '12px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px' }}>
                  Save 20%
                </span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--robu-text-muted)', marginTop: '4px' }}>
                Price includes 18% GST (Base: ₹{basePrice} + GST: ₹{gstAmount})
              </div>
            </div>

            {/* Stock Availability */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              {available > 0 ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#059669', fontSize: '14px', fontWeight: 700 }}>
                  <CheckCircle2 size={18} />
                  <span>In Stock ({available} units available in {product.warehouse || 'WH-BLR-01'})</span>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#DC2626', fontSize: '14px', fontWeight: 700 }}>
                  <AlertTriangle size={18} />
                  <span>Currently Out of Stock</span>
                </div>
              )}
            </div>

            {/* Tiered Bulk Pricing Table */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--robu-text-heading)', marginBottom: '8px' }}>
                Tiered Volume Discount (Per Unit):
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                <div style={{ padding: '8px', borderRadius: '8px', border: '1px solid var(--robu-border)', textAlign: 'center', backgroundColor: '#FFFFFF' }}>
                  <div style={{ fontSize: '11px', color: 'var(--robu-text-muted)' }}>1 - 9 pcs</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--robu-text-dark)' }}>₹{tier1Price}</div>
                </div>
                <div style={{ padding: '8px', borderRadius: '8px', border: '1px solid var(--robu-border)', textAlign: 'center', backgroundColor: '#FFFFFF' }}>
                  <div style={{ fontSize: '11px', color: 'var(--robu-text-muted)' }}>10 - 49 pcs (10% off)</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--robu-primary-orange)' }}>₹{tier2Price}</div>
                </div>
                <div style={{ padding: '8px', borderRadius: '8px', border: '1px solid var(--robu-border)', textAlign: 'center', backgroundColor: '#FFFFFF' }}>
                  <div style={{ fontSize: '11px', color: 'var(--robu-text-muted)' }}>50+ pcs (20% off)</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--robu-purple)' }}>₹{tier3Price}</div>
                </div>
              </div>
            </div>

            {/* Quantity Stepper & Buttons */}
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid var(--robu-border)',
                borderRadius: '8px',
                overflow: 'hidden'
              }}>
                <button 
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  style={{ width: '36px', height: '42px', background: '#F8FAFC', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: 700 }}
                >-</button>
                <input 
                  type="number"
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                  style={{ width: '48px', height: '42px', border: 'none', textAlign: 'center', fontWeight: 700, fontSize: '14px' }}
                />
                <button 
                  onClick={() => setQty(qty + 1)}
                  style={{ width: '36px', height: '42px', background: '#F8FAFC', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: 700 }}
                >+</button>
              </div>

              <button 
                onClick={handleAddToCart}
                disabled={available <= 0}
                style={{
                  flex: 1,
                  height: '44px',
                  backgroundColor: available <= 0 ? '#94A3B8' : 'var(--robu-primary-orange)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: available <= 0 ? 'not-allowed' : 'pointer'
                }}
              >
                <ShoppingCart size={18} />
                <span>Add to Cart</span>
              </button>

              <button 
                onClick={handleBuyNow}
                disabled={available <= 0}
                style={{
                  flex: 1,
                  height: '44px',
                  backgroundColor: available <= 0 ? '#94A3B8' : '#1E1B4B',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: available <= 0 ? 'not-allowed' : 'pointer'
                }}
              >
                Buy Now
              </button>
            </div>

            {isAddedToast && (
              <div style={{
                backgroundColor: '#ECFDF5',
                color: '#065F46',
                border: '1px solid #A7F3D0',
                padding: '10px 14px',
                borderRadius: '8px',
                marginBottom: '16px',
                fontSize: '13px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span>Added {qty} unit(s) to cart successfully!</span>
                <Link to="/cart" style={{ color: 'var(--robu-primary-orange)', textDecoration: 'underline' }}>
                  View Cart
                </Link>
              </div>
            )}

            {/* Pincode & Express Delivery Checker */}
            <div style={{
              backgroundColor: '#F8FAFC',
              borderRadius: '10px',
              border: '1px solid var(--robu-border)',
              padding: '16px',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 700, color: 'var(--robu-text-heading)', marginBottom: '10px' }}>
                <Truck size={16} color="var(--robu-primary-orange)" />
                <span>Estimate Indian Pincode Delivery:</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input 
                  type="text" 
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit Pincode"
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid var(--robu-border)',
                    fontSize: '13px'
                  }}
                />
                <button 
                  onClick={handleCheckPincode}
                  disabled={isCheckingPin}
                  style={{
                    backgroundColor: '#1E1B4B',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0 16px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {isCheckingPin ? 'Checking...' : 'Check'}
                </button>
              </div>
              {shippingInfo.checked && (
                <div style={{ marginTop: '8px', fontSize: '12px', color: shippingInfo.serviceable ? '#047857' : '#DC2626' }}>
                  {shippingInfo.message} ({shippingInfo.courierPartner})
                </div>
              )}
            </div>

            {/* Bulk / B2B RFQ Link & Datasheet */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={handleOpenRFQ}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '9px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: '#F8FAFC',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  color: 'var(--robu-text-body)'
                }}
              >
                <Building2 size={15} color="var(--robu-purple)" />
                <span>Request B2B Bulk Quote</span>
              </button>

              <button 
                onClick={handleDatasheetClick}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '9px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: '#F8FAFC',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  color: 'var(--robu-text-body)'
                }}
              >
                <FileText size={15} color="var(--robu-primary-orange)" />
                <span>View Datasheet PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* Product Description & Technical Specifications */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid var(--robu-border)',
          boxShadow: 'var(--robu-shadow-sm)',
          padding: '32px',
          marginTop: '32px'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--robu-text-heading)', marginBottom: '14px' }}>
            Product Overview & Description
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--robu-text-body)', lineHeight: '1.7', margin: '0 0 24px' }}>
            {product.description || 'Enterprise-grade robotics and electronics component engineered for reliable performance in automation, IoT, and embedded prototyping projects.'}
          </p>

          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--robu-text-heading)', marginBottom: '14px' }}>
            Engineering Technical Specifications
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '12px'
          }}>
            {specEntries.map(([key, value]) => (
              <div key={key} style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: '8px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                fontSize: '13px'
              }}>
                <span style={{ color: 'var(--robu-text-muted)', fontWeight: 500 }}>{key}</span>
                <span style={{ color: 'var(--robu-text-dark)', fontWeight: 700 }}>{String(value)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Reviews & Technical Q&A */}
        <div style={{ marginTop: '32px' }}>
          <ProductReviewsQA product={product} />
        </div>

        {/* Related Components */}
        {relatedProducts.length > 0 && (
          <div style={{ marginTop: '40px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--robu-text-heading)', marginBottom: '16px' }}>
              Related Hardware Recommendations
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
              gap: '16px'
            }}>
              {relatedProducts.map(p => (
                <ProductCard key={p._id || p.sku} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
