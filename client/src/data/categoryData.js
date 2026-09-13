// Comprehensive data and technical catalog for VoltCart 12 core categories
import { 
  Compass, 
  BatteryCharging, 
  Printer, 
  Radio, 
  Zap, 
  Bot, 
  Tv,
  Cpu,
  Wifi,
  Flame,
  Car,
  Wrench
} from 'lucide-react';

export const CATEGORIES_METADATA = {
  'drone-parts': {
    id: 'drone-parts',
    title: 'Drone Parts & Accessories',
    tagline: 'High-Performance FPV, Quadcopter, Hexacopter & UAV Hardware',
    icon: Compass,
    color: '#EF4123',
    description: 'Explore our comprehensive range of drone components for DIY racers, cinematic FPV pilots, and commercial UAV engineers. We stock authorized brushless motors, flight controllers, ESC stacks, composite propellers, GPS modules, carbon fiber frames, and long-range RC radio transmitters.',
    subcategories: [
      'Multi-Brand Drone Motors',
      'Electronic Speed Controllers (ESCs)',
      'Flight Controllers (FC)',
      'Propellers (3" - 11"+)',
      'RC Transmitters & Receivers',
      'Drone Carbon Frames',
      'FPV Cameras & Video Transmitters (VTX)',
      'GPS & Telemetry Modules'
    ],
    brands: ['EMAX', 'SpeedyBee', 'Holybro', 'FlySky', 'Gemfan', 'T-Motor', 'RadioLink', 'BetaFPV'],
    guide: {
      title: 'Drone Component Selection Guide',
      text: 'When choosing drone components, start with your desired AUW (All Up Weight) and frame size. For 5-inch freestyle or racing drones, paired 2207 or 2306 brushless motors (1750KV-2550KV) with a 4-in-1 45A-55A ESC running BLHeli_S/BLHeli_32 are industry standard. Always ensure your LiPo battery C-rating supports the peak burst current of all four motors simultaneously.'
    },
    products: [
      {
        _id: 'drn-001',
        title: 'EMAX Eco II 2207 2400KV Brushless Motor for 5" FPV Racing Drone',
        sku: 'SKU-DRN-EMAX-2207',
        category: 'drone-parts',
        subcategory: 'Multi-Brand Drone Motors',
        brand: 'EMAX',
        price: 1399,
        gstRate: 0.18,
        hsnCode: '85013119',
        stockOnHand: 65,
        stockReserved: 4,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Stator Diameter': '22mm',
          'KV Rating': '2400KV',
          'Supported Voltage': '3S - 4S LiPo',
          'Max Thrust': '1620g',
          'Shaft Diameter': 'M5 Hollow Steel'
        }
      },
      {
        _id: 'drn-002',
        title: 'SpeedyBee F405 V4 BLS 55A 30x30 Stack (FC + 4-in-1 ESC)',
        sku: 'SKU-DRN-SPB-F405V4',
        category: 'drone-parts',
        subcategory: 'Flight Controllers (FC)',
        brand: 'SpeedyBee',
        price: 5899,
        gstRate: 0.18,
        hsnCode: '85423190',
        stockOnHand: 28,
        stockReserved: 2,
        rating: 5.0,
        image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=600&q=80',
        specs: {
          'MCU': 'STM32F405',
          'IMU / Gyro': 'ICM42688P',
          'Continuous Current': '55A x 4',
          'Firmware': 'BetaFlight / INAV',
          'Wireless Bluetooth Config': 'Supported (SpeedyBee App)'
        }
      },
      {
        _id: 'drn-003',
        title: 'FlySky FS-i6X 10CH 2.4GHz AFHDS 2A Transmitter with iA6B Receiver',
        sku: 'SKU-DRN-FLYSKY-I6X',
        category: 'drone-parts',
        subcategory: 'RC Transmitters & Receivers',
        brand: 'FlySky',
        price: 4799,
        gstRate: 0.18,
        hsnCode: '85269200',
        stockOnHand: 42,
        stockReserved: 3,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Channels': '10 Channels',
          'RF Protocol': 'AFHDS 2A / AFHDS',
          'Telemetry Support': 'Yes (i-BUS, PPM, PWM)',
          'Bandwidth': '500KHz',
          'Operating Voltage': '6V DC (4x AA Batteries)'
        }
      },
      {
        _id: 'drn-004',
        title: 'Gemfan 51466 V2 Hurricane Durable 3-Blade Propeller (Pack of 4)',
        sku: 'SKU-DRN-GEM-51466',
        category: 'drone-parts',
        subcategory: 'Propellers (3" - 11"+)',
        brand: 'Gemfan',
        price: 269,
        gstRate: 0.18,
        hsnCode: '39269099',
        stockOnHand: 180,
        stockReserved: 10,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Diameter': '5.1 inch',
          'Pitch': '4.66 inch',
          'Blades': '3-Blade Polycarbonate',
          'Mounting Hole': '5mm Center Hole',
          'Weight': '4.2g per prop'
        }
      },
      {
        _id: 'drn-005',
        title: 'Mark4 5-inch 225mm Carbon Fiber FPV Freestyle Drone Frame Kit',
        sku: 'SKU-DRN-MARK4-5INCH',
        category: 'drone-parts',
        subcategory: 'Drone Carbon Frames',
        brand: 'Holybro',
        price: 1899,
        gstRate: 0.18,
        hsnCode: '88039000',
        stockOnHand: 35,
        stockReserved: 1,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Wheelbase': '225mm (5-inch Props)',
          'Arm Plate Thickness': '5.0mm 3K Carbon Fiber',
          'Top Plate Thickness': '2.5mm',
          'FC Mount Hole': '30.5x30.5mm & 20x20mm',
          'Total Weight': '102g'
        }
      },
      {
        _id: 'drn-006',
        title: 'Holybro Pixhawk 6C Autopilot Flight Controller with M8N High-Precision GPS',
        sku: 'SKU-DRN-PIX-6C-M8N',
        category: 'drone-parts',
        subcategory: 'GPS & Telemetry Modules',
        brand: 'Holybro',
        price: 18499,
        gstRate: 0.18,
        hsnCode: '85423190',
        stockOnHand: 14,
        stockReserved: 1,
        rating: 5.0,
        image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Main Processor': 'STM32H743 32-bit ARM Cortex-M7 @ 480 MHz',
          'Sensors': 'Triple Redundant IMU (ICM42688P, ICM42670P, BMI088)',
          'Barometer': 'Dual MS5611 / BMP388',
          'Operating System': 'PX4 Autopilot / ArduPilot',
          'GPS Module': 'Holybro M8N Compass Module'
        }
      }
    ]
  },

  'power-batteries': {
    id: 'power-batteries',
    title: 'Batteries & Power Supply',
    tagline: 'High-Discharge LiPo, 18650/21700 Cells, Smart BMS & SMPS Units',
    icon: BatteryCharging,
    color: '#10B981',
    description: 'VoltCart provides industry-trusted power solutions for mobile robots, drones, EV powertrains, and lab benches. Browse our certified lithium-ion cells, multi-cell high-discharge LiPo packs, smart battery balance chargers, and heavy-duty Mean Well switching power supplies.',
    subcategories: [
      'LiPo Drone Batteries (1S - 6S)',
      '18650 & 21700 Lithium-Ion Cells',
      'Battery Management Systems (BMS)',
      'Smart Balance Chargers & Dischargers',
      'Mean Well SMPS Power Supplies',
      'Connectors & Silicone Wires (XT60/XT90)',
      'DC-DC Bench Laboratory Supplies',
      'LiFePO4 Solar & EV Storage Packs'
    ],
    brands: ['Orange', 'Samsung', 'DALY BMS', 'Mean Well', 'SkyRC', 'Amass', 'LG Chem', 'MoliCel'],
    guide: {
      title: 'Battery Pack Calculation & Safe Operation',
      text: 'Calculate pack current demand using formula: Max Continuous Current (Amps) = Capacity (Ah) × Discharge C-Rating. For high-drain robotics projects, always use authentic cells with calibrated BMS circuit boards to prevent over-charge, over-discharge, and short-circuit conditions.'
    },
    products: [
      {
        _id: 'bat-001',
        title: 'Orange 2200mAh 3S 11.1V 30C/60C High-Discharge LiPo Battery with XT60',
        sku: 'SKU-BAT-ORG-3S-2200',
        category: 'power-batteries',
        subcategory: 'LiPo Drone Batteries (1S - 6S)',
        brand: 'Orange',
        price: 1549,
        gstRate: 0.18,
        hsnCode: '85076000',
        stockOnHand: 110,
        stockReserved: 6,
        rating: 4.8,
        image: '/assets/images/esp32_dev_board.jpg',
        specs: {
          'Nominal Voltage': '11.1V (3 Cells in Series)',
          'Capacity': '2200 mAh (24.42 Wh)',
          'Continuous Discharge': '30C (66 Amps)',
          'Burst Discharge': '60C (132 Amps)',
          'Discharge Connector': 'Authentic Amass XT60 Male'
        }
      },
      {
        _id: 'bat-002',
        title: 'Samsung INR18650-25R 2500mAh 20A Continuous High-Drain Li-Ion Cell',
        sku: 'SKU-BAT-SAM-25R',
        category: 'power-batteries',
        subcategory: '18650 & 21700 Lithium-Ion Cells',
        brand: 'Samsung',
        price: 389,
        gstRate: 0.18,
        hsnCode: '85076000',
        stockOnHand: 340,
        stockReserved: 20,
        rating: 5.0,
        image: 'https://images.unsplash.com/photo-1619725002198-6a689b72f41d?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Nominal Voltage': '3.6V DC (4.2V Full Charge)',
          'Capacity': '2500 mAh',
          'Max Continuous Current': '20 Amps',
          'Internal Impedance': '≤ 18 mΩ',
          'Weight': '45 grams'
        }
      },
      {
        _id: 'bat-003',
        title: 'DALY 3S 12V 40A Waterproof Smart BMS with Balance Leads',
        sku: 'SKU-BAT-DALY-3S-40A',
        category: 'power-batteries',
        subcategory: 'Battery Management Systems (BMS)',
        brand: 'DALY BMS',
        price: 1299,
        gstRate: 0.18,
        hsnCode: '85371000',
        stockOnHand: 85,
        stockReserved: 3,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Configuration': '3S (11.1V / 12.6V Lithium-Ion)',
          'Continuous Discharge': '40 Amps',
          'Peak Overcurrent': '120 Amps',
          'Balance Current': '30mA',
          'Protection Rating': 'IP67 Waterproof Sealed'
        }
      },
      {
        _id: 'bat-004',
        title: 'SkyRC iMAX B6 V2 80W 6A Multi-Chemistry Smart Balance Charger',
        sku: 'SKU-BAT-IMAX-B6-V2',
        category: 'power-batteries',
        subcategory: 'Smart Balance Chargers & Dischargers',
        brand: 'SkyRC',
        price: 3499,
        gstRate: 0.18,
        hsnCode: '85044030',
        stockOnHand: 48,
        stockReserved: 2,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Input Voltage': 'DC 11V - 18V',
          'Max Charge Power': '80 Watts',
          'Supported Chemistries': 'LiPo, LiHV, LiFe, Li-Ion, NiMH, NiCd, PB',
          'Cell Count': '1S - 6S Lithium / 1 - 15 cells NiMH',
          'Safety Timer & Cutoff': 'Yes, Temperature Probe Ready'
        }
      },
      {
        _id: 'bat-005',
        title: 'Mean Well LRS-350-12 Industrial Enclosed SMPS (12V 29A 350W)',
        sku: 'SKU-BAT-MW-LRS350-12',
        category: 'power-batteries',
        subcategory: 'Mean Well SMPS Power Supplies',
        brand: 'Mean Well',
        price: 2899,
        gstRate: 0.18,
        hsnCode: '85044090',
        stockOnHand: 52,
        stockReserved: 4,
        rating: 5.0,
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Output Voltage': '12V DC (Adjustable 10.2V - 13.8V)',
          'Rated Current': '29 Amps',
          'Rated Power': '348 Watts',
          'Input Voltage': '90 - 132VAC / 180 - 264VAC Switchable',
          'Efficiency': '85% Active Cooling Fan'
        }
      }
    ]
  },

  '3d-printers': {
    id: '3d-printers',
    title: '3D Printers & Parts',
    tagline: 'High-Speed FDM, Resin SLA Printers, Filaments & Upgrade Components',
    icon: Printer,
    color: '#8B5CF6',
    description: 'Transform your CAD designs into physical reality with VoltCart 3D printing ecosystem. Authorized distributor for Bambu Lab, Creality, and eSUN. Browse high-speed CoreXY 3D printers, all-metal hotends, hardened steel nozzles, PEI textured beds, and premium engineering filaments.',
    subcategories: [
      'Desktop 3D Printers (FDM / SLA)',
      'Filaments (PLA+, PETG, ABS, TPU, Carbon)',
      'Hotends & Direct Drive Extruders',
      'Hardened Steel & Brass Nozzles',
      'Textured PEI Magnetic Print Beds',
      'Auto Bed Leveling Sensors (BLTouch)',
      'Photopolymer Resins (Standard & Tough)',
      '3D Printer Motherboards & TMC Drivers'
    ],
    brands: ['Bambu Lab', 'Creality', 'eSUN', 'E3D', 'Antclabs', 'Elegoo', 'Sunlu'],
    guide: {
      title: 'Filament Temperature & Bed Adhesion Guide',
      text: 'For standard prototypes, eSUN PLA+ prints reliably at 205°C - 215°C with a 60°C PEI bed. For functional robotics enclosures requiring high impact resistance, use PETG (235°C - 245°C / 75°C bed) or carbon-fiber infused nylon paired with a hardened steel nozzle.'
    },
    products: [
      {
        _id: 'prn-001',
        title: 'Bambu Lab P1S Combo CoreXY 3D Printer with AMS Multi-Material System',
        sku: 'SKU-PRN-BAMBU-P1S',
        category: '3d-printers',
        subcategory: 'Desktop 3D Printers (FDM / SLA)',
        brand: 'Bambu Lab',
        price: 84999,
        gstRate: 0.18,
        hsnCode: '84771000',
        stockOnHand: 8,
        stockReserved: 1,
        rating: 5.0,
        image: 'https://images.unsplash.com/photo-1631557559471-ae607b83e746?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Build Volume': '256 x 256 x 256 mm',
          'Max Printing Speed': '500 mm/s (Acceleration up to 20,000 mm/s²)',
          'Hotend Temperature': 'Up to 300°C All-Metal',
          'AMS Compatibility': 'Included 4-Color Multi-Filament System',
          'Chassis': 'Fully Enclosed with Carbon Air Filter'
        }
      },
      {
        _id: 'prn-002',
        title: 'Creality Ender 3 V3 KE High-Speed 3D Printer with Auto-Leveling',
        sku: 'SKU-PRN-CRE-E3V3KE',
        category: '3d-printers',
        subcategory: 'Desktop 3D Printers (FDM / SLA)',
        brand: 'Creality',
        price: 24999,
        gstRate: 0.18,
        hsnCode: '84771000',
        stockOnHand: 22,
        stockReserved: 3,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Build Volume': '220 x 220 x 240 mm',
          'Max Printing Speed': '500 mm/s (Creality OS)',
          'Hotend': '60W Ceramic Heater with Bi-metal Heatbreak',
          'Bed Leveling': 'CR-Touch Hands-Free Auto-Leveling',
          'Extruder': '"Sprite" Dual-Gear Direct Drive Extruder'
        }
      },
      {
        _id: 'prn-003',
        title: 'eSUN PLA+ (PLA Plus) 1.75mm 1KG Spool - Precision Tough Filament',
        sku: 'SKU-PRN-ESUN-PLAP-1KG',
        category: '3d-printers',
        subcategory: 'Filaments (PLA+, PETG, ABS, TPU, Carbon)',
        brand: 'eSUN',
        price: 1349,
        gstRate: 0.18,
        hsnCode: '39169090',
        stockOnHand: 220,
        stockReserved: 12,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Diameter': '1.75mm (Tolerance ± 0.03mm)',
          'Net Weight': '1.0 KG (2.2 lbs)',
          'Printing Temp': '205°C - 225°C',
          'Bed Temp': '55°C - 70°C',
          'Tensile Strength': '63 MPa (2x tougher than standard PLA)'
        }
      },
      {
        _id: 'prn-004',
        title: 'Antclabs BLTouch V3.1 Genuine Auto Bed Leveling Sensor for 3D Printers',
        sku: 'SKU-PRN-BLTOUCH-V31',
        category: '3d-printers',
        subcategory: 'Auto Bed Leveling Sensors (BLTouch)',
        brand: 'Antclabs',
        price: 3199,
        gstRate: 0.18,
        hsnCode: '90318000',
        stockOnHand: 45,
        stockReserved: 2,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Repeatability': 'Standard Deviation < 0.005mm',
          'Operating Voltage': '5V DC Logic',
          'Probe Mechanism': 'Solenoid Push-Pin with Hall Sensor',
          'Compatibility': 'Works on Glass, PEI, Metal & Carbon Beds',
          'Country of Origin': 'South Korea (100% Genuine)'
        }
      }
    ]
  },

  'sensors': {
    id: 'sensors',
    title: 'Sensors & Sensor Modules',
    tagline: 'Ultrasonic, IMU Gyroscopes, Gas, Environmental, Temperature & Load Cells',
    icon: Radio,
    color: '#06B6D4',
    description: 'Interface your microcontroller with the physical world. VoltCart provides India’s largest inventory of analog and I2C/SPI digital sensors: ultrasonic distance finders, 6-axis and 9-axis motion IMUs, medical heart rate monitors, MQ-series gas sensors, and industrial load cells.',
    subcategories: [
      'Distance & Proximity Sensors (LIDAR / Ultrasonic / IR)',
      'Motion, Gyro & Accelerometers (MPU6050 / BNO055)',
      'Environmental, Temperature & Humidity (DHT22 / BME280)',
      'Gas, Air Quality & Smoke Detectors (MQ Series)',
      'Weight, Force & Load Cells (HX711)',
      'Biometric, Pulse & ECG Sensors (MAX30102)',
      'Optical, Color & Vision Cameras',
      'Current, Voltage & Power Sensors (INA219)'
    ],
    brands: ['SparkFun', 'Adafruit', 'DFRobot', 'Bosch Sensortec', 'InvenSense', 'Seeed Studio'],
    guide: {
      title: 'Sensor Protocol & Bus Voltage Verification',
      text: 'Check whether your sensor module operates on 3.3V or 5V logic. Modern high-precision sensors like BME280 or MPU6050 are native 3.3V devices. When connecting to 5V microcontrollers like Arduino Uno, use an onboard level shifter or logic level converter to prevent damaging the silicon.'
    },
    products: [
      {
        _id: 'sns-001',
        title: 'HC-SR04 Ultrasonic Distance Sensor Module with Bracket & Cables',
        sku: 'SKU-SNS-HCSR04-KIT',
        category: 'sensors',
        subcategory: 'Distance & Proximity Sensors (LIDAR / Ultrasonic / IR)',
        brand: 'SparkFun',
        price: 99,
        gstRate: 0.18,
        hsnCode: '90318000',
        stockOnHand: 320,
        stockReserved: 15,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Operating Voltage': '5V DC',
          'Ranging Range': '2 cm - 400 cm (4 meters)',
          'Measuring Angle': '15 degrees',
          'Trigger Input': '10µs TTL Pulse',
          'Echo Output': 'TTL Pulse proportional to distance'
        }
      },
      {
        _id: 'sns-002',
        title: 'DHT22 / AM2302 High-Accuracy Digital Temperature & Humidity Sensor',
        sku: 'SKU-SNS-DHT22-AM2302',
        category: 'sensors',
        subcategory: 'Environmental, Temperature & Humidity (DHT22 / BME280)',
        brand: 'Adafruit',
        price: 299,
        gstRate: 0.18,
        hsnCode: '90258000',
        stockOnHand: 185,
        stockReserved: 8,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Temperature Range': '-40°C to 80°C (Accuracy ±0.5°C)',
          'Humidity Range': '0 - 100% RH (Accuracy ±2% RH)',
          'Sampling Rate': '0.5 Hz (One reading every 2 seconds)',
          'Operating Voltage': '3.3V - 5.5V DC',
          'Communication': '1-Wire Digital Bus'
        }
      },
      {
        _id: 'sns-003',
        title: 'Bosch BME280 Precision Barometric Pressure, Temp & Altitude Sensor (I2C/SPI)',
        sku: 'SKU-SNS-BOSCH-BME280',
        category: 'sensors',
        subcategory: 'Environmental, Temperature & Humidity (DHT22 / BME280)',
        brand: 'Bosch Sensortec',
        price: 499,
        gstRate: 0.18,
        hsnCode: '90262000',
        stockOnHand: 140,
        stockReserved: 6,
        rating: 5.0,
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Pressure Range': '300 - 1100 hPa (±1 hPa accuracy)',
          'Altitude Estimation': '0 - 30,000 feet with 1-meter precision',
          'Interface': 'I2C (0x76/0x77) and SPI 4-wire',
          'Operating Voltage': '1.8V - 3.6V DC (with onboard 3.3V LDO)',
          'Current Consumption': '3.6 µA @ 1Hz humidity/pressure/temp'
        }
      },
      {
        _id: 'sns-004',
        title: 'MPU-6050 6-Axis Accelerometer & Gyroscope Sensor Module with DMP',
        sku: 'SKU-SNS-MPU6050-6AXIS',
        category: 'sensors',
        subcategory: 'Motion, Gyro & Accelerometers (MPU6050 / BNO055)',
        brand: 'InvenSense',
        price: 199,
        gstRate: 0.18,
        hsnCode: '90318000',
        stockOnHand: 290,
        stockReserved: 12,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Gyroscope Range': '±250, ±500, ±1000, ±2000 °/sec',
          'Accelerometer Range': '±2g, ±4g, ±8g, ±16g',
          'Hardware Processing': 'Digital Motion Processor (DMP) onboard',
          'ADC Resolution': '16-bit analog-to-digital converter per channel',
          'Communication': 'I2C Interface up to 400kHz'
        }
      },
      {
        _id: 'sns-005',
        title: '50KG Body Load Cell + HX711 24-bit ADC Precision Weight Amplifier',
        sku: 'SKU-SNS-HX711-50KG',
        category: 'sensors',
        subcategory: 'Weight, Force & Load Cells (HX711)',
        brand: 'DFRobot',
        price: 249,
        gstRate: 0.18,
        hsnCode: '84239020',
        stockOnHand: 175,
        stockReserved: 5,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Capacity': '50 KG per cell (up to 200KG with 4-cell bridge)',
          'ADC Chipset': 'Avia Semiconductor HX711 24-Bit ADC',
          'Selectable Gain': '64 or 128 PGA amplification',
          'Output Data Rate': '10 SPS or 80 SPS',
          'Operating Voltage': '2.6V - 5.5V DC'
        }
      }
    ]
  },

  'electronic-components': {
    id: 'electronic-components',
    title: 'Electronic Components',
    tagline: 'ICs, Power MOSFETs, Diodes, Capacitors, Resistors, Relays & Prototyping',
    icon: Zap,
    color: '#EC4899',
    description: 'The foundational building blocks of electronics engineering. Direct genuine parts from STMicroelectronics, Texas Instruments, Vishay, and Diodes Inc. Solderless breadboards, perfboards, precision timer ICs, voltage regulators, ceramic & electrolytic capacitors, and optocouplers.',
    subcategories: [
      'Integrated Circuits (ICs & Timers)',
      'Power MOSFETs & Transistors',
      'Rectifier & Zener Diodes',
      'Electromechanical Relays & Optocouplers',
      'Capacitors (Electrolytic, Ceramic & Tantalum)',
      'Resistors & Potentiometers',
      'Solderless Breadboards & Stripboards',
      'Terminal Blocks & Header Pins'
    ],
    brands: ['Texas Instruments', 'STMicroelectronics', 'Vishay', 'Fairchild', 'Omron', 'Songle'],
    guide: {
      title: 'Power Dissipation & Thermal Heatsink Guide',
      text: 'When using linear regulators (e.g. LM7805) or power MOSFETs (e.g. IRFZ44N) switching inductive loads, calculate thermal power dissipation: P = (Vin - Vout) × Iload. For loads exceeding 1.5 Watts, always attach an aluminum TO-220 heatsink with thermal compound.'
    },
    products: [
      {
        _id: 'cmp-001',
        title: 'IRFZ44N N-Channel 55V 49A Power MOSFET (TO-220 Package)',
        sku: 'SKU-CMP-MOS-IRFZ44N',
        category: 'electronic-components',
        subcategory: 'Power MOSFETs & Transistors',
        brand: 'Vishay',
        price: 39,
        gstRate: 0.18,
        hsnCode: '85412900',
        stockOnHand: 550,
        stockReserved: 20,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Drain-Source Breakdown': '55V DC',
          'Continuous Drain Current': '49 Amps @ 25°C',
          'RDS(on) Resistance': '17.5 mΩ (ultra-low loss)',
          'Gate Threshold Voltage': '2.0V - 4.0V',
          'Package': 'TO-220AB Through-Hole'
        }
      },
      {
        _id: 'cmp-002',
        title: 'NE555P Precision Bipolar Timer IC (8-Pin DIP Package)',
        sku: 'SKU-CMP-IC-NE555P',
        category: 'electronic-components',
        subcategory: 'Integrated Circuits (ICs & Timers)',
        brand: 'Texas Instruments',
        price: 18,
        gstRate: 0.18,
        hsnCode: '85423190',
        stockOnHand: 800,
        stockReserved: 50,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Timing Range': 'Microseconds to Hours (Astable / Monostable)',
          'Supply Voltage': '4.5V - 16V DC',
          'Output Sink/Source': 'Up to 200 mA',
          'Temperature Stability': '0.005% per °C',
          'Package': 'DIP-8 Standard'
        }
      },
      {
        _id: 'cmp-003',
        title: '5V Single Channel Optical Isolation Relay Module (10A 250VAC)',
        sku: 'SKU-CMP-RELAY-1CH-5V',
        category: 'electronic-components',
        subcategory: 'Electromechanical Relays & Optocouplers',
        brand: 'Songle',
        price: 69,
        gstRate: 0.18,
        hsnCode: '85364100',
        stockOnHand: 410,
        stockReserved: 15,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Coil Voltage': '5V DC (Trigger Current 5mA)',
          'Switching Capacity': '10A 250VAC / 10A 30VDC',
          'Isolation': 'Optocoupler Protected Control Signal',
          'Trigger Mode': 'High or Low Level Jumper Selectable',
          'Indicator': 'Power & Relay Status Dual LEDs'
        }
      },
      {
        _id: 'cmp-004',
        title: '830-Tie Points Transparent Prototyping Solderless Breadboard',
        sku: 'SKU-CMP-BRD-830PT',
        category: 'electronic-components',
        subcategory: 'Solderless Breadboards & Stripboards',
        brand: 'SparkFun',
        price: 129,
        gstRate: 0.18,
        hsnCode: '85340000',
        stockOnHand: 340,
        stockReserved: 10,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Tie Points': '630 terminal points + 200 distribution power rails',
          'Wire Compatibility': '20 - 29 AWG standard solid wires',
          'Contacts': 'Nickel-plated phosphor bronze spring clips',
          'Backing': 'Self-adhesive peelable mounting tape',
          'Dimensions': '165 x 55 x 10 mm'
        }
      }
    ]
  },

  'motors-drivers': {
    id: 'motors-drivers',
    title: 'Motors, Drivers & Actuators',
    tagline: 'Stepper Motors, Servos, High-Current Drivers, Linear Actuators & DC Pumps',
    icon: Bot,
    color: '#3B82F6',
    description: 'Precision robotic actuation hardware engineered for high torque, reliability, and smooth speed control. We carry NEMA 17/23 steppers, Trinamic silent TMC drivers, metal-gear servos, high-speed 775 spindle motors, industrial submersible pumps, and heavy-duty 12V linear actuators.',
    subcategories: [
      'NEMA Stepper Motors (17, 23, 34)',
      'Trinamic & High-Power Stepper Drivers (TMC2209, TB6600)',
      'Servo Motors (Micro SG90 to Heavy Metal MG996R)',
      'High-Power DC Dual Motor Drivers (L298N, BTS7960 43A)',
      'High-Speed Spindle Motors (775, 895 Motor)',
      'Linear Actuators & Motorized Slides',
      'Submersible Micro Water Pumps',
      'Encoders & Speed Sensor Discs'
    ],
    brands: ['Trinamic', 'STMicroelectronics', 'TowerPro', 'Nidec', 'Leadshine', 'JGY'],
    guide: {
      title: 'Stepper Driver VREF Tuning Formula',
      text: 'To avoid overheating or skipping steps on TMC2209 drivers, set the reference voltage using: VREF = (Irms × 2.5) / 1.77. For typical 1.5A NEMA 17 motors, calibrate the multimeter to 1.05V - 1.15V DC between the potentiometer wiper and circuit ground.'
    },
    products: [
      {
        _id: 'mot-001',
        title: 'NEMA 17 4.2 kg.cm High-Torque Hybrid Stepper Motor (1.5A 4-Lead)',
        sku: 'SKU-MOT-NEMA17-42KG',
        category: 'motors-drivers',
        subcategory: 'NEMA Stepper Motors (17, 23, 34)',
        brand: 'Leadshine',
        price: 649,
        gstRate: 0.18,
        hsnCode: '85011019',
        stockOnHand: 180,
        stockReserved: 12,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Holding Torque': '4.2 kg.cm (0.42 N.m)',
          'Step Angle': '1.8° (200 steps/rev)',
          'Rated Current': '1.5A DC per phase',
          'Shaft Diameter': '5mm D-Cut Shaft (22mm length)',
          'Frame Size': '42 x 42 x 40 mm'
        }
      },
      {
        _id: 'mot-002',
        title: 'TMC2209 V2.0 Ultra-Silent Stepper Driver with StealthChop2 & Sensorless Homing',
        sku: 'SKU-MOT-TMC2209-V2',
        category: 'motors-drivers',
        subcategory: 'Trinamic & High-Power Stepper Drivers (TMC2209, TB6600)',
        brand: 'Trinamic',
        price: 449,
        gstRate: 0.18,
        hsnCode: '85423190',
        stockOnHand: 135,
        stockReserved: 5,
        rating: 5.0,
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Operating Voltage': '4.75V - 28V DC',
          'RMS Current': '2.0A (Peak 2.8A)',
          'Microstepping': 'Up to 1/256 interpolation',
          'Key Technologies': 'StealthChop2 (Whisper Quiet), StallGuard4 (Sensorless)',
          'Interface': 'Step/Dir or UART mode'
        }
      },
      {
        _id: 'mot-003',
        title: 'MG996R Metal Gear High-Torque Digital Servo Motor (11 kg.cm)',
        sku: 'SKU-MOT-SERVO-MG996R',
        category: 'motors-drivers',
        subcategory: 'Servo Motors (Micro SG90 to Heavy Metal MG996R)',
        brand: 'TowerPro',
        price: 349,
        gstRate: 0.18,
        hsnCode: '85011019',
        stockOnHand: 220,
        stockReserved: 10,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Stall Torque': '11 kg.cm @ 6.0V / 9.4 kg.cm @ 4.8V',
          'Rotation Angle': '180° Range',
          'Gear Train': 'All-Metal Brass & Aluminum Gears',
          'Bearing': 'Double Ball Bearing Output',
          'Operating Speed': '0.14 sec / 60°'
        }
      },
      {
        _id: 'mot-004',
        title: '12V DC Electric Heavy-Duty Linear Actuator 100mm Stroke (750N Force)',
        sku: 'SKU-MOT-ACT-100MM-12V',
        category: 'motors-drivers',
        subcategory: 'Linear Actuators & Motorized Slides',
        brand: 'JGY',
        price: 2499,
        gstRate: 0.18,
        hsnCode: '85013119',
        stockOnHand: 32,
        stockReserved: 1,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Stroke Length': '100mm (4 inches)',
          'Push/Pull Force': '750 Newtons (approx. 75 kg)',
          'Rated Speed': '10 mm/second unloaded',
          'Operating Voltage': '12V DC (Full load current 3A)',
          'Limit Switches': 'Built-in automatic end-stop switches'
        }
      }
    ]
  },

  'electronic-modules': {
    id: 'electronic-modules',
    title: 'Electronic Modules & Displays',
    tagline: 'OLEDs, TFT Touch Screens, Buck/Boost DC Converters, Real-Time Clocks & Audio',
    icon: Tv,
    color: '#6366F1',
    description: 'Plug-and-play functional breakout modules that save weeks of circuit prototyping. We provide sharp I2C OLED screens, high-efficiency DC switching buck/boost regulators, USB serial programmers, I2S DAC audio amplifiers, and DS3231 temperature-compensated real-time clock modules.',
    subcategories: [
      'OLED & Graphic LCD Displays',
      'Character 16x2 / 20x4 LCDs with I2C Backpack',
      'Step-Down Buck & Step-Up Boost DC Converters',
      'USB-to-TTL Serial Programmers (CP2102, CH340)',
      'Audio Amplifiers & Bluetooth Audio Receivers',
      'Real-Time Clock (RTC) Modules with Battery Backup',
      'Logic Level Bidirectional Shifters (3.3V <-> 5V)',
      'microSD Card SPI Read/Write Adapters'
    ],
    brands: ['Waveshare', 'Texas Instruments', 'Silicon Labs', 'Analog Devices', 'Nextion', 'Adafruit'],
    guide: {
      title: 'I2C Display Address Troubleshooting',
      text: 'For 0.96-inch and 1.3-inch OLED displays, default I2C address is usually 0x3C (or 0x3D if the back jumper resistor is bridged). Run an I2C scanner script on your microcontroller if the display does not initialize on the default SSD1306 library driver.'
    },
    products: [
      {
        _id: 'mod-001',
        title: '0.96 inch 128x64 I2C OLED Display Module (Blue & Yellow Dual-Color)',
        sku: 'SKU-MOD-OLED-096-I2C',
        category: 'electronic-modules',
        subcategory: 'OLED & Graphic LCD Displays',
        brand: 'Waveshare',
        price: 249,
        gstRate: 0.18,
        hsnCode: '85285900',
        stockOnHand: 240,
        stockReserved: 14,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Resolution': '128 x 64 pixels (Self-Illuminating OLED)',
          'Driver IC': 'Solomon Systech SSD1306',
          'Interface': 'I2C 4-Pin (VCC, GND, SCL, SDA)',
          'Viewing Angle': '> 160 degrees',
          'Operating Voltage': '3.3V - 5.0V DC'
        }
      },
      {
        _id: 'mod-002',
        title: '16x2 Character LCD Module with Pre-Soldered PCF8574 I2C Backpack',
        sku: 'SKU-MOD-LCD1602-I2C',
        category: 'electronic-modules',
        subcategory: 'Character 16x2 / 20x4 LCDs with I2C Backpack',
        brand: 'Waveshare',
        price: 199,
        gstRate: 0.18,
        hsnCode: '85285900',
        stockOnHand: 310,
        stockReserved: 12,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Display Format': '16 characters x 2 lines (HD44780 compatible)',
          'Backlight': 'High-contrast Blue with White letters',
          'I2C Expander': 'NXP PCF8574 (2 wire control saves 6 GPIOs)',
          'Default Address': '0x27 or 0x3F',
          'Operating Voltage': '5.0V DC'
        }
      },
      {
        _id: 'mod-003',
        title: 'LM2596 DC-DC Adjustable Step-Down Buck Converter Module (3A Max)',
        sku: 'SKU-MOD-LM2596-BUCK',
        category: 'electronic-modules',
        subcategory: 'Step-Down Buck & Step-Up Boost DC Converters',
        brand: 'Texas Instruments',
        price: 89,
        gstRate: 0.18,
        hsnCode: '85044090',
        stockOnHand: 480,
        stockReserved: 25,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Input Voltage': '4.5V - 40V DC',
          'Output Voltage': '1.25V - 35V DC (Continuous multi-turn potentiometer)',
          'Output Current': '2A continuous (3A max with heatsink)',
          'Switching Frequency': '150 kHz',
          'Conversion Efficiency': 'Up to 92%'
        }
      },
      {
        _id: 'mod-004',
        title: 'DS3231 High-Precision I2C Real Time Clock (RTC) with EEPROM & Battery',
        sku: 'SKU-MOD-RTC-DS3231',
        category: 'electronic-modules',
        subcategory: 'Real-Time Clock (RTC) Modules with Battery Backup',
        brand: 'Analog Devices',
        price: 189,
        gstRate: 0.18,
        hsnCode: '85423190',
        stockOnHand: 160,
        stockReserved: 4,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
        specs: {
          'RTC Chip': 'Maxim DS3231 with TCXO Temperature Compensated Crystal',
          'Time Accuracy': '±2 ppm from 0°C to +40°C (~1 minute error per year)',
          'EEPROM Memory': 'AT24C32 32KB I2C Memory',
          'Backup Battery': 'CR2032 Coin Cell Socket Included',
          'Operating Voltage': '3.3V - 5.5V DC'
        }
      },
      {
        _id: 'mod-005',
        title: 'CP2102 Micro USB to UART TTL 6-Pin Serial Converter Programmer',
        sku: 'SKU-MOD-USB-CP2102',
        category: 'electronic-modules',
        subcategory: 'USB-to-TTL Serial Programmers (CP2102, CH340)',
        brand: 'Silicon Labs',
        price: 179,
        gstRate: 0.18,
        hsnCode: '85423190',
        stockOnHand: 230,
        stockReserved: 8,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Chipset': 'Silicon Labs CP2102 Standard Virtual COM Port',
          'Baud Rates': '300 bps to 1.5 Mbps',
          'Pinout': 'DTR, RXD, TXD, VCC (3.3V/5V), CTS, GND',
          'Auto-Reset Support': 'DTR pin enables automated Arduino Pro Mini flashing',
          'OS Support': 'Windows 11/10, Linux, macOS (driver-free plug & play)'
        }
      }
    ]
  },

  'microcontrollers': {
    id: 'microcontrollers',
    title: 'Development Boards & Microcontrollers',
    tagline: 'Official Arduino, Raspberry Pi, ESP32, STM32 & ARM Cortex Boards',
    icon: Cpu,
    color: '#EF4123',
    description: 'Empower your embedded hardware prototypes with world-class development boards. VoltCart is an authorized source for official Arduino microcontrollers, Raspberry Pi single-board computers, Espressif dual-core Wi-Fi/BLE modules, STM32 ARM Cortex evaluation kits, and high-performance RP2040 microcontrollers.',
    subcategories: [
      'Arduino Official & Compatible Boards',
      'Raspberry Pi Single Board Computers (SBC)',
      'ESP32 & ESP8266 Wi-Fi / BLE Boards',
      'STM32 ARM Cortex-M Development Boards',
      'RP2040 & Raspberry Pi Pico Series',
      'Teensy High-Speed USB Boards',
      'FPGA & CPLD Logic Boards',
      'Microcontroller Accessories & Shields'
    ],
    brands: ['Arduino', 'Raspberry Pi', 'Espressif Systems', 'STMicroelectronics', 'Waveshare', 'Seeed Studio', 'Adafruit'],
    guide: {
      title: 'Microcontroller vs SBC Architecture Selection Guide',
      text: 'Choose 8-bit/32-bit MCUs (like Arduino Uno R4 or ESP32) for deterministic real-time hardware IO, low power consumption (<100mA), and immediate boot times. Choose Linux Single Board Computers (like Raspberry Pi 5) when your robotics application requires computer vision (OpenCV), ROS2 robotics middleware, deep learning inference, or multi-display HDMI output.'
    },
    products: [
      {
        _id: 'dev-001',
        title: 'Arduino Uno R4 WiFi Microcontroller Board with 12x8 LED Matrix',
        sku: 'SKU-DEV-ARD-UNO-R4',
        category: 'microcontrollers',
        subcategory: 'Arduino Official & Compatible Boards',
        brand: 'Arduino',
        price: 2499,
        gstRate: 0.18,
        hsnCode: '85423190',
        stockOnHand: 65,
        stockReserved: 3,
        rating: 4.9,
        image: '/assets/images/arduino_uno_r4.jpg',
        specs: {
          'Processor': 'Renesas RA4M1 32-bit ARM Cortex-M4 @ 48 MHz',
          'Wireless Module': 'Espressif ESP32-S3 (Wi-Fi 802.11 b/g/n + BLE 5.0)',
          'Operating Voltage': '5V DC (VIN 6V - 24V)',
          'Memory': '256 KB Flash, 32 KB SRAM, 8 KB EEPROM',
          'Onboard Matrix': '12x8 Individually Addressable Red LEDs'
        }
      },
      {
        _id: 'dev-002',
        title: 'Raspberry Pi 5 - 8GB RAM Quad-Core 2.4GHz 64-Bit Single Board Computer',
        sku: 'SKU-DEV-RPI-5-8GB',
        category: 'microcontrollers',
        subcategory: 'Raspberry Pi Single Board Computers (SBC)',
        brand: 'Raspberry Pi',
        price: 7999,
        gstRate: 0.18,
        hsnCode: '84713010',
        stockOnHand: 34,
        stockReserved: 2,
        rating: 5.0,
        image: '/assets/images/raspberry_pi_5.jpg',
        specs: {
          'CPU Architecture': 'Broadcom BCM2712 Quad-core ARM Cortex-A76 @ 2.4GHz',
          'RAM Memory': '8GB LPDDR4X-4267 SDRAM',
          'Display Outputs': 'Dual 4Kp60 micro-HDMI with HDR support',
          'PCIe Expansion': 'PCIe 2.0 x1 interface for NVMe SSD expansion',
          'Networking': 'Gigabit Ethernet, Dual-Band 802.11ac Wi-Fi, BLE 5.0'
        }
      },
      {
        _id: 'dev-003',
        title: 'ESP32-WROOM-32D Dual-Core Wi-Fi & Bluetooth 4.2 Development Board',
        sku: 'SKU-DEV-ESP32-WROOM',
        category: 'microcontrollers',
        subcategory: 'ESP32 & ESP8266 Wi-Fi / BLE Boards',
        brand: 'Espressif Systems',
        price: 349,
        gstRate: 0.18,
        hsnCode: '85423190',
        stockOnHand: 280,
        stockReserved: 15,
        rating: 4.8,
        image: '/assets/images/esp32_dev_board.jpg',
        specs: {
          'Core Processor': 'Xtensa Dual-Core 32-bit LX6 @ 240 MHz',
          'SRAM & Flash': '520 KB SRAM, 4 MB QSPI Flash',
          'Wireless': 'Wi-Fi 802.11 b/g/n (150 Mbps) + Bluetooth v4.2 BR/EDR & BLE',
          'GPIO Pins': '36 GPIOs with capacitive touch, ADC, DAC, I2C, SPI, UART',
          'Programming Interface': 'Micro USB with CP2102 auto-reset circuitry'
        }
      },
      {
        _id: 'dev-004',
        title: 'Raspberry Pi Pico 2 with Dual RP2350 High-Performance Microcontroller',
        sku: 'SKU-DEV-RPI-PICO2',
        category: 'microcontrollers',
        subcategory: 'RP2040 & Raspberry Pi Pico Series',
        brand: 'Raspberry Pi',
        price: 499,
        gstRate: 0.18,
        hsnCode: '85423190',
        stockOnHand: 190,
        stockReserved: 8,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Core': 'Dual-Core ARM Cortex-M33 / Hazard3 RISC-V @ 150 MHz',
          'SRAM': '520 KB on-chip SRAM in 10 banks',
          'Programmable IO': '12x PIO state machines for custom protocols',
          'Security': 'Arm TrustZone, Secure Boot, Hardware SHA-256 accelerator',
          'Package': 'Castellated module allows soldering directly to carrier boards'
        }
      },
      {
        _id: 'dev-005',
        title: 'STM32F401CCU6 Black Pill ARM Cortex-M4 Development Board',
        sku: 'SKU-DEV-STM32-BLACKPILL',
        category: 'microcontrollers',
        subcategory: 'STM32 ARM Cortex-M Development Boards',
        brand: 'STMicroelectronics',
        price: 329,
        gstRate: 0.18,
        hsnCode: '85423190',
        stockOnHand: 140,
        stockReserved: 6,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Core Architecture': '32-bit ARM Cortex-M4 with FPU @ 84 MHz',
          'Flash & RAM': '256 KB Flash, 64 KB SRAM',
          'Connector': 'Modern Type-C USB with DFU bootloader support',
          'Oscillator': '25MHz High-Speed Crystal + 32.768kHz RTC Crystal',
          'Debug Interface': 'SWD 4-pin port for ST-Link V2'
        }
      },
      {
        _id: 'dev-006',
        title: 'Arduino Mega 2560 R3 Original Microcontroller Board (54 Digital I/O)',
        sku: 'SKU-DEV-ARD-MEGA-2560',
        category: 'microcontrollers',
        subcategory: 'Arduino Official & Compatible Boards',
        brand: 'Arduino',
        price: 3699,
        gstRate: 0.18,
        hsnCode: '85423190',
        stockOnHand: 45,
        stockReserved: 2,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Processor': 'Microchip ATmega2560 8-bit AVR @ 16 MHz',
          'Digital I/O': '54 Pins (15 provide PWM output)',
          'Analog Inputs': '16 Channels (10-bit ADC resolution)',
          'Hardware Serial': '4 UART Hardware Serial Ports',
          'Memory': '256 KB Flash, 8 KB SRAM, 4 KB EEPROM'
        }
      }
    ]
  },

  'iot-wireless': {
    id: 'iot-wireless',
    title: 'IoT & Wireless Communication',
    tagline: 'LoRaWAN, 4G LTE/GPS Modems, Wi-Fi 6, Zigbee, BLE 5.2 & RF Modules',
    icon: Wifi,
    color: '#14B8A6',
    description: 'Connect your sensors and autonomous robots to the cloud, private LoRaWAN gateways, and telemetry networks. We provide certified long-range LoRa transceivers, Quectel/SIMCom industrial 4G/GPS modems, Zigbee mesh nodes, Bluetooth Low Energy beacons, and high-gain external antennas.',
    subcategories: [
      'LoRa & LoRaWAN Long-Range Transceivers',
      '4G LTE & GSM / GPS Tracking Modems',
      'Zigbee 3.0 & Thread Mesh Modules',
      'Wi-Fi 6 & ESP-NOW Modules',
      'Bluetooth 5.2 / BLE Transceivers & Beacons',
      'RFID & NFC Readers / Writers (13.56MHz & 125kHz)',
      'RF 433MHz & 2.4GHz Transceiver Modules (NRF24L01)',
      'Antennas, Pigtails & SMA RF Connectors'
    ],
    brands: ['Espressif Systems', 'Ai-Thinker', 'Quectel', 'SIMCom', 'HopeRF', 'Seeed Studio', 'Nordic Semiconductor'],
    guide: {
      title: 'Wireless Telemetry & Frequency Regulation in India',
      text: 'For long-range remote monitoring without recurring telecom bills, utilize LoRa 865-867 MHz (the license-free ISM band allocated for India / IN865). For mobile autonomous robots requiring high-bandwidth telemetry or remote video streaming outside local Wi-Fi, deploy 4G LTE Cat-1/Cat-4 modems like the SIM7600EI with external active GPS patch antennas.'
    },
    products: [
      {
        _id: 'iot-001',
        title: 'Ai-Thinker Ra-02 SX1278 433MHz LoRa Spread Spectrum Wireless Module',
        sku: 'SKU-IOT-RA02-SX1278',
        category: 'iot-wireless',
        subcategory: 'LoRa & LoRaWAN Long-Range Transceivers',
        brand: 'Ai-Thinker',
        price: 299,
        gstRate: 0.18,
        hsnCode: '85176290',
        stockOnHand: 175,
        stockReserved: 6,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80',
        specs: {
          'RF Chipset': 'Semtech SX1278 LoRa Transceiver',
          'Frequency Range': '410 MHz - 525 MHz (433MHz Standard)',
          'Max Transmit Power': '+20 dBm (100mW) @ 3.3V',
          'Link Budget': 'Up to 148 dBm with sensitivity down to -148 dBm',
          'Interface': 'SPI 4-Wire Digital Bus with IPEX Antenna Mount'
        }
      },
      {
        _id: 'iot-002',
        title: 'SIM7600EI 4G LTE High-Speed Cellular & GNSS GPS Development Board',
        sku: 'SKU-IOT-SIM7600-4G',
        category: 'iot-wireless',
        subcategory: '4G LTE & GSM / GPS Tracking Modems',
        brand: 'SIMCom',
        price: 3499,
        gstRate: 0.18,
        hsnCode: '85176290',
        stockOnHand: 48,
        stockReserved: 2,
        rating: 5.0,
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Network Bands': 'LTE-TDD B40/B41, LTE-FDD B1/B3/B5/B8, 3G WCDMA, 2G GSM',
          'Data Speeds': 'LTE Cat 4 (Downlink up to 150 Mbps, Uplink 50 Mbps)',
          'GNSS Satellite Support': 'GPS, GLONASS, BeiDou, Galileo positioning',
          'Interfaces': 'USB 2.0 High Speed, UART TTL, Nano SIM Slot',
          'Protocols': 'TCP, UDP, MQTT, HTTP, FTP, SSL'
        }
      },
      {
        _id: 'iot-003',
        title: 'NRF24L01+ PA LNA 2.4GHz Wireless Transceiver with SMA Antenna (1100m Range)',
        sku: 'SKU-IOT-NRF24-PALNA',
        category: 'iot-wireless',
        subcategory: 'RF 433MHz & 2.4GHz Transceiver Modules (NRF24L01)',
        brand: 'Nordic Semiconductor',
        price: 199,
        gstRate: 0.18,
        hsnCode: '85176290',
        stockOnHand: 310,
        stockReserved: 12,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Frequency': '2.4 GHz ISM Band (2400 to 2525 MHz)',
          'Power Amplifier': 'Built-in PA (Power Amp) + LNA (Low Noise Amp)',
          'Transmission Distance': 'Up to 1100 meters line-of-sight',
          'Data Rate': '250 kbps, 1 Mbps, 2 Mbps air data rates',
          'Operating Voltage': '3.3V DC (5V tolerant logic inputs)'
        }
      },
      {
        _id: 'iot-004',
        title: 'ESP32-C6-WROOM-1 Wi-Fi 6 + Bluetooth 5 (LE) + Zigbee / Thread SoC Board',
        sku: 'SKU-IOT-ESP32-C6',
        category: 'iot-wireless',
        subcategory: 'Wi-Fi 6 & ESP-NOW Modules',
        brand: 'Espressif Systems',
        price: 499,
        gstRate: 0.18,
        hsnCode: '85423190',
        stockOnHand: 120,
        stockReserved: 4,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Core': '32-bit RISC-V Single-Core processor @ up to 160 MHz',
          'Wireless Standards': 'Wi-Fi 6 (802.11ax), Bluetooth 5 LE, IEEE 802.15.4 (Zigbee 3.0 & Thread)',
          'Matter Protocol': 'Full Native Support for Smart Home Matter ecosystem',
          'Security': 'RSA-3072, ECC, HMAC, Digital Signature, Flash Encryption',
          'Power Management': 'Ultra-low power deep sleep mode (7 µA)'
        }
      },
      {
        _id: 'iot-005',
        title: 'RC522 13.56MHz RFID Reader / Writer Kit with S50 Key Fob and Card',
        sku: 'SKU-IOT-RFID-RC522',
        category: 'iot-wireless',
        subcategory: 'RFID & NFC Readers / Writers (13.56MHz & 125kHz)',
        brand: 'Seeed Studio',
        price: 129,
        gstRate: 0.18,
        hsnCode: '85235200',
        stockOnHand: 260,
        stockReserved: 10,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Operating Frequency': '13.56 MHz High-Frequency RFID / NFC',
          'Supported Card Types': 'Mifare1 S50, Mifare1 S70, Mifare UltraLight, Mifare Pro',
          'Communication Protocol': 'SPI 10Mbit/s interface (also supports I2C & UART)',
          'Read Range': 'Up to 50mm (dependent on antenna and transponder tag)',
          'Included Accessories': '1x RFID-RC522 Module, 1x S50 White Card, 1x S50 Keyfob'
        }
      },
      {
        _id: 'iot-006',
        title: 'LoRaWAN 868MHz / 865MHz 5dBi High-Gain Fiberglass Outdoor Omni Antenna',
        sku: 'SKU-IOT-ANT-LORA-865',
        category: 'iot-wireless',
        subcategory: 'Antennas, Pigtails & SMA RF Connectors',
        brand: 'HopeRF',
        price: 899,
        gstRate: 0.18,
        hsnCode: '85291090',
        stockOnHand: 85,
        stockReserved: 3,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Frequency Band': '860 MHz - 930 MHz (Calibrated for India 865MHz ISM)',
          'Peak Gain': '5.0 dBi Omni-directional radiation pattern',
          'Impedance & VSWR': '50 Ohm impedance, VSWR ≤ 1.5',
          'Enclosure': 'Heavy-duty weatherproof fiberglass with N-Type male connector',
          'Mounting': 'Includes dual heavy-duty U-bolt pole brackets'
        }
      }
    ]
  },

  'diy-kits': {
    id: 'diy-kits',
    title: 'DIY & Maker Kits',
    tagline: 'STEM Robotics, Smart Car Chassis, Complete Sensor Starter Kits & Learning Labs',
    icon: Flame,
    color: '#F59E0B',
    description: 'Hands-on educational engineering kits designed for makers, students, hobbyists, and university robotics labs. Every kit includes comprehensive circuit schematics, open-source code libraries, modular sensors, and step-by-step assembly guides to accelerate project development from zero to deployment.',
    subcategories: [
      'Complete Arduino Educational Starter Kits',
      'Obstacle Avoiding & Line Follower Robot Cars',
      'STEM Sensor & Electronics Learning Bundles',
      'IoT Smart Home & Agriculture Automation Kits',
      'Robotic Arm & Gripper Mechanical Kits',
      'Soldering Practice & Electronic Experimenter Boards',
      'Quadcopter Drone DIY Assembly Stacks',
      'Solar & Renewable Energy Science Projects'
    ],
    brands: ['VoltCart MakerLab', 'Keyestudio', 'Elegoo', 'SunFounder', 'DFRobot', 'DIYables'],
    guide: {
      title: 'Maker Project Starter Roadmap',
      text: 'For complete beginners, start with an Arduino Master Learning Kit featuring breadboards, LEDs, ultrasonic sensors, and LCDs to master embedded C++ fundamentals. For mechatronics and kinematics, build a 4WD Smart Car kit incorporating dual H-bridge motor drivers, optical encoders, and Bluetooth smartphone telemetry.'
    },
    products: [
      {
        _id: 'kit-001',
        title: 'Arduino Advanced Electronics Learning Kit (45+ Components & 30 Projects)',
        sku: 'SKU-KIT-ARD-ADV-45',
        category: 'diy-kits',
        subcategory: 'Complete Arduino Educational Starter Kits',
        brand: 'VoltCart MakerLab',
        price: 1899,
        gstRate: 0.18,
        hsnCode: '90230090',
        stockOnHand: 110,
        stockReserved: 5,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Microcontroller': 'Arduino Uno R3 Compatible Board included',
          'Component Count': '45+ Modules (Relay, Servo, Stepper, RFID, LCD 1602, Sensors)',
          'Tutorials Included': '180-page PDF Guidebook + 30 Open-Source Sample Codes',
          'Storage Box': 'Multi-compartment transparent durable organizer case',
          'Target Skill Level': 'Beginner to Intermediate Electronics Engineering'
        }
      },
      {
        _id: 'kit-002',
        title: '4WD Smart Obstacle Avoiding & Line Follower Robotic Car Kit with Bluetooth',
        sku: 'SKU-KIT-CAR-4WD-SMART',
        category: 'diy-kits',
        subcategory: 'Obstacle Avoiding & Line Follower Robot Cars',
        brand: 'Keyestudio',
        price: 2499,
        gstRate: 0.18,
        hsnCode: '95030090',
        stockOnHand: 65,
        stockReserved: 3,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Chassis': 'Dual-layer Laser-Cut Acrylic Platform with 4 TT Gear Motors',
          'Sensors': 'HC-SR04 Ultrasonic Distance Sensor + 3-Channel IR Line Tracker',
          'Control Modes': 'Autonomous Obstacle Avoidance, Line Tracking, Bluetooth Smartphone App',
          'Motor Driver': 'L298N Dual H-Bridge High-Power Motor Driver',
          'Power Source': 'Dual 18650 Battery Holder with On/Off Power Switch'
        }
      },
      {
        _id: 'kit-003',
        title: '37-in-1 Sensor Modules Experimenter Kit for Arduino & Raspberry Pi',
        sku: 'SKU-KIT-SNS-37IN1',
        category: 'diy-kits',
        subcategory: 'STEM Sensor & Electronics Learning Bundles',
        brand: 'Elegoo',
        price: 1349,
        gstRate: 0.18,
        hsnCode: '90318000',
        stockOnHand: 140,
        stockReserved: 6,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Module Count': '37 Pre-assembled Sensor Breakouts (Flame, Sound, Temp, Hall, Tilt, etc.)',
          'Compatibility': 'Arduino, Raspberry Pi, ESP32, STM32, micro:bit',
          'Pinout': 'Standard 2.54mm pitch headers with clear silk-screen labeling',
          'Packaging': 'Deluxe plastic component organizer box with sensor pinout chart'
        }
      },
      {
        _id: 'kit-004',
        title: '4-DOF Acrylic Desktop Robotic Arm Kit with SG90 Servos & Joystick Controller',
        sku: 'SKU-KIT-ROBO-ARM-4DOF',
        category: 'diy-kits',
        subcategory: 'Robotic Arm & Gripper Mechanical Kits',
        brand: 'SunFounder',
        price: 1599,
        gstRate: 0.18,
        hsnCode: '84798999',
        stockOnHand: 55,
        stockReserved: 2,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Degrees of Freedom': '4-DOF (Base Rotation, Shoulder, Elbow, Gripper Claw)',
          'Actuation': '4x TowerPro SG90 9g Precision Servo Motors',
          'Control Interface': 'Dual 2-Axis Analog Joystick Potentiometer Module',
          'Material': 'Precision CNC Laser-Cut High-Strength Acrylic Structure',
          'Payload Capacity': 'Up to 60g object gripping and pick-and-place'
        }
      },
      {
        _id: 'kit-005',
        title: 'IoT Smart Agricultural Weather Station Kit with ESP32 & Soil Moisture Sensor',
        sku: 'SKU-KIT-IOT-AGRI-ESP32',
        category: 'diy-kits',
        subcategory: 'IoT Smart Home & Agriculture Automation Kits',
        brand: 'VoltCart MakerLab',
        price: 2199,
        gstRate: 0.18,
        hsnCode: '90258000',
        stockOnHand: 40,
        stockReserved: 1,
        rating: 5.0,
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Main Brain': 'ESP32 Wi-Fi / BLE IoT Development Board',
          'Sensing Suite': 'Capacitive Corrosion-Resistant Soil Moisture, DHT22, BH1750 Light Sensor',
          'Cloud Dashboard': 'Pre-configured Blynk, ThingsBoard & Adafruit IO templates',
          'Actuation': 'Submersible 5V Mini Water Pump with Relay and Silicon Hose',
          'Enclosure': 'IP65 Weather-Resistant Clear Electronics Project Box'
        }
      },
      {
        _id: 'kit-006',
        title: 'DIY DIYables Soldering Practice Kit with Multi-Pattern LED Flasher Circuit',
        sku: 'SKU-KIT-SLD-PRACTICE',
        category: 'diy-kits',
        subcategory: 'Soldering Practice & Electronic Experimenter Boards',
        brand: 'DIYables',
        price: 249,
        gstRate: 0.18,
        hsnCode: '85340000',
        stockOnHand: 210,
        stockReserved: 8,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
        specs: {
          'PCB Quality': 'FR-4 High-Grade Double-Sided Fiber Glass with HASL Lead-Free Finish',
          'Components Included': 'Through-hole & 0805 SMD resistors, capacitors, LEDs, CD4017 IC',
          'Circuit Outcome': 'Rotating Chaser LED light with adjustable speed potentiometer',
          'Operating Voltage': '3V - 5V DC (Coin cell battery holder included)'
        }
      }
    ]
  },

  'ev-parts': {
    id: 'ev-parts',
    title: 'Electric Vehicle Parts & Powertrain',
    tagline: 'High-Torque BLDC Hub Motors, Sine-Wave FOC Controllers, EV Throttles & Smart BMS',
    icon: Car,
    color: '#84CC16',
    description: 'Industrial-grade electrification components for electric bicycles, e-rickshaws, custom go-karts, AGVs (Automated Guided Vehicles), and solar-powered electric vehicles. Featuring high-efficiency brushless hub and mid-drive motors, programmable Field Oriented Control (FOC) controllers, regenerative braking systems, and EV battery protection.',
    subcategories: [
      'BLDC Hub Motors (250W - 3000W)',
      'Mid-Drive Electric Motors & Gearboxes',
      'Programmable Sine Wave & Square Wave Controllers',
      'EV Throttles, Twist Grips & Thumb Levers',
      'High-Voltage Smart BMS for EV (36V - 72V)',
      'DC-DC Step-Down Converters (48V/60V/72V to 12V)',
      'Regenerative Electronic Brake Levers & Cutoffs',
      'High-Current Anderson / XT90 Connectors & Wiring Harnesses'
    ],
    brands: ['QS Motor', 'Kelly Controller', 'DALY BMS', 'Sabvoton', 'Golden Motor', 'Macfos EV'],
    guide: {
      title: 'Electric Powertrain Torque & Battery Sizing Calculation',
      text: 'To calculate vehicle top speed and gradeability, evaluate: Power (Watts) = Torque (N.m) × Angular Velocity (rad/s). For standard 48V e-bike conversions, pair a 750W-1000W BLDC hub motor with a 30A-35A sine-wave controller and a 48V 20Ah Lithium pack capable of delivering 40A continuous discharge without voltage sag.'
    },
    products: [
      {
        _id: 'ev-001',
        title: '48V 1000W High-Torque Rear Wheel BLDC Hub Motor for E-Bike / E-Scooter',
        sku: 'SKU-EV-HUB-1000W-48V',
        category: 'ev-parts',
        subcategory: 'BLDC Hub Motors (250W - 3000W)',
        brand: 'QS Motor',
        price: 8499,
        gstRate: 0.18,
        hsnCode: '85013119',
        stockOnHand: 22,
        stockReserved: 1,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Rated Power': '1000 Watts Continuous (Peak 1500W)',
          'Nominal Voltage': '48V DC',
          'Max Speed': '45 - 50 km/h on 26" bicycle wheel rim',
          'Torque': '55 N.m Max Torque Output (High hill climb gradeability)',
          'Brake Type': 'Standard 6-Bolt Disc Brake & V-Brake Compatible'
        }
      },
      {
        _id: 'ev-002',
        title: '48V - 72V 45A Intelligent Programmable Sine Wave Controller with Regenerative Braking',
        sku: 'SKU-EV-CTRL-SINE-45A',
        category: 'ev-parts',
        subcategory: 'Programmable Sine Wave & Square Wave Controllers',
        brand: 'Kelly Controller',
        price: 4899,
        gstRate: 0.18,
        hsnCode: '85371000',
        stockOnHand: 30,
        stockReserved: 2,
        rating: 5.0,
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Operating Voltage Range': '36V - 72V DC (Surge up to 90V)',
          'Peak Phase Current': '120 Amps (45A Continuous)',
          'Motor Control Algorithm': 'Field Oriented Control (FOC) Sine Wave (Whisper Quiet)',
          'Regenerative Braking': 'Variable electronic regen recharges battery on deceleration',
          'Programming Interface': 'Bluetooth / PC USB parameter tuning (throttle curves, speed limits)'
        }
      },
      {
        _id: 'ev-003',
        title: 'DALY 16S 48V 60A Smart Bluetooth BMS with Active Cell Balancer for Li-Ion',
        sku: 'SKU-EV-BMS-DALY-16S',
        category: 'ev-parts',
        subcategory: 'High-Voltage Smart BMS for EV (36V - 72V)',
        brand: 'DALY BMS',
        price: 3799,
        gstRate: 0.18,
        hsnCode: '85371000',
        stockOnHand: 40,
        stockReserved: 2,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Battery Chemistry': '16S Li-Ion (67.2V Full Charge) or 16S LiFePO4 (58.4V)',
          'Continuous Discharge': '60 Amps (Peak 180A overcurrent cutoff)',
          'Communication': 'Onboard Bluetooth + UART / RS485 for real-time app telemetry',
          'Active Balancing': 'Active balance leads prevent cell drift across deep charge cycles',
          'Enclosure': 'IP67 Waterproof Sealed Anodized Aluminum Heatsink'
        }
      },
      {
        _id: 'ev-004',
        title: 'Universal Hall Effect Twist Grip Throttle with LED Battery Voltage Meter & Key Lock',
        sku: 'SKU-EV-THROT-KEY-LOCK',
        category: 'ev-parts',
        subcategory: 'EV Throttles, Twist Grips & Thumb Levers',
        brand: 'Macfos EV',
        price: 699,
        gstRate: 0.18,
        hsnCode: '85389000',
        stockOnHand: 110,
        stockReserved: 4,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Signal Output': 'Hall Effect 0.8V to 4.2V linear control',
          'Digital Voltmeter': 'Bright 3-digit Blue LED display indicates true pack voltage',
          'Security Feature': 'Dual physical key lock switch for master vehicle ignition',
          'Handlebar Fit': 'Universal 22mm (7/8 inch) standard diameter',
          'Cable Length': '1.8 meters with waterproof 6-pin connector'
        }
      },
      {
        _id: 'ev-005',
        title: '48V/60V/72V to 12V 10A 120W Waterproof Isolated DC-DC Step Down Converter',
        sku: 'SKU-EV-DCDC-72-12V',
        category: 'ev-parts',
        subcategory: 'DC-DC Step-Down Converters (48V/60V/72V to 12V)',
        brand: 'Golden Motor',
        price: 799,
        gstRate: 0.18,
        hsnCode: '85044090',
        stockOnHand: 75,
        stockReserved: 3,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Input Voltage Range': '36V - 85V DC Wide Input',
          'Output Voltage': '12.0V DC Regulated',
          'Output Current': '10 Amps Continuous (120 Watts Power for Headlights/Horn/GPS)',
          'Conversion Efficiency': '≥ 93%',
          'Protection': 'Overcurrent, Short-circuit, Thermal Overload, Reverse Polarity'
        }
      },
      {
        _id: 'ev-006',
        title: 'Heavy-Duty Anderson SB50 50A Quick Disconnect Battery Connector Pair',
        sku: 'SKU-EV-CONN-AND-SB50',
        category: 'ev-parts',
        subcategory: 'High-Current Anderson / XT90 Connectors & Wiring Harnesses',
        brand: 'Macfos EV',
        price: 249,
        gstRate: 0.18,
        hsnCode: '85366990',
        stockOnHand: 230,
        stockReserved: 10,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Rated Current': '50 Amps Continuous (600V Max)',
          'Contact Material': 'Silver-Plated Pure Copper Contacts for minimal resistance',
          'Wire Gauge': 'Accommodates 6, 8, 10, 12 AWG high-flex silicone wire',
          'Genderless Design': 'Plugs into itself mechanically (foolproof keying prevents reverse polarity)'
        }
      }
    ]
  },

  'tools': {
    id: 'tools',
    title: 'Tools & Testing Instruments',
    tagline: 'Digital Multimeters, Soldering Stations, Oscilloscopes & Precision Hand Tools',
    icon: Wrench,
    color: '#64748B',
    description: 'Equip your hardware testing lab with professional benchtop and field instrumentation. Certified digital true-RMS multimeters, digital storage oscilloscopes, temperature-controlled ESD soldering stations, desoldering pumps, wire strippers, and PCB inspection microscopes.',
    subcategories: [
      'Digital Multimeters & Clamp Meters',
      'Soldering Stations & Hot Air Rework Tools',
      'Digital Storage Oscilloscopes (DSO) & Logic Analyzers',
      'Precision Wire Strippers, Cutters & Crimpers',
      'Adjustable DC Bench Power Supplies',
      'PCB Inspection Digital Microscopes',
      'ESD Anti-Static Mats & Wrist Straps',
      'Breadboard Jumper Wires & Test Leads'
    ],
    brands: ['Aneng', 'Uni-T', 'Quick', 'Hakko', 'FNIRSI', 'Proskit', 'Sanwa'],
    guide: {
      title: 'Essential Lab Equipment & ESD Safety Standards',
      text: 'When probing sensitive CMOS logic and high-frequency digital buses (I2C/SPI), always ground yourself with an ESD wrist strap to eliminate static discharges. Use a True-RMS digital multimeter with CAT III 600V safety certification when measuring AC mains or high-voltage battery banks.'
    },
    products: [
      {
        _id: 'tls-001',
        title: 'UNI-T UT61E+ True RMS 22,000 Counts Precision Digital Multimeter',
        sku: 'SKU-TLS-UNIT-UT61E',
        category: 'tools',
        subcategory: 'Digital Multimeters & Clamp Meters',
        brand: 'Uni-T',
        price: 6499,
        gstRate: 0.18,
        hsnCode: '90303100',
        stockOnHand: 25,
        stockReserved: 1,
        rating: 5.0,
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Display Count': '22,000 Counts with High-Speed Analog Bar Graph',
          'AC Frequency Response': '45 Hz to 10 kHz True-RMS bandwidth',
          'Safety Rating': 'CAT III 1000V / CAT IV 600V Industrial certified',
          'Special Functions': 'USB PC Interface for continuous data logging, hFE transistor test'
        }
      },
      {
        _id: 'tls-002',
        title: 'FNIRSI 1014D Dual Channel 100MHz Digital Storage Oscilloscope + DDS Generator',
        sku: 'SKU-TLS-FNIRSI-1014D',
        category: 'tools',
        subcategory: 'Digital Storage Oscilloscopes (DSO) & Logic Analyzers',
        brand: 'FNIRSI',
        price: 15999,
        gstRate: 0.18,
        hsnCode: '90302000',
        stockOnHand: 14,
        stockReserved: 1,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Analog Bandwidth': '100 MHz x 2 Channels',
          'Sampling Rate': '1 GSa/s real-time sampling rate',
          'Display': '7-inch 800x480 High-Resolution Color TFT LCD',
          'DDS Signal Generator': '14 standard waveforms output up to 2.5 MHz',
          'Storage Depth': '240 Kbit memory with USB screenshot export'
        }
      },
      {
        _id: 'tls-003',
        title: 'Quick 936A ESD Safe 60W Temperature Controlled Soldering Station',
        sku: 'SKU-TLS-QUICK-936A',
        category: 'tools',
        subcategory: 'Soldering Stations & Hot Air Rework Tools',
        brand: 'Quick',
        price: 2799,
        gstRate: 0.18,
        hsnCode: '85151100',
        stockOnHand: 42,
        stockReserved: 2,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Heating Power': '60 Watts ceramic heating element',
          'Temperature Range': '200°C to 480°C with calibrated front dial',
          'ESD Protection': 'ESD safe design protects sensitive SMD chips',
          'Tip Compatibility': 'Uses standard 900M series replacement soldering tips'
        }
      },
      {
        _id: 'tls-004',
        title: 'Precision Automatic Self-Adjusting Wire Stripper & Crimper (0.2 - 6.0mm²)',
        sku: 'SKU-TLS-WIRE-STRIPPER',
        category: 'tools',
        subcategory: 'Precision Wire Strippers, Cutters & Crimpers',
        brand: 'Proskit',
        price: 499,
        gstRate: 0.18,
        hsnCode: '82032000',
        stockOnHand: 130,
        stockReserved: 5,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
        specs: {
          'Stripping Capacity': '24 to 10 AWG (0.2 to 6.0 mm² solid & stranded)',
          'Crimping Function': 'Crimps insulated & non-insulated terminals 22-10 AWG',
          'Mechanism': 'Alloy steel jaws self-adjust to wire diameter without damaging copper strands'
        }
      }
    ]
  }
};

export const ALL_CATALOG_PRODUCTS = Object.values(CATEGORIES_METADATA).flatMap(cat => cat.products || []);
