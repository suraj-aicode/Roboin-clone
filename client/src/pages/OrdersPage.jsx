import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCurrentOrder, setInvoiceOpen } from '../redux/slices/orderSlice';
import { setSelectedOrderForReturn, setReturnModalOpen } from '../redux/slices/communitySlice';
import { 
  Package, 
  Truck, 
  FileText, 
  RotateCcw, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  Home, 
  ShoppingBag,
  ExternalLink
} from 'lucide-react';

export default function OrdersPage() {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredOrders = orders.filter(order => {
    if (filterStatus === 'all') return true;
    return (order.orderStatus || '').toLowerCase() === filterStatus.toLowerCase();
  });

  const handleOpenInvoice = (order) => {
    dispatch(setCurrentOrder(order));
    dispatch(setInvoiceOpen(true));
  };

  const handleOpenReturn = (order) => {
    dispatch(setSelectedOrderForReturn(order));
    dispatch(setReturnModalOpen(true));
  };

  return (
    <main style={{ flex: 1, backgroundColor: 'var(--robu-bg-body)', paddingBottom: '60px' }}>
      {/* Breadcrumb */}
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--robu-border)', padding: '10px 0' }}>
        <div className="robu-container" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--robu-text-muted)' }}>
          <Link to="/" style={{ color: 'var(--robu-text-body)', textDecoration: 'none' }}>Home</Link>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--robu-primary-orange)', fontWeight: 600 }}>My Orders & Shipments</span>
        </div>
      </div>

      <div className="robu-container" style={{ marginTop: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--robu-text-heading)', margin: 0 }}>
              Order History & Consignments
            </h1>
            <p style={{ fontSize: '13.5px', color: 'var(--robu-text-muted)', margin: '4px 0 0' }}>
              Track consignments, download GST Tax Invoices, and manage hardware warranty & returns.
            </p>
          </div>

          {/* Filter Status */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {['all', 'processing', 'shipped', 'delivered'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  border: `1px solid ${filterStatus === st ? 'var(--robu-primary-orange)' : 'var(--robu-border)'}`,
                  backgroundColor: filterStatus === st ? 'var(--robu-primary-orange)' : '#FFFFFF',
                  color: filterStatus === st ? '#FFFFFF' : 'var(--robu-text-body)',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid var(--robu-border)',
            padding: '60px 24px',
            textAlign: 'center',
            boxShadow: 'var(--robu-shadow-sm)'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#F1F5F9',
              color: 'var(--robu-text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <Package size={32} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--robu-text-heading)', margin: '0 0 6px' }}>
              No orders found
            </h3>
            <p style={{ color: 'var(--robu-text-muted)', fontSize: '14px', margin: '0 0 20px' }}>
              You have not placed any orders matching this filter yet.
            </p>
            <Link to="/" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'var(--robu-primary-orange)',
              color: '#FFFFFF',
              padding: '10px 20px',
              borderRadius: '8px',
              fontWeight: 700,
              textDecoration: 'none',
              fontSize: '13.5px'
            }}>
              <ShoppingBag size={16} />
              <span>Explore Components Catalog</span>
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {filteredOrders.map((order) => {
              const status = order.orderStatus || 'Processing';
              const isDelivered = status.toLowerCase() === 'delivered';
              const isShipped = status.toLowerCase() === 'shipped';

              return (
                <div key={order.orderId || order._id} style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid var(--robu-border)',
                  boxShadow: 'var(--robu-shadow-sm)',
                  overflow: 'hidden'
                }}>
                  {/* Order Card Header */}
                  <div style={{
                    padding: '16px 20px',
                    backgroundColor: '#F8FAFC',
                    borderBottom: '1px solid var(--robu-border)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '12px'
                  }}>
                    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '11px', color: 'var(--robu-text-muted)', fontWeight: 600 }}>ORDER PLACED</div>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--robu-text-dark)' }}>
                          {new Date(order.createdAt || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                      </div>

                      <div>
                        <div style={{ fontSize: '11px', color: 'var(--robu-text-muted)', fontWeight: 600 }}>TOTAL AMOUNT</div>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--robu-primary-orange)' }}>
                          ₹{(order.grandTotal || 0).toLocaleString('en-IN')}
                        </div>
                      </div>

                      <div>
                        <div style={{ fontSize: '11px', color: 'var(--robu-text-muted)', fontWeight: 600 }}>DISPATCH TO</div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--robu-text-dark)' }}>
                          {order.shippingAddress?.fullName || 'Customer'} ({order.shippingAddress?.city || 'Bengaluru'})
                        </div>
                      </div>
                    </div>

                    {/* Status Pill & Order ID */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '12px', color: 'var(--robu-text-muted)' }}>
                        ID: <strong>{order.orderId}</strong>
                      </span>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: 700,
                        backgroundColor: isDelivered ? '#DEF7EC' : isShipped ? '#E0E7FF' : '#FEF3C7',
                        color: isDelivered ? '#03543F' : isShipped ? '#3730A3' : '#92400E'
                      }}>
                        {status}
                      </span>
                    </div>
                  </div>

                  {/* Order Items List */}
                  <div style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {(order.items || []).map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--robu-text-heading)' }}>
                              {item.title}
                            </div>
                            <div style={{ fontSize: '12px', color: 'var(--robu-text-muted)', marginTop: '2px' }}>
                              SKU: {item.sku} | Quantity: {item.quantity} | Unit Price: ₹{item.price}
                            </div>
                          </div>
                          <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--robu-text-dark)' }}>
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons Row */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      gap: '12px',
                      marginTop: '20px',
                      paddingTop: '16px',
                      borderTop: '1px solid var(--robu-border-light)'
                    }}>
                      <button 
                        onClick={() => handleOpenInvoice(order)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '8px 14px',
                          borderRadius: '6px',
                          border: '1px solid var(--robu-border)',
                          backgroundColor: '#FFFFFF',
                          fontSize: '12.5px',
                          fontWeight: 600,
                          color: 'var(--robu-text-dark)',
                          cursor: 'pointer'
                        }}
                      >
                        <FileText size={15} color="var(--robu-primary-orange)" />
                        <span>Download GST Tax Invoice</span>
                      </button>

                      <button 
                        onClick={() => handleOpenReturn(order)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '8px 14px',
                          borderRadius: '6px',
                          border: '1px solid var(--robu-border)',
                          backgroundColor: '#FFFFFF',
                          fontSize: '12.5px',
                          fontWeight: 600,
                          color: 'var(--robu-text-dark)',
                          cursor: 'pointer'
                        }}
                      >
                        <RotateCcw size={15} color="var(--robu-purple)" />
                        <span>Return / Replacement</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
