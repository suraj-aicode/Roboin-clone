import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';
import comparisonReducer from './slices/comparisonSlice';
import orderReducer from './slices/orderSlice';
import communityReducer from './slices/communitySlice';
import wishlistReducer from './slices/wishlistSlice';
import notificationReducer from './slices/notificationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    comparison: comparisonReducer,
    order: orderReducer,
    community: communityReducer,
    wishlist: wishlistReducer,
    notifications: notificationReducer
  }
});
