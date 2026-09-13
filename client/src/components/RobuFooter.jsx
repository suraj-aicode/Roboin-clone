import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  ArrowUp, 
  ShieldCheck, 
  CheckCircle2,
  Clock,
  FileText
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
      backgroundColor: '#1E1E24',
      borderTop: '1px solid #2E2E38',
      marginTop: '60px',
      color: '#A0A5B5'
    }}>
      {/* 1. Official Robu Newsletter Strip */}
      <div style={{
        backgroundColor: '#26262E',
        borderBottom: '1px solid #32323D',
        padding: '36px 0'
      }}>
        <div className="robu-container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '24px'
        }}>
          <div>
            <div style={{
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: 'var(--robu-primary-orange)',
              marginBottom: '4px'
            }}>
              Stay Updated with Robu
            </div>
            <h3 style={{
              fontSize: '22px',
              fontWeight: 800,
              color: '#FFFFFF',
              marginBottom: '4px'
            }}>
              Join Our Maker & Engineering Community
            </h3>
            <p style={{ fontSize: '13.5px', color: '#9CA3AF' }}>
              Receive weekly component releases, maker guides, and special promotional discounts directly in your inbox.
            </p>
          </div>

          {subscribed ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#34D399',
              fontWeight: 700,
              fontSize: '14px',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              padding: '12px 24px',
              borderRadius: '8px',
              border: '1px solid rgba(16, 185, 129, 0.3)'
            }}>
              <CheckCircle2 size={20} />
              <span>Thank you! Welcome to the Robu.in community.</span>
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
                  padding: '11px 16px',
                  borderRadius: '6px',
                  border: '1px solid #3F3F4E',
                  backgroundColor: '#1E1E24',
                  color: '#FFFFFF',
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
                  padding: '11px 16px',
                  borderRadius: '6px',
                  border: '1px solid #3F3F4E',
                  backgroundColor: '#1E1E24',
                  color: '#FFFFFF',
                  fontSize: '13.5px',
                  outline: 'none',
                  width: '240px'
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: 'var(--robu-primary-purple)',
                  color: '#FFFFFF',
                  padding: '11px 24px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--robu-purple-hover)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--robu-primary-purple)'}
              >
                <span>Subscribe</span>
                <Send size={15} />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* 2. Main 5 Footer Columns */}
      <div className="robu-container" style={{ padding: '52px 24px 36px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '36px'
        }}>
          {/* Col 1: Official Robu / Macfos Ltd Corporate Identity */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'var(--robu-primary-orange)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontWeight: 900,
                fontSize: '22px',
                fontFamily: 'var(--font-robu-heading)',
                boxShadow: '0 2px 8px rgba(243, 108, 33, 0.4)'
              }}>
                r
              </div>
              <div>
                <span style={{ fontWeight: 900, fontSize: '22px', letterSpacing: '0.5px', color: '#FFFFFF' }}>
                  ROBU<span style={{ color: 'var(--robu-primary-orange)' }}>.IN</span>
                </span>
                <div style={{ fontSize: '10.5px', color: '#9CA3AF', letterSpacing: '0.4px', fontWeight: 600, textTransform: 'uppercase' }}>
                  Your Ideas, Our Parts
                </div>
              </div>
            </div>

            <p style={{ fontSize: '13px', color: '#9CA3AF', lineHeight: '1.6', marginBottom: '18px' }}>
              Macfos Limited (Robu.in) is India's leading distributor & online portal for robotics hardware, DIY electronics, 3D printing equipment, IoT sensors, and mechanical assemblies.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: '#D1D5DB' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={16} color="var(--robu-primary-orange)" />
                <span style={{ fontWeight: 700, color: '#FFFFFF' }}>1800 266 6123 (Toll Free)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={16} color="#A78BFA" />
                <a href="mailto:support@robu.in" style={{ color: '#D1D5DB' }}>support@robu.in</a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Clock size={16} color="#9CA3AF" />
                <span>Mon – Sat: 9:00 AM – 6:00 PM IST</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <MapPin size={16} color="#9CA3AF" style={{ marginTop: '3px', flexShrink: 0 }} />
                <span style={{ lineHeight: '1.4' }}>Macfos Limited, S. No. 34, Katraj-Dehu Road Bypass, Ambegaon BK, Pune - 411046, Maharashtra, India.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: '#6B7280' }}>
                <FileText size={15} color="#6B7280" />
                <span>CIN: L74900PN2017PLC172467</span>
              </div>
            </div>

            {/* Social Media Links */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              {[
                { name: 'Facebook', href: 'https://facebook.com/robu.in', color: '#1877F2', path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
                { name: 'X / Twitter', href: 'https://twitter.com/robu_in', color: '#E5E7EB', path: 'M4 4l16 16M4 20L20 4' },
                { name: 'LinkedIn', href: 'https://linkedin.com/company/robu-in', color: '#0A66C2', path: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z' },
                { name: 'YouTube', href: 'https://youtube.com/robu_in', color: '#FF0000', path: 'M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z' }
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.name}
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    backgroundColor: '#2A2A35',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#9CA3AF',
                    border: '1px solid #3E3E4D',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = s.color;
                    e.currentTarget.style.borderColor = s.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#9CA3AF';
                    e.currentTarget.style.borderColor = '#3E3E4D';
                  }}
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
            <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '18px' }}>
              Information
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px' }}>
              <li><Link to="/" style={{ color: '#9CA3AF' }} onMouseEnter={(e) => e.target.style.color = '#FFFFFF'} onMouseLeave={(e) => e.target.style.color = '#9CA3AF'}>About Robu.in</Link></li>
              <li><Link to="/support" style={{ color: '#9CA3AF' }} onMouseEnter={(e) => e.target.style.color = '#FFFFFF'} onMouseLeave={(e) => e.target.style.color = '#9CA3AF'}>Contact Customer Support</Link></li>
              <li><Link to="/b2b-quote" style={{ color: '#9CA3AF' }} onMouseEnter={(e) => e.target.style.color = '#FFFFFF'} onMouseLeave={(e) => e.target.style.color = '#9CA3AF'}>Bulk & Institution Quotes</Link></li>
              <li><Link to="/tutorials" style={{ color: '#9CA3AF' }} onMouseEnter={(e) => e.target.style.color = '#FFFFFF'} onMouseLeave={(e) => e.target.style.color = '#9CA3AF'}>Blogs & 2-Minute Tutorials</Link></li>
              <li><Link to="/category/microcontrollers" style={{ color: '#9CA3AF' }} onMouseEnter={(e) => e.target.style.color = '#FFFFFF'} onMouseLeave={(e) => e.target.style.color = '#9CA3AF'}>Development Boards & Kits</Link></li>
              <li><Link to="/category/drone-parts" style={{ color: '#9CA3AF' }} onMouseEnter={(e) => e.target.style.color = '#FFFFFF'} onMouseLeave={(e) => e.target.style.color = '#9CA3AF'}>Drone Motors & ESCs</Link></li>
              <li><a href="#investor" style={{ color: '#9CA3AF' }} onMouseEnter={(e) => e.target.style.color = '#FFFFFF'} onMouseLeave={(e) => e.target.style.color = '#9CA3AF'}>Investor Relations (Macfos Ltd)</a></li>
            </ul>
          </div>

          {/* Col 3: My Account */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '18px' }}>
              My Account
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px' }}>
              <li><Link to="/orders" style={{ color: '#9CA3AF' }} onMouseEnter={(e) => e.target.style.color = '#FFFFFF'} onMouseLeave={(e) => e.target.style.color = '#9CA3AF'}>My Orders & History</Link></li>
              <li><Link to="/orders" style={{ color: '#9CA3AF' }} onMouseEnter={(e) => e.target.style.color = '#FFFFFF'} onMouseLeave={(e) => e.target.style.color = '#9CA3AF'}>Track Consignment Status</Link></li>
              <li><Link to="/cart" style={{ color: '#9CA3AF' }} onMouseEnter={(e) => e.target.style.color = '#FFFFFF'} onMouseLeave={(e) => e.target.style.color = '#9CA3AF'}>View Cart & Checkout</Link></li>
              <li><Link to="/wishlist" style={{ color: '#9CA3AF' }} onMouseEnter={(e) => e.target.style.color = '#FFFFFF'} onMouseLeave={(e) => e.target.style.color = '#9CA3AF'}>Saved Wishlist</Link></li>
              <li><Link to="/compare" style={{ color: '#9CA3AF' }} onMouseEnter={(e) => e.target.style.color = '#FFFFFF'} onMouseLeave={(e) => e.target.style.color = '#9CA3AF'}>Compare Components</Link></li>
              <li><Link to="/returns" style={{ color: '#9CA3AF' }} onMouseEnter={(e) => e.target.style.color = '#FFFFFF'} onMouseLeave={(e) => e.target.style.color = '#9CA3AF'}>Return & Replacement Center</Link></li>
            </ul>
          </div>

          {/* Col 4: Custom Services */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '18px' }}>
              Custom Services
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px' }}>
              <li><Link to="/b2b-quote" style={{ color: '#9CA3AF' }} onMouseEnter={(e) => e.target.style.color = '#FFFFFF'} onMouseLeave={(e) => e.target.style.color = '#9CA3AF'}>PCB Manufacturing & Assembly</Link></li>
              <li><Link to="/b2b-quote" style={{ color: '#9CA3AF' }} onMouseEnter={(e) => e.target.style.color = '#FFFFFF'} onMouseLeave={(e) => e.target.style.color = '#9CA3AF'}>Industrial FDM 3D Printing</Link></li>
              <li><Link to="/b2b-quote" style={{ color: '#9CA3AF' }} onMouseEnter={(e) => e.target.style.color = '#FFFFFF'} onMouseLeave={(e) => e.target.style.color = '#9CA3AF'}>SLA High-Precision 3D Printing</Link></li>
              <li><Link to="/b2b-quote" style={{ color: '#9CA3AF' }} onMouseEnter={(e) => e.target.style.color = '#FFFFFF'} onMouseLeave={(e) => e.target.style.color = '#9CA3AF'}>Sheet Metal Laser Cutting</Link></li>
              <li><Link to="/b2b-quote" style={{ color: '#9CA3AF' }} onMouseEnter={(e) => e.target.style.color = '#FFFFFF'} onMouseLeave={(e) => e.target.style.color = '#9CA3AF'}>Non-Metal Laser Cutting & Engraving</Link></li>
              <li><Link to="/b2b-quote" style={{ color: '#9CA3AF' }} onMouseEnter={(e) => e.target.style.color = '#FFFFFF'} onMouseLeave={(e) => e.target.style.color = '#9CA3AF'}>Custom Li-ion Battery Packs</Link></li>
            </ul>
          </div>

          {/* Col 5: Policies & Compliance */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '18px' }}>
              Policies & Tax
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px' }}>
              <li><Link to="/b2b-quote" style={{ color: '#9CA3AF' }} onMouseEnter={(e) => e.target.style.color = '#FFFFFF'} onMouseLeave={(e) => e.target.style.color = '#9CA3AF'}>GST Invoice with HSN Code</Link></li>
              <li><Link to="/b2b-quote" style={{ color: '#9CA3AF' }} onMouseEnter={(e) => e.target.style.color = '#FFFFFF'} onMouseLeave={(e) => e.target.style.color = '#9CA3AF'}>B2B Input Tax Credit (ITC)</Link></li>
              <li><Link to="/support" style={{ color: '#9CA3AF' }} onMouseEnter={(e) => e.target.style.color = '#FFFFFF'} onMouseLeave={(e) => e.target.style.color = '#9CA3AF'}>Same Day Dispatch Guidelines</Link></li>
              <li><Link to="/returns" style={{ color: '#9CA3AF' }} onMouseEnter={(e) => e.target.style.color = '#FFFFFF'} onMouseLeave={(e) => e.target.style.color = '#9CA3AF'}>7-Day Replacement Policy</Link></li>
              <li><a href="#privacy" style={{ color: '#9CA3AF' }} onMouseEnter={(e) => e.target.style.color = '#FFFFFF'} onMouseLeave={(e) => e.target.style.color = '#9CA3AF'}>Privacy & Cookie Policy</a></li>
              <li><a href="#terms" style={{ color: '#9CA3AF' }} onMouseEnter={(e) => e.target.style.color = '#FFFFFF'} onMouseLeave={(e) => e.target.style.color = '#9CA3AF'}>Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Bottom Copyright Bar, SSL & Payment Badges */}
      <div style={{
        borderTop: '1px solid #2A2A35',
        backgroundColor: '#16161B',
        padding: '20px 0',
        fontSize: '12.5px',
        color: '#9CA3AF'
      }}>
        <div className="robu-container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            © 2026 Macfos Limited (Robu.in). All rights reserved. Registered under Companies Act, 2013.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10B981', fontWeight: 600 }}>
              <ShieldCheck size={16} />
              <span>100% Secure 256-Bit SSL Checkout</span>
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#D1D5DB', fontWeight: 600, fontSize: '12px' }}>Supported:</span>
              <span style={{ backgroundColor: '#25252E', color: '#FFFFFF', padding: '3px 8px', borderRadius: '4px', fontWeight: 700, fontSize: '11px', border: '1px solid #3E3E4D' }}>UPI</span>
              <span style={{ backgroundColor: '#25252E', color: '#FFFFFF', padding: '3px 8px', borderRadius: '4px', fontWeight: 700, fontSize: '11px', border: '1px solid #3E3E4D' }}>RuPay</span>
              <span style={{ backgroundColor: '#25252E', color: '#FFFFFF', padding: '3px 8px', borderRadius: '4px', fontWeight: 700, fontSize: '11px', border: '1px solid #3E3E4D' }}>Visa</span>
              <span style={{ backgroundColor: '#25252E', color: '#FFFFFF', padding: '3px 8px', borderRadius: '4px', fontWeight: 700, fontSize: '11px', border: '1px solid #3E3E4D' }}>Mastercard</span>
              <span style={{ backgroundColor: '#25252E', color: '#FFFFFF', padding: '3px 8px', borderRadius: '4px', fontWeight: 700, fontSize: '11px', border: '1px solid #3E3E4D' }}>NetBanking</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      <button
        onClick={scrollToTop}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '42px',
          height: '42px',
          borderRadius: '50%',
          backgroundColor: 'var(--robu-primary-purple)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(56, 6, 128, 0.45)',
          zIndex: 90,
          cursor: 'pointer',
          border: 'none'
        }}
        title="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
}

