import React from 'react';
import { Truck, Headphones, Award, ShieldCheck } from 'lucide-react';

const TRUST_ITEMS = [
  {
    id: 1,
    title: 'Same Day Shipping',
    desc: 'Orders placed before 4:00 PM are dispatched on the same day across India.',
    icon: Truck,
    accentColor: 'var(--robu-primary-orange)',
    bgColor: '#FFF4EE'
  },
  {
    id: 2,
    title: 'Dedicated Customer Support',
    desc: 'Experienced engineers available Mon - Sat (9:00 AM - 6:00 PM) to help you.',
    icon: Headphones,
    accentColor: 'var(--robu-primary-purple)',
    bgColor: 'var(--robu-purple-light)'
  },
  {
    id: 3,
    title: '140+ Authorized Global Brands',
    desc: '100% genuine components direct from Arduino, Raspberry Pi, Bambu Lab & more.',
    icon: Award,
    accentColor: '#059669',
    bgColor: '#ECFDF5'
  }
];

export default function TrustBadges() {
  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderTop: '1px solid var(--robu-border-card)',
      borderBottom: '1px solid var(--robu-border-card)',
      padding: '24px 0',
      marginBottom: '32px'
    }}>
      <div className="robu-container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          {TRUST_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px 20px',
                  borderRadius: '8px',
                  backgroundColor: '#F8F9FA',
                  border: '1px solid #EAEAEA',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  backgroundColor: item.bgColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: item.accentColor,
                  flexShrink: 0
                }}>
                  <Icon size={22} />
                </div>
                <div>
                  <div style={{
                    fontSize: '15px',
                    fontWeight: 700,
                    color: 'var(--robu-text-dark)',
                    marginBottom: '2px'
                  }}>
                    {item.title}
                  </div>
                  <div style={{
                    fontSize: '12px',
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

