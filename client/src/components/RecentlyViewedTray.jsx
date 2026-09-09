import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedProduct } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { History, ShoppingCart } from 'lucide-react';

export default function RecentlyViewedTray() {
  const dispatch = useDispatch();
  const { recentlyViewed } = useSelector((state) => state.products);

  if (!recentlyViewed || recentlyViewed.length === 0) return null;

  return (
    <div style={{
      marginTop: '40px',
      marginBottom: '24px',
      backgroundColor: '#FFFFFF',
      borderRadius: '12px',
      border: '1px solid var(--robu-border)',
      padding: '20px 24px',
      boxShadow: 'var(--robu-shadow-sm)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <History size={18} color="var(--robu-primary-orange)" />
        <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--robu-text-heading)' }}>
          Recently Viewed Components
        </h3>
        <span style={{ fontSize: '12px', color: 'var(--robu-text-muted)', marginLeft: 'auto' }}>
          Your browsing history
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '14px' }}>
        {recentlyViewed.map((item) => (
          <div 
            key={item._id || item.sku}
            onClick={() => dispatch(setSelectedProduct(item))}
            className="robu-card-lift"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--robu-border)',
              borderRadius: '8px',
              padding: '12px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                <img src={item.image} alt={item.title} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} onError={(e) => { e.currentTarget.src = '/assets/images/arduino_uno_r4.jpg'; }} />
              </div>
              <div style={{ fontSize: '12.5px', fontWeight: 700, lineHeight: 1.3, marginBottom: '4px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', color: 'var(--robu-text-heading)' }}>
                {item.title}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--robu-text-muted)', fontFamily: 'monospace', marginBottom: '8px' }}>
                {item.sku}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--robu-border-light)', paddingTop: '8px' }}>
              <span style={{ fontWeight: 800, color: 'var(--robu-primary-orange)', fontSize: '14px' }}>
                ₹{item.price.toLocaleString('en-IN')}
              </span>
              <button 
                style={{
                  backgroundColor: 'var(--robu-primary-orange)',
                  color: '#FFFFFF',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '11px',
                  fontWeight: 600
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(addToCart({ product: item, quantity: 1 }));
                }}
                title="Add to cart"
              >
                <ShoppingCart size={12} />
                <span>Add</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
