// Comprehensive data and technical catalog for Robu.in 7 core categories
import { 
  Compass, 
  BatteryCharging, 
  Printer, 
  Radio, 
  Zap, 
  Bot, 
  Tv 
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
    description: 'Robu.in provides industry-trusted power solutions for mobile robots, drones, EV powertrains, and lab benches. Browse our certified lithium-ion cells, multi-cell high-discharge LiPo packs, smart battery balance chargers, and heavy-duty Mean Well switching power supplies.',
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
    description: 'Transform your CAD designs into physical reality with Robu.in 3D printing ecosystem. Authorized distributor for Bambu Lab, Creality, and eSUN. Browse high-speed CoreXY 3D printers, all-metal hotends, hardened steel nozzles, PEI textured beds, and premium engineering filaments.',
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
    description: 'Interface your microcontroller with the physical world. Robu.in provides India’s largest inventory of analog and I2C/SPI digital sensors: ultrasonic distance finders, 6-axis and 9-axis motion IMUs, medical heart rate monitors, MQ-series gas sensors, and industrial load cells.',
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
  }
};
