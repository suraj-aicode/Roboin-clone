import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTicketModalOpen, addTicket } from '../redux/slices/communitySlice';
import { LifeBuoy, Send, CheckCircle2 } from 'lucide-react';

export default function SupportTicketModal() {
  const dispatch = useDispatch();
  const { isTicketModalOpen } = useSelector((state) => state.community);
  const { user } = useSelector((state) => state.auth);

  const [name, setName] = useState(user?.name || 'Satya Prakash');
  const [email, setEmail] = useState(user?.email || 'customer@robo.in');
  const [category, setCategory] = useState('Technical Hardware Support');
  const [priority, setPriority] = useState('Medium');
  const [orderNumber, setOrderNumber] = useState('ORD-2026-8941');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isTicketModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTicket = {
      _id: `tck-${Date.now()}`,
      ticketId: `TCK-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: name,
      customerEmail: email,
      category,
      priority,
      relatedOrderNumber: orderNumber,
      subject,
      description,
      status: 'Open',
      assignedTo: 'Hardware Support Engineer',
      createdAt: new Date().toISOString()
    };

    dispatch(addTicket(newTicket));
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      dispatch(setTicketModalOpen(false));
    }, 2000);
  };

  return (
    <div className="modal-overlay" onClick={() => dispatch(setTicketModalOpen(false))}>
      <div className="modal-content" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={() => dispatch(setTicketModalOpen(false))}>✕</button>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <LifeBuoy size={20} color="var(--primary)" /> Customer Support & Hardware Diagnostics (MOD-15)
        </h2>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
          Submit technical hardware inquiries, dead-on-arrival (DOA) reports, or GST invoice support requests.
        </p>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <CheckCircle2 size={48} color="var(--success)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Support Ticket Generated!</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
              A technical support agent has been assigned to investigate your inquiry.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" className="form-control" required value={name} onChange={(e) => setName(e.target.value)} />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input type="email" className="form-control" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="form-group">
                <label>Inquiry Category</label>
                <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="Technical Hardware Support">Technical Hardware Support</option>
                  <option value="Dead on Arrival (DOA)">Dead on Arrival (DOA) / Defective Unit</option>
                  <option value="Order & Delivery Issue">Order & Delivery Issue</option>
                  <option value="GST Invoicing / Billing">GST Invoicing / Billing Correction</option>
                </select>
              </div>

              <div className="form-group">
                <label>Priority Level</label>
                <select className="form-control" value={priority} onChange={(e) => setPriority(e.target.value)}>
                  <option value="Low">Low (General Query)</option>
                  <option value="Medium">Medium (Standard)</option>
                  <option value="High">High (Hardware Troubleshooting)</option>
                  <option value="Critical">Critical (Production Blocker)</option>
                </select>
              </div>

              <div className="form-group full">
                <label>Related Order Number (Optional)</label>
                <input type="text" className="form-control" placeholder="ORD-2026-XXXX" value={orderNumber} onChange={(e) => setOrderNumber(e.target.value)} />
              </div>

              <div className="form-group full">
                <label>Subject</label>
                <input type="text" className="form-control" required placeholder="Brief description of the issue" value={subject} onChange={(e) => setSubject(e.target.value)} />
              </div>

              <div className="form-group full">
                <label>Technical Description & Voltage/Wiring Setup</label>
                <textarea className="form-control" rows="3" required placeholder="Describe what happens when powered, supply voltage, wiring pinout, firmware used..." value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button type="button" className="btn btn-outline" onClick={() => dispatch(setTicketModalOpen(false))}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                <Send size={14} /> Submit Support Ticket
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
