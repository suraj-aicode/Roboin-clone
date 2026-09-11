import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  CreditCard, 
  QrCode, 
  Building2, 
  Smartphone, 
  Lock, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Clock, 
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { verifyPaymentSignature } from '../services/razorpayService';

export default function RazorpayModal({
  isOpen,
  onClose,
  orderDetails,
  onPaymentSuccess,
  onPaymentFailure
}) {
  if (!isOpen || !orderDetails) return null;

  const {
    orderId = `order_${Math.random().toString(36).substring(2, 11)}`,
    amount = 0,
    customer = {},
    receipt = ''
  } = orderDetails;

  const [activeTab, setActiveTab] = useState('upi'); // 'upi' | 'card' | 'netbanking' | 'wallet'
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStatus, setProcessStatus] = useState(''); // 'authenticating' | 'authorizing' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [timerSeconds, setTimerSeconds] = useState(600); // 10 minutes QR timer

  // UPI Form state
  const [upiId, setUpiId] = useState('maker.lab@okhdfcbank');
  const [selectedUpiApp, setSelectedUpiApp] = useState('gpay');

  // Card Form state
  const [cardData, setCardData] = useState({
    number: '4012 0000 0000 0002',
    name: customer.name || 'Satya Prakash',
    expiry: '12/28',
    cvv: '123'
  });

  // Netbanking state
  const [selectedBank, setSelectedBank] = useState('HDFC');

  // Countdown timer for UPI QR
  useEffect(() => {
    if (timerSeconds <= 0) return;
    const interval = setInterval(() => {
      setTimerSeconds(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timerSeconds]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Trigger payment authorization and signature verification
  const handleCompletePayment = async (methodName) => {
    setIsProcessing(true);
    setProcessStatus('authorizing');
    setErrorMessage('');

    try {
      // Simulate real-time bank handshake
      await new Promise(resolve => setTimeout(resolve, 1400));
      setProcessStatus('verifying');

      const generatedPaymentId = `pay_${Math.random().toString(36).substring(2, 12).toUpperCase()}`;
      const mockSignature = `sig_${Math.random().toString(36).substring(2, 16)}`;

      // 1. Verify with backend
      const verifyRes = await verifyPaymentSignature({
        razorpay_order_id: orderId,
        razorpay_payment_id: generatedPaymentId,
        razorpay_signature: mockSignature
      });

      if (verifyRes.success) {
        setProcessStatus('success');
        await new Promise(resolve => setTimeout(resolve, 900));

        onPaymentSuccess({
          method: methodName || 'Razorpay UPI',
          razorpayOrderId: orderId,
          razorpayPaymentId: generatedPaymentId,
          razorpaySignature: mockSignature,
          amount,
          status: 'Paid'
        });
      } else {
        throw new Error(verifyRes.message || 'Signature verification rejected');
      }
    } catch (err) {
      setProcessStatus('error');
      setErrorMessage(err.message || 'Transaction authorization failed.');
      if (onPaymentFailure) onPaymentFailure(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 10000, background: 'rgba(5, 10, 25, 0.82)', backdropFilter: 'blur(8px)' }} onClick={onClose}>
      <div 
        className="modal-content" 
        style={{ 
          maxWidth: '740px', 
          padding: 0, 
          borderRadius: '16px', 
          overflow: 'hidden', 
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          background: '#FFFFFF',
          color: '#1E293B',
          fontFamily: 'Inter, system-ui, sans-serif'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. Official Razorpay Top Header */}
        <div style={{
          background: 'linear-gradient(135deg, #0c2340 0%, #17345f 50%, #0a192f 100%)',
          padding: '18px 24px',
          color: '#FFFFFF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: '#0B65C2',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(11, 101, 194, 0.4)'
            }}>
              <span style={{ fontWeight: 900, color: '#FFFFFF', fontSize: '20px', letterSpacing: '-1px' }}>R</span>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontWeight: 800, fontSize: '15px', letterSpacing: '0.2px' }}>Razorpay</span>
                <span style={{ 
                  background: 'rgba(255,255,255,0.15)', 
                  fontSize: '10px', 
                  padding: '2px 6px', 
                  borderRadius: '4px',
                  fontWeight: 600
                }}>SECURE</span>
              </div>
              <div style={{ fontSize: '12px', color: '#94A3B8' }}>RoboTech Components Pvt Ltd</div>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Amount to Pay</div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#38BDF8', letterSpacing: '-0.5px' }}>
              ₹{Number(amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </div>
          </div>
        </div>

        {/* 2. Sub-strip with Trust & Live order indicators */}
        <div style={{
          background: '#F8FAFC',
          borderBottom: '1px solid #E2E8F0',
          padding: '8px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '11px',
          color: '#64748B'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={14} color="#10B981" />
            <span>256-Bit SSL Encrypted | PCI-DSS Level 1 Compliant</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>Order Ref: <strong>{orderId}</strong></span>
          </div>
        </div>

        {/* 3. Main Payment Body */}
        {processStatus === 'authorizing' || processStatus === 'verifying' ? (
          <div style={{ padding: '60px 24px', textAlign: 'center' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#EFF6FF',
              color: '#2563EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto'
            }}>
              <Loader2 size={32} className="spin" style={{ animation: 'spin 1s linear infinite' }} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
              Communicating with Bank Network
            </h3>
            <p style={{ fontSize: '13px', color: '#64748B', maxWidth: '400px', margin: '0 auto' }}>
              {processStatus === 'authorizing' 
                ? 'Validating payment credentials and authorization token...' 
                : 'Verifying cryptographic payment signature with server-authoritative key...'}
            </p>
          </div>
        ) : processStatus === 'success' ? (
          <div style={{ padding: '60px 24px', textAlign: 'center' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#DCFCE7',
              color: '#16A34A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto'
            }}>
              <CheckCircle2 size={38} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#16A34A', marginBottom: '6px' }}>
              Payment Successful!
            </h3>
            <p style={{ fontSize: '13px', color: '#64748B' }}>
              ₹{Number(amount).toFixed(2)} received. Generating your GST Tax Invoice...
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', minHeight: '380px' }}>
            {/* Left Sidebar: Payment Categories */}
            <div style={{ background: '#F8FAFC', borderRight: '1px solid #E2E8F0', padding: '16px 0' }}>
              <button
                type="button"
                onClick={() => setActiveTab('upi')}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 20px',
                  background: activeTab === 'upi' ? '#FFFFFF' : 'transparent',
                  border: 'none',
                  borderLeft: activeTab === 'upi' ? '4px solid #0B65C2' : '4px solid transparent',
                  fontWeight: activeTab === 'upi' ? 700 : 500,
                  color: activeTab === 'upi' ? '#0B65C2' : '#475569',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '13px'
                }}
              >
                <QrCode size={18} />
                <span>UPI / Instant QR</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('card')}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 20px',
                  background: activeTab === 'card' ? '#FFFFFF' : 'transparent',
                  border: 'none',
                  borderLeft: activeTab === 'card' ? '4px solid #0B65C2' : '4px solid transparent',
                  fontWeight: activeTab === 'card' ? 700 : 500,
                  color: activeTab === 'card' ? '#0B65C2' : '#475569',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '13px'
                }}
              >
                <CreditCard size={18} />
                <span>Cards (Debit/Credit)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('netbanking')}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 20px',
                  background: activeTab === 'netbanking' ? '#FFFFFF' : 'transparent',
                  border: 'none',
                  borderLeft: activeTab === 'netbanking' ? '4px solid #0B65C2' : '4px solid transparent',
                  fontWeight: activeTab === 'netbanking' ? 700 : 500,
                  color: activeTab === 'netbanking' ? '#0B65C2' : '#475569',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '13px'
                }}
              >
                <Building2 size={18} />
                <span>Net Banking</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('wallet')}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 20px',
                  background: activeTab === 'wallet' ? '#FFFFFF' : 'transparent',
                  border: 'none',
                  borderLeft: activeTab === 'wallet' ? '4px solid #0B65C2' : '4px solid transparent',
                  fontWeight: activeTab === 'wallet' ? 700 : 500,
                  color: activeTab === 'wallet' ? '#0B65C2' : '#475569',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '13px'
                }}
              >
                <Smartphone size={18} />
                <span>Wallets & Others</span>
              </button>

              <div style={{ padding: '24px 20px 0 20px', fontSize: '11px', color: '#94A3B8' }}>
                <p style={{ margin: 0 }}>Razorpay Sandbox Node v2.9 Active</p>
              </div>
            </div>

            {/* Right Panel: Content */}
            <div style={{ padding: '24px' }}>
              {errorMessage && (
                <div style={{ 
                  background: '#FEF2F2', 
                  border: '1px solid #FCA5A5', 
                  color: '#B91C1C', 
                  padding: '10px 14px', 
                  borderRadius: '8px', 
                  fontSize: '12px',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <AlertCircle size={16} />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* TAB 1: UPI */}
              {activeTab === 'upi' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>
                      Scan QR Code using any UPI App
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '4px', 
                      fontSize: '12px', 
                      color: timerSeconds < 120 ? '#EF4444' : '#64748B',
                      background: '#F1F5F9',
                      padding: '3px 8px',
                      borderRadius: '4px'
                    }}>
                      <Clock size={13} />
                      <span>Expires in {formatTime(timerSeconds)}</span>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '170px 1fr', gap: '20px', alignItems: 'center', marginBottom: '20px' }}>
                    {/* Visual QR Code box */}
                    <div style={{
                      border: '2px solid #E2E8F0',
                      borderRadius: '12px',
                      padding: '12px',
                      textAlign: 'center',
                      background: '#FFFFFF',
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
                    }}>
                      {/* Embedded authentic UPI QR Matrix SVG */}
                      <svg viewBox="0 0 100 100" width="140" height="140" style={{ display: 'block', margin: '0 auto' }}>
                        <rect width="100" height="100" fill="#FFFFFF" />
                        {/* Position detection squares */}
                        <rect x="5" y="5" width="26" height="26" fill="#0F172A" />
                        <rect x="9" y="9" width="18" height="18" fill="#FFFFFF" />
                        <rect x="13" y="13" width="10" height="10" fill="#0B65C2" />

                        <rect x="69" y="5" width="26" height="26" fill="#0F172A" />
                        <rect x="73" y="9" width="18" height="18" fill="#FFFFFF" />
                        <rect x="77" y="13" width="10" height="10" fill="#0B65C2" />

                        <rect x="5" y="69" width="26" height="26" fill="#0F172A" />
                        <rect x="9" y="73" width="18" height="18" fill="#FFFFFF" />
                        <rect x="13" y="77" width="10" height="10" fill="#0B65C2" />

                        {/* QR Data Dots */}
                        <rect x="36" y="8" width="6" height="6" fill="#0F172A" />
                        <rect x="46" y="8" width="6" height="6" fill="#0F172A" />
                        <rect x="56" y="8" width="6" height="6" fill="#0F172A" />
                        <rect x="36" y="18" width="6" height="6" fill="#0B65C2" />
                        <rect x="48" y="18" width="6" height="6" fill="#0F172A" />
                        <rect x="36" y="28" width="18" height="6" fill="#0F172A" />
                        
                        <rect x="8" y="36" width="6" height="6" fill="#0F172A" />
                        <rect x="18" y="36" width="6" height="6" fill="#0B65C2" />
                        <rect x="28" y="36" width="6" height="6" fill="#0F172A" />
                        <rect x="38" y="38" width="8" height="8" fill="#0B65C2" />
                        <rect x="50" y="38" width="8" height="8" fill="#0F172A" />
                        <rect x="62" y="36" width="6" height="6" fill="#0F172A" />
                        <rect x="72" y="36" width="8" height="8" fill="#0B65C2" />
                        <rect x="84" y="36" width="8" height="8" fill="#0F172A" />

                        <rect x="8" y="46" width="8" height="8" fill="#0F172A" />
                        <rect x="20" y="46" width="8" height="8" fill="#0F172A" />
                        <rect x="32" y="48" width="6" height="6" fill="#0F172A" />
                        <rect x="42" y="48" width="6" height="6" fill="#0B65C2" />
                        <rect x="52" y="48" width="8" height="8" fill="#0F172A" />
                        <rect x="64" y="46" width="8" height="8" fill="#0B65C2" />
                        <rect x="76" y="46" width="8" height="8" fill="#0F172A" />

                        <rect x="36" y="68" width="6" height="6" fill="#0F172A" />
                        <rect x="46" y="68" width="6" height="6" fill="#0F172A" />
                        <rect x="56" y="68" width="6" height="6" fill="#0B65C2" />
                        <rect x="66" y="68" width="6" height="6" fill="#0F172A" />
                        <rect x="36" y="78" width="8" height="8" fill="#0B65C2" />
                        <rect x="48" y="78" width="8" height="8" fill="#0F172A" />
                        <rect x="60" y="78" width="8" height="8" fill="#0F172A" />
                        <rect x="72" y="78" width="8" height="8" fill="#0B65C2" />

                        <circle cx="50" cy="50" r="11" fill="#FFFFFF" />
                        <circle cx="50" cy="50" r="8" fill="#0B65C2" />
                      </svg>
                      <div style={{ fontSize: '10px', fontWeight: 600, color: '#475569', marginTop: '6px' }}>
                        UPI / BHIM / GPay
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '12px', color: '#475569', marginBottom: '12px' }}>
                        Supported UPI Apps:
                      </div>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                        {['Google Pay', 'PhonePe', 'Paytm', 'BHIM UPI', 'Cred'].map(app => (
                          <span key={app} style={{
                            fontSize: '11px',
                            fontWeight: 600,
                            padding: '4px 10px',
                            background: '#F1F5F9',
                            border: '1px solid #CBD5E1',
                            borderRadius: '6px',
                            color: '#334155'
                          }}>
                            {app}
                          </span>
                        ))}
                      </div>

                      <div style={{ fontSize: '12px', fontWeight: 600, color: '#0F172A', marginBottom: '6px' }}>
                        Or Enter UPI ID:
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="e.g. mobile@upi"
                          style={{
                            flex: 1,
                            padding: '8px 12px',
                            fontSize: '13px',
                            border: '1px solid #CBD5E1',
                            borderRadius: '6px',
                            outline: 'none'
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCompletePayment('Razorpay UPI')}
                    disabled={isProcessing}
                    style={{
                      width: '100%',
                      background: 'linear-gradient(135deg, #0B65C2 0%, #004d99 100%)',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '13px',
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 12px rgba(11, 101, 194, 0.3)'
                    }}
                  >
                    <Sparkles size={16} />
                    <span>Simulate UPI Payment Approval (₹{Number(amount).toFixed(2)})</span>
                  </button>
                </div>
              )}

              {/* TAB 2: CARDS */}
              {activeTab === 'card' && (
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', marginBottom: '14px' }}>
                    Enter Credit or Debit Card
                  </div>

                  {/* Card Visual Preview */}
                  <div style={{
                    background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
                    borderRadius: '12px',
                    padding: '18px 20px',
                    color: '#FFFFFF',
                    marginBottom: '16px',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.15)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                      <span style={{ fontSize: '11px', color: '#94A3B8', letterSpacing: '1px' }}>ROBOTECH PREFERRED CARD</span>
                      <span style={{ fontWeight: 800, fontSize: '15px', color: '#38BDF8', letterSpacing: '1px' }}>VISA</span>
                    </div>
                    <div style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '2px', marginBottom: '14px', fontFamily: 'monospace' }}>
                      {cardData.number}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                      <div>
                        <div style={{ fontSize: '9px', color: '#94A3B8', textTransform: 'uppercase' }}>Card Holder</div>
                        <div style={{ fontWeight: 600 }}>{cardData.name}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '9px', color: '#94A3B8', textTransform: 'uppercase' }}>Expires</div>
                        <div style={{ fontWeight: 600 }}>{cardData.expiry}</div>
                      </div>
                    </div>
                  </div>

                  {/* Card Form */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ gridColumn: 'span 2' }}>
                      <label style={{ fontSize: '11px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>Card Number</label>
                      <input
                        type="text"
                        value={cardData.number}
                        onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                        style={{ width: '100%', padding: '9px 12px', fontSize: '13px', border: '1px solid #CBD5E1', borderRadius: '6px' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>Expires (MM/YY)</label>
                      <input
                        type="text"
                        value={cardData.expiry}
                        onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                        style={{ width: '100%', padding: '9px 12px', fontSize: '13px', border: '1px solid #CBD5E1', borderRadius: '6px' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>CVV</label>
                      <input
                        type="password"
                        maxLength="3"
                        value={cardData.cvv}
                        onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                        style={{ width: '100%', padding: '9px 12px', fontSize: '13px', border: '1px solid #CBD5E1', borderRadius: '6px' }}
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCompletePayment('Razorpay Card (Visa/Mastercard)')}
                    disabled={isProcessing}
                    style={{
                      width: '100%',
                      background: '#0B65C2',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '13px',
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '14px',
                      cursor: 'pointer'
                    }}
                  >
                    Pay ₹{Number(amount).toFixed(2)} with Card
                  </button>
                </div>
              )}

              {/* TAB 3: NETBANKING */}
              {activeTab === 'netbanking' && (
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', marginBottom: '14px' }}>
                    Select Your Bank
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '18px' }}>
                    {['HDFC', 'SBI', 'ICICI', 'Axis Bank', 'Kotak', 'PNB'].map(bank => (
                      <button
                        key={bank}
                        type="button"
                        onClick={() => setSelectedBank(bank)}
                        style={{
                          padding: '12px 8px',
                          border: selectedBank === bank ? '2px solid #0B65C2' : '1px solid #E2E8F0',
                          background: selectedBank === bank ? '#EFF6FF' : '#FFFFFF',
                          color: selectedBank === bank ? '#0B65C2' : '#334155',
                          borderRadius: '8px',
                          fontWeight: 700,
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        {bank}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCompletePayment(`Razorpay Netbanking (${selectedBank})`)}
                    disabled={isProcessing}
                    style={{
                      width: '100%',
                      background: '#0B65C2',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '13px',
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '14px',
                      cursor: 'pointer'
                    }}
                  >
                    Proceed with {selectedBank} Netbanking
                  </button>
                </div>
              )}

              {/* TAB 4: WALLETS */}
              {activeTab === 'wallet' && (
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', marginBottom: '14px' }}>
                    Digital Wallets & Pay Later
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                    {['Paytm Wallet', 'Amazon Pay', 'MobiKwik', 'Simpl PayLater'].map(w => (
                      <label key={w} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 14px',
                        border: '1px solid #E2E8F0',
                        borderRadius: '8px',
                        fontSize: '13px',
                        cursor: 'pointer'
                      }}>
                        <input type="radio" name="wallet" defaultChecked={w === 'Paytm Wallet'} />
                        <span style={{ fontWeight: 600 }}>{w}</span>
                      </label>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCompletePayment('Razorpay Digital Wallet')}
                    disabled={isProcessing}
                    style={{
                      width: '100%',
                      background: '#0B65C2',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '13px',
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '14px',
                      cursor: 'pointer'
                    }}
                  >
                    Pay ₹{Number(amount).toFixed(2)} via Wallet
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 4. Footer with Cancel and Security */}
        <div style={{
          background: '#F8FAFC',
          borderTop: '1px solid #E2E8F0',
          padding: '12px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#64748B',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <ArrowLeft size={14} />
            <span>Cancel and return to cart</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#94A3B8' }}>
            <Lock size={12} />
            <span>Powered by Razorpay Payment Suite</span>
          </div>
        </div>
      </div>
    </div>
  );
}
