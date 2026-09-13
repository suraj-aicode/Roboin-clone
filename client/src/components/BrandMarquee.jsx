import React from 'react';
import { Award } from 'lucide-react';

const BRANDS = [
  { name: 'Raspberry Pi', color: '#C51A4A', tag: 'Official Reseller' },
  { name: 'Arduino', color: '#00979C', tag: 'Official Partner' },
  { name: 'Bambu Lab', color: '#00AE42', tag: 'Authorized' },
  { name: 'Holybro', color: '#1E40AF', tag: 'FPV Systems' },
  { name: 'DFRobot', color: '#F97316', tag: 'Robotics Partner' },
  { name: 'Seeed Studio', color: '#10B981', tag: 'IoT Hardware' },
  { name: 'Espressif', color: '#E11D48', tag: 'ESP32 / ESP8266' },
  { name: 'STMicro', color: '#0284C7', tag: 'STM32 Micro' },
  { name: 'SpeedyBee', color: '#EAB308', tag: 'Drone Tech' },
  { name: 'Waveshare', color: '#6366F1', tag: 'Displays & SBC' },
  { name: 'FlySky', color: '#3B82F6', tag: 'RC Transmitters' },
  { name: 'Elegoo', color: '#8B5CF6', tag: '3D Printers' }
];

export default function BrandMarquee() {
  // Duplicate list to create seamless infinite loop
  const marqueeBrands = [...BRANDS, ...BRANDS];

  return (
    <section className="robu-container robu-section" style={{ overflow: 'hidden' }}>
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
          <span>Authorized Brand Partners</span>
        </h2>
        <span style={{ fontSize: '13px', color: 'var(--robu-text-muted)' }}>
          140+ Direct Global Manufacturers & Distributors
        </span>
      </div>

      <div style={{
        position: 'relative',
        backgroundColor: '#FFFFFF',
        borderRadius: '14px',
        border: '1px solid var(--robu-border)',
        padding: '20px 0',
        boxShadow: 'var(--robu-shadow-sm)',
        overflow: 'hidden'
      }}>
        {/* Left & Right Gradient Fade Mask */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: '60px',
          background: 'linear-gradient(to right, #FFFFFF, rgba(255,255,255,0))',
          zIndex: 2,
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '60px',
          background: 'linear-gradient(to left, #FFFFFF, rgba(255,255,255,0))',
          zIndex: 2,
          pointerEvents: 'none'
        }} />

        {/* Scrolling Track */}
        <div className="robu-marquee-track">
          {marqueeBrands.map((brand, idx) => (
            <div
              key={`${brand.name}-${idx}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 24px',
                margin: '0 8px',
                borderRadius: '8px',
                backgroundColor: 'var(--robu-bg-top)',
                border: '1px solid var(--robu-border-light)',
                flexShrink: 0,
                cursor: 'pointer',
                transition: 'transform 0.2s, background-color 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--robu-orange-light)';
                e.currentTarget.style.borderColor = 'var(--robu-primary-orange)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--robu-bg-top)';
                e.currentTarget.style.borderColor = 'var(--robu-border-light)';
              }}
            >
              {/* Brand Letter Circle */}
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: brand.color,
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '13px'
              }}>
                {brand.name.substring(0, 2).toUpperCase()}
              </div>

              <div>
                <div style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: 'var(--robu-text-heading)',
                  whiteSpace: 'nowrap'
                }}>
                  {brand.name}
                </div>
                <div style={{
                  fontSize: '10.5px',
                  color: 'var(--robu-text-muted)',
                  fontWeight: 600,
                  textTransform: 'uppercase'
                }}>
                  {brand.tag}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
