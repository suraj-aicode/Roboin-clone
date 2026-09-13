import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../redux/slices/cartSlice';
import { setSelectedProduct } from '../redux/slices/productSlice';
import { toggleCompareItem } from '../redux/slices/comparisonSlice';
import { toggleWishlist } from '../redux/slices/wishlistSlice';
import { SlidersHorizontal, ShoppingCart, Heart, CheckCircle2, Check, Sparkles, ShieldCheck } from 'lucide-react';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: compareItems } = useSelector((state) => state.comparison);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const [isAdded, setIsAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleOpenProduct = () => {
    dispatch(setSelectedProduct(product));
    navigate(`/product/${product._id}`);
  };

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
      className="robu-product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        backgroundColor: '#FFFFFF',
        border: '1px solid var(--robu-border-card)',
        borderRadius: '8px',
        padding: '14px',
        transition: 'all 0.2s ease',
        boxShadow: isHovered ? '0 8px 24px rgba(0, 0, 0, 0.08)' : 'var(--robu-shadow-sm)',
        transform: isHovered ? 'translateY(-3px)' : 'none'
      }}
    >
      {/* Out of Stock Diagonal Ribbon */}
      {available <= 0 && (
        <div style={{
          position: 'absolute',
          top: '14px',
          left: '-28px',
          backgroundColor: '#EF4444',
          color: '#FFFFFF',
          fontSize: '9.5px',
          fontWeight: 800,
          padding: '3px 28px',
          transform: 'rotate(-45deg)',
          zIndex: 5,
          boxShadow: '0 2px 6px rgba(239, 68, 68, 0.35)',
          letterSpacing: '0.4px',
          textTransform: 'uppercase'
        }}>
          Out of Stock
        </div>
      )}

      <div>
        {/* Top Category Tag & Wishlist Button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{
            fontSize: '10.5px',
            fontWeight: 700,
            color: 'var(--robu-text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.4px'
          }}>
            {product.category ? product.category.replace(/-/g, ' ') : 'Hardware'}
          </span>

          <button 
            onClick={(e) => {
              e.stopPropagation();
              dispatch(toggleWishlist(product));
            }}
            title={isWishlisted ? "In wishlist" : "Add to wishlist"}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Heart 
              size={17} 
              color={isWishlisted ? 'var(--robu-primary-orange)' : '#9CA3AF'} 
              fill={isWishlisted ? 'var(--robu-primary-orange)' : 'none'} 
            />
          </button>
        </div>

        {/* Square Centered Product Image */}
        <div 
          onClick={handleOpenProduct}
          style={{
            height: '160px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px',
            cursor: 'pointer',
            marginBottom: '10px',
            backgroundColor: '#FFFFFF',
            position: 'relative'
          }}
        >
          <img 
            src={product.image} 
            alt={product.title} 
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
              objectFit: 'contain',
              transition: 'transform 0.25s ease',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)'
            }}
            onError={(e) => { e.currentTarget.src = '/assets/images/arduino_uno_r4.jpg'; }}
          />
        </div>

        {/* 2-Line Product Title */}
        <div 
          onClick={handleOpenProduct}
          style={{
            fontSize: '13.5px',
            fontWeight: 600,
            color: '#1E1E24',
            lineHeight: '1.4',
            cursor: 'pointer',
            height: '38px',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            marginBottom: '4px',
            textDecoration: 'none'
          }}
          title={product.title}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--robu-primary-orange)'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#1E1E24'}
        >
          {product.title}
        </div>

        {/* SKU Label & Customer Rating */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', fontSize: '11px' }}>
          <span style={{ color: 'var(--robu-text-sku)' }}>
            SKU: {product.sku}
          </span>
          <span style={{ color: '#F59E0B', fontWeight: 600 }}>
            ★★★★★ <span style={{ color: '#9CA3AF', fontSize: '10px' }}>(0)</span>
          </span>
        </div>

        {/* Price Row: Bold Robu Purple Price + Incl. GST */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '12px' }}>
          <span style={{
            fontSize: '17px',
            fontWeight: 800,
            color: 'var(--robu-primary-purple)'
          }}>
            ₹{product.price.toLocaleString('en-IN')}.00
          </span>
          <span style={{ fontSize: '10.5px', color: 'var(--robu-text-muted)', fontWeight: 500 }}>
            (Incl. GST)
          </span>
          {available > 0 && (
            <span style={{ fontSize: '11.5px', color: '#9CA3AF', textDecoration: 'line-through', marginLeft: 'auto' }}>
              ₹{Math.round(product.price * 1.2).toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </div>

      {/* Action Row: Full-width Outlined Robu Purple Add to Cart Button */}
      <div style={{ marginTop: 'auto', display: 'flex', gap: '8px' }}>
        <button 
          disabled={available <= 0}
          onClick={handleAddToCart}
          style={{
            flex: 1,
            backgroundColor: isAdded ? 'var(--robu-primary-purple)' : 'transparent',
            color: isAdded ? '#FFFFFF' : available <= 0 ? '#9CA3AF' : 'var(--robu-primary-purple)',
            border: `1.5px solid ${available <= 0 ? '#D1D5DB' : 'var(--robu-primary-purple)'}`,
            borderRadius: '6px',
            padding: '8px 12px',
            fontSize: '13px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            cursor: available <= 0 ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            if (available > 0 && !isAdded) {
              e.currentTarget.style.backgroundColor = 'var(--robu-primary-purple)';
              e.currentTarget.style.color = '#FFFFFF';
            }
          }}
          onMouseLeave={(e) => {
            if (available > 0 && !isAdded) {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--robu-primary-purple)';
            }
          }}
        >
          {isAdded ? (
            <>
              <Check size={15} color="#FFFFFF" />
              <span>Added to Cart!</span>
            </>
          ) : available <= 0 ? (
            <span>Out of Stock</span>
          ) : (
            <>
              <ShoppingCart size={15} />
              <span>Add to Cart</span>
            </>
          )}
        </button>

        {/* Compare Toggle */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            dispatch(toggleCompareItem(product));
          }}
          title={isComparing ? 'Remove from Comparison' : 'Compare'}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '6px',
            border: `1px solid ${isComparing ? 'var(--robu-primary-purple)' : 'var(--robu-border)'}`,
            backgroundColor: isComparing ? 'var(--robu-purple-light)' : '#FFFFFF',
            color: isComparing ? 'var(--robu-primary-purple)' : '#6B7280',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0
          }}
        >
          <SlidersHorizontal size={15} />
        </button>
      </div>
    </div>
  );
}

