import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { updateQuantity, removeFromCart, clearCart, applyCoupon } from '../redux/slices/cartSlice';
import { 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Truck, 
  CheckCircle2, 
  ShieldCheck, 
  Plus, 
  Minus, 
  ArrowLeft,
  Home,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, appliedCoupon } = useSelector((state) => state.cart);
  const { userState, sellerState } = useSelector((state) => state.auth);

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');

  // Calculations
  const subtotal = items.reduce((sum, i) => sum + (i.product.price * i.quantity), 0);
  const totalItemsCount = items.reduce((sum, i) => sum + i.quantity, 0);

  let discountAmount = 0;
  let shippingFee = subtotal > 999 || subtotal === 0 ? 0 : 99;

  if (appliedCoupon) {
    if (appliedCoupon.type === 'percentage') {
      discountAmount = subtotal * appliedCoupon.value;
    } else if (appliedCoupon.type === 'shipping') {
      shippingFee = 0;
    } else if (appliedCoupon.type === 'fixed') {
      discountAmount = Math.min(subtotal, appliedCoupon.value);
    }
  }

  const discountedSubtotal = Math.max(0, subtotal - discountAmount);
  const isIntrastate = (userState?.trim().toLowerCase() === sellerState?.trim().toLowerCase());
  const gstRate = 0.18;
  const totalGst = discountedSubtotal * gstRate;
  const grandTotal = discountedSubtotal + totalGst + shippingFee;

  // Free shipping threshold (₹999)
  const freeShippingThreshold = 999;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (codeToApply) => {
    const code = (codeToApply || couponCode).trim().toUpperCase();
    if (!code) return;

    if (code === 'ROBO10') {
      if (subtotal < 500) {
        setCouponError('ROBO10 requires minimum order value of ₹500');
        return;
      }
      dispatch(applyCoupon({ code: 'ROBO10', type: 'percentage', value: 0.10, desc: '10% Instant Maker Discount' }));
      setCouponError('');
      setCouponCode('ROBO10');
    } else if (code === 'FREESHIP') {
      dispatch(applyCoupon({ code: 'FREESHIP', type: 'shipping', value: 99, desc: 'Free Delhivery Express Shipping' }));
      setCouponError('');
      setCouponCode('FREESHIP');
    } else {
      setCouponError('Invalid coupon code. Try ROBO10 or FREESHIP');
    }
  };

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
          <span style={{ color: 'var(--robu-primary-orange)', fontWeight: 600 }}>Shopping Cart ({totalItemsCount} items)</span>
        </div>
      </div>

      <div className="robu-container" style={{ marginTop: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--robu-text-heading)', margin: '0 0 20px' }}>
          Your Electronics Shopping Cart
        </h1>

        {items.length === 0 ? (
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid var(--robu-border)',
            padding: '60px 24px',
            textAlign: 'center',
            boxShadow: 'var(--robu-shadow-sm)'
          }}>
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              backgroundColor: '#FFF7ED',
              color: 'var(--robu-primary-orange)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <ShoppingBag size={36} />
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--robu-text-heading)', margin: '0 0 8px' }}>
              Your cart is currently empty
            </h2>
            <p style={{ color: 'var(--robu-text-muted)', fontSize: '14px', maxWidth: '420px', margin: '0 auto 24px' }}>
              Explore our comprehensive range of microcontrollers, single board computers, sensors, and robotics components.
            </p>
            <Link 
              to="/" 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'var(--robu-primary-orange)',
                color: '#FFFFFF',
                padding: '12px 24px',
                borderRadius: '8px',
                fontWeight: 700,
                textDecoration: 'none',
                fontSize: '14px'
              }}
            >
              <ArrowLeft size={16} />
              <span>Explore Products</span>
            </Link>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 380px',
            gap: '24px',
            alignItems: 'start'
          }}>
            {/* Left Column: Cart Items Table & Controls */}
            <div>
              {/* Free Shipping Alert Meter */}
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid var(--robu-border)',
                padding: '16px',
                marginBottom: '16px',
                boxShadow: 'var(--robu-shadow-sm)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', fontWeight: 700, color: 'var(--robu-text-heading)' }}>
                    <Truck size={18} color="var(--robu-primary-orange)" />
                    {subtotal >= freeShippingThreshold ? (
                      <span style={{ color: '#047857' }}>You have unlocked FREE Express Delivery!</span>
                    ) : (
                      <span>Add <strong>₹{amountNeededForFreeShipping}</strong> more to qualify for <strong>FREE Express Delivery</strong></span>
                    )}
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--robu-text-muted)' }}>{shippingProgress}%</span>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${shippingProgress}%`,
                    height: '100%',
                    backgroundColor: subtotal >= freeShippingThreshold ? '#10B981' : 'var(--robu-primary-orange)',
                    transition: 'width 0.4s ease'
                  }} />
                </div>
              </div>

              {/* Items List */}
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid var(--robu-border)',
                boxShadow: 'var(--robu-shadow-sm)',
                overflow: 'hidden'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr 120px 140px 40px',
                  padding: '14px 20px',
                  backgroundColor: '#F8FAFC',
                  borderBottom: '1px solid var(--robu-border)',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  color: 'var(--robu-text-muted)'
                }}>
                  <span>IMAGE</span>
                  <span>PRODUCT DETAILS</span>
                  <span style={{ textAlign: 'center' }}>PRICE</span>
                  <span style={{ textAlign: 'center' }}>QUANTITY</span>
                  <span></span>
                </div>

                {items.map((item) => {
                  const lineTotal = item.product.price * item.quantity;
                  return (
                    <div key={item.product._id || item.product.sku} style={{
                      display: 'grid',
                      gridTemplateColumns: '80px 1fr 120px 140px 40px',
                      alignItems: 'center',
                      padding: '20px',
                      borderBottom: '1px solid var(--robu-border-light)'
                    }}>
                      {/* Thumbnail */}
                      <Link to={`/product/${item.product._id}`}>
                        <img 
                          src={item.product.image || '/assets/images/arduino_uno_r4.jpg'} 
                          alt={item.product.title} 
                          style={{ width: '64px', height: '64px', objectFit: 'contain', borderRadius: '6px', border: '1px solid #E2E8F0', padding: '4px' }}
                          onError={(e) => { e.target.src = '/assets/images/arduino_uno_r4.jpg'; }}
                        />
                      </Link>

                      {/* Details */}
                      <div style={{ paddingRight: '16px' }}>
                        <Link to={`/product/${item.product._id}`} style={{ textDecoration: 'none' }}>
                          <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--robu-text-heading)', margin: '0 0 4px', lineHeight: '1.4' }}>
                            {item.product.title}
                          </h4>
                        </Link>
                        <div style={{ display: 'flex', gap: '8px', fontSize: '11.5px', color: 'var(--robu-text-muted)' }}>
                          <span>SKU: {item.product.sku}</span>
                          <span>|</span>
                          <span>Brand: {item.product.brand}</span>
                          {item.product.hsnCode && (
                            <>
                              <span>|</span>
                              <span>HSN: {item.product.hsnCode}</span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Price */}
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--robu-text-heading)' }}>
                          ₹{lineTotal.toLocaleString('en-IN')}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--robu-text-muted)' }}>
                          (₹{item.product.price} each)
                        </div>
                      </div>

                      {/* Quantity Stepper */}
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          border: '1px solid var(--robu-border)',
                          borderRadius: '6px',
                          overflow: 'hidden'
                        }}>
                          <button 
                            onClick={() => dispatch(updateQuantity({ productId: item.product._id, quantity: Math.max(1, item.quantity - 1) }))}
                            style={{ width: '28px', height: '32px', background: '#F8FAFC', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          >
                            <Minus size={12} />
                          </button>
                          <span style={{ width: '36px', textAlign: 'center', fontSize: '13px', fontWeight: 700 }}>
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => dispatch(updateQuantity({ productId: item.product._id, quantity: item.quantity + 1 }))}
                            style={{ width: '28px', height: '32px', background: '#F8FAFC', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button 
                        onClick={() => dispatch(removeFromCart(item.product._id))}
                        title="Remove item"
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#94A3B8',
                          cursor: 'pointer',
                          padding: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'color 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#EF4444'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  );
                })}

                {/* Table Footer Actions */}
                <div style={{
                  padding: '16px 20px',
                  backgroundColor: '#F8FAFC',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Link 
                    to="/" 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: 'var(--robu-text-dark)',
                      textDecoration: 'none',
                      fontSize: '13px',
                      fontWeight: 600
                    }}
                  >
                    <ArrowLeft size={14} />
                    <span>Continue Shopping</span>
                  </Link>

                  <button 
                    onClick={() => dispatch(clearCart())}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#DC2626',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: 600
                    }}
                  >
                    Clear Shopping Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary & Checkout */}
            <div>
              {/* Coupon Widget */}
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid var(--robu-border)',
                padding: '20px',
                marginBottom: '16px',
                boxShadow: 'var(--robu-shadow-sm)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 700, color: 'var(--robu-text-heading)', marginBottom: '12px' }}>
                  <Tag size={16} color="var(--robu-primary-orange)" />
                  <span>Apply Promotional Coupon</span>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <input 
                    type="text" 
                    placeholder="Enter Coupon Code" 
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: '1px solid var(--robu-border)',
                      fontSize: '13px',
                      fontWeight: 700
                    }}
                  />
                  <button 
                    onClick={() => handleApplyCoupon()}
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
                    Apply
                  </button>
                </div>

                {couponError && (
                  <div style={{ fontSize: '12px', color: '#DC2626', marginBottom: '8px' }}>
                    {couponError}
                  </div>
                )}

                {appliedCoupon && (
                  <div style={{
                    backgroundColor: '#ECFDF5',
                    color: '#065F46',
                    border: '1px solid #A7F3D0',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '8px'
                  }}>
                    <span>Coupon <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.desc})</span>
                  </div>
                )}

                {/* Recommended Coupons */}
                <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                  <button 
                    onClick={() => handleApplyCoupon('ROBO10')}
                    style={{
                      flex: 1,
                      padding: '6px 8px',
                      borderRadius: '6px',
                      border: '1px dashed var(--robu-primary-orange)',
                      backgroundColor: 'var(--robu-orange-light)',
                      color: 'var(--robu-primary-orange)',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Use ROBO10 (10% Off)
                  </button>
                  <button 
                    onClick={() => handleApplyCoupon('FREESHIP')}
                    style={{
                      flex: 1,
                      padding: '6px 8px',
                      borderRadius: '6px',
                      border: '1px dashed var(--robu-purple)',
                      backgroundColor: 'var(--robu-purple-light)',
                      color: 'var(--robu-purple)',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Use FREESHIP
                  </button>
                </div>
              </div>

              {/* Order Summary Box */}
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid var(--robu-border)',
                padding: '24px',
                boxShadow: 'var(--robu-shadow-sm)'
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--robu-text-heading)', margin: '0 0 16px' }}>
                  Order Summary
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px', color: 'var(--robu-text-body)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Items Subtotal</span>
                    <span style={{ fontWeight: 600 }}>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#047857' }}>
                      <span>Discount ({appliedCoupon?.code})</span>
                      <span style={{ fontWeight: 600 }}>-₹{Math.round(discountAmount).toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Estimated Express Shipping</span>
                    <span>{shippingFee === 0 ? <strong style={{ color: '#047857' }}>FREE</strong> : `₹${shippingFee}`}</span>
                  </div>

                  {/* GST breakdown */}
                  <div style={{ paddingTop: '8px', borderTop: '1px dashed var(--robu-border-light)', fontSize: '12px', color: 'var(--robu-text-muted)' }}>
                    {isIntrastate ? (
                      <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span>CGST (9%)</span>
                          <span>₹{Math.round(totalGst / 2).toLocaleString('en-IN')}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>SGST (9%)</span>
                          <span>₹{Math.round(totalGst / 2).toLocaleString('en-IN')}</span>
                        </div>
                      </>
                    ) : (
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>IGST (18% Interstate)</span>
                        <span>₹{Math.round(totalGst).toLocaleString('en-IN')}</span>
                      </div>
                    )}
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingTop: '14px',
                    borderTop: '2px solid var(--robu-border)',
                    fontSize: '18px',
                    fontWeight: 800,
                    color: 'var(--robu-text-heading)'
                  }}>
                    <span>Grand Total</span>
                    <span style={{ color: 'var(--robu-primary-orange)' }}>
                      ₹{Math.round(grandTotal).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button 
                  onClick={() => navigate('/checkout')}
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--robu-primary-orange)',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '14px',
                    fontWeight: 700,
                    fontSize: '15px',
                    marginTop: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(255, 107, 0, 0.25)'
                  }}
                >
                  <span>Proceed to Secure Checkout</span>
                  <ArrowRight size={18} />
                </button>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  fontSize: '11.5px',
                  color: 'var(--robu-text-muted)',
                  marginTop: '14px'
                }}>
                  <ShieldCheck size={14} color="#059669" />
                  <span>256-bit SSL Encrypted & Razorpay Verified</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
