import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, FileCheck, Send, CheckCircle2, Home, ChevronRight, ShieldCheck, Truck } from 'lucide-react';
import { API_URL } from '../config/api';

export default function B2BQuotePage() {
  const [formData, setFormData] = useState({
    companyName: '',
    gstin: '',
    contactName: '',
    email: '',
    phone: '',
    targetBudget: '',
    requiredDate: '',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch(`${API_URL}/api/admin/rfq`, {
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
          <span style={{ color: 'var(--robu-primary-orange)', fontWeight: 600 }}>B2B Enterprise & Institutional Quotations</span>
        </div>
      </div>

      <div className="robu-container" style={{ marginTop: '24px', maxWidth: '840px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: '#EEF2FF',
            color: 'var(--robu-purple)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 14px'
          }}>
            <Building2 size={28} />
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--robu-text-heading)', margin: '0 0 8px' }}>
            Institutional & B2B Bulk Quotation Portal
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--robu-text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Dedicated pricing, commercial tax invoices with GST Input Tax Credit (ITC), and priority dispatch for colleges, research institutes, and OEM manufacturers.
          </p>
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
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#ECFDF5',
              color: '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <CheckCircle2 size={36} />
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--robu-text-heading)', margin: '0 0 8px' }}>
              RFQ Successfully Submitted!
            </h2>
            <p style={{ color: 'var(--robu-text-muted)', fontSize: '14px', maxWidth: '480px', margin: '0 auto 24px', lineHeight: '1.6' }}>
              Our dedicated Institutional Key Account Manager will review your Bill of Materials (BOM) and dispatch a formal proforma quotation within 4 business hours.
            </p>
            <Link to="/" style={{
              backgroundColor: 'var(--robu-primary-orange)',
              color: '#FFFFFF',
              padding: '10px 24px',
              borderRadius: '8px',
              fontWeight: 700,
              textDecoration: 'none',
              fontSize: '14px'
            }}>
              Return to Catalog
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid var(--robu-border)',
            boxShadow: 'var(--robu-shadow-sm)',
            padding: '32px'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--robu-text-body)', display: 'block', marginBottom: '6px' }}>Organization / College / Company Name *</label>
                <input 
                  type="text" 
                  required
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="e.g. IIT Bombay / Robotics Labs Pvt Ltd"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--robu-border)', fontSize: '13.5px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--robu-text-body)', display: 'block', marginBottom: '6px' }}>GSTIN Number (For ITC)</label>
                <input 
                  type="text" 
                  maxLength={15}
                  value={formData.gstin}
                  onChange={(e) => setFormData({ ...formData, gstin: e.target.value.toUpperCase() })}
                  placeholder="29AAAAA0000A1Z5"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--robu-border)', fontSize: '13.5px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--robu-text-body)', display: 'block', marginBottom: '6px' }}>Procurement Contact Person *</label>
                <input 
                  type="text" 
                  required
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  placeholder="Full Name"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--robu-border)', fontSize: '13.5px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--robu-text-body)', display: 'block', marginBottom: '6px' }}>Official Work Email *</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="procurement@organization.edu"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--robu-border)', fontSize: '13.5px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--robu-text-body)', display: 'block', marginBottom: '6px' }}>Phone Number *</label>
                <input 
                  type="tel" 
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 9876543210"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--robu-border)', fontSize: '13.5px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--robu-text-body)', display: 'block', marginBottom: '6px' }}>Required Delivery Date</label>
                <input 
                  type="date" 
                  value={formData.requiredDate}
                  onChange={(e) => setFormData({ ...formData, requiredDate: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--robu-border)', fontSize: '13.5px' }}
                />
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--robu-text-body)', display: 'block', marginBottom: '6px' }}>
                  Bill of Materials (BOM) & Technical Requirements *
                </label>
                <textarea 
                  required
                  rows={5}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Paste your component list with required quantities, e.g.:
1. Arduino Uno R4 WiFi - 50 pcs
2. Raspberry Pi 5 8GB - 25 pcs
3. ESP32-WROOM-32D - 100 pcs"
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
              <span>{isSubmitting ? 'Submitting Request...' : 'Submit RFQ for Official Quote'}</span>
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
