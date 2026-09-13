import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUserState, setAuthModalOpen, logout } from '../redux/slices/authSlice';
import { Phone, HelpCircle, User, ShieldCheck, MapPin, Lock, LogOut } from 'lucide-react';

export default function TopUtilityBar() {
  const dispatch = useDispatch();
  const { user, currentRole, userState } = useSelector((state) => state.auth);

  return (
    <div style={{
      backgroundColor: '#F4F5F8',
      borderBottom: '1px solid #E5E7EB',
      fontSize: '12px',
      color: '#555555',
      lineHeight: '34px',
      minHeight: '34px'
    }}>
      <div className="robu-container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px'
      }}>
        {/* Left Side: Support Phone & Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <a 
            href="tel:18002666123" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px', 
              fontWeight: 600,
              color: '#333333',
              textDecoration: 'none'
            }}
          >
            <Phone size={13} color="var(--robu-primary-orange)" />
            <span>1800 266 6123</span>
          </a>

          <span style={{ color: '#D1D5DB' }}>|</span>

          <Link 
            to="/support" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '5px',
              color: '#555555',
              textDecoration: 'none',
              fontWeight: 500
            }}
          >
            <HelpCircle size={13} />
            <span>Customer Support</span>
          </Link>
        </div>

        {/* Right Side: Authenticated Identity, GST State & Login/Logout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Authenticated Role Badge & User Name (Protected - No Dropdown) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              fontSize: '11px',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '4px',
              backgroundColor: currentRole === 'super_admin' ? '#F3E8FF' : currentRole === 'admin' ? '#EFF6FF' : currentRole === 'customer' ? '#F1F5F9' : '#FEF3C7',
              color: currentRole === 'super_admin' ? '#7C3AED' : currentRole === 'admin' ? '#2563EB' : currentRole === 'customer' ? '#475569' : '#D97706',
              border: `1px solid ${currentRole === 'super_admin' ? '#DDD6FE' : currentRole === 'admin' ? '#BFDBFE' : currentRole === 'customer' ? '#CBD5E1' : '#FDE68A'}`
            }}>
              {currentRole === 'super_admin' ? '🛡️ Super Admin' : currentRole === 'admin' ? '⚙️ Admin' : currentRole === 'customer' ? '👤 Customer' : currentRole === 'catalog_manager' ? '📦 Catalog Mgr' : currentRole === 'inventory_manager' ? '🏭 Inventory Mgr' : '🌐 Guest'}
            </span>
            <span style={{ fontSize: '12px', color: '#1E1E24', fontWeight: 600 }}>
              {user ? user.name : 'Guest User'}
            </span>
          </div>

          <span style={{ color: '#D1D5DB' }}>|</span>

          {/* GST State Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <MapPin size={13} color="var(--robu-primary-orange)" />
            <select
              value={userState}
              onChange={(e) => dispatch(setUserState(e.target.value))}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #D1D5DB',
                borderRadius: 'var(--robu-radius-sm)',
                padding: '2px 8px',
                fontSize: '11.5px',
                fontWeight: 500,
                color: '#374151',
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

          <span style={{ color: '#D1D5DB' }}>|</span>

          {/* Account Authentication Action Controls */}
          {user && currentRole !== 'guest' ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => dispatch(setAuthModalOpen(true))}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #D1D5DB',
                  borderRadius: 'var(--robu-radius-sm)',
                  padding: '2px 8px',
                  fontSize: '11.5px',
                  fontWeight: 600,
                  color: '#374151',
                  cursor: 'pointer'
                }}
                title="Switch Account (Requires Login & Password)"
              >
                <Lock size={12} color="var(--robu-primary-purple)" />
                <span>Switch</span>
              </button>

              <button
                onClick={() => dispatch(logout())}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: 'transparent',
                  border: '1px solid #E5E7EB',
                  borderRadius: 'var(--robu-radius-sm)',
                  padding: '2px 8px',
                  fontSize: '11.5px',
                  fontWeight: 600,
                  color: '#EF4444',
                  cursor: 'pointer'
                }}
                title="Sign Out"
              >
                <LogOut size={12} />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => dispatch(setAuthModalOpen(true))}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                backgroundColor: 'var(--robu-primary-purple)',
                border: 'none',
                borderRadius: 'var(--robu-radius-sm)',
                padding: '3px 12px',
                fontSize: '12px',
                fontWeight: 700,
                color: '#FFFFFF',
                cursor: 'pointer'
              }}
            >
              <User size={13} />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
