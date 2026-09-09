import React from 'react';
import { Cpu, Printer, Scissors, BatteryCharging, ArrowUpRight } from 'lucide-react';

const QUICK_SERVICES = [
  {
    id: 'pcb',
    title: 'PCB Manufacturing',
    subtitle: 'From ₹199 | 24-hr Turnaround',
    bgTint: 'var(--robu-service-pcb)',
    accentColor: '#C2410C',
    icon: Cpu
  },
  {
    id: '3d-printing',
    title: '3D Printing Service',
    subtitle: 'FDM, SLA & SLS Rapid Prototyping',
    bgTint: 'var(--robu-service-3d)',
    accentColor: '#6B21A8',
    icon: Printer
  },
  {
    id: 'laser-cutting',
    title: 'Laser Cutting',
    subtitle: 'Acrylic, MDF, Wood & Metal',
    bgTint: 'var(--robu-service-laser)',
    accentColor: '#047857',
    icon: Scissors
  },
  {
    id: 'battery-pack',
    title: 'Custom Battery Pack',
    subtitle: 'Lithium-ion & LiFePO4 with BMS',
    bgTint: 'var(--robu-service-battery)',
    accentColor: '#0369A1',
    icon: BatteryCharging
  }
];

export default function ServiceQuickStrip() {
  return (
    <div className="robu-container" style={{ marginBottom: '32px' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '16px'
      }}>
        {QUICK_SERVICES.map((srv) => {
          const Icon = srv.icon;
          return (
            <a
              key={srv.id}
              href={`#service-${srv.id}`}
              className="robu-card-lift"
              style={{
                backgroundColor: srv.bgTint,
                borderRadius: '12px',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '1px solid rgba(0,0,0,0.04)',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  backgroundColor: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: srv.accentColor,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
                }}>
                  <Icon size={22} />
                </div>
                <div>
                  <div style={{
                    fontSize: '15px',
                    fontWeight: 700,
                    color: 'var(--robu-text-heading)',
                    marginBottom: '2px'
                  }}>
                    {srv.title}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: 'var(--robu-text-muted)',
                    fontWeight: 500
                  }}>
                    {srv.subtitle}
                  </div>
                </div>
              </div>

              <div style={{
                color: srv.accentColor,
                opacity: 0.75
              }}>
                <ArrowUpRight size={18} />
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
