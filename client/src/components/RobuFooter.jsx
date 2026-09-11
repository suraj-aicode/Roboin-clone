import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  ArrowUp, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2 
} from 'lucide-react';

export default function RobuFooter() {
  const [subscribed, setSubscribed] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setFirstName('');
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      backgroundColor: 'var(--robu-bg-footer)',
      borderTop: '1px solid var(--robu-border)',
      marginTop: '60px',
      color: 'var(--robu-text-dark)'
    }}>
      {/* 1. Top Newsletter Strip */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid var(--robu-border)',
        padding: '32px 0'
      }}>
        <div className="robu-container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 800,
              color: 'var(--robu-text-heading)',
              marginBottom: '4px'
            }}>
              Join VoltCart Maker Club Newsletter
            </h3>
            <p style={{ fontSize: '13.5px', color: 'var(--robu-text-muted)' }}>
              Get weekly robotics tutorials, coupon drops, and new board launch alerts.
            </p>
          </div>

          {subscribed ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#059669',
              fontWeight: 700,
              fontSize: '14px',
              backgroundColor: '#ECFDF5',
              padding: '10px 20px',
              borderRadius: '8px'
            }}>
              <CheckCircle2 size={18} />
              <span>Thank you! Welcome to the VoltCart Maker Club.</span>
            </div>
          ) : (
            <form 
              onSubmit={handleSubscribe}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                flexWrap: 'wrap'
              }}
            >
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid var(--robu-border)',
                  fontSize: '13.5px',
                  outline: 'none',
                  width: '160px'
                }}
              />
              <input
                type="email"
                placeholder="Your Email Address"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid var(--robu-border)',
                  fontSize: '13.5px',
                  outline: 'none',
                  width: '220px'
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: 'var(--robu-purple)',
                  color: '#FFFFFF',
                  padding: '10px 22px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--robu-purple-hover)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--robu-purple)'}
              >
                <span>Subscribe</span>
                <Send size={14} />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* 2. 5 Main Footer Columns */}
      <div className="robu-container" style={{ padding: '48px 24px 36px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '36px'
        }}>
          {/* Col 1: Brand & Contact Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: 'linear-gradient(135deg, var(--robu-primary-orange) 0%, #EA580C 100%)',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: '16px'
              }}>
                ⚡
              </div>
              <span style={{ fontWeight: 800, fontSize: '20px', color: 'var(--robu-text-heading)' }}>
                VOLT<span style={{ color: 'var(--robu-primary-orange)' }}>CART</span>
              </span>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--robu-text-muted)', lineHeight: '1.5', marginBottom: '16px' }}>
              India's premier online marketplace for DIY electronics, robotics, 3D printers, sensors, and mechanical components.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: 'var(--robu-text-body)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={15} color="var(--robu-primary-orange)" />
                <span style={{ fontWeight: 600 }}>1800 266 6123 (Toll Free)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={15} color="var(--robu-purple)" />
                <span>support@voltcart.in</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <MapPin size={15} color="var(--robu-text-muted)" style={{ marginTop: '2px', flexShrink: 0 }} />
                <span>VoltCart Technologies, S. No. 34, Katraj-Dehu Road, Pune, Maharashtra 411046</span>
              </div>
            </div>

            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '18px' }}>
              {[
                { name: 'Facebook', href: '#facebook', color: '#1877F2', path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
                { name: 'X / Twitter', href: '#twitter', color: '#1E293B', path: 'M4 4l16 16M4 20L20 4' },
                { name: 'LinkedIn', href: '#linkedin', color: '#0A66C2', path: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z' },
                { name: 'YouTube', href: '#youtube', color: '#FF0000', path: 'M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z' }
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  title={s.name}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--robu-text-muted)',
                    border: '1px solid var(--robu-border)',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = s.color}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--robu-text-muted)'}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Information */}
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--robu-text-heading)', marginBottom: '14px' }}>
              Information
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13.5px', color: 'var(--robu-text-muted)' }}>
              <li><a href="#about" style={{ hover: { color: 'var(--robu-primary-orange)' } }}>About VoltCart</a></li>
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#bulk">Bulk & RFQ Enquiry</a></li>
              <li><a href="#careers">Careers @ VoltCart</a></li>
              <li><a href="#sell">Sell on VoltCart</a></li>
              <li><a href="#lab">VoltCart Tech Lab</a></li>
              <li><a href="#bom">BOM Tool Upload</a></li>
            </ul>
          </div>

          {/* Col 3: My Account */}
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--robu-text-heading)', marginBottom: '14px' }}>
              My Account
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13.5px', color: 'var(--robu-text-muted)' }}>
              <li><a href="#orders">My Orders</a></li>
              <li><a href="#track">Track Shipment</a></li>
              <li><a href="#cart">Shopping Cart</a></li>
              <li><a href="#wishlist">Saved Wishlist</a></li>
              <li><a href="#compare">Compare Specifications</a></li>
              <li><a href="#tickets">Support Tickets</a></li>
              <li><a href="#tax-invoices">GST Tax Invoices</a></li>
            </ul>
          </div>

          {/* Col 4: On-Demand Services */}
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--robu-text-heading)', marginBottom: '14px' }}>
              Custom Services
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13.5px', color: 'var(--robu-text-muted)' }}>
              <li><a href="#3d">FDM 3D Printing</a></li>
              <li><a href="#sla">SLA Resin 3D Printing</a></li>
              <li><a href="#laser-metal">Metal Laser Cutting</a></li>
              <li><a href="#laser-nonmetal">Non-Metal Laser Cutting</a></li>
              <li><a href="#pcb">PCB Fabrication & Stencil</a></li>
              <li><a href="#battery">Custom Li-ion Battery Packs</a></li>
            </ul>
          </div>

          {/* Col 5: Policies & Tax */}
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--robu-text-heading)', marginBottom: '14px' }}>
              Policies & Tax
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13.5px', color: 'var(--robu-text-muted)' }}>
              <li><a href="#gst-compliance">GST Tax Compliance (HSN/SAC)</a></li>
              <li><a href="#shipping-policy">Shipping & Same-Day Dispatch</a></li>
              <li><a href="#returns-policy">Return & Replacement Policy</a></li>
              <li><a href="#privacy-policy">Privacy & Cookie Policy</a></li>
              <li><a href="#terms-conditions">Terms & Conditions</a></li>
              <li><a href="#b2b-itc">B2B Input Tax Credit (ITC)</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Bottom Copyright Bar & Badges */}
      <div style={{
        borderTop: '1px solid var(--robu-border)',
        backgroundColor: '#FFFFFF',
        padding: '18px 0',
        fontSize: '12.5px',
        color: 'var(--robu-text-muted)'
      }}>
        <div className="robu-container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div>
            © 2026 VoltCart Technologies Pvt Ltd. All rights reserved. Registered under Indian Companies Act.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#059669', fontWeight: 600 }}>
              <ShieldCheck size={16} />
              <span>100% Secure 256-Bit SSL Checkout</span>
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontWeight: 600, color: 'var(--robu-text-dark)' }}>Payment Methods:</span>
              <span style={{ backgroundColor: 'var(--robu-bg-top)', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}>UPI</span>
              <span style={{ backgroundColor: 'var(--robu-bg-top)', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}>RuPay</span>
              <span style={{ backgroundColor: 'var(--robu-bg-top)', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}>Visa</span>
              <span style={{ backgroundColor: 'var(--robu-bg-top)', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}>Mastercard</span>
              <span style={{ backgroundColor: 'var(--robu-bg-top)', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}>NetBanking</span>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Floating Button */}
      <button
        onClick={scrollToTop}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '42px',
          height: '42px',
          borderRadius: '50%',
          backgroundColor: 'var(--robu-purple)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(59, 1, 135, 0.35)',
          zIndex: 90,
          cursor: 'pointer'
        }}
        title="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
}
