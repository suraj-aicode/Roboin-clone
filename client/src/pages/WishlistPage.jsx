import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromWishlist, clearWishlist } from '../redux/slices/wishlistSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { 
  Heart, 
  ShoppingCart, 
  Trash2, 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle,
  Home,
  ChevronRight
} from 'lucide-react';

export default function WishlistPage() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.wishlist);

  const handleMoveToCart = (product) => {
    dispatch(addToCart({ product, quantity: 1 }));
    dispatch(removeFromWishlist(product._id));
  };

  return (
    <main style={{ flex: 1, backgroundColor: 'var(--robu-bg-body)', paddingBottom: '60px' }}>
      {/* Breadcrumb */}
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--robu-border)', padding: '10px 0' }}>
        <div className="robu-container" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--robu-text-muted)' }}>
          <Link to="/" style={{ color: 'var(--robu-text-body)', textDecoration: 'none' }}>Home</Link>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--robu-primary-orange)', fontWeight: 600 }}>My Saved Wishlist ({items.length})</span>
        </div>
      </div>

      <div className="robu-container" style={{ marginTop: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--robu-text-heading)', margin: 0 }}>
              Saved Wishlist Components
            </h1>
            <p style={{ fontSize: '13.5px', color: 'var(--robu-text-muted)', margin: '4px 0 0' }}>
              Your shortlisted components, sensors, and robotics dev kits for upcoming engineering builds.
            </p>
          </div>

          {items.length > 0 && (
            <button 
              onClick={() => dispatch(clearWishlist())}
              style={{
                background: 'none',
                border: 'none',
                color: '#DC2626',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 600
              }}
            >
              Clear Entire Wishlist
            </button>
          )}
        </div>

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
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#FFF7ED',
              color: 'var(--robu-primary-orange)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <Heart size={32} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--robu-text-heading)', margin: '0 0 6px' }}>
              Your wishlist is empty
            </h3>
            <p style={{ color: 'var(--robu-text-muted)', fontSize: '14px', margin: '0 0 20px' }}>
              Browse through our development boards, sensors, and drone kits to save components for later.
            </p>
            <Link to="/" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'var(--robu-primary-orange)',
              color: '#FFFFFF',
              padding: '10px 20px',
              borderRadius: '8px',
              fontWeight: 700,
              textDecoration: 'none',
              fontSize: '13.5px'
            }}>
              <ArrowLeft size={16} />
              <span>Browse Catalog</span>
            </Link>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px'
          }}>
            {items.map((product) => {
              const available = product.stockOnHand - (product.stockReserved || 0);

              return (
                <div key={product._id} style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid var(--robu-border)',
                  boxShadow: 'var(--robu-shadow-sm)',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative'
                }}>
                  {/* Remove Button */}
                  <button 
                    onClick={() => dispatch(removeFromWishlist(product._id))}
                    title="Remove from wishlist"
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: 'none',
                      border: 'none',
                      color: '#94A3B8',
                      cursor: 'pointer',
                      padding: '4px'
                    }}
                  >
                    <Trash2 size={16} />
                  </button>

                  <div>
                    {/* Image */}
                    <Link to={`/product/${product._id}`} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '160px',
                      marginBottom: '14px',
                      backgroundColor: '#F8FAFC',
                      borderRadius: '8px',
                      padding: '12px'
                    }}>
                      <img 
                        src={product.image || '/assets/images/arduino_uno_r4.jpg'} 
                        alt={product.title} 
                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                        onError={(e) => { e.target.src = '/assets/images/arduino_uno_r4.jpg'; }}
                      />
                    </Link>

                    {/* Brand & SKU */}
                    <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--robu-text-muted)', textTransform: 'uppercase' }}>
                      {product.brand} | {product.sku}
                    </div>

                    {/* Title */}
                    <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--robu-text-heading)', margin: '6px 0 10px', lineHeight: '1.4' }}>
                        {product.title}
                      </h3>
                    </Link>

                    {/* Price & Stock */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--robu-primary-orange)' }}>
                        ₹{product.price.toLocaleString('en-IN')}
                      </div>

                      {available > 0 ? (
                        <span style={{ fontSize: '11.5px', color: '#059669', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <CheckCircle2 size={13} />
                          <span>In Stock</span>
                        </span>
                      ) : (
                        <span style={{ fontSize: '11.5px', color: '#DC2626', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <AlertTriangle size={13} />
                          <span>Out of Stock</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Move to Cart Button */}
                  <button 
                    onClick={() => handleMoveToCart(product)}
                    disabled={available <= 0}
                    style={{
                      width: '100%',
                      backgroundColor: available <= 0 ? '#94A3B8' : 'var(--robu-primary-orange)',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '10px',
                      fontSize: '13px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      cursor: available <= 0 ? 'not-allowed' : 'pointer'
                    }}
                  >
                    <ShoppingCart size={15} />
                    <span>Move to Cart</span>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
