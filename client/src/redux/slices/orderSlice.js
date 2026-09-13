import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [
    {
      _id: 'ord-seed-01',
      orderNumber: 'ORD-2026-8941',
      createdAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
      customerName: 'Satya Prakash (Maker Systems)',
      customerEmail: 'customer@voltcart.in',
      customerPhone: '+91 98888 12345',
      gstin: '29AAACB9812R1Z5',
      status: 'Delivered',
      shippingAddress: {
        street: 'Plot 42, Electronic City Phase 1',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560100'
      },
      items: [
        {
          productId: 'prod-001',
          title: 'Arduino Uno R4 WiFi Microcontroller Board',
          sku: 'SKU-ARD-R4-WIFI',
          price: 2499,
          quantity: 2,
          hsnCode: '85423190',
          gstRate: 0.18
        }
      ],
      subtotal: 4998,
      taxAmount: 899.64,
      shippingFee: 0,
      discountAmount: 0,
      totalAmount: 5897.64,
      awb: 'AWB-DLH-894102',
      courierPartner: 'Delhivery Surface Express',
      paymentDetails: {
        method: 'Razorpay UPI',
        status: 'Paid',
        razorpayPaymentId: 'pay_984102941'
      }
    },
    {
      _id: 'ord-seed-02',
      orderNumber: 'ORD-2026-4029',
      createdAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
      customerName: 'Aarav Robotics Lab',
      customerEmail: 'aarav@makerhub.in',
      customerPhone: '+91 98765 43210',
      gstin: '27AAACI7721M1Z2',
      status: 'Shipped',
      shippingAddress: {
        street: 'Building 14, MIDC Industrial Area',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400093'
      },
      items: [
        {
          productId: 'prod-002',
          title: 'Raspberry Pi 5 - 8GB RAM Single Board Computer',
          sku: 'SKU-RPI-5-8GB',
          price: 7999,
          quantity: 1,
          hsnCode: '84713010',
          gstRate: 0.18
        }
      ],
      subtotal: 7999,
      taxAmount: 1439.82,
      shippingFee: 0,
      discountAmount: 500,
      totalAmount: 8938.82,
      awb: 'AWB-BLU-402918',
      courierPartner: 'BlueDart Air Express',
      paymentDetails: {
        method: 'NetBanking / IMPS',
        status: 'Paid',
        razorpayPaymentId: 'pay_40291841'
      }
    }
  ],
  currentOrder: null,
  isCheckoutOpen: false,
  isInvoiceOpen: false,
  isOrderHistoryOpen: false,
  isCreditNoteOpen: false,
  selectedCreditNoteOrder: null,
  activeTrackingAwb: null,
  adminView: 'storefront' // 'storefront' or 'admin'
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrders: (state, action) => {
      if (action.payload && action.payload.length > 0) {
        state.orders = action.payload;
      }
    },
    addOrder: (state, action) => {
      state.orders.unshift(action.payload);
    },
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
    },
    setCheckoutOpen: (state, action) => {
      state.isCheckoutOpen = action.payload;
    },
    setInvoiceOpen: (state, action) => {
      state.isInvoiceOpen = action.payload;
    },
    setOrderHistoryOpen: (state, action) => {
      state.isOrderHistoryOpen = action.payload;
    },
    setCreditNoteOpen: (state, action) => {
      state.isCreditNoteOpen = action.payload;
    },
    setSelectedCreditNoteOrder: (state, action) => {
      state.selectedCreditNoteOrder = action.payload;
    },
    setActiveTrackingAwb: (state, action) => {
      state.activeTrackingAwb = action.payload;
    },
    setAdminView: (state, action) => {
      state.adminView = action.payload;
    },
    updateOrderStatusLocal: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.orders.find(o => o._id === orderId || o.orderNumber === orderId);
      if (order) {
        order.status = status;
      }
    },
    cancelOrderLocal: (state, action) => {
      const orderId = action.payload;
      const order = state.orders.find(o => o._id === orderId || o.orderNumber === orderId);
      if (order && order.status !== 'Delivered' && order.status !== 'Cancelled') {
        order.status = 'Cancelled';
        order.cancelledAt = new Date().toISOString();
        order.cancellationReason = 'Customer self-service cancellation before fulfillment';
      }
    }
  }
});

export const {
  setOrders,
  addOrder,
  setCurrentOrder,
  setCheckoutOpen,
  setInvoiceOpen,
  setOrderHistoryOpen,
  setCreditNoteOpen,
  setSelectedCreditNoteOrder,
  setActiveTrackingAwb,
  setAdminView,
  updateOrderStatusLocal,
  cancelOrderLocal
} = orderSlice.actions;

export default orderSlice.reducer;
