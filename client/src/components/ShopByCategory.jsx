import React from 'react';
import { useDispatch } from 'react-redux';
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
  ChevronRight
} from 'lucide-react';

const CATEGORIES_LIST = [
  { id: 'cat-1', name: 'Development Boards', slug: 'microcontrollers', count: '140+ Items', icon: Cpu, color: '#EF4123' },
  { id: 'cat-2', name: 'Drone Parts', slug: 'drone-parts', count: '220+ Items', icon: Compass, color: '#F97316' },
  { id: 'cat-3', name: 'Batteries & Power', slug: 'power-batteries', count: '95+ Items', icon: BatteryCharging, color: '#10B981' },
  { id: 'cat-4', name: '3D Printers & Parts', slug: '3d-printers', count: '80+ Items', icon: Printer, color: '#8B5CF6' },
  { id: 'cat-5', name: 'Sensors & Modules', slug: 'sensors', count: '310+ Items', icon: Radio, color: '#06B6D4' },
  { id: 'cat-6', name: 'Electronic Components', slug: 'electronic-components', count: '500+ Items', icon: Zap, color: '#EC4899' },
  { id: 'cat-7', name: 'Motors & Drivers', slug: 'motors-drivers', count: '160+ Items', icon: Bot, color: '#3B82F6' },
  { id: 'cat-8', name: 'Electronic Modules', slug: 'electronic-modules', count: '135+ Items', icon: Tv, color: '#6366F1' },
  { id: 'cat-9', name: 'IoT & Wireless', slug: 'iot-wireless', count: '110+ Items', icon: Wifi, color: '#14B8A6' },
  { id: 'cat-10', name: 'DIY & Maker Kits', slug: 'diy-kits', count: '65+ Items', icon: Flame, color: '#F59E0B' },
  { id: 'cat-11', name: 'EV Parts', slug: 'ev-parts', count: '45+ Items', icon: Car, color: '#84CC16' },
  { id: 'cat-12', name: 'Tools & Instruments', slug: 'tools', count: '90+ Items', icon: Wrench, color: '#64748B' }
];

export default function ShopByCategory() {
  const dispatch = useDispatch();

  const handleCategoryClick = (slug) => {
    dispatch(setActiveCategory(slug));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="robu-container robu-section">
      <div className="robu-section-header">
        <h2 className="robu-section-title">
          <span>Shop by Category</span>
        </h2>
        <a 
          href="#all-categories" 
          onClick={(e) => { e.preventDefault(); dispatch(setActiveCategory('all')); }}
          className="robu-view-all-link"
        >
          <span>View All Categories</span>
          <ChevronRight size={16} />
        </a>
      </div>

      {/* 6-Column x 2-Row Responsive Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
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
                borderRadius: '12px',
                border: '1px solid var(--robu-border)',
                overflow: 'hidden',
                cursor: 'pointer',
                textAlign: 'center',
                boxShadow: 'var(--robu-shadow-sm)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Solid Orange Card Top Banner */}
              <div style={{
                backgroundColor: 'var(--robu-primary-orange)',
                height: '74px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Subtle background circular accent */}
                <div style={{
                  position: 'absolute',
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  top: '-20px',
                  right: '-10px'
                }} />

                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--robu-primary-orange)',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.12)',
                  zIndex: 1
                }}>
                  <Icon size={24} />
                </div>
              </div>

              {/* Bottom Label & Item Count */}
              <div style={{ padding: '14px 10px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{
                  fontSize: '13.5px',
                  fontWeight: 700,
                  color: 'var(--robu-text-heading)',
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
            </div>
          );
        })}
      </div>
    </section>
  );
}
