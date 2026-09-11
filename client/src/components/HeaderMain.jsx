import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchQuery, setSelectedProduct, setActiveCategory } from '../redux/slices/productSlice';
import { toggleCart } from '../redux/slices/cartSlice';
import { setComparisonModalOpen } from '../redux/slices/comparisonSlice';
import { setWishlistOpen } from '../redux/slices/wishlistSlice';
import { setOrderHistoryOpen, setAdminView } from '../redux/slices/orderSlice';
import { setAuthModalOpen } from '../redux/slices/authSlice';
import { 
  Search, 
  GitCompare, 
  Package, 
  Truck, 
  User, 
  Heart, 
  ShoppingCart, 
  LayoutDashboard, 
  Store,
  ChevronRight,
  TrendingUp,
  Tag
} from 'lucide-react';

const SEARCH_PLACEHOLDERS = [
  'Arduino UNO R3',
  'Raspberry Pi 5 8GB',
  'ESP32 Dev Board WiFi + BLE',
  'LiPo Battery 11.1V 2200mAh',
  'Ultrasonic Sensor HC-SR04',
  'Bambu Lab PLA Filament'
];

export default function HeaderMain() {
  const dispatch = useDispatch();
  const { searchQuery, products } = useSelector((state) => state.products);
  const { items: cartItems, cartBounceTrigger } = useSelector((state) => state.cart);
  const { items: compareItems } = useSelector((state) => state.comparison);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const { orders, adminView } = useSelector((state) => state.order);
  const { user, currentRole } = useSelector((state) => state.auth);

  const isAdminUser = ['super_admin', 'admin', 'catalog_manager', 'inventory_manager', 'order_manager', 'support_agent', 'marketing_manager'].includes(currentRole);

  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isCartBouncing, setIsCartBouncing] = useState(false);
  const searchContainerRef = useRef(null);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Trigger bounce on add to cart
  useEffect(() => {
    if (cartBounceTrigger > 0) {
      setIsCartBouncing(true);
      const timer = setTimeout(() => setIsCartBouncing(false), 600);
      return () => clearTimeout(timer);
    }
  }, [cartBounceTrigger]);

  // Rotating placeholder
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % SEARCH_PLACEHOLDERS.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered matching products
  const matchingProducts = searchQuery.trim().length > 0
    ? products.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : products.slice(0, 4);

  return (
    <header style={{
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid var(--robu-border)',
      padding: '12px 0',
      position: 'relative',
      zIndex: 100
    }}>
      <div className="robu-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '24px'
      }}>
        {/* Brand Logo */}
        <div 
          onClick={() => {
            dispatch(setAdminView('storefront'));
            dispatch(setActiveCategory('all'));
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexShrink: 0
          }}
        >
          {/* VoltCart official brand logo */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div style={{
              width: '38px',
              height: '38px',
              background: 'linear-gradient(135deg, var(--robu-primary-orange) 0%, #EA580C 100%)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontFamily: 'var(--font-robu-heading)',
              fontWeight: 800,
              fontSize: '20px',
              boxShadow: '0 2px 8px rgba(239, 65, 35, 0.35)'
            }}>
              ⚡
            </div>
            <div>
              <div style={{
                fontFamily: 'var(--font-robu-heading)',
                fontWeight: 800,
                fontSize: '23px',
                lineHeight: 1,
                color: 'var(--robu-text-heading)',
                letterSpacing: '-0.5px'
              }}>
                VOLT<span style={{ color: 'var(--robu-primary-orange)' }}>CART</span>
              </div>
              <div style={{
                fontSize: '9.5px',
                fontWeight: 600,
                color: 'var(--robu-text-muted)',
                letterSpacing: '0.5px',
                marginTop: '2px',
                textTransform: 'uppercase'
              }}>
                Robotics & Electronics
              </div>
            </div>
          </div>
        </div>

        {/* Center Search Bar with Dynamic Autocomplete Dropdown */}
        <div 
          ref={searchContainerRef}
          style={{
            flex: 1,
            maxWidth: '640px',
            position: 'relative'
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            border: '2px solid var(--robu-purple)',
            borderRadius: '8px',
            overflow: 'hidden',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
          }}>
            <div style={{ padding: '0 12px', color: 'var(--robu-text-muted)', display: 'flex', alignItems: 'center' }}>
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder={`Search e.g. "${SEARCH_PLACEHOLDERS[placeholderIndex]}"`}
              value={searchQuery}
              onChange={(e) => {
                dispatch(setSearchQuery(e.target.value));
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: '14px',
                padding: '10px 4px',
                fontFamily: 'var(--font-robu-body)',
                color: 'var(--robu-text-heading)'
              }}
            />
            <button
              onClick={() => setShowDropdown(false)}
              style={{
                backgroundColor: 'var(--robu-purple)',
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: '14px',
                padding: '10px 22px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'background-color 0.2s'
              }}
            >
              <span>Search</span>
            </button>
          </div>

          {/* Autocomplete 3-Column Modal Dropdown */}
          {showDropdown && (
            <div style={{
              position: 'absolute',
              top: 'calc(100% + 6px)',
              left: 0,
              right: 0,
              backgroundColor: '#FFFFFF',
              borderRadius: '10px',
              border: '1px solid var(--robu-border)',
              boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
              zIndex: 999,
              padding: '16px',
              display: 'grid',
              gridTemplateColumns: '1fr 1.6fr',
              gap: '16px'
            }}>
              {/* Popular Searches & Quick Categories */}
              <div style={{ borderRight: '1px solid var(--robu-border-light)', paddingRight: '14px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: 'var(--robu-text-muted)',
                  textTransform: 'uppercase',
                  marginBottom: '10px'
                }}>
                  <TrendingUp size={14} color="var(--robu-primary-orange)" />
                  <span>Popular Searches</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {['Arduino UNO R4 WiFi', 'Raspberry Pi 5', 'ESP32 Bluetooth', 'LiPo Battery', '3D Printer Nozzle', 'Nema 17 Stepper'].map(term => (
                    <button
                      key={term}
                      onClick={() => {
                        dispatch(setSearchQuery(term));
                        setShowDropdown(false);
                      }}
                      style={{
                        textAlign: 'left',
                        fontSize: '13px',
                        color: 'var(--robu-text-body)',
                        padding: '4px 6px',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--robu-bg-top)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <span>{term}</span>
                      <ChevronRight size={12} color="var(--robu-text-light)" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Direct Matches */}
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: 'var(--robu-text-muted)',
                  textTransform: 'uppercase',
                  marginBottom: '10px'
                }}>
                  <Tag size={14} color="var(--robu-purple)" />
                  <span>Product Matches</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {matchingProducts.map(prod => (
                    <div
                      key={prod._id || prod.sku}
                      onClick={() => {
                        dispatch(setSelectedProduct(prod));
                        setShowDropdown(false);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '6px 8px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        transition: 'background 0.15s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--robu-bg-top)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <img 
                        src={prod.image} 
                        alt={prod.title}
                        style={{
                          width: '40px',
                          height: '40px',
                          objectFit: 'cover',
                          borderRadius: '4px',
                          border: '1px solid var(--robu-border)'
                        }}
                        onError={(e) => { e.currentTarget.src = '/assets/images/arduino_uno_r4.jpg'; }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontSize: '13px',
                          fontWeight: 600,
                          color: 'var(--robu-text-heading)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          {prod.title}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--robu-text-light)', fontFamily: 'monospace' }}>
                          {prod.sku}
                        </div>
                      </div>
                      <div style={{
                        fontSize: '13px',
                        fontWeight: 700,
                        color: 'var(--robu-primary-orange)'
                      }}>
                        ₹{prod.price.toLocaleString('en-IN')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Action Icons Row: Compare, Orders, Track, Account, Wishlist, Cart */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          flexShrink: 0
        }}>
          {/* Admin / Staff Switcher - Strictly restricted to Staff and Admins */}
          {isAdminUser && (
            adminView === 'storefront' ? (
              <button
                onClick={() => dispatch(setAdminView('admin'))}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: currentRole === 'super_admin' ? '#7C3AED' : 'var(--robu-purple)',
                  backgroundColor: currentRole === 'super_admin' ? '#F3E8FF' : 'var(--robu-purple-light)',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: currentRole === 'super_admin' ? '1px solid #DDD6FE' : 'none'
                }}
                title={`Switch to Back-Office Dashboard (${currentRole.replace('_', ' ')})`}
              >
                <LayoutDashboard size={15} />
                <span className="hide-mobile">
                  {currentRole === 'super_admin' ? 'Super Admin' : currentRole === 'admin' ? 'Admin' : 'Staff Panel'}
                </span>
              </button>
            ) : (
              <button
                onClick={() => dispatch(setAdminView('storefront'))}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  backgroundColor: 'var(--robu-primary-orange)',
                  padding: '6px 10px',
                  borderRadius: '6px'
                }}
                title="Return to Storefront"
              >
                <Store size={15} />
                <span className="hide-mobile">Storefront</span>
              </button>
            )
          )}

          {/* 1. Compare */}
          <button
            onClick={() => dispatch(setComparisonModalOpen(true))}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              color: 'var(--robu-text-dark)',
              fontSize: '11px',
              fontWeight: 500
            }}
            title="Product Comparison"
          >
            <div style={{ position: 'relative' }}>
              <GitCompare size={20} />
              {compareItems.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-8px',
                  backgroundColor: 'var(--robu-purple)',
                  color: '#FFFFFF',
                  borderRadius: '50%',
                  fontSize: '10px',
                  fontWeight: 700,
                  width: '16px',
                  height: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {compareItems.length}
                </span>
              )}
            </div>
            <span style={{ marginTop: '2px' }} className="hide-mobile">Compare</span>
          </button>

          {/* 2. Orders */}
          <button
            onClick={() => dispatch(setOrderHistoryOpen(true))}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: 'var(--robu-text-dark)',
              fontSize: '11px',
              fontWeight: 500
            }}
            title="My Orders"
          >
            <Package size={20} />
            <span style={{ marginTop: '2px' }} className="hide-mobile">Orders</span>
          </button>

          {/* 3. Track Order */}
          <button
            onClick={() => dispatch(setOrderHistoryOpen(true))}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: 'var(--robu-text-dark)',
              fontSize: '11px',
              fontWeight: 500
            }}
            title="Live Logistics Tracking"
          >
            <Truck size={20} color="var(--robu-primary-orange)" />
            <span style={{ marginTop: '2px' }} className="hide-mobile">Track</span>
          </button>

          {/* 4. Account / Login */}
          <button
            onClick={() => dispatch(setAuthModalOpen(true))}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: 'var(--robu-text-dark)',
              fontSize: '11px',
              fontWeight: 500
            }}
            title="User Account"
          >
            <User size={20} />
            <span style={{ marginTop: '2px' }} className="hide-mobile">
              {user ? user.name.split(' ')[0] : 'Account'}
            </span>
          </button>

          {/* 5. Wishlist */}
          <button
            onClick={() => dispatch(setWishlistOpen(true))}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              color: 'var(--robu-text-dark)',
              fontSize: '11px',
              fontWeight: 500
            }}
            title="Saved Wishlist"
          >
            <div style={{ position: 'relative' }}>
              <Heart 
                size={20} 
                color={wishlistItems.length > 0 ? "var(--robu-primary-orange)" : "currentColor"} 
                fill={wishlistItems.length > 0 ? "var(--robu-primary-orange)" : "none"} 
              />
              {wishlistItems.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-8px',
                  backgroundColor: 'var(--robu-primary-orange)',
                  color: '#FFFFFF',
                  borderRadius: '50%',
                  fontSize: '10px',
                  fontWeight: 700,
                  width: '16px',
                  height: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {wishlistItems.length}
                </span>
              )}
            </div>
            <span style={{ marginTop: '2px' }} className="hide-mobile">Wishlist</span>
          </button>

          {/* 6. Cart */}
          <button
            onClick={() => dispatch(toggleCart())}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'var(--robu-primary-orange)',
              color: '#FFFFFF',
              borderRadius: '8px',
              padding: '8px 14px',
              fontWeight: 600,
              fontSize: '13px',
              boxShadow: isCartBouncing 
                ? '0 0 16px rgba(239, 65, 35, 0.7), 0 4px 12px rgba(239, 65, 35, 0.4)' 
                : '0 2px 8px rgba(239, 65, 35, 0.25)',
              animation: isCartBouncing ? 'cartBounce 0.55s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
              transform: isCartBouncing ? 'scale(1.06)' : 'scale(1)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              position: 'relative'
            }}
            title="View Shopping Cart"
          >
            {/* Animated +1 Floating Bubble on Add */}
            {isCartBouncing && (
              <span style={{
                position: 'absolute',
                top: '-18px',
                right: '4px',
                color: '#10B981',
                fontWeight: 900,
                fontSize: '12px',
                background: '#FFFFFF',
                padding: '1px 6px',
                borderRadius: '999px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                animation: 'toastSlideIn 0.3s ease',
                pointerEvents: 'none',
                border: '1px solid #86EFAC'
              }}>
                +1
              </span>
            )}

            <div style={{ position: 'relative' }}>
              <ShoppingCart size={18} />
              {totalCartCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  backgroundColor: '#FFFFFF',
                  color: 'var(--robu-primary-orange)',
                  borderRadius: '50%',
                  fontSize: '10px',
                  fontWeight: 800,
                  width: '16px',
                  height: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                  animation: isCartBouncing ? 'badgePulse 0.5s ease' : 'none'
                }}>
                  {totalCartCount}
                </span>
              )}
            </div>
            <span className="hide-mobile">Cart</span>
          </button>
        </div>
      </div>
    </header>
  );
}
