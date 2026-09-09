import React from 'react';
import { Truck, Headphones, Award } from 'lucide-react';

const TRUST_ITEMS = [
  {
    id: 1,
    title: 'Same Day Shipping',
    desc: 'Orders placed before 3:00 PM are dispatched on the same business day across India.',
    icon: Truck,
    iconColor: 'var(--robu-primary-orange)'
  },
  {
    id: 2,
    title: 'Dedicated Customer Service',
    desc: 'Trained technical support from engineers to assist with wiring, firmware & troubleshooting.',
    icon: Headphones,
    iconColor: 'var(--robu-purple)'
  },
  {
    id: 3,
    title: '140+ Authorized Brands',
    desc: 'Direct distributor for Arduino, Raspberry Pi, Bambu Lab, Holybro, STMicro & DFRobot.',
    icon: Award,
    iconColor: '#059669'
  }
];

export default function TrustBadges() {
  return (
    <div style={{
      backgroundColor: 'var(--robu-bg-top)',
      borderTop: '1px solid var(--robu-border)',
      borderBottom: '1px solid var(--robu-border)',
      padding: '36px 0',
      margin: '40px 0'
    }}>
      <div className="robu-container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {TRUST_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                  backgroundColor: '#FFFFFF',
                  padding: '20px 24px',
                  borderRadius: '12px',
                  border: '1px solid var(--robu-border)',
                  boxShadow: 'var(--robu-shadow-sm)'
                }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--robu-bg-top)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: item.iconColor,
                  flexShrink: 0
                }}>
                  <Icon size={24} />
                </div>
                <div>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: 'var(--robu-text-heading)',
                    marginBottom: '4px'
                  }}>
                    {item.title}
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: 'var(--robu-text-muted)',
                    lineHeight: '1.4'
                  }}>
                    {item.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
