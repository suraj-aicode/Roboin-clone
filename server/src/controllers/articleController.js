const Article = require('../models/Article');
const AuditLog = require('../models/AuditLog');

// Initial seed articles if database is empty
const INITIAL_ARTICLES = [
  {
    title: 'Building an Autonomous ROS2 Rover with Raspberry Pi 5 & LiDAR',
    slug: 'autonomous-ros2-rover-raspberry-pi-5',
    author: 'Dr. Anita Nair (VoltCart Robotics Fellow)',
    category: 'Robotics & Autonomous Systems',
    readTime: '12 min read',
    coverImage: 'assets/images/raspberry_pi_5.jpg',
    summary: 'A complete end-to-end blueprint for constructing a differential-drive robot running ROS2 Jazzy Jalisco on Raspberry Pi 5 with real-time SLAM navigation.',
    content: `### Architecture Overview
Raspberry Pi 5’s Broadcom BCM2712 processor provides the computational throughput necessary to execute simultaneous SLAM mapping, particle filtering, and lidar point-cloud processing without dedicated external accelerator cards.

### Hardware BOM (Bill of Materials)
1. **Raspberry Pi 5 (8GB RAM)** (SKU-RPI-5-8GB)
2. **L298N Dual H-Bridge Motor Driver** (SKU-DRV-L298N)
3. **HC-SR04 Ultrasonic Distance Sensor** (SKU-SNS-HC-SR04)
4. **18650 3.7V 2600mAh Li-Ion Pack (2S2P configuration)** (SKU-BAT-18650-2600)

### Power Distribution Schematic
Connect the 7.4V battery pack directly to the L298N motor driver VIN terminals. Use a 5V/5A buck converter to supply clean power to the Raspberry Pi 5 USB-C header. Ensure ground planes are shared between the logic and motor rails to prevent ground loop noise.`,
    tags: ['ROS2', 'Raspberry Pi 5', 'SLAM', 'Autonomous Rover'],
    compatibleSkus: ['SKU-RPI-5-8GB', 'SKU-DRV-L298N', 'SKU-SNS-HC-SR04'],
    status: 'Published',
    views: 485
  },
  {
    title: 'Interfacing ESP32-WROOM with FreeRTOS & MQTT for Industrial Telemetry',
    slug: 'esp32-freertos-mqtt-industrial-telemetry',
    author: 'Vikram Joshi (IoT Firmware Specialist)',
    category: 'Embedded Firmware & RTOS',
    readTime: '9 min read',
    coverImage: 'assets/images/esp32_dev_board.jpg',
    summary: 'Learn how to partition sensor acquisition and TLS network publishing into deterministic FreeRTOS tasks on dual-core ESP32 microcontrollers.',
    content: `### Why FreeRTOS on ESP32?
The ESP32 features two Xtensa LX6 cores: Core 0 handles the Wi-Fi and Bluetooth protocol stack (PRO_CPU), while Core 1 executes your application logic (APP_CPU).

### Task Allocation Pattern
- **Task 1 (Priority 2, Core 1)**: Polls ADC and I2C sensors at deterministic 50ms intervals.
- **Task 2 (Priority 1, Core 0)**: Drains the ring buffer and transmits JSON telemetry packets over secure MQTTS (Port 8883) with TLS mutual authentication.`,
    tags: ['ESP32', 'FreeRTOS', 'MQTT', 'Industrial IoT'],
    compatibleSkus: ['SKU-ESP32-WROOM-32U', 'SKU-SNS-HC-SR04'],
    status: 'Published',
    views: 340
  },
  {
    title: 'Arduino Uno R4 WiFi vs ESP32: Processing Speed & Pinout Benchmarks',
    slug: 'arduino-uno-r4-wifi-vs-esp32-benchmark',
    author: 'VoltCart Research Team',
    category: 'Hardware Benchmarks',
    readTime: '7 min read',
    coverImage: 'assets/images/arduino_uno_r4.jpg',
    summary: 'An empirical comparison of floating-point computation, PWM frequency limits, and power consumption between Renesas RA4M1 and Espressif Xtensa LX6.',
    content: `### Test Methodology
Both boards were evaluated using synthetic FFT math benchmarks and real-world 16-channel PWM servo timing jitter analysis.

### Benchmark Results
- **Arduino Uno R4 WiFi**: 48 MHz ARM Cortex-M4 with 14-bit ADC and native 5V logic compatibility. Ideal for direct sensor interfacing without level shifting.
- **ESP32-WROOM**: 240 MHz dual-core with faster Wi-Fi throughput, but requires 3.3V logic translation for 5V industrial peripherals.`,
    tags: ['Arduino R4', 'ESP32', 'Benchmarks', 'Comparison'],
    compatibleSkus: ['SKU-ARD-R4-WIFI', 'SKU-ESP32-WROOM-32U'],
    status: 'Published',
    views: 612
  }
];

// @desc Get all articles
exports.getArticles = async (req, res) => {
  try {
    let articles = await Article.find().sort({ createdAt: -1 });
    if (articles.length === 0) {
      articles = await Article.insertMany(INITIAL_ARTICLES);
    }
    res.status(200).json({ success: true, count: articles.length, data: articles });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get single article by slug
exports.getArticleBySlug = async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }
    article.views += 1;
    await article.save();
    res.status(200).json({ success: true, data: article });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Create new article (CMS admin)
exports.createArticle = async (req, res) => {
  try {
    const { title, author, category, readTime, coverImage, summary, content, tags, compatibleSkus } = req.body;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const article = await Article.create({
      title,
      slug,
      author: author || 'VoltCart Staff Engineer',
      category: category || 'Robotics & Autonomous Systems',
      readTime: readTime || '10 min read',
      coverImage: coverImage || 'assets/images/arduino_uno_r4.jpg',
      summary,
      content,
      tags: tags || [],
      compatibleSkus: compatibleSkus || [],
      status: 'Published'
    });

    await AuditLog.create({
      logId: `LOG-${Date.now().toString().slice(-6)}`,
      actor: req.user ? req.user.name : 'Content Editor',
      role: 'catalog_manager',
      action: 'PUBLISH_ARTICLE',
      entity: article.slug,
      details: `Published tutorial article: ${article.title}`
    });

    res.status(201).json({ success: true, data: article });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
