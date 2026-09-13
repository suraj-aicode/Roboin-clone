import { createSlice } from '@reduxjs/toolkit';

const initialReviews = [
  {
    _id: 'rev-01',
    sku: 'SKU-ARD-R4-WIFI',
    authorName: 'Vikram Joshi (IIT Bombay Robotics)',
    rating: 5,
    title: 'Flawless 32-bit Cortex M4 upgrade with built-in Wi-Fi',
    comment: 'The Renesas RA4M1 MCU combined with ESP32-S3 makes IoT telemetry effortlessly fast. The 12x8 LED matrix is great for displaying real-time sensor states without external screens.',
    hardwareSetup: 'Arduino IDE 2.3 + FreeRTOS telemetry node',
    isVerifiedPurchase: true,
    createdAt: '2026-08-28T10:30:00Z'
  },
  {
    _id: 'rev-02',
    sku: 'SKU-RPI-5-8GB',
    authorName: 'Dr. Anita Nair (Autonomous Systems Lab)',
    rating: 5,
    title: 'Incredible PCIe & dual 4K capability for OpenCV AI models',
    comment: 'Significant leap in inference speeds compared to RPi 4. Running YOLOv8 on the PCIe NVMe SSD hat without thermal throttling when active cooler is attached.',
    hardwareSetup: 'Ubuntu 24.04 Server + PCIe Gen 2 NVMe HAT',
    isVerifiedPurchase: true,
    createdAt: '2026-08-30T14:15:00Z'
  }
];

const initialQAs = [
  {
    _id: 'qa-01',
    sku: 'SKU-ARD-R4-WIFI',
    question: 'Can I power the Uno R4 WiFi directly with a 12V LiPo battery pack via VIN pin?',
    askedBy: 'Rohit K.',
    answer: 'Yes, absolutely! The on-board buck regulator on Uno R4 WiFi supports an input voltage range of 6V to 24V DC on the VIN pin and DC barrel jack.',
    answeredBy: 'VoltCart Senior Hardware Specialist'
  },
  {
    _id: 'qa-02',
    sku: 'SKU-ESP32-WROOM-32U',
    question: 'Does this board include an on-board PCB antenna or only the IPEX U.FL connector?',
    askedBy: 'Manoj S.',
    answer: 'The 32U model strictly requires an external antenna connected via the IPEX U.FL connector. For an integrated trace antenna, select the 32D model.',
    answeredBy: 'Espressif Verified Support'
  }
];

const initialTickets = [
  {
    _id: 'tck-01',
    ticketId: 'TCK-2026-4412',
    customerName: 'Satya Prakash (Maker Systems)',
    customerEmail: 'customer@voltcart.in',
    category: 'Technical Hardware Support',
    priority: 'High',
    subject: 'I2C pull-up resistor calculation on ESP32 with 5V sensor',
    description: 'Connecting HC-SR04 with ESP32-WROOM-32U. Confirming if level shifter is required for echo pin to protect 3.3V GPIO input.',
    status: 'In Progress',
    assignedTo: 'Hardware Support Engineer',
    createdAt: '2026-09-02T16:00:00Z'
  }
];

const initialRFQs = [
  {
    _id: 'rfq-01',
    rfqId: 'RFQ-2026-8819',
    organizationName: 'National Robotics Institute Lab',
    contactPerson: 'Prof. Ramesh Kulkarni',
    email: 'lab@nri-edu.in',
    phone: '+91 94444 88888',
    gstin: '29AAACN8821M1Z4',
    items: [{
      sku: 'SKU-ARD-R4-WIFI',
      title: 'Arduino Uno R4 WiFi Board',
      quantity: 50,
      targetPricePerUnit: 2050
    }],
    targetDeliveryDate: '2026-10-15',
    specialRequirements: 'Educational institution tax exemption invoice and pre-soldered pin headers required.',
    quotedAmount: 102500,
    status: 'Quoted'
  }
];

const initialReturns = [
  {
    _id: 'ret-01',
    returnId: 'RET-2026-1092',
    orderNumber: 'ORD-2026-8941',
    customerName: 'Aarav Sharma',
    customerEmail: 'aarav@maker.in',
    sku: 'SKU-ESP32-WROOM-32U',
    productTitle: 'ESP32-WROOM Dev Board',
    returnType: 'Replacement',
    reason: 'Damaged in Transit / Physical Defect',
    evidenceNote: 'Bent micro-USB connector upon box unsealing. Component cannot receive 5V VBUS.',
    status: 'Approved',
    disposition: 'Replacement Shipped via Bluedart'
  }
];

const communitySlice = createSlice({
  name: 'community',
  initialState: {
    reviews: initialReviews,
    qas: initialQAs,
    tickets: initialTickets,
    rfqs: initialRFQs,
    returns: initialReturns,
    isTicketModalOpen: false,
    isRFQModalOpen: false,
    isReturnModalOpen: false,
    isTutorialsModalOpen: false,
    selectedProductForRFQ: null,
    selectedOrderForReturn: null
  },
  reducers: {
    setTutorialsModalOpen: (state, action) => {
      state.isTutorialsModalOpen = action.payload;
    },
    addReview: (state, action) => {
      state.reviews.unshift(action.payload);
    },
    addQA: (state, action) => {
      state.qas.unshift(action.payload);
    },
    addTicket: (state, action) => {
      state.tickets.unshift(action.payload);
    },
    updateTicketStatus: (state, action) => {
      const { ticketId, status } = action.payload;
      const t = state.tickets.find(item => item.ticketId === ticketId || item._id === ticketId);
      if (t) t.status = status;
    },
    addRFQ: (state, action) => {
      state.rfqs.unshift(action.payload);
    },
    updateRFQStatus: (state, action) => {
      const { rfqId, status, quotedAmount } = action.payload;
      const r = state.rfqs.find(item => item.rfqId === rfqId || item._id === rfqId);
      if (r) {
        r.status = status;
        if (quotedAmount) r.quotedAmount = quotedAmount;
      }
    },
    addReturnRequest: (state, action) => {
      state.returns.unshift(action.payload);
    },
    updateReturnStatus: (state, action) => {
      const { returnId, status } = action.payload;
      const ret = state.returns.find(item => item.returnId === returnId || item._id === returnId);
      if (ret) ret.status = status;
    },
    setTicketModalOpen: (state, action) => {
      state.isTicketModalOpen = action.payload;
    },
    setRFQModalOpen: (state, action) => {
      state.isRFQModalOpen = action.payload;
    },
    setReturnModalOpen: (state, action) => {
      state.isReturnModalOpen = action.payload;
    },
    setSelectedProductForRFQ: (state, action) => {
      state.selectedProductForRFQ = action.payload;
    },
    setSelectedOrderForReturn: (state, action) => {
      state.selectedOrderForReturn = action.payload;
    }
  }
});

export const {
  addReview,
  addQA,
  addTicket,
  updateTicketStatus,
  addRFQ,
  updateRFQStatus,
  addReturnRequest,
  updateReturnStatus,
  setTicketModalOpen,
  setRFQModalOpen,
  setReturnModalOpen,
  setTutorialsModalOpen,
  setSelectedProductForRFQ,
  setSelectedOrderForReturn
} = communitySlice.actions;

export default communitySlice.reducer;
