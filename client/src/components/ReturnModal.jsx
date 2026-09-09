import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setReturnModalOpen, addReturnRequest } from '../redux/slices/communitySlice';
import { RotateCcw, Send, CheckCircle2 } from 'lucide-react';

export default function ReturnModal() {
  const dispatch = useDispatch();
  const { isReturnModalOpen, selectedOrderForReturn } = useSelector((state) => state.community);
  const { user } = useSelector((state) => state.auth);

  const [orderNumber, setOrderNumber] = useState(selectedOrderForReturn?.orderNumber || 'ORD-2026-8941');
  const [customerName, setCustomerName] = useState(user?.name || 'Satya Prakash');
  const [customerEmail, setCustomerEmail] = useState(user?.email || 'customer@robo.in');
  const [sku, setSku] = useState('SKU-ARD-R4-WIFI');
  const [productTitle, setProductTitle] = useState('Arduino Uno R4 WiFi Board');
  const [returnType, setReturnType] = useState('Replacement');
  const [reason, setReason] = useState('Dead on Arrival (DOA) / Component Does Not Power On');
  const [evidenceNote, setEvidenceNote] = useState('Board does not respond to 5V USB-C power or VIN DC jack. Power LED remains unlit.');
  const [submitted, setSubmitted] = useState(false);

  if (!isReturnModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newReturn = {
      _id: `ret-${Date.now()}`,
      returnId: `RET-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      orderNumber,
      customerName,
      customerEmail,
      sku,
      productTitle,
      returnType,
      reason,
      evidenceNote,
      status: 'Requested',
      disposition: 'Pending Logistics Inspection',
      createdAt: new Date().toISOString()
    };

    dispatch(addReturnRequest(newReturn));
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      dispatch(setReturnModalOpen(false));
    }, 2000);
  };

  return (
    <div className="modal-overlay" onClick={() => dispatch(setReturnModalOpen(false))}>
      <div className="modal-content" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={() => dispatch(setReturnModalOpen(false))}>✕</button>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <RotateCcw size={20} color="var(--primary)" /> Return & Replacement Request (MOD-12)
        </h2>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
          Request reverse pickup, RMA diagnostic inspection, and replacement for delivered components.
        </p>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <CheckCircle2 size={48} color="var(--success)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Return Request Registered!</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
              Our reverse logistics team will schedule a pickup after initial policy verification.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Commercial Order Number</label>
                <input type="text" className="form-control" required value={orderNumber} onChange={(e) => setOrderNumber(e.target.value)} />
              </div>

              <div className="form-group">
                <label>Resolution Type</label>
                <select className="form-control" value={returnType} onChange={(e) => setReturnType(e.target.value)}>
                  <option value="Replacement">Replacement (Send Tested Working Unit)</option>
                  <option value="Refund">Refund (Credit back to source payment)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Hardware SKU Code</label>
                <input type="text" className="form-control mono" required value={sku} onChange={(e) => setSku(e.target.value)} />
              </div>

              <div className="form-group">
                <label>Component Title</label>
                <input type="text" className="form-control" required value={productTitle} onChange={(e) => setProductTitle(e.target.value)} />
              </div>

              <div className="form-group full">
                <label>Return Reason (Policy Validated)</label>
                <select className="form-control" value={reason} onChange={(e) => setReason(e.target.value)}>
                  <option value="Dead on Arrival (DOA) / Component Does Not Power On">Dead on Arrival (DOA) / Component Does Not Power On</option>
                  <option value="Damaged in Transit / Physical Defect">Damaged in Transit / Physical Defect</option>
                  <option value="Missing Header Pins or Cables">Missing Header Pins or Cables</option>
                  <option value="Incompatible Voltage / Architecture Requirements">Incompatible Voltage / Architecture Requirements</option>
                </select>
              </div>

              <div className="form-group full">
                <label>Detailed Diagnostic Evidence & Operating Conditions</label>
                <textarea className="form-control" rows="3" required value={evidenceNote} onChange={(e) => setEvidenceNote(e.target.value)} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button type="button" className="btn btn-outline" onClick={() => dispatch(setReturnModalOpen(false))}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                <Send size={14} /> Submit Return Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
