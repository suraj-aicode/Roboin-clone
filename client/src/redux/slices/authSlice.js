import { createSlice } from '@reduxjs/toolkit';

export const DEMO_ACCOUNTS = {
  super_admin: {
    name: 'Super Admin',
    email: 'admin@robo.in',
    role: 'super_admin',
    organization: 'RoboTech HQ',
    gstin: '29AAACR9981K1Z3'
  },
  admin: {
    name: 'Arjun Mehta (Admin)',
    email: 'admin.ops@robo.in',
    role: 'admin',
    organization: 'RoboTech Operations HQ',
    gstin: '29AAACR9981K1Z3'
  },
  customer: {
    name: 'Satya Prakash (Maker Customer)',
    email: 'customer@robo.in',
    role: 'customer',
    organization: 'Apex Robotics Lab',
    gstin: '29AAACB9812R1Z5'
  },
  catalog_manager: {
    name: 'Kavita Iyer (Catalog)',
    email: 'catalog@robo.in',
    role: 'catalog_manager',
    organization: 'RoboTech Logistics'
  },
  inventory_manager: {
    name: 'Rohan Verma (Inventory)',
    email: 'inventory@robo.in',
    role: 'inventory_manager',
    organization: 'RoboTech WH-BLR-01'
  },
  guest: {
    name: 'Guest Maker',
    email: '',
    role: 'guest',
    organization: ''
  }
};

const initialState = {
  user: DEMO_ACCOUNTS.customer,
  token: 'mock_jwt_customer_token',
  currentRole: 'customer', // 'guest', 'customer', 'catalog_manager', 'inventory_manager', 'admin', 'super_admin'
  userState: 'Karnataka', // Determines GST Intrastate vs Interstate
  sellerState: 'Karnataka',
  isAuthModalOpen: false,
  authMode: 'login' // 'login' | 'register' | 'forgot'
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.currentRole = action.payload.user?.role || 'customer';
    },
    setRole: (state, action) => {
      state.currentRole = action.payload;
      if (DEMO_ACCOUNTS[action.payload]) {
        state.user = DEMO_ACCOUNTS[action.payload];
      }
    },
    setUserState: (state, action) => {
      state.userState = action.payload;
    },
    setAuthModalOpen: (state, action) => {
      state.isAuthModalOpen = action.payload;
    },
    setAuthMode: (state, action) => {
      state.authMode = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.currentRole = 'guest';
    }
  }
});

export const { 
  setUser, 
  setRole, 
  setUserState, 
  setAuthModalOpen, 
  setAuthMode, 
  logout 
} = authSlice.actions;

export default authSlice.reducer;
