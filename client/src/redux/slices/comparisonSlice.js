import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Array of products (max 4)
  isOpen: false
};

const comparisonSlice = createSlice({
  name: 'comparison',
  initialState,
  reducers: {
    toggleCompareItem: (state, action) => {
      const product = action.payload;
      const index = state.items.findIndex(i => i._id === product._id);
      if (index > -1) {
        state.items.splice(index, 1);
      } else {
        if (state.items.length < 4) {
          state.items.push(product);
        }
      }
    },
    removeCompareItem: (state, action) => {
      state.items = state.items.filter(i => i._id !== action.payload);
    },
    clearComparison: (state) => {
      state.items = [];
    },
    setComparisonModalOpen: (state, action) => {
      state.isOpen = action.payload;
    }
  }
});

export const {
  toggleCompareItem,
  removeCompareItem,
  clearComparison,
  setComparisonModalOpen
} = comparisonSlice.actions;

export default comparisonSlice.reducer;
