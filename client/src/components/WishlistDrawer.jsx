import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setWishlistOpen, removeFromWishlist } from '../redux/slices/wishlistSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';

export default function WishlistDrawer() {
  const dispatch = useDispatch();
  const { items, isWishlistOpen } = useSelector((state) => state.wishlist);

  if (!isWishlistOpen) return null;

  const handleMoveToCart = (product) => {
    dispatch(addToCart({ product, quantity: 1 }));
    dispatch(removeFromWishlist(product._id || product.sku));
  };

  return (
    <div className="cart-overlay" onClick={() => dispatch(setWishlistOpen(false))}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ color: '#ef4444' }}>
              <Heart size={20} fill="#ef4444" />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>
              Saved Wishlist ({items.length})
            </h3>
          </div>
          <button className="modal-close" onClick={() => dispatch(setWishlistOpen(false))}>✕</button>
        </div>

        <div className="cart-body">
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--text-muted)' }}>🤍</div>
              <h4 style={{ fontWeight: 700, marginBottom: '0.4rem' }}>Your Wishlist is Empty</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Save interesting microcontroller boards, sensors, and robotics modules here for later.
              </p>
              <button 
                className="btn btn-outline btn-sm"
                onClick={() => dispatch(setWishlistOpen(false))}
              >
                Browse Components
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {items.map((item) => {
                const isAvailable = (item.stockOnHand - (item.stockReserved || 0)) > 0;
                return (
                  <div 
                    key={item._id || item.sku}
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.85rem',
                      display: 'flex',
                      gap: '0.85rem'
                    }}
                  >
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      style={{ width: '64px', height: '64px', objectFit: 'contain', background: '#000', borderRadius: '4px', padding: '4px' }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4 style={{ fontSize: '0.85rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '0.2rem' }}>
                        {item.title}
                      </h4>
                      <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: '0.4rem' }}>
                        {item.sku}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '0.92rem' }}>
                          ₹{item.price}
                        </div>
                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                          <button 
                            className="btn btn-primary btn-sm"
                            style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                            disabled={!isAvailable}
                            onClick={() => handleMoveToCart(item)}
                          >
                            <ShoppingCart size={13} /> Move to Cart
                          </button>
                          <button 
                            style={{ background: 'none', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.3rem 0.5rem' }}
                            onClick={() => dispatch(removeFromWishlist(item._id || item.sku))}
                            title="Remove from wishlist"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <button 
              className="btn btn-outline"
              style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
              onClick={() => {
                items.forEach(item => {
                  dispatch(addToCart({ product: item, quantity: 1 }));
                });
                items.forEach(item => dispatch(removeFromWishlist(item._id || item.sku)));
                dispatch(setWishlistOpen(false));
              }}
            >
              Move All to Cart <ArrowRight size={15} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
