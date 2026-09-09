import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { setSelectedProduct } from '../redux/slices/productSlice';
import { toggleCompareItem } from '../redux/slices/comparisonSlice';
import { toggleWishlist } from '../redux/slices/wishlistSlice';
import { SlidersHorizontal, ShoppingCart, Heart, CheckCircle2, Check } from 'lucide-react';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { items: compareItems } = useSelector((state) => state.comparison);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const [isAdded, setIsAdded] = useState(false);

  const available = product.stockOnHand - (product.stockReserved || 0);
  const isComparing = compareItems.some(i => i._id === product._id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (available <= 0) return;
    dispatch(addToCart({ product, quantity: 1 }));
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1400);
  };
  const isWishlisted = wishlistItems.some(i => i._id === product._id || i.sku === product.sku);

  // Extract up to 2 specs to show as key tags
  const specEntries = product.specs instanceof Map 
    ? Array.from(product.specs.entries()).slice(0, 2)
    : Object.entries(product.specs || {}).slice(0, 2);

  return (
    <div 
      className="robu-card-lift"
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid var(--robu-border)',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        boxShadow: 'var(--robu-shadow-sm)'
      }}
    >
      {/* Top Row: Brand / SKU + Wishlist Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <span style={{
          fontSize: '11px',
          fontWeight: 700,
          color: 'var(--robu-text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.4px'
        }}>
          {product.brand || product.sku}
        </span>

        {/* Wishlist Heart Toggle */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            dispatch(toggleWishlist(product));
          }}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          style={{
            background: isWishlisted ? 'var(--robu-orange-light)' : 'var(--robu-bg-top)',
            border: `1px solid ${isWishlisted ? 'var(--robu-primary-orange)' : 'var(--robu-border)'}`,
            borderRadius: '50%',
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          <Heart 
            size={14} 
            color={isWishlisted ? 'var(--robu-primary-orange)' : 'var(--robu-text-muted)'} 
            fill={isWishlisted ? 'var(--robu-primary-orange)' : 'none'} 
          />
        </button>
      </div>

      {/* Product Image */}
      <div 
        onClick={() => dispatch(setSelectedProduct(product))}
        style={{
          height: '160px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '8px',
          cursor: 'pointer',
          marginBottom: '12px',
          borderRadius: '8px',
          backgroundColor: '#FFFFFF'
        }}
      >
        <img 
          src={product.image} 
          alt={product.title} 
          style={{
            maxHeight: '100%',
            maxWidth: '100%',
            objectFit: 'contain',
            transition: 'transform 0.25s ease'
          }}
          onError={(e) => { e.currentTarget.src = '/assets/images/arduino_uno_r4.jpg'; }}
        />
      </div>

      {/* Product Title */}
      <div>
        <div 
          onClick={() => dispatch(setSelectedProduct(product))}
          style={{
            fontSize: '14px',
            fontWeight: 700,
            color: 'var(--robu-text-heading)',
            lineHeight: '1.35',
            cursor: 'pointer',
            height: '38px',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            marginBottom: '8px'
          }}
          title={product.title}
        >
          {product.title}
        </div>

        {/* Stock & Availability */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px', fontSize: '11.5px' }}>
          {available > 0 ? (
            <span style={{ color: '#059669', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle2 size={13} />
              <span>In Stock ({available} units)</span>
            </span>
          ) : (
            <span style={{ color: '#DC2626', fontWeight: 600 }}>Out of Stock</span>
          )}
        </div>

        {/* Spec tags */}
        {specEntries.length > 0 && (
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
            {specEntries.map(([k, v], idx) => (
              <span 
                key={idx}
                style={{
                  fontSize: '10.5px',
                  backgroundColor: 'var(--robu-bg-top)',
                  color: 'var(--robu-text-muted)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  border: '1px solid var(--robu-border-light)'
                }}
              >
                {v}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Row: Price + Add to Cart + Compare */}
      <div style={{
        borderTop: '1px solid var(--robu-border-light)',
        paddingTop: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 'auto'
      }}>
        <div>
          <div style={{
            fontSize: '18px',
            fontWeight: 800,
            color: 'var(--robu-primary-orange)'
          }}>
            ₹{product.price.toLocaleString('en-IN')}
          </div>
          <div style={{
            fontSize: '10.5px',
            color: 'var(--robu-text-muted)'
          }}>
            (Incl. {Math.round((product.gstRate || 0.18) * 100)}% GST)
          </div>
        </div>

        <div style={{ display: 'flex', gap: '6px' }}>
          <button 
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              border: '1px solid var(--robu-border)',
              backgroundColor: isComparing ? 'var(--robu-purple-light)' : '#FFFFFF',
              color: isComparing ? 'var(--robu-purple)' : 'var(--robu-text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            title={isComparing ? 'Remove from Comparison' : 'Add to Comparison'}
            onClick={() => dispatch(toggleCompareItem(product))}
          >
            <SlidersHorizontal size={14} />
          </button>

          <button 
            disabled={available <= 0}
            onClick={handleAddToCart}
            style={{
              backgroundColor: available <= 0 
                ? 'var(--robu-border)' 
                : isAdded 
                  ? '#10B981' 
                  : 'var(--robu-primary-orange)',
              color: '#FFFFFF',
              borderRadius: '6px',
              padding: '6px 14px',
              fontSize: '12.5px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: available <= 0 ? 'not-allowed' : 'pointer',
              transform: isAdded ? 'scale(1.05)' : 'scale(1)',
              boxShadow: isAdded ? '0 0 12px rgba(16, 185, 129, 0.4)' : 'none',
              transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
            onMouseEnter={(e) => {
              if (available > 0 && !isAdded) e.currentTarget.style.backgroundColor = 'var(--robu-orange-hover)';
            }}
            onMouseLeave={(e) => {
              if (available > 0 && !isAdded) e.currentTarget.style.backgroundColor = 'var(--robu-primary-orange)';
            }}
          >
            {isAdded ? (
              <>
                <Check size={14} style={{ animation: 'badgePulse 0.3s ease' }} />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingCart size={14} />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
