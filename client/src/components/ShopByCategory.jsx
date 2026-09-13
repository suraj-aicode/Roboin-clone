import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setActiveCategory } from '../redux/slices/productSlice';
import { 
  Cpu, 
  Compass, 
  BatteryCharging, 
  Printer, 
  Radio, 
  Zap, 
  Bot, 
  Tv, 
  Wifi, 
  Flame, 
  Car, 
  Wrench,
  ChevronRight,
  Sparkles
} from 'lucide-react';

const CATEGORIES_LIST = [
  { id: 'cat-1', name: 'Development Boards', slug: 'microcontrollers', count: '140+ Items', icon: Cpu, color: '#FF5500', gradient: 'linear-gradient(135deg, #FF6B00 0%, #EF4123 100%)' },
  { id: 'cat-2', name: 'Drone Parts & Motors', slug: 'drone-parts', count: '220+ Items', icon: Compass, color: '#F97316', gradient: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)' },
  { id: 'cat-3', name: 'Batteries & BMS', slug: 'power-batteries', count: '95+ Items', icon: BatteryCharging, color: '#10B981', gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' },
  { id: 'cat-4', name: '3D Printers & Parts', slug: '3d-printers', count: '80+ Items', icon: Printer, color: '#8B5CF6', gradient: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)' },
  { id: 'cat-5', name: 'Sensors & Modules', slug: 'sensors', count: '310+ Items', icon: Radio, color: '#06B6D4', gradient: 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)' },
  { id: 'cat-6', name: 'Electronic Components', slug: 'electronic-components', count: '500+ Items', icon: Zap, color: '#EC4899', gradient: 'linear-gradient(135deg, #EC4899 0%, #BE185D 100%)' },
  { id: 'cat-7', name: 'Motors & ESC Drivers', slug: 'motors-drivers', count: '160+ Items', icon: Bot, color: '#3B82F6', gradient: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)' },
  { id: 'cat-8', name: 'Wireless & Audio Modules', slug: 'electronic-modules', count: '135+ Items', icon: Tv, color: '#6366F1', gradient: 'linear-gradient(135deg, #6366F1 0%, #4338CA 100%)' },
  { id: 'cat-9', name: 'IoT & LoRa Wireless', slug: 'iot-wireless', count: '110+ Items', icon: Wifi, color: '#14B8A6', gradient: 'linear-gradient(135deg, #14B8A6 0%, #0F766E 100%)' },
  { id: 'cat-10', name: 'DIY & Maker Kits', slug: 'diy-kits', count: '65+ Items', icon: Flame, color: '#F59E0B', gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' },
  { id: 'cat-11', name: 'Electric Vehicle Parts', slug: 'ev-parts', count: '45+ Items', icon: Car, color: '#84CC16', gradient: 'linear-gradient(135deg, #84CC16 0%, #4D7C0F 100%)' },
  { id: 'cat-12', name: 'Lab Tools & Meters', slug: 'tools', count: '90+ Items', icon: Wrench, color: '#64748B', gradient: 'linear-gradient(135deg, #64748B 0%, #334155 100%)' }
];

export default function ShopByCategory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCategoryClick = (slug) => {
    dispatch(setActiveCategory(slug));
    navigate(`/category/${slug}`);
  };

  return (
    <section className="robu-container robu-section">
      <div className="robu-section-header">
        <h2 className="robu-section-title">
          <span style={{
            display: 'inline-block',
            width: '6px',
            height: '24px',
            backgroundColor: 'var(--robu-primary-orange)',
            borderRadius: '3px',
            marginRight: '4px'
          }} />
          <span>Shop by Category</span>
        </h2>
        <button 
          onClick={() => {
            dispatch(setActiveCategory('all'));
            navigate('/category/all');
          }}
          className="robu-view-all-link"
          style={{
            backgroundColor: 'var(--robu-purple-light)',
            color: 'var(--robu-primary-purple)',
            fontWeight: 700,
            fontSize: '13px',
            padding: '6px 16px',
            borderRadius: '6px',
            border: '1px solid var(--robu-purple-border)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <span>View All Categories</span>
          <ChevronRight size={15} />
        </button>
      </div>

      {/* 6-Column Responsive Grid matching Robu */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
        gap: '16px'
      }}>
        {CATEGORIES_LIST.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.slug)}
              className="robu-card-lift"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '8px',
                border: '1px solid var(--robu-border-card)',
                overflow: 'hidden',
                cursor: 'pointer',
                textAlign: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.22s ease',
                position: 'relative'
              }}
            >
              {/* Category Icon Container */}
              <div style={{
                background: 'linear-gradient(180deg, #F8F9FB 0%, #FFFFFF 100%)',
                height: '90px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottom: '1px solid #F1F3F5',
                position: 'relative'
              }}>
                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: cat.color || 'var(--robu-primary-orange)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                  border: '1px solid #EAEAEA',
                  transition: 'transform 0.2s ease'
                }}>
                  <Icon size={26} />
                </div>
              </div>

              {/* Bottom Label & Item Count */}
              <div style={{ padding: '14px 10px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{
                  fontSize: '13.5px',
                  fontWeight: 700,
                  color: 'var(--robu-text-dark)',
                  marginBottom: '4px',
                  lineHeight: '1.3'
                }}>
                  {cat.name}
                </div>
                <div style={{
                  fontSize: '11.5px',
                  color: 'var(--robu-text-muted)',
                  fontWeight: 500
                }}>
                  {cat.count}
                </div>
              </div>

              {/* Subtle bottom orange indicator bar on hover */}
              <div style={{
                height: '3px',
                width: '100%',
                backgroundColor: 'transparent',
                transition: 'background-color 0.2s'
              }} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
