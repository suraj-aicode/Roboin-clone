import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Array of product objects
  isWishlistOpen: false
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;
      const exists = state.items.find(i => i._id === product._id || i.sku === product.sku);
      if (!exists) {
        state.items.push(product);
      }
    },
    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(i => i._id !== productId && i.sku !== productId);
    },
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const index = state.items.findIndex(i => i._id === product._id || i.sku === product.sku);
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(product);
      }
    },
    setWishlistOpen: (state, action) => {
      state.isWishlistOpen = action.payload;
    }
  }
});

export const {
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  setWishlistOpen
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
