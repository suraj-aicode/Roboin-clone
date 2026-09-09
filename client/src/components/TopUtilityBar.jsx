import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setRole, setUserState, setAuthModalOpen } from '../redux/slices/authSlice';
import { setAdminView } from '../redux/slices/orderSlice';
import { Phone, HelpCircle, User, ShieldCheck, MapPin } from 'lucide-react';

export default function TopUtilityBar() {
  const dispatch = useDispatch();
  const { user, currentRole, userState } = useSelector((state) => state.auth);

  const handleRoleChange = (newRole) => {
    dispatch(setRole(newRole));
    if (newRole === 'customer' || newRole === 'guest') {
      dispatch(setAdminView('storefront'));
    }
  };

  return (
    <div style={{
      backgroundColor: 'var(--robu-bg-top)',
      borderBottom: '1px solid var(--robu-border)',
      fontSize: '13px',
      color: 'var(--robu-text-dark)',
      lineHeight: '38px',
      minHeight: '38px'
    }}>
      <div className="robu-container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px'
      }}>
        {/* Left Side: Support Phone & Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <a 
            href="tel:18002666123" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px', 
              fontWeight: 600,
              color: 'var(--robu-text-dark)' 
            }}
          >
            <Phone size={14} color="var(--robu-primary-orange)" />
            <span>1800 266 6123</span>
          </a>

          <span style={{ color: 'var(--robu-border)' }}>|</span>

          <a 
            href="#support" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '5px',
              color: 'var(--robu-text-muted)'
            }}
          >
            <HelpCircle size={14} />
            <span>Customer Support (9:30 AM - 6:00 PM)</span>
          </a>
        </div>

        {/* Right Side: RBAC Role, GST State & Account */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* RBAC Role Selector & Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{
              fontSize: '11px',
              fontWeight: 700,
              padding: '2px 7px',
              borderRadius: '4px',
              backgroundColor: currentRole === 'super_admin' ? '#F3E8FF' : currentRole === 'admin' ? '#EFF6FF' : '#F1F5F9',
              color: currentRole === 'super_admin' ? '#7C3AED' : currentRole === 'admin' ? '#2563EB' : '#475569',
              border: `1px solid ${currentRole === 'super_admin' ? '#DDD6FE' : currentRole === 'admin' ? '#BFDBFE' : '#CBD5E1'}`
            }}>
              {currentRole === 'super_admin' ? '🛡️ Super Admin' : currentRole === 'admin' ? '⚙️ Admin' : currentRole === 'customer' ? '👤 Customer' : currentRole.replace('_', ' ')}
            </span>
            <select
              value={currentRole}
              onChange={(e) => handleRoleChange(e.target.value)}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--robu-border)',
                borderRadius: 'var(--robu-radius-sm)',
                padding: '2px 8px',
                fontSize: '12px',
                fontWeight: 500,
                color: 'var(--robu-text-dark)',
                cursor: 'pointer'
              }}
              title="Switch Active Account / Role (RBAC Demo)"
            >
              <option value="customer">👤 Customer (Satya Prakash - No Admin Access)</option>
              <option value="admin">⚙️ Administrator (Arjun Mehta - Operations)</option>
              <option value="super_admin">🛡️ Super Admin (Full Control + Audit + Users)</option>
              <option value="catalog_manager">📦 Catalog Manager (Kavita Iyer)</option>
              <option value="inventory_manager">🏭 Inventory Manager (Rohan Verma)</option>
              <option value="guest">🌐 Guest Maker</option>
            </select>
          </div>

          {/* GST State Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <MapPin size={14} color="var(--robu-primary-orange)" />
            <select
              value={userState}
              onChange={(e) => dispatch(setUserState(e.target.value))}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--robu-border)',
                borderRadius: 'var(--robu-radius-sm)',
                padding: '2px 8px',
                fontSize: '12px',
                fontWeight: 500,
                color: 'var(--robu-text-dark)',
                cursor: 'pointer'
              }}
              title="Select Delivery State for GST Recalculation"
            >
              <option value="Karnataka">Karnataka (CGST 9% + SGST 9%)</option>
              <option value="Maharashtra">Maharashtra (IGST 18%)</option>
              <option value="Delhi">Delhi (IGST 18%)</option>
              <option value="Tamil Nadu">Tamil Nadu (IGST 18%)</option>
            </select>
          </div>

          {/* Sign In / User Profile */}
          <button
            onClick={() => dispatch(setAuthModalOpen(true))}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--robu-border)',
              borderRadius: 'var(--robu-radius-sm)',
              padding: '2px 10px',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--robu-purple)',
              cursor: 'pointer'
            }}
          >
            <User size={13} />
            <span>{user ? user.name.split(' ')[0] : 'Sign In'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
