const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');
const Product = require('./models/Product');
const Category = require('./models/Category');
const Order = require('./models/Order');
const AuditLog = require('./models/AuditLog');
const catalogProducts = require('./data/categoryCatalog');

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('[Seed] Clearing existing collections...');
    await User.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();
    await Order.deleteMany();
    await AuditLog.deleteMany();

    console.log('[Seed] Seeding Users & RBAC Roles...');
    const users = await User.create([
      {
        name: 'Super Admin',
        email: 'admin@robo.in',
        password: 'AdminPassword123!',
        role: 'super_admin',
        organization: 'RoboTech HQ',
        gstin: '29AAACR9981K1Z3'
      },
      {
        name: 'Kavita Iyer (Catalog)',
        email: 'catalog@robo.in',
        password: 'CatalogPassword123!',
        role: 'catalog_manager',
        organization: 'RoboTech Logistics'
      },
      {
        name: 'Rohan Verma (Inventory)',
        email: 'inventory@robo.in',
        password: 'InventoryPassword123!',
        role: 'inventory_manager',
        organization: 'RoboTech WH-BLR-01'
      },
      {
        name: 'Arjun Mehta (Admin)',
        email: 'admin.ops@robo.in',
        password: 'AdminPassword123!',
        role: 'admin',
        organization: 'RoboTech Operations HQ',
        gstin: '29AAACR9981K1Z3'
      },
      {
        name: 'Satya Prakash (Maker Customer)',
        email: 'customer@robo.in',
        password: 'CustomerPassword123!',
        role: 'customer',
        organization: 'Apex Robotics Lab',
        gstin: '29AAACB9812R1Z5',
        addresses: [{
          fullName: 'Satya Prakash',
          street: 'Plot 42, Electronic City Phase 1',
          city: 'Bengaluru',
          state: 'Karnataka',
          pincode: '560100',
          isDefault: true
        }]
      }
    ]);

    console.log('[Seed] Seeding Categories...');
    await Category.create([
      { name: 'Microcontrollers & Dev Boards', slug: 'microcontrollers', description: '32-bit ARM, ESP32, RP2040 and AVR boards', icon: 'cpu' },
      { name: 'Single Board Computers', slug: 'single-board-computers', description: 'Raspberry Pi, Orange Pi, Rockchip SBCs', icon: 'server' },
      { name: 'Sensors & Modules', slug: 'sensors', description: 'Ultrasonic, IMU, LIDAR, environmental sensors', icon: 'activity' },
      { name: 'Motors & Drivers', slug: 'motors-drivers', description: 'DC motors, Stepper drivers, Servo actuators', icon: 'zap' },
      { name: 'Power & Batteries', slug: 'power-batteries', description: 'LiPo cells, BMS boards, buck-boost converters', icon: 'battery' },
      { name: 'Drone Parts & Accessories', slug: 'drone-parts', description: 'FPV brushless motors, ESC stacks, flight controllers, transmitters', icon: 'compass' },
      { name: '3D Printers & Parts', slug: '3d-printers', description: 'CoreXY printers, nozzles, PEI sheets, filaments', icon: 'printer' },
      { name: 'Electronic Components', slug: 'electronic-components', description: 'Power MOSFETs, 555 timers, relays, breadboards', icon: 'zap' },
      { name: 'Electronic Modules & Displays', slug: 'electronic-modules', description: 'OLEDs, LCDs, buck converters, RTC modules', icon: 'tv' },
      { name: 'Robotics & Hardware Tools', slug: 'tools', description: 'Soldering, chassis kits, oscilloscopes', icon: 'wrench' }
    ]);

    console.log('[Seed] Seeding Products with Rich Tech Specs...');
    const products = await Product.create([
      {
        title: 'Arduino Uno R4 WiFi Microcontroller Board',
        slug: 'arduino-uno-r4-wifi',
        sku: 'SKU-ARD-R4-WIFI',
        category: 'microcontrollers',
        brand: 'Arduino',
        price: 2499,
        gstRate: 0.18,
        hsnCode: '85423190',
        stockOnHand: 45,
        stockReserved: 3,
        warehouse: 'WH-BLR-01',
        image: '/assets/images/arduino_uno_r4.jpg',
        rating: 4.9,
        reviewsCount: 42,
        description: 'The Arduino Uno R4 WiFi pairs the RA4M1 32-bit ARM Cortex-M4 processor from Renesas with an ESP32-S3 module for Wi-Fi and Bluetooth connectivity, plus an integrated 12x8 LED matrix.',
        specs: {
          'Processor Architecture': 'Renesas RA4M1 (ARM Cortex-M4 @ 48 MHz)',
          'Operating Voltage': '5V DC',
          'Input Voltage (VIN)': '6V - 24V DC',
          'Flash Memory': '256 KB',
          'SRAM': '32 KB',
          'Wireless Modules': 'Wi-Fi 802.11 b/g/n + Bluetooth 5.0 (ESP32-S3)',
          'Digital I/O Pins': '14 pins (6 PWM channels)',
          'Analog Input Pins': '6 channels (14-bit ADC)',
          'DAC Output': '1x (12-bit DAC)',
          'On-board Display': '12x8 Red Matrix LEDs'
        },
        datasheetUrl: 'https://docs.arduino.cc/resources/datasheets/ABX00087-datasheet.pdf'
      },
      {
        title: 'Raspberry Pi 5 - 8GB RAM Single Board Computer',
        slug: 'raspberry-pi-5-8gb',
        sku: 'SKU-RPI-5-8GB',
        category: 'single-board-computers',
        brand: 'Raspberry Pi Foundation',
        price: 7999,
        gstRate: 0.18,
        hsnCode: '84713010',
        stockOnHand: 22,
        stockReserved: 2,
        warehouse: 'WH-BLR-01',
        image: '/assets/images/raspberry_pi_5.jpg',
        rating: 4.95,
        reviewsCount: 88,
        description: 'Featuring a 64-bit quad-core Arm Cortex-A76 processor running at 2.4GHz, Raspberry Pi 5 delivers a 2-3x increase in CPU performance relative to Raspberry Pi 4.',
        specs: {
          'CPU Architecture': 'Broadcom BCM2712 Quad-core ARM Cortex-A76 @ 2.4GHz',
          'System Memory (RAM)': '8GB LPDDR4X-4267 SDRAM',
          'GPU Video Engine': 'VideoCore VII @ 800MHz (OpenGL ES 3.1, Vulkan 1.2)',
          'Display Connectors': 'Dual 4Kp60 micro-HDMI outputs with HDR',
          'Camera / Display Transceiver': '2x 4-lane MIPI CSI/DSI ports',
          'PCIe Expansion': 'PCIe 2.0 x1 interface for NVMe SSD hat',
          'Power Input': '5V / 5A DC via USB-C (Power Delivery compatible)',
          'Wireless Connectivity': 'Dual-band 802.11ac Wi-Fi + Bluetooth 5.0 / BLE'
        },
        datasheetUrl: 'https://datasheets.raspberrypi.com/rpi5/raspberry-pi-5-product-brief.pdf'
      },
      {
        title: 'ESP32-WROOM-32U Development Board (Dual Core + BLE)',
        slug: 'esp32-wroom-32u-dev-board',
        sku: 'SKU-ESP32-WROOM-32U',
        category: 'microcontrollers',
        brand: 'Espressif Systems',
        price: 349,
        gstRate: 0.18,
        hsnCode: '85423190',
        stockOnHand: 150,
        stockReserved: 5,
        warehouse: 'WH-DEL-02',
        image: '/assets/images/esp32_dev_board.jpg',
        rating: 4.8,
        reviewsCount: 156,
        description: 'Ultra-versatile 32-bit dual-core Tensilica Xtensa LX6 microcontroller with integrated 802.11 b/g/n Wi-Fi and Bluetooth v4.2 BR/EDR & BLE with IPEX external antenna connector.',
        specs: {
          'Microcontroller Core': 'Xtensa 32-bit LX6 Dual-Core @ 240 MHz',
          'Operating Voltage': '3.3V DC (5V tolerant VIN regulator)',
          'Internal SRAM': '520 KB',
          'External Flash': '4 MB SPI Flash',
          'Wi-Fi Protocols': '802.11 b/g/n (up to 150 Mbps)',
          'Bluetooth Spec': 'v4.2 BR/EDR and BLE specification',
          'Peripheral Interfaces': 'Capacitive touch, 12-bit ADC, DAC, UART, SPI, I2C, PWM'
        },
        datasheetUrl: 'https://www.espressif.com/sites/default/files/documentation/esp32-wroom-32d_esp32-wroom-32u_datasheet_en.pdf'
      },
      {
        title: 'L298N Dual H-Bridge High-Power DC Stepper Motor Driver',
        slug: 'l298n-dual-h-bridge-motor-driver',
        sku: 'SKU-DRV-L298N',
        category: 'motors-drivers',
        brand: 'STMicroelectronics',
        price: 189,
        gstRate: 0.18,
        hsnCode: '85371000',
        stockOnHand: 85,
        stockReserved: 0,
        warehouse: 'WH-DEL-02',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
        rating: 4.65,
        reviewsCount: 34,
        description: 'High voltage, high current dual full-bridge driver designed to accept standard TTL logic levels and drive inductive loads such as relays, solenoids, DC and stepping motors.',
        specs: {
          'Driver Chipset': 'STMicroelectronics L298N Dual H-Bridge',
          'Motor Voltage Range (VS)': '5V to 35V DC',
          'Continuous Output Current': '2A per channel (3A peak pulse)',
          'Logic Control Voltage (VSS)': '5V DC',
          'Maximum Power Dissipation': '25W with mounted heatsink'
        },
        datasheetUrl: 'https://www.st.com/resource/en/datasheet/l298.pdf'
      },
      {
        title: 'HC-SR04 Ultrasonic Distance Sensor Module',
        slug: 'hc-sr04-ultrasonic-distance-sensor',
        sku: 'SKU-SNS-HC-SR04',
        category: 'sensors',
        brand: 'SparkFun',
        price: 99,
        gstRate: 0.18,
        hsnCode: '90318000',
        stockOnHand: 220,
        stockReserved: 10,
        warehouse: 'WH-BLR-01',
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
        rating: 4.75,
        reviewsCount: 98,
        description: 'Non-contact ultrasonic range measurement module providing 2cm to 400cm sensing distance with 3mm precision.',
        specs: {
          'Operating Voltage': '5V DC',
          'Quiescent Current': '< 2mA',
          'Ultrasonic Frequency': '40 kHz',
          'Ranging Range': '2 cm to 400 cm',
          'Measuring Angle': '15 degrees',
          'Trigger Input Signal': '10µs TTL pulse'
        },
        datasheetUrl: 'https://cdn.sparkfun.com/datasheets/Sensors/Proximity/HCSR04.pdf'
      },
      {
        title: '18650 3.7V 2600mAh High-Drain Rechargeable Li-Ion Cell',
        slug: '18650-li-ion-battery-cell-2600mah',
        sku: 'SKU-BAT-18650-2600',
        category: 'power-batteries',
        brand: 'Adafruit',
        price: 299,
        gstRate: 0.18,
        hsnCode: '85076000',
        stockOnHand: 310,
        stockReserved: 15,
        warehouse: 'WH-BLR-01',
        image: 'https://images.unsplash.com/photo-1619725002198-6a689b72f41d?auto=format&fit=crop&w=600&q=80',
        rating: 4.85,
        reviewsCount: 71,
        description: 'High-drain 18650 Lithium-Ion cylindrical battery with genuine 2600mAh capacity for mobile robotics power packs.',
        specs: {
          'Nominal Voltage': '3.7V DC',
          'Full Charge Cutoff': '4.2V DC',
          'Rated Capacity': '2600 mAh',
          'Max Continuous Discharge': '10A Continuous',
          'Form Factor': 'Standard 18650 (18.4mm dia x 65.0mm length)'
        },
        datasheetUrl: 'https://cdn-shop.adafruit.com/product-files/1781/18650_datasheet.pdf'
      },
      ...catalogProducts
    ]);

    console.log('[Seed] Seeding Initial Order & Audit Records...');
    await Order.create({
      orderNumber: 'ORD-2026-8941',
      customer: users[3]._id,
      customerName: 'Satya Prakash (Apex Robotics Lab)',
      customerEmail: 'customer@robo.in',
      customerPhone: '+91 98888 12345',
      gstin: '29AAACB9812R1Z5',
      shippingAddress: {
        street: 'Plot 42, Electronic City Phase 1',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560100'
      },
      items: [{
        product: products[0]._id,
        sku: products[0].sku,
        title: products[0].title,
        hsnCode: products[0].hsnCode,
        price: products[0].price,
        quantity: 2,
        lineTotal: products[0].price * 2
      }],
      subtotal: 4998,
      shippingFee: 0,
      taxBreakdown: {
        isIntrastate: true,
        gstRate: 0.18,
        cgst: 449.82,
        sgst: 449.82,
        igst: 0,
        totalGst: 899.64
      },
      totalAmount: 5897.64,
      paymentDetails: {
        method: 'Razorpay UPI',
        razorpayOrderId: 'order_seed_001',
        razorpayPaymentId: 'pay_seed_001',
        status: 'Paid'
      },
      shipment: {
        carrier: 'Delhivery Direct',
        trackingNumber: 'DEL-89410291-IN',
        shippedAt: new Date()
      },
      status: 'Shipped'
    });

    await AuditLog.create([
      {
        logId: 'LOG-00101',
        actor: 'Super Admin',
        role: 'super_admin',
        action: 'INITIAL_SEED',
        entity: 'DATABASE',
        details: 'Initial system seed with 6 catalog products and RBAC staff users.'
      },
      {
        logId: 'LOG-00102',
        actor: 'Rohan Verma',
        role: 'inventory_manager',
        action: 'RESERVE_STOCK',
        entity: 'SKU-ARD-R4-WIFI',
        details: 'Reserved 2x units for order ORD-2026-8941 under lock.'
      }
    ]);

    console.log('[Seed] Database successfully seeded! Exiting...');
    process.exit(0);
  } catch (err) {
    console.error('[Seed Error]', err);
    process.exit(1);
  }
};

seedDatabase();
