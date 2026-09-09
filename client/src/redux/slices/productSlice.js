import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  categories: [
    { id: 'cat-all', name: 'All Products', slug: 'all' },
    { id: 'microcontrollers', name: 'Microcontrollers & Dev Boards', slug: 'microcontrollers' },
    { id: 'single-board-computers', name: 'Single Board Computers', slug: 'single-board-computers' },
    { id: 'sensors', name: 'Sensors & Modules', slug: 'sensors' },
    { id: 'motors-drivers', name: 'Motors & Drivers', slug: 'motors-drivers' },
    { id: 'power-batteries', name: 'Power & Batteries', slug: 'power-batteries' }
  ],
  activeCategory: 'cat-all',
  searchQuery: '',
  selectedProduct: null,
  recentlyViewed: [], // MOD-24
  selectedVoltageFilter: 'all', // MOD-05
  loading: false,
  error: null
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
      if (action.payload) {
        const prod = action.payload;
        state.recentlyViewed = [
          prod,
          ...state.recentlyViewed.filter(p => p._id !== prod._id && p.sku !== prod.sku)
        ].slice(0, 6);
      }
    },
    addRecentlyViewed: (state, action) => {
      const prod = action.payload;
      state.recentlyViewed = [
        prod,
        ...state.recentlyViewed.filter(p => p._id !== prod._id && p.sku !== prod.sku)
      ].slice(0, 6);
    },
    setVoltageFilter: (state, action) => {
      state.selectedVoltageFilter = action.payload;
    },
    updateProductStock: (state, action) => {
      const { id, stockOnHand, warehouse } = action.payload;
      const prod = state.products.find(p => p._id === id || p.sku === id || p.id === id);
      if (prod) {
        if (stockOnHand !== undefined) prod.stockOnHand = stockOnHand;
        if (warehouse !== undefined) prod.warehouse = warehouse;
      }
    },
    addProduct: (state, action) => {
      state.products.unshift(action.payload);
    }
  }
});

export const {
  setProducts,
  setActiveCategory,
  setSearchQuery,
  setSelectedProduct,
  addRecentlyViewed,
  setVoltageFilter,
  updateProductStock,
  addProduct
} = productSlice.actions;

export default productSlice.reducer;
