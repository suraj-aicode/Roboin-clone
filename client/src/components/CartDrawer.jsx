import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCart, updateQuantity, removeFromCart, clearCart, applyCoupon } from '../redux/slices/cartSlice';
import { setCheckoutOpen } from '../redux/slices/orderSlice';
import { 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Truck, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  Plus,
  Minus,
  X
} from 'lucide-react';

export default function CartDrawer() {
  const dispatch = useDispatch();
  const { items, isOpen, appliedCoupon } = useSelector((state) => state.cart);
  const { userState, sellerState } = useSelector((state) => state.auth);

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  // Real-time server-compliant calculation
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

  // Free shipping threshold calculation (₹999)
  const freeShippingThreshold = 999;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (codeToApply) => {
    const code = (codeToApply || couponCode).trim().toUpperCase();
    if (!code) return;

    if (code === 'VOLT10' || code === 'ROBO10') {
      if (subtotal < 500) {
        setCouponError('VOLT10 requires minimum order value of ₹500');
        return;
      }
      dispatch(applyCoupon({ code, type: 'percentage', value: 0.10, desc: '10% Instant Maker Discount' }));
      setCouponError('');
      setCouponCode(code);
    } else if (code === 'FREESHIP') {
      dispatch(applyCoupon({ code: 'FREESHIP', type: 'shipping', value: 99, desc: 'Free Delhivery Express Shipping' }));
      setCouponError('');
      setCouponCode('FREESHIP');
    } else if (code === 'MAKER500') {
      if (subtotal < 2999) {
        setCouponError('MAKER500 requires minimum order value of ₹2,999');
        return;
      }
      dispatch(applyCoupon({ code: 'MAKER500', type: 'fixed', value: 500, desc: 'Flat ₹500 Bulk Maker Discount' }));
      setCouponError('');
      setCouponCode('MAKER500');
    } else {
      setCouponError('Invalid coupon code. Try VOLT10, FREESHIP or MAKER500');
    }
  };

  return (
    <div className="modal-overlay" style={{ background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(6px)' }} onClick={() => dispatch(toggleCart())}>
      <aside className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cart-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'rgba(239, 65, 35, 0.12)',
              color: 'var(--robu-primary-orange)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShoppingBag size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0, color: '#0F172A' }}>Your Cart</h3>
                {totalItemsCount > 0 && (
                  <span style={{
                    background: 'var(--robu-primary-orange)',
                    color: '#FFFFFF',
                    fontSize: '11px',
                    fontWeight: 800,
                    padding: '2px 7px',
                    borderRadius: '9999px'
                  }}>
                    {totalItemsCount}
                  </span>
                )}
              </div>
              <span style={{ fontSize: '11px', color: '#64748B' }}>VoltCart Certified Hardware</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {items.length > 0 && (
              <button
                onClick={() => {
                  if (window.confirm('Clear all items from your cart?')) {
                    dispatch(clearCart());
                  }
                }}
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#94A3B8',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px 6px'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#EF4444'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#94A3B8'; }}
              >
                Clear All
              </button>
            )}
            <button 
              className="modal-close" 
              style={{ position: 'static', width: '32px', height: '32px', background: '#F1F5F9' }} 
              onClick={() => dispatch(toggleCart())}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Free Shipping Tracker Banner */}
        <div style={{
          padding: '12px 18px',
          background: subtotal >= freeShippingThreshold ? '#F0FDF4' : '#FFF7ED',
          borderBottom: '1px solid',
          borderColor: subtotal >= freeShippingThreshold ? '#DCFCE7' : '#FED7AA'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Truck size={16} color={subtotal >= freeShippingThreshold ? '#16A34A' : '#EA580C'} />
            <span style={{ fontSize: '12px', fontWeight: 700, color: subtotal >= freeShippingThreshold ? '#15803D' : '#C2410C' }}>
              {subtotal >= freeShippingThreshold 
                ? '🎉 You have unlocked FREE Express Delivery!' 
                : `Add ₹${amountNeededForFreeShipping.toFixed(0)} more for FREE Express Delivery`}
            </span>
          </div>

          <div style={{
            height: '6px',
            width: '100%',
            background: subtotal >= freeShippingThreshold ? '#DCFCE7' : '#FFEDD5',
            borderRadius: '9999px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${shippingProgress}%`,
              background: subtotal >= freeShippingThreshold 
                ? 'linear-gradient(90deg, #10B981, #059669)' 
                : 'linear-gradient(90deg, #F97316, #EA580C)',
              borderRadius: '9999px',
              transition: 'width 0.4s ease'
            }} />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="cart-body">
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3.5rem 1rem', color: '#64748B' }}>
              <div style={{ 
                width: '72px', 
                height: '72px', 
                borderRadius: '50%', 
                background: '#F8FAFC', 
                border: '2px dashed #CBD5E1', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '0 auto 1rem auto'
              }}>
                <ShoppingBag size={32} color="#94A3B8" />
              </div>
              <h4 style={{ color: '#0F172A', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.4rem' }}>Your Cart is Empty</h4>
              <p style={{ fontSize: '0.84rem', color: '#64748B', maxWidth: '280px', margin: '0 auto 1.5rem auto' }}>
                Looks like you haven't added any robotics or electronic parts yet.
              </p>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => dispatch(toggleCart())}
                style={{ padding: '8px 18px', fontWeight: 700 }}
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            items.map(({ product, quantity }) => (
              <div key={product._id} className="cart-item">
                <img src={product.image || '/assets/images/esp32_dev_board.jpg'} alt={product.title} className="cart-item-img" />
                
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '6px' }}>
                    <div>
                      {product.brand && (
                        <span style={{ 
                          fontSize: '10px', 
                          fontWeight: 700, 
                          color: '#0B65C2', 
                          textTransform: 'uppercase',
                          background: '#EFF6FF',
                          padding: '1px 5px',
                          borderRadius: '4px',
                          display: 'inline-block',
                          marginBottom: '3px'
                        }}>
                          {product.brand}
                        </span>
                      )}
                      <h4 style={{ 
                        fontSize: '0.85rem', 
                        fontWeight: 700, 
                        color: '#0F172A', 
                        lineHeight: 1.3,
                        margin: 0,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {product.title}
                      </h4>
                    </div>

                    <button 
                      onClick={() => dispatch(removeFromCart(product._id))}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#94A3B8',
                        cursor: 'pointer',
                        padding: '4px',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.15s ease'
                      }}
                      title="Remove item"
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#EF4444'; e.currentTarget.style.background = '#FEE2E2'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = '#94A3B8'; e.currentTarget.style.background = 'none'; }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '4px 0' }}>
                    <span className="mono" style={{ fontSize: '11px', color: 'var(--robu-primary-orange)', fontWeight: 600 }}>
                      {product.sku}
                    </span>
                    <span style={{ fontSize: '11px', color: '#94A3B8' }}>•</span>
                    <span style={{ fontSize: '11px', color: '#16A34A', fontWeight: 600 }}>In Stock</span>
                  </div>

                  {/* Pricing and Stepper Row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px' }}>
                    {/* Stepper */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      background: '#F1F5F9',
                      border: '1px solid #CBD5E1',
                      borderRadius: '6px',
                      overflow: 'hidden'
                    }}>
                      <button 
                        onClick={() => dispatch(updateQuantity({ productId: product._id, quantity: quantity - 1 }))}
                        style={{
                          width: '28px',
                          height: '26px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#334155'
                        }}
                        title="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span style={{ 
                        fontSize: '12px', 
                        fontWeight: 700, 
                        minWidth: '24px', 
                        textAlign: 'center',
                        color: '#0F172A'
                      }}>
                        {quantity}
                      </span>
                      <button 
                        onClick={() => dispatch(updateQuantity({ productId: product._id, quantity: quantity + 1 }))}
                        style={{
                          width: '28px',
                          height: '26px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#334155'
                        }}
                        title="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Price calculation */}
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0F172A' }}>
                        ₹{(product.price * quantity).toLocaleString('en-IN')}
                      </div>
                      <div style={{ fontSize: '10px', color: '#64748B' }}>
                        ₹{product.price} / unit
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Breakdown & Checkout Action */}
        {items.length > 0 && (
          <div className="cart-footer">
            {/* Quick Coupons Box */}
            <div style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', gap: '6px', marginBottom: '6px' }}>
                <input 
                  type="text"
                  placeholder="Enter Coupon Code"
                  className="form-control"
                  style={{ 
                    textTransform: 'uppercase', 
                    fontSize: '12px', 
                    padding: '8px 12px',
                    fontFamily: 'monospace',
                    fontWeight: 700
                  }}
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button 
                  type="button" 
                  className="btn btn-outline" 
                  onClick={() => handleApplyCoupon()}
                  style={{ padding: '0 14px', fontSize: '12px', fontWeight: 700 }}
                >
                  <Tag size={13} /> Apply
                </button>
              </div>

              {/* Quick Chip Coupons */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {[
                  { code: 'VOLT10', label: '10% OFF' },
                  { code: 'FREESHIP', label: 'Free Ship' },
                  { code: 'MAKER500', label: '₹500 OFF' }
                ].map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => handleApplyCoupon(c.code)}
                    style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      background: appliedCoupon?.code === c.code ? '#DCFCE7' : '#F1F5F9',
                      color: appliedCoupon?.code === c.code ? '#15803D' : '#475569',
                      border: appliedCoupon?.code === c.code ? '1px solid #86EFAC' : '1px dashed #CBD5E1',
                      cursor: 'pointer'
                    }}
                  >
                    {c.code} ({c.label})
                  </button>
                ))}
              </div>

              {couponError && <div style={{ fontSize: '11px', color: '#EF4444', marginTop: '4px' }}>{couponError}</div>}
              {appliedCoupon && (
                <div style={{ fontSize: '11px', color: '#16A34A', fontWeight: 700, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle2 size={13} />
                  <span>{appliedCoupon.desc}</span>
                </div>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="summary-row">
              <span>Subtotal ({totalItemsCount} items)</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            {discountAmount > 0 && (
              <div className="summary-row" style={{ color: '#16A34A', fontWeight: 600 }}>
                <span>Coupon Discount ({appliedCoupon.code})</span>
                <span>-₹{discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="summary-row">
              <span>
                GST (18% {isIntrastate ? 'Intrastate' : 'Interstate'})
              </span>
              <span>₹{totalGst.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Delivery Fee</span>
              <span style={{ color: shippingFee === 0 ? '#16A34A' : '#0F172A', fontWeight: shippingFee === 0 ? 700 : 400 }}>
                {shippingFee === 0 ? 'FREE' : `₹${shippingFee.toFixed(2)}`}
              </span>
            </div>

            <div className="summary-row total">
              <span style={{ fontSize: '1rem', fontWeight: 800 }}>Total Payable</span>
              <span style={{ color: 'var(--robu-primary-orange)', fontSize: '1.25rem', fontWeight: 900 }}>
                ₹{grandTotal.toFixed(2)}
              </span>
            </div>

            {/* Checkout Action Button */}
            <button 
              className="btn btn-primary"
              style={{
                width: '100%',
                marginTop: '12px',
                padding: '13px',
                fontSize: '14px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                borderRadius: '8px',
                boxShadow: '0 4px 14px rgba(239, 65, 35, 0.35)',
                background: 'linear-gradient(135deg, #EF4123 0%, #D73317 100%)'
              }}
              onClick={() => {
                dispatch(toggleCart());
                dispatch(setCheckoutOpen(true));
              }}
            >
              <span>Proceed to GST Checkout</span>
              <ArrowRight size={16} />
            </button>

            {/* Trust Micro Strip */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              marginTop: '10px',
              fontSize: '11px',
              color: '#94A3B8'
            }}>
              <span>🛡️ 100% Genuine</span>
              <span>•</span>
              <span>⚡ Fast Dispatch</span>
              <span>•</span>
              <span>🔒 Razorpay Secured</span>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
