const express = require('express');
const router = express.Router();

// Mock Logistics Partner Hubs & Serviceability Database (MOD-11)
const LOGISTICS_HUBS = [
  { prefix: '56', city: 'Bengaluru', hub: 'South Regional Gateway (BLR-01)', partner: 'Delhivery Surface Express', transitDays: '1-2 Days', serviceable: true, codAvailable: true },
  { prefix: '40', city: 'Mumbai', hub: 'West Regional Gateway (BOM-02)', partner: 'BlueDart Air Express', transitDays: '2-3 Days', serviceable: true, codAvailable: true },
  { prefix: '11', city: 'Delhi NCR', hub: 'North Regional Gateway (DEL-01)', partner: 'Delhivery Surface Express', transitDays: '2-3 Days', serviceable: true, codAvailable: true },
  { prefix: '60', city: 'Chennai', hub: 'South Coastal Gateway (MAA-01)', partner: 'Ecom Express', transitDays: '2-3 Days', serviceable: true, codAvailable: true },
  { prefix: '50', city: 'Hyderabad', hub: 'Deccan Regional Gateway (HYD-01)', partner: 'BlueDart Air Express', transitDays: '2 Days', serviceable: true, codAvailable: true },
  { prefix: '70', city: 'Kolkata', hub: 'East Regional Gateway (CCU-01)', partner: 'Delhivery Air', transitDays: '3-4 Days', serviceable: true, codAvailable: true },
  { prefix: '38', city: 'Ahmedabad', hub: 'West Central Gateway (AMD-01)', partner: 'Shadowfax Tech Logistics', transitDays: '2-3 Days', serviceable: true, codAvailable: true },
  { prefix: '68', city: 'Kochi', hub: 'South Coast Gateway (COK-01)', partner: 'BlueDart Air Express', transitDays: '2-3 Days', serviceable: true, codAvailable: true }
];

// Mock shipment records with tracking milestones
const SHIPMENT_RECORDS = [
  {
    awb: 'AWB-DLH-894102',
    orderNumber: 'ORD-2026-8941',
    courierPartner: 'Delhivery Surface Express',
    originWarehouse: 'WH-BLR-01 (Bengaluru)',
    destinationCity: 'Bengaluru, KA',
    status: 'Delivered',
    estimatedDelivery: '2026-03-02',
    milestones: [
      { status: 'Delivered', location: 'Customer Reception, Bengaluru', timestamp: '2026-03-02 14:20' },
      { status: 'Out for Delivery', location: 'Electronic City Delivery Hub', timestamp: '2026-03-02 09:15' },
      { status: 'In Transit', location: 'Bengaluru Central Sort Center', timestamp: '2026-03-01 22:40' },
      { status: 'Package Picked Up', location: 'WH-BLR-01 Robotics Hub', timestamp: '2026-03-01 16:30' },
      { status: 'Order Manifest Generated', location: 'VoltCart Fulfillment System', timestamp: '2026-03-01 11:00' }
    ]
  },
  {
    awb: 'AWB-BLU-402918',
    orderNumber: 'ORD-2026-4029',
    courierPartner: 'BlueDart Air Express',
    originWarehouse: 'WH-BLR-01 (Bengaluru)',
    destinationCity: 'Mumbai, MH',
    status: 'In Transit',
    estimatedDelivery: '2026-03-07',
    milestones: [
      { status: 'In Transit', location: 'BOM Gateway Air Hub, Mumbai', timestamp: '2026-03-05 10:15' },
      { status: 'Dispatched via Air Freight', location: 'Kempegowda Airport Hub, BLR', timestamp: '2026-03-04 21:00' },
      { status: 'Package Picked Up', location: 'WH-BLR-01 Robotics Hub', timestamp: '2026-03-04 15:45' },
      { status: 'Order Manifest Generated', location: 'VoltCart Fulfillment System', timestamp: '2026-03-04 12:30' }
    ]
  }
];

// @route   POST /api/shipping/check-pincode
// @desc    Check courier serviceability and estimated delivery for Indian PIN codes (FR-SHIP-101)
router.post('/check-pincode', (req, res) => {
  const { pincode } = req.body;
  if (!pincode || String(pincode).trim().length !== 6) {
    return res.status(400).json({ success: false, message: 'Please provide a valid 6-digit Indian PIN code.' });
  }

  const cleanPin = String(pincode).trim();
  const prefix = cleanPin.slice(0, 2);
  const matchedHub = LOGISTICS_HUBS.find(h => h.prefix === prefix);

  if (matchedHub) {
    return res.json({
      success: true,
      serviceable: true,
      pincode: cleanPin,
      destinationCity: matchedHub.city,
      courierPartner: matchedHub.partner,
      transitDays: matchedHub.transitDays,
      hub: matchedHub.hub,
      standardShippingFee: 99,
      freeShippingThreshold: 999,
      message: `Delivery available in ${matchedHub.transitDays} via ${matchedHub.partner}`
    });
  }

  // Fallback pan-India standard delivery
  res.json({
    success: true,
    serviceable: true,
    pincode: cleanPin,
    destinationCity: 'Pan-India Delivery Zone',
    courierPartner: 'India Post Speed Post / Delhivery',
    transitDays: '4-6 Days',
    hub: 'National Logistics Network',
    standardShippingFee: 99,
    freeShippingThreshold: 999,
    message: 'Standard delivery available in 4-6 business days'
  });
});

// @route   GET /api/shipping/track/:awb
// @desc    Get tracking timeline milestones for a shipment (FR-SHIP-104)
router.get('/track/:awb', (req, res) => {
  const { awb } = req.params;
  const shipment = SHIPMENT_RECORDS.find(s => s.awb.toLowerCase() === awb.toLowerCase() || s.orderNumber.toLowerCase() === awb.toLowerCase());

  if (shipment) {
    return res.json({ success: true, data: shipment });
  }

  // Generate dynamic live tracking simulation for any new order number / AWB
  const simulatedShipment = {
    awb: awb.startsWith('AWB-') ? awb : `AWB-DLH-${Math.floor(100000 + Math.random() * 900000)}`,
    orderNumber: awb.startsWith('ORD-') ? awb : `ORD-2026-${awb.replace(/\D/g, '').slice(0, 4) || '9901'}`,
    courierPartner: 'Delhivery Surface Express',
    originWarehouse: 'WH-BLR-01 (Bengaluru)',
    destinationCity: 'Express Indian Gateway',
    status: 'In Transit',
    estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    milestones: [
      { status: 'In Transit', location: 'Regional Gateway Sort Hub', timestamp: new Date().toLocaleTimeString() },
      { status: 'Package Picked Up', location: 'WH-BLR-01 Robotics Hub', timestamp: 'Earlier Today' },
      { status: 'Order Manifest Generated', location: 'VoltCart Fulfillment System', timestamp: 'Order Placed' }
    ]
  };

  res.json({ success: true, data: simulatedShipment });
});

// @route   GET /api/shipping/shipments
// @desc    List recent shipments for operations oversight
router.get('/shipments', (req, res) => {
  res.json({ success: true, count: SHIPMENT_RECORDS.length, data: SHIPMENT_RECORDS });
});

module.exports = router;
