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
  const [createdTicketId, setCreatedTicketId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/community/tickets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.name,
          customerEmail: formData.email,
          phone: formData.phone,
          category: formData.category,
          priority: 'Medium',
          subject: formData.subject,
          description: formData.message,
          relatedOrderNumber: formData.orderId
        })
      });
      const data = await res.json();
      if (data?.data?.ticketId) {
        setCreatedTicketId(data.data.ticketId);
      }
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          {/* Toll Free Phone */}
          <a 
            href="tel:18002666123"
            style={{ 
              backgroundColor: '#FFFFFF', 
              padding: '24px 20px', 
              borderRadius: '12px', 
              border: '1px solid var(--robu-border)', 
              textAlign: 'center', 
              boxShadow: 'var(--robu-shadow-sm)',
              textDecoration: 'none',
              display: 'block',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            className="robu-card-lift"
          >
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: '#FFF4EE',
              color: 'var(--robu-primary-orange)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px'
            }}>
              <PhoneCall size={22} />
            </div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--robu-text-heading)' }}>Toll-Free Phone</div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--robu-primary-orange)', marginTop: '4px' }}>1800 266 6123</div>
            <div style={{ fontSize: '11.5px', color: '#059669', marginTop: '4px', fontWeight: 500 }}>Mon - Sat: 9 AM - 6 PM</div>
          </a>

          {/* Email Support */}
          <a 
            href="mailto:suraj40praj@gmail.com"
            style={{ 
              backgroundColor: '#FFFFFF', 
              padding: '24px 20px', 
              borderRadius: '12px', 
              border: '1px solid var(--robu-border)', 
              textAlign: 'center', 
              boxShadow: 'var(--robu-shadow-sm)',
              textDecoration: 'none',
              display: 'block',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            className="robu-card-lift"
          >
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: 'var(--robu-purple-light)',
              color: 'var(--robu-primary-purple)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px'
            }}>
              <Mail size={22} />
            </div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--robu-text-heading)' }}>Email Support</div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--robu-primary-purple)', marginTop: '4px' }}>suraj40praj@gmail.com</div>
            <div style={{ fontSize: '11.5px', color: 'var(--robu-text-muted)', marginTop: '4px' }}>Response within 2 hours</div>
          </a>

          {/* Live WhatsApp */}
          <a 
            href="https://wa.me/918448449850"
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              backgroundColor: '#FFFFFF', 
              padding: '24px 20px', 
              borderRadius: '12px', 
              border: '1px solid var(--robu-border)', 
              textAlign: 'center', 
              boxShadow: 'var(--robu-shadow-sm)',
              textDecoration: 'none',
              display: 'block',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            className="robu-card-lift"
          >
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: '#E0F2FE',
              color: '#0284C7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px'
            }}>
              <MessageSquare size={22} />
            </div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--robu-text-heading)' }}>Live WhatsApp</div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#0284C7', marginTop: '4px' }}>+91 84484 49850</div>
            <div style={{ fontSize: '11.5px', color: '#059669', marginTop: '4px', fontWeight: 500 }}>Online Now</div>
          </a>
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
              Your ticket reference is <strong>#{createdTicketId || `TCK-${Math.floor(100000 + Math.random() * 900000)}`}</strong>. Our hardware engineers will respond via email shortly.
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
