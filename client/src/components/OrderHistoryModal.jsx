import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  setOrderHistoryOpen, 
  setCurrentOrder, 
  setInvoiceOpen, 
  setCreditNoteOpen, 
  setSelectedCreditNoteOrder, 
  cancelOrderLocal 
} from '../redux/slices/orderSlice';
import { addNotification } from '../redux/slices/notificationSlice';
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  FileText, 
  RotateCcw, 
  AlertCircle,
  ExternalLink,
  Ban
} from 'lucide-react';

export default function OrderHistoryModal() {
  const dispatch = useDispatch();
  const { orders, isOrderHistoryOpen } = useSelector((state) => state.order);
  const [selectedOrderForTracking, setSelectedOrderForTracking] = useState(null);

  if (!isOrderHistoryOpen) return null;

  const handleCancelOrder = (order) => {
    if (window.confirm(`Are you sure you want to cancel order ${order.orderNumber}? This will release the reserved inventory and initiate an automated refund.`)) {
      dispatch(cancelOrderLocal(order._id || order.orderNumber));
      dispatch(addNotification({
        type: 'order',
        title: `Order Cancelled: ${order.orderNumber}`,
        message: 'Your order was cancelled successfully. Full refund has been initiated to your original payment method.',
        link: '#orders'
      }));
    }
  };

  const handleViewInvoice = (order) => {
    dispatch(setCurrentOrder(order));
    dispatch(setInvoiceOpen(true));
  };

  const handleViewCreditNote = (order) => {
    dispatch(setSelectedCreditNoteOrder(order));
    dispatch(setCreditNoteOpen(true));
  };

  return (
    <div className="modal-overlay" onClick={() => dispatch(setOrderHistoryOpen(false))}>
      <div className="modal-content" style={{ maxWidth: '920px', maxHeight: '90vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={() => dispatch(setOrderHistoryOpen(false))}>✕</button>

        <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Package size={22} style={{ color: 'var(--primary)' }} />
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>
              My Orders & Logistics Tracking (MOD-10 & MOD-11)
            </h2>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
            Review past purchases, download GST invoices, track live courier milestones, or cancel pending orders.
          </p>
        </div>

        {orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📦</div>
            <h4 style={{ fontWeight: 700 }}>No Orders Placed Yet</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Your completed purchases and deliveries will appear here.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {orders.map((order) => {
              const isDelivered = order.status === 'Delivered';
              const isCancelled = order.status === 'Cancelled';
              const isShipped = order.status === 'Shipped' || order.status === 'In Transit';

              return (
                <div 
                  key={order._id || order.orderNumber}
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '1.25rem'
                  }}
                >
                  {/* Order Top Bar */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                        <span className="mono" style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                          {order.orderNumber}
                        </span>
                        <span style={{
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          padding: '0.2rem 0.5rem',
                          borderRadius: '12px',
                          textTransform: 'uppercase',
                          background: isCancelled ? 'rgba(239, 68, 68, 0.15)' :
                                      isDelivered ? 'rgba(34, 197, 94, 0.15)' : 'rgba(56, 189, 248, 0.15)',
                          color: isCancelled ? 'var(--danger)' :
                                 isDelivered ? 'var(--success)' : 'var(--primary)',
                          border: `1px solid ${isCancelled ? 'rgba(239,68,68,0.3)' : isDelivered ? 'rgba(34,197,94,0.3)' : 'rgba(56,189,248,0.3)'}`
                        }}>
                          {order.status}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)' }}>
                        ₹{Number(order.totalAmount || 0).toLocaleString('en-IN')}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                        Incl. 18% GST (HSN Itemized)
                      </div>
                    </div>
                  </div>

                  {/* Order Items Table */}
                  <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '4px', padding: '0.75rem', marginBottom: '1rem' }}>
                    {order.items?.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem', padding: '0.35rem 0', borderBottom: idx < order.items.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                        <div>
                          <span style={{ fontWeight: 600 }}>{item.title || item.productId}</span>
                          <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginLeft: '0.5rem' }}>
                            ({item.sku || 'SKU-PROD'}) × {item.quantity}
                          </span>
                        </div>
                        <div style={{ fontWeight: 700 }}>
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Logistics Tracking Stepper (MOD-11) */}
                  {!isCancelled && (
                    <div style={{ background: 'rgba(56, 189, 248, 0.03)', border: '1px solid rgba(56, 189, 248, 0.15)', borderRadius: 'var(--radius-sm)', padding: '0.85rem', marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)' }}>
                          <Truck size={14} /> Logistics: {order.courierPartner || 'Delhivery Surface Express'}
                        </div>
                        <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                          AWB: {order.awb || `AWB-DLH-${order.orderNumber.replace(/\D/g, '')}`}
                        </div>
                      </div>

                      {/* Visual Stepper */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', position: 'relative', textAlign: 'center', gap: '0.5rem' }}>
                        {[
                          { title: 'Ordered', done: true },
                          { title: 'Packed', done: true },
                          { title: 'In Transit', done: isShipped || isDelivered },
                          { title: 'Delivered', done: isDelivered }
                        ].map((step, sIdx) => (
                          <div key={sIdx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem' }}>
                            <div style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              background: step.done ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                              color: step.done ? '#000' : 'var(--text-dim)',
                              fontWeight: 700,
                              fontSize: '0.75rem'
                            }}>
                              {step.done ? '✓' : (sIdx + 1)}
                            </div>
                            <span style={{ fontSize: '0.72rem', color: step.done ? 'var(--text-main)' : 'var(--text-dim)' }}>
                              {step.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Cancellation Alert if Cancelled */}
                  {isCancelled && (
                    <div style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: 'var(--radius-sm)', padding: '0.75rem', marginBottom: '1rem', fontSize: '0.8rem', color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <AlertCircle size={16} />
                      <div>
                        <strong>Order Cancelled:</strong> Reserved inventory released. Full refund of ₹{order.totalAmount} processed to originating source.
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                    <button 
                      className="btn btn-outline btn-sm"
                      style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem' }}
                      onClick={() => handleViewInvoice(order)}
                    >
                      <FileText size={13} /> View GST Tax Invoice
                    </button>

                    {isCancelled && (
                      <button 
                        className="btn btn-outline btn-sm"
                        style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', borderColor: 'var(--danger)', color: 'var(--danger)' }}
                        onClick={() => handleViewCreditNote(order)}
                      >
                        <RotateCcw size={13} /> View GST Credit Note (MOD-20)
                      </button>
                    )}

                    {!isDelivered && !isCancelled && (
                      <button 
                        className="btn btn-outline btn-sm"
                        style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', borderColor: 'rgba(239,68,68,0.4)', color: 'var(--danger)' }}
                        onClick={() => handleCancelOrder(order)}
                      >
                        <Ban size={13} /> Cancel Order (Self-Service)
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
