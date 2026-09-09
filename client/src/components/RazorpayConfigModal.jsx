import React, { useState, useEffect } from 'react';
import { ShieldAlert, Key, Lock, CheckCircle2, ExternalLink, Sparkles } from 'lucide-react';
import { getRazorpayKey, updateRazorpayConfig } from '../services/razorpayService';

export default function RazorpayConfigModal({ isOpen, onClose, onKeysUpdated }) {
  const [keyId, setKeyId] = useState('');
  const [keySecret, setKeySecret] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (isOpen) {
      getRazorpayKey().then(data => {
        if (data.keyId && !data.keyId.includes('placeholder')) {
          setKeyId(data.keyId);
        } else {
          setKeyId('');
        }
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = async (e) => {
    e.preventDefault();
    if (!keyId.trim() || !keySecret.trim()) {
      setMessage({ type: 'error', text: 'Please provide both Razorpay Key ID and Key Secret.' });
      return;
    }

    setIsSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const res = await updateRazorpayConfig(keyId.trim(), keySecret.trim());
      if (res.success) {
        setMessage({ type: 'success', text: 'Razorpay keys saved and activated successfully!' });
        setTimeout(() => {
          if (onKeysUpdated) onKeysUpdated(keyId.trim());
          onClose();
        }, 1000);
      } else {
        setMessage({ type: 'error', text: res.message || 'Failed saving credentials' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Error communicating with server' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 11000, background: 'rgba(5, 10, 25, 0.85)', backdropFilter: 'blur(8px)' }} onClick={onClose}>
      <div 
        className="modal-content" 
        style={{ 
          maxWidth: '560px', 
          borderRadius: '16px',
          overflow: 'hidden',
          padding: '24px 28px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          background: '#FFFFFF',
          color: '#1E293B'
        }} 
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: '#0B65C2',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontWeight: 900,
              fontSize: '20px'
            }}>
              R
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
                Real Razorpay API Setup
              </h3>
              <span style={{ fontSize: '12px', color: '#64748B' }}>Connect your Razorpay merchant account</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#64748B' }}
          >
            ✕
          </button>
        </div>

        <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, marginBottom: '18px' }}>
          To launch the official Razorpay Standard Checkout popup, enter your API Key from your Razorpay Dashboard.
        </p>

        <div style={{
          background: '#F8FAFC',
          border: '1px solid #E2E8F0',
          borderRadius: '10px',
          padding: '12px 16px',
          marginBottom: '20px',
          fontSize: '12px',
          color: '#334155'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 600 }}>Where to find your API Keys?</span>
            <a 
              href="https://dashboard.razorpay.com/#/access/api-keys" 
              target="_blank" 
              rel="noreferrer"
              style={{ color: '#0B65C2', textDecoration: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <span>Razorpay Dashboard</span>
              <ExternalLink size={13} />
            </a>
          </div>
          <div style={{ color: '#64748B', marginTop: '4px' }}>
            Go to <strong>Settings &rarr; API Keys &rarr; Generate Key</strong> (Test Mode or Live Mode).
          </div>
        </div>

        {message.text && (
          <div style={{
            padding: '10px 14px',
            borderRadius: '8px',
            fontSize: '13px',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: message.type === 'error' ? '#FEF2F2' : '#F0FDF4',
            color: message.type === 'error' ? '#991B1B' : '#166534',
            border: message.type === 'error' ? '1px solid #F87171' : '1px solid #86EFAC'
          }}>
            {message.type === 'error' ? <ShieldAlert size={16} /> : <CheckCircle2 size={16} />}
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleSave}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
              Razorpay Key ID (e.g. rzp_test_xxxxxxxxxxxxxx)
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                required
                placeholder="rzp_test_..."
                value={keyId}
                onChange={(e) => setKeyId(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px 10px 38px',
                  fontSize: '13px',
                  fontFamily: 'monospace',
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  outline: 'none'
                }}
              />
              <Key size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <div style={{ marginBottom: '22px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
              Razorpay Key Secret
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                required
                placeholder="Enter Key Secret..."
                value={keySecret}
                onChange={(e) => setKeySecret(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px 10px 38px',
                  fontSize: '13px',
                  fontFamily: 'monospace',
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  outline: 'none'
                }}
              />
              <Lock size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '10px 18px',
                borderRadius: '8px',
                background: '#F1F5F9',
                border: '1px solid #CBD5E1',
                color: '#475569',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              style={{
                padding: '10px 22px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #0B65C2 0%, #004d99 100%)',
                border: 'none',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(11, 101, 194, 0.3)'
              }}
            >
              <Sparkles size={15} />
              <span>{isSaving ? 'Saving...' : 'Save & Activate Real Razorpay'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
