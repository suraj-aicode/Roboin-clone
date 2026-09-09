import { API_URL } from '../config/api';

const API_BASE = `${API_URL}/api/payments`;

/**
 * Dynamically loads the official Razorpay Checkout JavaScript SDK from CDN
 */
export function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      console.error('[Razorpay SDK] Failed loading checkout.js script');
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

/**
 * Fetch public Razorpay key ID & config from backend
 */
export async function getRazorpayKey() {
  try {
    const res = await fetch(`${API_BASE}/key`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn('[Razorpay] Server offline or key endpoint unreachable:', err);
    return { success: false, keyId: 'rzp_test_placeholder_key', isPlaceholder: true };
  }
}

/**
 * Update Razorpay API Credentials
 */
export async function updateRazorpayConfig(keyId, keySecret) {
  const res = await fetch(`${API_BASE}/config`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ keyId, keySecret })
  });
  return await res.json();
}

/**
 * Create Order on Razorpay Server
 */
export async function createRazorpayOrder({ amount, currency = 'INR', receipt, notes = {} }) {
  const res = await fetch(`${API_BASE}/create-razorpay-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, currency, receipt, notes })
  });

  const data = await res.json();
  if (!data.success) {
    throw new Error(data.message || 'Failed to create Razorpay order');
  }

  return data;
}

/**
 * Verify cryptographic payment signature with backend
 */
export async function verifyPaymentSignature({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) {
  const res = await fetch(`${API_BASE}/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    })
  });

  const data = await res.json();
  if (!data.success) {
    throw new Error(data.message || 'Payment signature verification failed');
  }

  return data;
}

/**
 * Launch Real Official Razorpay Checkout Popup
 */
export async function openRealRazorpayCheckout({
  keyId,
  order,
  customer,
  amount,
  onSuccess,
  onFailure,
  onDismiss
}) {
  const loaded = await loadRazorpayScript();
  if (!loaded) {
    throw new Error('Unable to load official Razorpay Checkout SDK. Please verify internet connection.');
  }

  if (!window.Razorpay) {
    throw new Error('Razorpay SDK window object not found.');
  }

  const options = {
    key: keyId,
    amount: order?.amount || Math.round(Number(amount) * 100),
    currency: order?.currency || 'INR',
    name: 'Robu.in Robotics',
    description: 'Hardware Components & Development Kits',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=200&q=80',
    handler: async function (response) {
      // response: { razorpay_payment_id, razorpay_order_id, razorpay_signature }
      try {
        const verifyRes = await verifyPaymentSignature(response);
        if (onSuccess) {
          onSuccess({
            method: 'Razorpay Standard Checkout',
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id || order?.id,
            razorpaySignature: response.razorpay_signature,
            status: 'Paid'
          });
        }
      } catch (verErr) {
        if (onFailure) onFailure(verErr.message);
      }
    },
    prefill: {
      name: customer.name || '',
      email: customer.email || '',
      contact: customer.phone || ''
    },
    notes: {
      merchant: 'RoboTech Logistics Bangalore',
      gstCompliance: 'Active 18%'
    },
    theme: {
      color: '#EF4123' // Robu.in brand color
    },
    modal: {
      ondismiss: function () {
        if (onDismiss) onDismiss();
      }
    }
  };

  // Only attach order_id if it's a real live order created on razorpay server
  if (order?.id && !order.id.startsWith('order_mock_')) {
    options.order_id = order.id;
  }

  const rzpInstance = new window.Razorpay(options);

  rzpInstance.on('payment.failed', function (response) {
    console.error('[Razorpay Payment Failed]', response.error);
    if (onFailure) {
      onFailure(response.error.description || 'Payment failed or declined by issuer.');
    }
  });

  rzpInstance.open();
  return rzpInstance;
}
