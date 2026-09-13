import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInvoiceOpen } from '../redux/slices/orderSlice';
import { Printer, CheckCircle, PackageCheck } from 'lucide-react';

export default function InvoiceModal() {
  const dispatch = useDispatch();
  const { currentOrder, isInvoiceOpen } = useSelector((state) => state.order);

  if (!isInvoiceOpen || !currentOrder) return null;

  const addr = currentOrder.shippingAddress || {};
  const tax = currentOrder.taxBreakdown || {};

  return (
    <div className="modal-overlay" onClick={() => dispatch(setInvoiceOpen(false))}>
      <div className="modal-content" style={{ maxWidth: '820px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={() => dispatch(setInvoiceOpen(false))}>✕</button>

        <div className="invoice-box">
          <div className="invoice-header">
            <div>
              <div className="invoice-logo">VoltCart Electronics</div>
              <div style={{ fontSize: '0.78rem', color: '#4B5563' }}>
                GSTIN: <strong>29AAACR9981K1Z3</strong> | Authorized GST Tax Invoice
              </div>
              <div style={{ fontSize: '0.78rem', color: '#4B5563' }}>
                Plot 12, Industrial Tech Hub, Electronic City, Bengaluru, Karnataka 560100
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <h2 style={{ color: '#111827', fontSize: '1.25rem', fontWeight: 800 }}>TAX INVOICE</h2>
              <div className="mono" style={{ fontWeight: 800, color: '#0284C7', fontSize: '1.1rem' }}>
                {currentOrder.orderNumber}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#4B5563' }}>
                Date: {new Date(currentOrder.createdAt || Date.now()).toLocaleDateString('en-IN')}
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem', fontSize: '0.82rem', marginBottom: '1.25rem' }}>
            <div>
              <strong>Billed & Shipped To:</strong><br />
              <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>{currentOrder.customerName}</span><br />
              {addr.street}, {addr.city}, {addr.state} - {addr.pincode}<br />
              {currentOrder.gstin && (
                <div style={{ marginTop: '0.2rem' }}>
                  <strong>Customer GSTIN:</strong> <span className="mono">{currentOrder.gstin}</span>
                </div>
              )}
            </div>

            <div style={{ textAlign: 'right' }}>
              <strong>Logistics & Payment:</strong><br />
              Courier: {currentOrder.shipment?.carrier || 'Delhivery Direct'}<br />
              AWB Tracking: <span className="mono" style={{ fontWeight: 700, color: '#0284C7' }}>
                {currentOrder.shipment?.trackingNumber || 'DEL-PENDING'}
              </span><br />
              Payment: <strong style={{ color: currentOrder.paymentDetails?.status === 'Paid' ? '#16A34A' : '#D97706' }}>
                {currentOrder.paymentDetails?.status || 'Paid'}
              </strong> ({currentOrder.paymentDetails?.method || 'Razorpay Online'})
              {currentOrder.paymentDetails?.razorpayPaymentId && (
                <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '2px' }}>
                  Razorpay Txn: <span className="mono" style={{ fontWeight: 600, color: '#0B65C2' }}>{currentOrder.paymentDetails.razorpayPaymentId}</span>
                </div>
              )}
            </div>
          </div>

          <table className="invoice-table">
            <thead>
              <tr>
                <th>SKU</th>
                <th>HSN</th>
                <th>Item Description</th>
                <th style={{ textAlign: 'center' }}>Qty</th>
                <th style={{ textAlign: 'right' }}>Unit Rate</th>
                <th style={{ textAlign: 'right' }}>Amount (INR)</th>
              </tr>
            </thead>
            <tbody>
              {currentOrder.items.map((item, idx) => (
                <tr key={idx}>
                  <td className="mono" style={{ fontWeight: 600 }}>{item.sku}</td>
                  <td className="mono">{item.hsnCode || '85423190'}</td>
                  <td>{item.title}</td>
                  <td style={{ textAlign: 'center' }}>{item.quantity}</td>
                  <td style={{ textAlign: 'right' }}>₹{item.price.toFixed(2)}</td>
                  <td style={{ textAlign: 'right', fontWeight: 700 }}>₹{(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.82rem' }}>
            <div style={{ width: '280px' }}>
              <div className="summary-row">
                <span>Taxable Subtotal:</span>
                <span>₹{currentOrder.subtotal.toFixed(2)}</span>
              </div>
              
              {tax.isIntrastate ? (
                <>
                  <div className="summary-row">
                    <span>CGST (9%):</span>
                    <span>₹{(tax.cgst || (tax.totalGst / 2)).toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>SGST (9%):</span>
                    <span>₹{(tax.sgst || (tax.totalGst / 2)).toFixed(2)}</span>
                  </div>
                </>
              ) : (
                <div className="summary-row">
                  <span>IGST (18%):</span>
                  <span>₹{(tax.igst || tax.totalGst || 0).toFixed(2)}</span>
                </div>
              )}

              <div className="summary-row">
                <span>Shipping Charges:</span>
                <span>{currentOrder.shippingFee === 0 ? 'FREE' : `₹${currentOrder.shippingFee.toFixed(2)}`}</span>
              </div>

              <div className="summary-row total" style={{ color: '#111827' }}>
                <span>Invoice Total:</span>
                <span style={{ color: '#0284C7' }}>₹{currentOrder.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success)', fontSize: '0.85rem', fontWeight: 600 }}>
            <CheckCircle size={18} /> Order Confirmed & Stock Reserved
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn btn-outline" onClick={() => dispatch(setInvoiceOpen(false))}>
              Close
            </button>
            <button className="btn btn-primary" onClick={() => window.print()}>
              <Printer size={15} /> Print GST Tax Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
