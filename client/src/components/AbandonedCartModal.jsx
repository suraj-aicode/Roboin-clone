import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAbandonedModalOpen, applyRecoveryDiscount } from '../redux/slices/cartSlice';
import { setCheckoutOpen } from '../redux/slices/orderSlice';
import { ShoppingBag, Sparkles, Clock, ArrowRight, Tag } from 'lucide-react';

export default function AbandonedCartModal() {
  const dispatch = useDispatch();
  const { items, isAbandonedModalOpen } = useSelector((state) => state.cart);

  if (!isAbandonedModalOpen || items.length === 0) return null;

  const subtotal = items.reduce((sum, i) => sum + (i.product.price * i.quantity), 0);
  const discountAmount = Math.round(subtotal * 0.10);
  const discountedTotal = subtotal - discountAmount;

  const handleClaimDiscount = () => {
    dispatch(applyRecoveryDiscount());
    dispatch(setCheckoutOpen(true));
  };

  return (
    <div className="modal-overlay" onClick={() => dispatch(setAbandonedModalOpen(false))}>
      <div className="modal-content" style={{ maxWidth: '480px', padding: '1.75rem', position: 'relative' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={() => dispatch(setAbandonedModalOpen(false))}>✕</button>

        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'inline-flex', padding: '0.85rem', background: 'rgba(245, 158, 11, 0.12)', borderRadius: '50%', color: '#f59e0b', marginBottom: '0.75rem' }}>
            <Sparkles size={32} />
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Complete Your Robotics Build!
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
            You left {items.length} item{items.length > 1 ? 's' : ''} in your cart. Take an extra <strong>10% OFF</strong> if you check out now.
          </p>
        </div>

        {/* Abandoned Items Preview */}
        <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '0.75rem', marginBottom: '1rem', maxHeight: '180px', overflowY: 'auto' }}>
          {items.map(({ product, quantity }) => (
            <div key={product._id || product.sku} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.4rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <img src={product.image} alt={product.title} style={{ width: '40px', height: '40px', objectFit: 'contain', background: '#000', borderRadius: '4px' }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {product.title}
                </div>
                <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                  Qty: {quantity} × ₹{product.price}
                </div>
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>
                ₹{(product.price * quantity).toLocaleString('en-IN')}
              </div>
            </div>
          ))}
        </div>

        {/* Promo Incentive Tag */}
        <div style={{ background: 'rgba(34, 197, 94, 0.08)', border: '1px solid rgba(34, 197, 94, 0.25)', borderRadius: 'var(--radius-sm)', padding: '0.75rem 1rem', marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Tag size={16} color="var(--success)" />
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--success)' }}>
              Coupon: COMEBACK10
            </span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.75rem', textDecoration: 'line-through', color: 'var(--text-muted)' }}>₹{subtotal}</div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--success)' }}>₹{discountedTotal}</div>
          </div>
        </div>

        <button 
          className="btn btn-primary"
          style={{ width: '100%', padding: '0.8rem', fontSize: '0.92rem', fontWeight: 800, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
          onClick={handleClaimDiscount}
        >
          Claim 10% OFF & Checkout <ArrowRight size={16} />
        </button>

        <div style={{ textAlign: 'center', marginTop: '0.75rem' }}>
          <button 
            onClick={() => dispatch(setAbandonedModalOpen(false))}
            style={{ background: 'none', border: 'none', color: 'var(--text-dim)', fontSize: '0.75rem', cursor: 'pointer' }}
          >
            No thanks, I'll continue browsing
          </button>
        </div>
      </div>
    </div>
  );
}
