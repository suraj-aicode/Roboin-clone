import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearLastAddedItem, toggleCart } from '../redux/slices/cartSlice';
import { setCheckoutOpen } from '../redux/slices/orderSlice';
import { CheckCircle2, ShoppingBag, ArrowRight, X, Sparkles } from 'lucide-react';

export default function CartNotificationToast() {
  const dispatch = useDispatch();
  const { lastAddedItem, items } = useSelector((state) => state.cart);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (lastAddedItem) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(() => {
          dispatch(clearLastAddedItem());
        }, 300);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [lastAddedItem, dispatch]);

  if (!lastAddedItem || !visible) return null;

  const { product, quantity } = lastAddedItem;
  const totalCartCount = items.reduce((sum, i) => sum + i.quantity, 0);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      dispatch(clearLastAddedItem());
    }, 200);
  };

  const handleOpenCart = () => {
    handleClose();
    dispatch(toggleCart());
  };

  const handleCheckout = () => {
    handleClose();
    dispatch(setCheckoutOpen(true));
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '24px',
        right: '24px',
        zIndex: 99999,
        maxWidth: '380px',
        width: 'calc(100vw - 32px)',
        background: '#FFFFFF',
        borderRadius: '14px',
        boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.08)',
        borderLeft: '5px solid #10B981',
        overflow: 'hidden',
        animation: 'toastSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}
    >
      {/* Top Strip */}
      <div style={{
        padding: '10px 14px',
        background: '#F0FDF4',
        borderBottom: '1px solid #DCFCE7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
          <div style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: '#10B981',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <CheckCircle2 size={13} />
          </div>
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#15803D', letterSpacing: '0.2px' }}>
            Added to Cart Successfully!
          </span>
        </div>

        <button
          onClick={handleClose}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#64748B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2px',
            borderRadius: '4px'
          }}
          title="Dismiss"
        >
          <X size={15} />
        </button>
      </div>

      {/* Item Details */}
      <div style={{ padding: '14px', display: 'flex', gap: '12px', alignItems: 'center' }}>
        <img
          src={product.image || '/assets/images/esp32_dev_board.jpg'}
          alt={product.title}
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '8px',
            objectFit: 'cover',
            border: '1px solid #E2E8F0',
            flexShrink: 0
          }}
        />

        <div style={{ flex: 1, minWidth: 0 }}>
          <h4 style={{
            fontSize: '13px',
            fontWeight: 700,
            color: '#0F172A',
            margin: '0 0 3px 0',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {product.title}
          </h4>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#64748B' }}>
            <span style={{ fontFamily: 'monospace', color: '#EF4123', fontWeight: 600 }}>{product.sku}</span>
            <span>•</span>
            <span>Qty: <strong>{quantity}</strong></span>
          </div>

          <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', marginTop: '3px' }}>
            ₹{(product.price * quantity).toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{
        padding: '0 14px 14px 14px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '8px'
      }}>
        <button
          onClick={handleOpenCart}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            padding: '9px 12px',
            borderRadius: '8px',
            background: '#F1F5F9',
            border: '1px solid #CBD5E1',
            color: '#1E293B',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#E2E8F0'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = '#F1F5F9'; }}
        >
          <ShoppingBag size={14} color="#0F172A" />
          <span>Cart ({totalCartCount})</span>
        </button>

        <button
          onClick={handleCheckout}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            padding: '9px 12px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #EF4123 0%, #d83317 100%)',
            border: 'none',
            color: '#FFFFFF',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(239, 65, 35, 0.25)',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          <span>Checkout</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Auto-dismiss progress timer bar */}
      <div style={{
        height: '3px',
        width: '100%',
        background: '#E2E8F0',
        overflow: 'hidden'
      }}>
        <div style={{
          height: '100%',
          background: 'linear-gradient(90deg, #10B981, #059669)',
          animation: 'toastProgress 4s linear forwards'
        }} />
      </div>
    </div>
  );
}
