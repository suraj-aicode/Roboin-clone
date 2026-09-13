import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import AdminDashboard from '../components/AdminDashboard';
import { ShieldAlert, ArrowLeft, Home, ChevronRight } from 'lucide-react';
import { setAuthModalOpen } from '../redux/slices/authSlice';

export default function AdminPage() {
  const dispatch = useDispatch();
  const { currentRole } = useSelector((state) => state.auth);

  const isAdminUser = ['super_admin', 'admin', 'catalog_manager', 'inventory_manager', 'order_manager', 'support_agent', 'marketing_manager'].includes(currentRole);

  return (
    <main style={{ flex: 1, backgroundColor: 'var(--robu-bg-body)', paddingBottom: '60px' }}>
      {/* Breadcrumb */}
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--robu-border)', padding: '10px 0' }}>
        <div className="robu-container" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--robu-text-muted)' }}>
          <Link to="/" style={{ color: 'var(--robu-text-body)', textDecoration: 'none' }}>Home</Link>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--robu-primary-orange)', fontWeight: 600 }}>Enterprise Admin & ERP Console</span>
        </div>
      </div>

      <div className="robu-container" style={{ marginTop: '24px' }}>
        {isAdminUser ? (
          <AdminDashboard />
        ) : (
          <div style={{
            maxWidth: '620px',
            margin: '60px auto',
            padding: '36px',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #FCA5A5',
            boxShadow: '0 20px 25px -5px rgba(239, 68, 68, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#FEE2E2',
              color: '#DC2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <ShieldAlert size={36} />
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--robu-text-heading)', margin: '0 0 8px' }}>
              Restricted Staff Management Access
            </h2>
            <p style={{ color: 'var(--robu-text-muted)', fontSize: '14px', lineHeight: '1.6', margin: '0 0 24px' }}>
              The management portal is restricted to authorized personnel (Admin, Catalog Manager, Inventory Manager, Support). Current session role is <strong>{currentRole || 'guest'}</strong>.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button 
                onClick={() => dispatch(setAuthModalOpen(true))}
                style={{
                  backgroundColor: '#1E1B4B',
                  color: '#FFFFFF',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Staff Sign In (Password Required)
              </button>
              <Link 
                to="/" 
                style={{
                  backgroundColor: '#F1F5F9',
                  color: 'var(--robu-text-body)',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '13.5px',
                  fontWeight: 600
                }}
              >
                Back to Storefront
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
