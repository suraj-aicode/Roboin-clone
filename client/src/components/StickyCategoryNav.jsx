import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setActiveCategory } from '../redux/slices/productSlice';
import { 
  Menu, 
  ChevronDown, 
  Cpu, 
  BatteryCharging, 
  Printer, 
  Radio, 
  Zap, 
  Flame, 
  Car, 
  Bot, 
  Compass, 
  Store,
  X,
  Tv,
  Wifi,
  Wrench
} from 'lucide-react';

export const ROBU_TOP_CATEGORIES = [
  { id: 'development-boards', name: 'Development Boards', slug: 'microcontrollers', icon: Cpu },
  { id: 'drone-parts', name: 'Drone Parts', slug: 'drone-parts', icon: Compass },
  { id: 'batteries-power', name: 'Batteries & Power Supply', slug: 'power-batteries', icon: BatteryCharging },
  { id: '3d-printers-parts', name: '3D Printers & Parts', slug: '3d-printers', icon: Printer },
  { id: 'sensors', name: 'Sensors & Modules', slug: 'sensors', icon: Radio },
  { id: 'electronic-components', name: 'Electronic Components', slug: 'electronic-components', icon: Zap },
  { id: 'motors-drivers', name: 'Motors & Drivers', slug: 'motors-drivers', icon: Bot },
  { id: 'electronic-modules', name: 'Electronic Modules', slug: 'electronic-modules', icon: Tv },
  { id: 'iot-wireless', name: 'IoT & Wireless', slug: 'iot-wireless', icon: Wifi },
  { id: 'diy-kits', name: 'DIY & Maker Kits', slug: 'diy-kits', icon: Flame },
  { id: 'ev-parts', name: 'Electric Vehicle Parts', slug: 'ev-parts', icon: Car },
  { id: 'tools', name: 'Tools & Instruments', slug: 'tools', icon: Wrench }
];

export default function StickyCategoryNav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { activeCategory } = useSelector((state) => state.products);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const navContainerRef = React.useRef(null);

  const handleSelectCategory = (slug) => {
    dispatch(setActiveCategory(slug));
    setDropdownOpen(false);
    setMobileDrawerOpen(false);
    navigate(`/category/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleCategories = () => {
    if (window.innerWidth < 768) {
      setMobileDrawerOpen(!mobileDrawerOpen);
      setDropdownOpen(false);
    } else {
      setDropdownOpen(!dropdownOpen);
      setMobileDrawerOpen(false);
    }
  };

  React.useEffect(() => {
    function handleClickOutside(e) {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav 
      ref={navContainerRef}
      style={{
      position: 'sticky',
      top: 0,
      zIndex: 90,
      backgroundColor: 'rgba(255, 255, 255, 0.94)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--robu-border)',
      boxShadow: '0 4px 16px -2px rgba(15, 23, 42, 0.05)'
    }}>
      <div className="robu-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '48px',
        position: 'relative'
      }}>
        {/* "All Categories" Solid Robu Purple Button */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <button
            onClick={toggleCategories}
            style={{
              backgroundColor: 'var(--robu-primary-purple)',
              color: '#FFFFFF',
              borderRadius: '6px',
              padding: '8px 16px',
              fontSize: '13.5px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              border: 'none',
              boxShadow: '0 2px 8px rgba(56, 6, 128, 0.25)',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--robu-purple-hover)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--robu-primary-purple)'}
          >
            <Menu size={16} color="#FFFFFF" />
            <span>All Categories</span>
            <ChevronDown size={14} style={{
              transform: dropdownOpen ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.2s'
            }} />
          </button>

          {/* Desktop Dropdown Menu */}
          {dropdownOpen && (
            <div style={{
              position: 'absolute',
              top: 'calc(100% + 6px)',
              left: 0,
              width: '280px',
              backgroundColor: '#FFFFFF',
              borderRadius: '8px',
              border: '1px solid var(--robu-border)',
              boxShadow: '0 12px 28px rgba(15, 23, 42, 0.12)',
              padding: '8px 0',
              zIndex: 999
            }}>
              <button
                onClick={() => handleSelectCategory('all')}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '9px 16px',
                  fontSize: '13px',
                  fontWeight: activeCategory === 'all' || activeCategory === 'cat-all' ? 700 : 600,
                  color: activeCategory === 'all' ? 'var(--robu-primary-orange)' : 'var(--robu-text-dark)',
                  backgroundColor: activeCategory === 'all' ? 'var(--robu-orange-light)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <Zap size={15} color="var(--robu-primary-orange)" />
                <span>All Products Catalog</span>
              </button>

              <div style={{ height: '1px', backgroundColor: 'var(--robu-border-light)', margin: '4px 0' }} />

              {ROBU_TOP_CATEGORIES.map(cat => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.slug;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleSelectCategory(cat.slug)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '8px 16px',
                      fontSize: '13px',
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? 'var(--robu-primary-orange)' : 'var(--robu-text-body)',
                      backgroundColor: isActive ? 'var(--robu-orange-light)' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.backgroundColor = 'var(--robu-bg-top)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <Icon size={15} color={isActive ? "var(--robu-primary-orange)" : "#9CA3AF"} />
                    <span style={{ flex: 1 }}>{cat.name}</span>
                    <span style={{ color: '#D1D5DB', fontSize: '11px' }}>›</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Horizontal Navigation Links */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          padding: '0 20px',
          flex: 1,
          whiteSpace: 'nowrap'
        }}>
          <button
            onClick={() => navigate('/')}
            style={{
              fontSize: '13.5px',
              fontWeight: 700,
              color: 'var(--robu-primary-orange)',
              borderBottom: '2px solid var(--robu-primary-orange)',
              padding: '12px 2px',
              cursor: 'pointer',
              flexShrink: 0,
              background: 'none',
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none'
            }}
          >
            Home
          </button>

          <button
            onClick={() => handleSelectCategory('all')}
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--robu-text-dark)',
              border: 'none',
              background: 'none',
              padding: '12px 2px',
              cursor: 'pointer',
              flexShrink: 0
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--robu-primary-orange)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--robu-text-dark)'}
          >
            Shop
          </button>

          <button
            onClick={() => navigate('/b2b-quote')}
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--robu-text-dark)',
              border: 'none',
              background: 'none',
              padding: '12px 2px',
              cursor: 'pointer',
              flexShrink: 0
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--robu-primary-orange)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--robu-text-dark)'}
          >
            Bulk Enquiry
          </button>

          <button
            onClick={() => navigate('/tutorials')}
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--robu-text-dark)',
              border: 'none',
              background: 'none',
              padding: '12px 2px',
              cursor: 'pointer',
              flexShrink: 0
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--robu-primary-orange)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--robu-text-dark)'}
          >
            Blogs & Tutorials
          </button>

          {/* Quick Categories */}
          {ROBU_TOP_CATEGORIES.slice(0, 5).map(cat => (
            <button
              key={cat.id}
              onClick={() => handleSelectCategory(cat.slug)}
              style={{
                fontSize: '13px',
                fontWeight: activeCategory === cat.slug ? 700 : 500,
                color: activeCategory === cat.slug ? 'var(--robu-primary-orange)' : 'var(--robu-text-body)',
                border: 'none',
                background: 'none',
                padding: '12px 2px',
                cursor: 'pointer',
                flexShrink: 0
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--robu-primary-orange)'}
              onMouseLeave={(e) => {
                if (activeCategory !== cat.slug) e.currentTarget.style.color = 'var(--robu-text-body)';
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* "Sell on Robu" Button on the Right */}
        <button
          onClick={() => navigate('/b2b-quote')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            fontWeight: 700,
            color: 'var(--robu-primary-purple)',
            flexShrink: 0,
            padding: '6px 14px',
            borderRadius: '6px',
            backgroundColor: '#FFFFFF',
            border: '1.5px solid var(--robu-primary-purple)',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--robu-primary-purple)';
            e.currentTarget.style.color = '#FFFFFF';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#FFFFFF';
            e.currentTarget.style.color = 'var(--robu-primary-purple)';
          }}
        >
          <Store size={15} />
          <span>Sell on VoltCart</span>
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileDrawerOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 1000,
          display: 'flex'
        }}>
          <div style={{
            width: '280px',
            height: '100%',
            backgroundColor: '#FFFFFF',
            padding: '20px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontWeight: 800, fontSize: '18px', color: 'var(--robu-text-heading)' }}>All Categories</span>
              <button onClick={() => setMobileDrawerOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <button
              onClick={() => handleSelectCategory('all')}
              style={{
                textAlign: 'left',
                padding: '10px 12px',
                fontSize: '14px',
                fontWeight: 600,
                borderRadius: '6px',
                backgroundColor: activeCategory === 'all' ? 'var(--robu-orange-light)' : 'transparent',
                color: activeCategory === 'all' ? 'var(--robu-primary-orange)' : 'var(--robu-text-heading)'
              }}
            >
              All Products Catalog
            </button>

            {ROBU_TOP_CATEGORIES.map(c => (
              <button
                key={c.id}
                onClick={() => handleSelectCategory(c.slug)}
                style={{
                  textAlign: 'left',
                  padding: '10px 12px',
                  fontSize: '14px',
                  fontWeight: 500,
                  borderRadius: '6px',
                  backgroundColor: activeCategory === c.slug ? 'var(--robu-orange-light)' : 'transparent',
                  color: activeCategory === c.slug ? 'var(--robu-primary-orange)' : 'var(--robu-text-body)'
                }}
              >
                {c.name}
              </button>
            ))}
          </div>
          <div style={{ flex: 1 }} onClick={() => setMobileDrawerOpen(false)} />
        </div>
      )}
    </nav>
  );
}
