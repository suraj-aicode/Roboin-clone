import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setNotificationDrawerOpen, markAsRead, markAllAsRead } from '../redux/slices/notificationSlice';
import { setOrderHistoryOpen } from '../redux/slices/orderSlice';
import { Bell, CheckCheck, Package, Tag, LifeBuoy, Info } from 'lucide-react';

export default function NotificationDrawer() {
  const dispatch = useDispatch();
  const { notifications, isDrawerOpen } = useSelector((state) => state.notifications);

  if (!isDrawerOpen) return null;

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationClick = (notif) => {
    dispatch(markAsRead(notif.id));
    if (notif.link === '#orders') {
      dispatch(setNotificationDrawerOpen(false));
      dispatch(setOrderHistoryOpen(true));
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'order': return <Package size={16} color="var(--primary)" />;
      case 'promo': return <Tag size={16} color="var(--success)" />;
      case 'support': return <LifeBuoy size={16} color="#f59e0b" />;
      default: return <Info size={16} color="var(--text-muted)" />;
    }
  };

  return (
    <div className="cart-overlay" onClick={() => dispatch(setNotificationDrawerOpen(false))}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ color: 'var(--primary)' }}>
              <Bell size={20} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>
              Notifications {unreadCount > 0 && `(${unreadCount} new)`}
            </h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {unreadCount > 0 && (
              <button 
                onClick={() => dispatch(markAllAsRead())}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                title="Mark all as read"
              >
                <CheckCheck size={14} /> Mark Read
              </button>
            )}
            <button className="modal-close" onClick={() => dispatch(setNotificationDrawerOpen(false))}>✕</button>
          </div>
        </div>

        <div className="cart-body">
          {notifications.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-muted)' }}>🔔</div>
              <h4 style={{ fontWeight: 700 }}>No Notifications</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                You're all caught up! Updates regarding shipments and promos will appear here.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {notifications.map((notif) => (
                <div 
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif)}
                  style={{
                    background: notif.read ? 'rgba(255,255,255,0.02)' : 'rgba(56, 189, 248, 0.05)',
                    border: `1px solid ${notif.read ? 'var(--border-color)' : 'rgba(56, 189, 248, 0.3)'}`,
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.85rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    position: 'relative'
                  }}
                >
                  {!notif.read && (
                    <span style={{
                      position: 'absolute',
                      top: '0.85rem',
                      right: '0.85rem',
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      background: 'var(--primary)'
                    }} />
                  )}
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <div style={{ marginTop: '2px' }}>
                      {getIcon(notif.type)}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: notif.read ? 'var(--text-main)' : 'var(--primary)', marginBottom: '0.2rem' }}>
                        {notif.title}
                      </h4>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.4, marginBottom: '0.35rem' }}>
                        {notif.message}
                      </p>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                        {notif.timestamp}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
