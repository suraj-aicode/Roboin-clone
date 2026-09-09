import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // [{ product, quantity }]
  isOpen: false,
  appliedCoupon: null,
  isAbandonedModalOpen: false, // MOD-18
  abandonedDiscountApplied: false,
  lastAddedItem: null, // { product, quantity, timestamp }
  cartBounceTrigger: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      const existing = state.items.find(i => i.product._id === product._id);
      const available = product.stockOnHand - (product.stockReserved || 0);

      if (existing) {
        if (existing.quantity + quantity <= available) {
          existing.quantity += quantity;
          state.lastAddedItem = { product, quantity, timestamp: Date.now() };
          state.cartBounceTrigger += 1;
        }
      } else {
        if (quantity <= available) {
          state.items.push({ product, quantity });
          state.lastAddedItem = { product, quantity, timestamp: Date.now() };
          state.cartBounceTrigger += 1;
        }
      }
    },
    clearLastAddedItem: (state) => {
      state.lastAddedItem = null;
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter(i => i.product._id !== productId);
      } else {
        const item = state.items.find(i => i.product._id === productId);
        if (item) {
          const available = item.product.stockOnHand - (item.product.stockReserved || 0);
          if (quantity <= available) {
            item.quantity = quantity;
          }
        }
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(i => i.product._id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
      state.appliedCoupon = null;
      state.isAbandonedModalOpen = false;
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    setCartOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    applyCoupon: (state, action) => {
      state.appliedCoupon = action.payload;
    },
    setAbandonedModalOpen: (state, action) => {
      state.isAbandonedModalOpen = action.payload;
    },
    applyRecoveryDiscount: (state) => {
      state.appliedCoupon = {
        code: 'COMEBACK10',
        type: 'percentage',
        value: 0.10,
        desc: '10% Abandoned Cart Recovery Discount'
      };
      state.abandonedDiscountApplied = true;
      state.isAbandonedModalOpen = false;
    }
  }
});

export const {
  addToCart,
  clearLastAddedItem,
  updateQuantity,
  removeFromCart,
  clearCart,
  toggleCart,
  setCartOpen,
  applyCoupon,
  setAbandonedModalOpen,
  applyRecoveryDiscount
} = cartSlice.actions;

export default cartSlice.reducer;
