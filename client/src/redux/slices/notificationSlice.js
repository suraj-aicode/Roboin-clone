import { createSlice } from '@reduxjs/toolkit';

const initialNotifications = [
  {
    id: 'NOTIF-01',
    type: 'order',
    title: 'Order Dispatched #ORD-2026-8941',
    message: 'Your consignment of 2x Arduino Uno R4 WiFi boards is out for delivery via Delhivery Express.',
    timestamp: '10 mins ago',
    read: false,
    link: '#orders'
  },
  {
    id: 'NOTIF-02',
    type: 'promo',
    title: 'Flash Sale: 10% Off Robotics Boards',
    message: 'Use coupon code ROBO10 at checkout on orders above ₹500. Limited period validity.',
    timestamp: '2 hours ago',
    read: false,
    link: '#promos'
  },
  {
    id: 'NOTIF-03',
    type: 'support',
    title: 'Support Ticket #TCK-2026-041 Replied',
    message: 'Engineering Support updated your inquiry regarding ESP32-S3 camera pin mapping.',
    timestamp: '1 day ago',
    read: true,
    link: '#support'
  }
];

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: initialNotifications,
    isDrawerOpen: false
  },
  reducers: {
    addNotification: (state, action) => {
      const newNotif = {
        id: `NOTIF-${Date.now()}`,
        timestamp: 'Just now',
        read: false,
        ...action.payload
      };
      state.notifications.unshift(newNotif);
    },
    markAsRead: (state, action) => {
      const notif = state.notifications.find(n => n.id === action.payload);
      if (notif) notif.read = true;
    },
    markAllAsRead: (state) => {
      state.notifications.forEach(n => { n.read = true; });
    },
    setNotificationDrawerOpen: (state, action) => {
      state.isDrawerOpen = action.payload;
    }
  }
});

export const {
  addNotification,
  markAsRead,
  markAllAsRead,
  setNotificationDrawerOpen
} = notificationSlice.actions;

export default notificationSlice.reducer;
