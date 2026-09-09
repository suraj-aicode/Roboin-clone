import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setRFQModalOpen, addRFQ } from '../redux/slices/communitySlice';
import { Building2, Send, CheckCircle2 } from 'lucide-react';

export default function B2BQuoteModal() {
  const dispatch = useDispatch();
  const { isRFQModalOpen, selectedProductForRFQ } = useSelector((state) => state.community);
  const { user } = useSelector((state) => state.auth);

  const [orgName, setOrgName] = useState(user?.organization || 'Apex Robotics Research Lab');
  const [contactName, setContactName] = useState(user?.name || 'Satya Prakash');
  const [email, setEmail] = useState(user?.email || 'customer@robo.in');
  const [phone, setPhone] = useState('+91 98888 12345');
  const [gstin, setGstin] = useState(user?.gstin || '29AAACB9812R1Z5');
  const [quantity, setQuantity] = useState(25);
  const [targetDate, setTargetDate] = useState('2026-10-01');
  const [reqs, setReqs] = useState('Bulk shipment for university research cohort. Need GST tax credit invoice with HSN classification.');
  const [submitted, setSubmitted] = useState(false);

  if (!isRFQModalOpen) return null;

  const product = selectedProductForRFQ;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRFQ = {
      _id: `rfq-${Date.now()}`,
      rfqId: `RFQ-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      organizationName: orgName,
      contactPerson: contactName,
      email,
      phone,
      gstin,
      items: [{
        sku: product ? product.sku : 'SKU-BULK-REQUEST',
        title: product ? product.title : 'Custom Component Kit',
        quantity: parseInt(quantity, 10),
        targetPricePerUnit: product ? Math.round(product.price * 0.85) : 0
      }],
      targetDeliveryDate: targetDate,
      specialRequirements: reqs,
      quotedAmount: product ? Math.round(product.price * 0.85 * quantity) : 0,
      status: 'Submitted',
      createdAt: new Date().toISOString()
    };

    dispatch(addRFQ(newRFQ));
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      dispatch(setRFQModalOpen(false));
    }, 2000);
  };

  return (
    <div className="modal-overlay" onClick={() => dispatch(setRFQModalOpen(false))}>
      <div className="modal-content" style={{ maxWidth: '680px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={() => dispatch(setRFQModalOpen(false))}>✕</button>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Building2 size={20} color="var(--primary)" /> B2B Request for Quotation (RFQ) (MOD-21)
        </h2>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
          Institutional bulk purchase quotes for educational institutions, laboratories, and OEM manufacturers.
        </p>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <CheckCircle2 size={48} color="var(--success)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>RFQ Submitted Successfully!</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
              Our B2B Sales & Logistics team has registered your quotation and will provide institutional pricing.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {product && (
              <div style={{ background: 'var(--bg-input)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <img src={product.image} alt={product.title} style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '4px' }} />
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>{product.title}</div>
                  <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--primary)' }}>
                    {product.sku} • Base Single Unit: ₹{product.price}
                  </div>
                </div>
              </div>
            )}

            <div className="form-grid">
              <div className="form-group">
                <label>Institution / Company Name</label>
                <input type="text" className="form-control" required value={orgName} onChange={(e) => setOrgName(e.target.value)} />
              </div>

              <div className="form-group">
                <label>Institutional GSTIN</label>
                <input type="text" className="form-control" placeholder="29AAAAA0000A1Z5" value={gstin} onChange={(e) => setGstin(e.target.value)} />
              </div>

              <div className="form-group">
                <label>Authorized Contact Person</label>
                <input type="text" className="form-control" required value={contactName} onChange={(e) => setContactName(e.target.value)} />
              </div>

              <div className="form-group">
                <label>Official Email</label>
                <input type="email" className="form-control" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="form-group">
                <label>Required Quantity (Units)</label>
                <input type="number" min="10" className="form-control" required value={quantity} onChange={(e) => setQuantity(e.target.value)} />
              </div>

              <div className="form-group">
                <label>Target Delivery Date</label>
                <input type="date" className="form-control" required value={targetDate} onChange={(e) => setTargetDate(e.target.value)} />
              </div>

              <div className="form-group full">
                <label>Technical Specifications / Custom Packaging Requirements</label>
                <textarea className="form-control" rows="3" value={reqs} onChange={(e) => setReqs(e.target.value)} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button type="button" className="btn btn-outline" onClick={() => dispatch(setRFQModalOpen(false))}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                <Send size={14} /> Submit B2B Quotation Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
