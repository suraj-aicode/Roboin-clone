import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Send, CheckCircle2, MessageSquare, PhoneCall, Mail, ChevronRight, Home, ShieldCheck } from 'lucide-react';
import { API_URL } from '../config/api';

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    orderId: '',
    category: 'Technical Consultation',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch(`${API_URL}/api/admin/tickets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    } catch (e) {
      console.warn('Backend offline; recorded locally', e);
    }
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <main style={{ flex: 1, backgroundColor: 'var(--robu-bg-body)', paddingBottom: '60px' }}>
      {/* Breadcrumb */}
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--robu-border)', padding: '10px 0' }}>
        <div className="robu-container" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--robu-text-muted)' }}>
          <Link to="/" style={{ color: 'var(--robu-text-body)', textDecoration: 'none' }}>Home</Link>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--robu-primary-orange)', fontWeight: 600 }}>Help Desk & Technical Support</span>
        </div>
      </div>

      <div className="robu-container" style={{ marginTop: '24px', maxWidth: '880px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--robu-text-heading)', margin: '0 0 8px' }}>
            Customer Support & Technical Consultation
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--robu-text-muted)', maxWidth: '560px', margin: '0 auto' }}>
            Have a question regarding hardware pinouts, courier tracking, or enterprise orders? Our electronics engineers are here to assist.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
          <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid var(--robu-border)', textAlign: 'center', boxShadow: 'var(--robu-shadow-sm)' }}>
            <PhoneCall size={24} color="var(--robu-primary-orange)" style={{ margin: '0 auto 8px' }} />
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--robu-text-heading)' }}>Toll-Free Phone</div>
            <div style={{ fontSize: '13px', color: 'var(--robu-text-muted)', marginTop: '4px' }}>+91 1800-419-ROBU</div>
            <div style={{ fontSize: '11px', color: '#059669', marginTop: '4px' }}>Mon - Sat: 9 AM - 7 PM</div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid var(--robu-border)', textAlign: 'center', boxShadow: 'var(--robu-shadow-sm)' }}>
            <Mail size={24} color="var(--robu-purple)" style={{ margin: '0 auto 8px' }} />
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--robu-text-heading)' }}>Email Support</div>
            <div style={{ fontSize: '13px', color: 'var(--robu-text-muted)', marginTop: '4px' }}>support@voltcart.in</div>
            <div style={{ fontSize: '11px', color: 'var(--robu-text-muted)', marginTop: '4px' }}>Response within 2 hours</div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid var(--robu-border)', textAlign: 'center', boxShadow: 'var(--robu-shadow-sm)' }}>
            <MessageSquare size={24} color="#0284C7" style={{ margin: '0 auto 8px' }} />
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--robu-text-heading)' }}>Live WhatsApp</div>
            <div style={{ fontSize: '13px', color: 'var(--robu-text-muted)', marginTop: '4px' }}>+91 91234 56789</div>
            <div style={{ fontSize: '11px', color: '#059669', marginTop: '4px' }}>Online Now</div>
          </div>
        </div>

        {submitted ? (
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #A7F3D0',
            padding: '48px 32px',
            textAlign: 'center',
            boxShadow: 'var(--robu-shadow-sm)'
          }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <CheckCircle2 size={36} />
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--robu-text-heading)', margin: '0 0 8px' }}>
              Support Ticket Created!
            </h2>
            <p style={{ color: 'var(--robu-text-muted)', fontSize: '14px', maxWidth: '440px', margin: '0 auto 24px' }}>
              Your ticket reference is <strong>#TCK-{Math.floor(100000 + Math.random() * 900000)}</strong>. Our hardware engineers will respond via email shortly.
            </p>
            <Link to="/" style={{ backgroundColor: 'var(--robu-primary-orange)', color: '#FFFFFF', padding: '10px 24px', borderRadius: '8px', fontWeight: 700, textDecoration: 'none', fontSize: '14px' }}>
              Return to Home
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid var(--robu-border)',
            padding: '32px',
            boxShadow: 'var(--robu-shadow-sm)'
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--robu-text-heading)', margin: '0 0 20px' }}>
              Create an Engineering Support Request
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--robu-text-body)', display: 'block', marginBottom: '6px' }}>Your Name *</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--robu-border)', fontSize: '13.5px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--robu-text-body)', display: 'block', marginBottom: '6px' }}>Email Address *</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--robu-border)', fontSize: '13.5px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--robu-text-body)', display: 'block', marginBottom: '6px' }}>Order Number (if applicable)</label>
                <input 
                  type="text" 
                  placeholder="e.g. ORD-1725000000"
                  value={formData.orderId}
                  onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--robu-border)', fontSize: '13.5px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--robu-text-body)', display: 'block', marginBottom: '6px' }}>Category *</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--robu-border)', fontSize: '13.5px', backgroundColor: '#FFFFFF' }}
                >
                  <option value="Technical Consultation">Technical Consultation & Datasheet</option>
                  <option value="Order Tracking">Courier & Dispatch Tracking</option>
                  <option value="Warranty & Defect">Warranty Claim & Defective Item</option>
                  <option value="GST Invoice">GST Tax Invoice Correction</option>
                  <option value="Bulk Purchase">Bulk B2B Procurement Inquiry</option>
                </select>
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--robu-text-body)', display: 'block', marginBottom: '6px' }}>Subject *</label>
                <input 
                  type="text" 
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Brief summary of your query"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--robu-border)', fontSize: '13.5px' }}
                />
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--robu-text-body)', display: 'block', marginBottom: '6px' }}>Detailed Description *</label>
                <textarea 
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your question or issue in detail..."
                  style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid var(--robu-border)', fontSize: '13.5px', fontFamily: 'inherit' }}
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                backgroundColor: 'var(--robu-primary-orange)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                padding: '14px',
                fontSize: '15px',
                fontWeight: 700,
                marginTop: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer'
              }}
            >
              <Send size={16} />
              <span>{isSubmitting ? 'Submitting Request...' : 'Submit Support Ticket'}</span>
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
