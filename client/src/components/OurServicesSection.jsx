import React from 'react';
import { useDispatch } from 'react-redux';
import { setRFQModalOpen } from '../redux/slices/communitySlice';
import { 
  Printer, 
  Scissors, 
  Layers, 
  Cpu, 
  BatteryCharging, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

const SERVICES_LIST = [
  {
    id: 'fdm-3d',
    title: 'FDM 3D Printing',
    desc: 'Industrial FDM printing in PLA, PETG, ABS, TPU, Nylon & Carbon Fiber.',
    icon: Printer,
    category: 'Rapid Prototyping'
  },
  {
    id: 'non-metal-laser',
    title: 'Non-Metal Laser Cutting',
    desc: 'Precision laser cutting & engraving for Acrylic, MDF, Wood, Leather & Fabric.',
    icon: Scissors,
    category: 'CNC & Cutting'
  },
  {
    id: 'metal-laser',
    title: 'Metal Laser Cutting',
    desc: 'Fiber laser cutting for Stainless Steel (SS304), Mild Steel & Aluminum sheets.',
    icon: Layers,
    category: 'Sheet Metal'
  },
  {
    id: 'sla-3d',
    title: 'SLA 3D Printing',
    desc: 'Ultra-high resolution resin 3D printing with 25-micron layer detail.',
    icon: Sparkles,
    category: 'High-Precision Resin'
  },
  {
    id: 'pcb-mfg',
    title: 'PCB Manufacturing',
    desc: 'FR-4 multi-layer PCB fabrication, solder mask, silkscreen & SMT stencil.',
    icon: Cpu,
    category: 'Electronics Lab'
  },
  {
    id: 'battery-pack',
    title: 'Custom Battery Pack',
    desc: 'Lithium-Ion & LiFePO4 spot-welded packs with balance BMS & thermal protection.',
    icon: BatteryCharging,
    category: 'Power Engineering'
  }
];

export default function OurServicesSection() {
  const dispatch = useDispatch();

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
          <span>VoltCart On-Demand Custom Services</span>
        </h2>
        <button
          onClick={() => dispatch(setRFQModalOpen(true))}
          className="robu-btn-purple-outline"
        >
          <span>Request Custom Quote</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* 3x2 Grid of Dual-Split Service Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '20px'
      }}>
        {SERVICES_LIST.map((srv) => {
          const Icon = srv.icon;
          return (
            <div
              key={srv.id}
              className="robu-card-lift"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid var(--robu-border)',
                overflow: 'hidden',
                display: 'flex',
                boxShadow: 'var(--robu-shadow-sm)',
                minHeight: '160px'
              }}
            >
              {/* Left Details & Order Now CTA */}
              <div style={{
                flex: 1,
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: 'var(--robu-primary-orange)',
                    letterSpacing: '0.5px',
                    marginBottom: '4px'
                  }}>
                    {srv.category}
                  </div>
                  <h3 style={{
                    fontSize: '17px',
                    fontWeight: 700,
                    color: 'var(--robu-text-heading)',
                    marginBottom: '6px'
                  }}>
                    {srv.title}
                  </h3>
                  <p style={{
                    fontSize: '12.5px',
                    color: 'var(--robu-text-muted)',
                    lineHeight: '1.4'
                  }}>
                    {srv.desc}
                  </p>
                </div>

                <div style={{ marginTop: '14px' }}>
                  <button
                    onClick={() => dispatch(setRFQModalOpen(true))}
                    style={{
                      backgroundColor: 'var(--robu-purple)',
                      color: '#FFFFFF',
                      fontSize: '12.5px',
                      fontWeight: 700,
                      padding: '8px 18px',
                      borderRadius: '6px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--robu-purple-hover)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--robu-purple)'}
                  >
                    <span>Order Now</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>

              {/* Right Solid Orange Block with White Line Art Icon */}
              <div style={{
                width: '120px',
                backgroundColor: 'var(--robu-primary-orange)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                flexShrink: 0,
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Decorative background curve */}
                <div style={{
                  position: 'absolute',
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  top: '-20px',
                  right: '-30px'
                }} />

                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1
                }}>
                  <Icon size={32} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
