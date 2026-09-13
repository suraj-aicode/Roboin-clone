import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCreditNoteOpen } from '../redux/slices/orderSlice';
import { Printer, Download, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function CreditNoteModal() {
  const dispatch = useDispatch();
  const { isCreditNoteOpen, selectedCreditNoteOrder } = useSelector((state) => state.order);
  const { sellerState } = useSelector((state) => state.auth);

  if (!isCreditNoteOpen || !selectedCreditNoteOrder) return null;

  const order = selectedCreditNoteOrder;
  const creditNoteNumber = `CN-2026-${order.orderNumber.replace(/\D/g, '') || '9012'}`;
  const originalInvoiceNumber = `INV-2026-${order.orderNumber.replace(/\D/g, '') || '9012'}`;

  const isIntrastate = (order.shippingAddress?.state || 'Karnataka').trim().toLowerCase() === sellerState.trim().toLowerCase();

  const taxableAmount = order.subtotal || (order.totalAmount / 1.18);
  const totalTax = order.taxAmount || (order.totalAmount - taxableAmount);
  const cgst = isIntrastate ? totalTax / 2 : 0;
  const sgst = isIntrastate ? totalTax / 2 : 0;
  const igst = isIntrastate ? 0 : totalTax;

  return (
    <div className="modal-overlay" onClick={() => dispatch(setCreditNoteOpen(false))}>
      <div className="modal-content" style={{ maxWidth: '800px', background: '#fff', color: '#1e293b' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" style={{ color: '#000' }} onClick={() => dispatch(setCreditNoteOpen(false))}>✕</button>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '2px solid #0284c7', paddingBottom: '0.75rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0284c7' }}>VoltCart</span>
              <span style={{ fontSize: '0.75rem', background: '#e0f2fe', color: '#0369a1', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>
                GST Compliant (CGST Act Sec 34)
              </span>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
              VoltCart Technologies Pvt Ltd | GSTIN: <strong>29AAACR9981K1Z3</strong>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#dc2626', margin: 0, textTransform: 'uppercase' }}>
              GST Credit Note
            </h2>
            <div className="mono" style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>
              {creditNoteNumber}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
              Date: {new Date().toLocaleDateString('en-IN')}
            </div>
          </div>
        </div>

        {/* Link to Original Tax Invoice */}
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '4px', padding: '0.65rem 0.85rem', fontSize: '0.78rem', color: '#991b1b', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <strong>Original Tax Invoice Ref:</strong> {originalInvoiceNumber} (Dated: {new Date(order.createdAt).toLocaleDateString('en-IN')})
          </div>
          <div>
            <strong>Reason for Credit:</strong> Full Order Cancellation / Goods Return
          </div>
        </div>

        {/* Party Details Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1rem', fontSize: '0.8rem', lineHeight: 1.5 }}>
          <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '4px' }}>
            <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.2rem' }}>Issued By (Supplier):</strong>
            <div>VoltCart Fulfillment Center Hub</div>
            <div>Plot 12B, KIADB Industrial Area, Phase II</div>
            <div>Bengaluru, Karnataka - 560100</div>
            <div>State Code: <strong>29 (Karnataka)</strong></div>
          </div>

          <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '4px' }}>
            <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.2rem' }}>Issued To (Recipient):</strong>
            <div><strong>{order.customerName}</strong></div>
            <div>{order.shippingAddress?.street}, {order.shippingAddress?.city}</div>
            <div>{order.shippingAddress?.state} - {order.shippingAddress?.pincode}</div>
            {order.gstin && <div>Recipient GSTIN: <strong>{order.gstin}</strong></div>}
          </div>
        </div>

        {/* Itemized Reversal Table */}
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem', marginBottom: '1rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
              <th style={{ padding: '0.5rem', textAlign: 'left' }}>Item Description</th>
              <th style={{ padding: '0.5rem', textAlign: 'center' }}>HSN Code</th>
              <th style={{ padding: '0.5rem', textAlign: 'center' }}>Qty Reversed</th>
              <th style={{ padding: '0.5rem', textAlign: 'right' }}>Taxable Val</th>
              <th style={{ padding: '0.5rem', textAlign: 'right' }}>GST Rate</th>
              <th style={{ padding: '0.5rem', textAlign: 'right' }}>Credited Amount</th>
            </tr>
          </thead>
          <tbody>
            {order.items?.map((item, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '0.5rem' }}>{item.title || item.productId}</td>
                <td style={{ padding: '0.5rem', textAlign: 'center' }}>{item.hsnCode || '85423190'}</td>
                <td style={{ padding: '0.5rem', textAlign: 'center' }}>{item.quantity}</td>
                <td style={{ padding: '0.5rem', textAlign: 'right' }}>₹{(item.price * item.quantity).toFixed(2)}</td>
                <td style={{ padding: '0.5rem', textAlign: 'right' }}>18%</td>
                <td style={{ padding: '0.5rem', textAlign: 'right', fontWeight: 700 }}>₹{((item.price * item.quantity) * 1.18).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Tax Reversal Summary */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
          <div style={{ width: '280px', fontSize: '0.8rem', lineHeight: 1.6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Taxable Value Reversed:</span>
              <span>₹{taxableAmount.toFixed(2)}</span>
            </div>
            {isIntrastate ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>CGST Reversal (9%):</span>
                  <span>₹{cgst.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>SGST Reversal (9%):</span>
                  <span>₹{sgst.toFixed(2)}</span>
                </div>
              </>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>IGST Reversal (18%):</span>
                <span>₹{igst.toFixed(2)}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #0f172a', paddingTop: '0.3rem', fontWeight: 800, fontSize: '0.95rem', color: '#dc2626' }}>
              <span>Total Credit Adjusted:</span>
              <span>₹{Number(order.totalAmount).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
            Digitally generated by VoltCart ERP. Complies with GST Rules for ITC Reversals.
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              className="btn btn-outline btn-sm"
              style={{ color: '#0f172a', borderColor: '#cbd5e1' }}
              onClick={() => window.print()}
            >
              <Printer size={14} /> Print Credit Note
            </button>
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => {
                alert(`Exported Credit Note PDF: ${creditNoteNumber}.pdf`);
              }}
            >
              <Download size={14} /> Export PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
