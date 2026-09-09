import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
  X
} from 'lucide-react';

export const ROBU_TOP_CATEGORIES = [
  { id: 'drone-parts', name: 'Drone Parts', slug: 'drone-parts', icon: Compass },
  { id: 'batteries-power', name: 'Batteries & Power Supply', slug: 'power-batteries', icon: BatteryCharging },
  { id: '3d-printers-parts', name: '3D Printers & Parts', slug: '3d-printers', icon: Printer },
  { id: 'sensors', name: 'Sensors', slug: 'sensors', icon: Radio },
  { id: 'electronic-components', name: 'Electronic Components', slug: 'electronic-components', icon: Zap },
  { id: 'motors-drivers', name: 'Motors/Drivers/Actuators', slug: 'motors-drivers', icon: Bot },
  { id: 'electronic-modules', name: 'Electronic Modules', slug: 'electronic-modules', icon: Cpu },
  { id: 'development-boards', name: 'Development Boards', slug: 'microcontrollers', icon: Cpu },
  { id: 'iot-wireless', name: 'IoT & Wireless', slug: 'iot-wireless', icon: Radio },
  { id: 'diy-kits', name: 'DIY & Maker Kits', slug: 'diy-kits', icon: Flame },
  { id: 'ev-parts', name: 'Electric Vehicle Parts', slug: 'ev-parts', icon: Car }
];

export default function StickyCategoryNav() {
  const dispatch = useDispatch();
  const { activeCategory } = useSelector((state) => state.products);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const navContainerRef = React.useRef(null);

  const handleSelectCategory = (slug) => {
    dispatch(setActiveCategory(slug));
    setDropdownOpen(false);
    setMobileDrawerOpen(false);
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
      backgroundColor: 'var(--robu-bg-top)',
      borderBottom: '1px solid var(--robu-border)',
      boxShadow: '0 2px 8px rgba(15, 23, 42, 0.05)'
    }}>
      <div className="robu-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '48px',
        position: 'relative'
      }}>
        {/* "All Categories" Hamburger Pill Button */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <button
            onClick={toggleCategories}
            style={{
              backgroundColor: '#E2E8F0',
              color: '#1E1B4B',
              borderRadius: '8px',
              padding: '8px 16px',
              fontSize: '13.5px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}
          >
            <Menu size={16} color="var(--robu-purple)" />
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
              borderRadius: '10px',
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
                  fontWeight: activeCategory === 'all' || activeCategory === 'cat-all' ? 700 : 500,
                  color: activeCategory === 'all' ? 'var(--robu-primary-orange)' : 'var(--robu-text-dark)',
                  backgroundColor: activeCategory === 'all' ? 'var(--robu-orange-light)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
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
                      gap: '10px'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.backgroundColor = 'var(--robu-bg-top)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <Icon size={15} color={isActive ? "var(--robu-primary-orange)" : "var(--robu-text-muted)"} />
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Horizontal Scrolling Row of Category Links */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '18px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          padding: '0 16px',
          flex: 1,
          whiteSpace: 'nowrap'
        }}>
          {ROBU_TOP_CATEGORIES.map(cat => {
            const isActive = activeCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => handleSelectCategory(cat.slug)}
                style={{
                  fontSize: '13px',
                  fontWeight: isActive ? 700 : 600,
                  color: isActive ? 'var(--robu-primary-orange)' : 'var(--robu-text-dark)',
                  borderBottom: isActive ? '2px solid var(--robu-primary-orange)' : '2px solid transparent',
                  padding: '12px 2px',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = 'var(--robu-primary-orange)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = 'var(--robu-text-dark)';
                }}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* "Sell on Robu" Link on the Right */}
        <a
          href="#sell-on-robu"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            fontWeight: 700,
            color: 'var(--robu-purple)',
            flexShrink: 0,
            padding: '6px 12px',
            borderRadius: '6px',
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--robu-border)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--robu-purple)';
            e.currentTarget.style.color = '#FFFFFF';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#FFFFFF';
            e.currentTarget.style.color = 'var(--robu-purple)';
          }}
        >
          <Store size={14} />
          <span>Sell on Robu</span>
        </a>
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
