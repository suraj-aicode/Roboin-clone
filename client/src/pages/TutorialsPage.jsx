import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../redux/slices/cartSlice';
import { BookOpen, Code2, Cpu, ArrowRight, Eye, Tag, CheckCircle2, Home, ChevronRight, Layers } from 'lucide-react';
import { API_URL } from '../config/api';

const DEFAULT_ARTICLES = [
  {
    _id: 'art-01',
    title: 'Building an Autonomous SLAM Robot with ROS2 & Raspberry Pi 5',
    category: 'Robotics & Autonomous Systems',
    author: 'VoltCart Research Lab',
    readTime: '12 min',
    summary: 'A complete end-to-end engineering guide to configuring LiDAR SLAM, Cartographer node, and nav2 navigation stack on Ubuntu Server 24.04.',
    content: `
### 1. Architectural Overview
This guide uses the Raspberry Pi 5 (8GB) connected over UART to an RPLiDAR A1M8 360-degree laser scanner. Differential drive control is handled via an Arduino Uno R4 running a PID speed controller over I2C.

### 2. Required Hardware (Bill of Materials)
- Raspberry Pi 5 (8GB RAM)
- RPLiDAR A1M8 360-degree Laser Range Scanner
- Dual H-Bridge Motor Driver (L298N / TB6612FNG)
- 12V 3000mAh High-Discharge LiPo Battery
- 100 RPM High-Torque Metal Gear DC Motors with Optical Encoders

### 3. Step-by-Step Implementation
1. Install ROS 2 Jazzy Jalisco on Ubuntu Server 24.04 64-bit.
2. Clone the RPLiDAR ROS2 driver node and configure baud rate to 115200.
3. Launch Cartographer SLAM node with occupancy grid mapping.
4. Tune costmaps and TEB local planner for obstacle avoidance.
    `,
    bom: [
      { _id: 'prod-002', title: 'Raspberry Pi 5 - 8GB RAM Single Board Computer', price: 7999, sku: 'SKU-RPI-5-8GB' },
      { _id: 'prod-001', title: 'Arduino Uno R4 WiFi Microcontroller Board', price: 2499, sku: 'SKU-ARD-R4-WIFI' }
    ]
  },
  {
    _id: 'art-02',
    title: 'ESP32-S3 IoT Industrial Edge Sensor with MQTT & TLS 1.3',
    category: 'Embedded Firmware & RTOS',
    author: 'Embedded Systems Team',
    readTime: '8 min',
    summary: 'Deploying low-power deep sleep sensor telemetry to AWS IoT Core using FreeRTOS event groups and hardware cryptographic acceleration.',
    content: `
### 1. Hardware Architecture
The ESP32-S3 features dual Xtensa LX7 cores running at 240MHz with vector instructions for edge computing. In this project, core 0 manages WiFi stack and TLS socket communication while core 1 samples sensor arrays at 100Hz.

### 2. Firmware Implementation
Using ESP-IDF v5.2, we configure power management with automatic light sleep. Flash encryption and secure boot v2 are enabled to protect credentials.
    `,
    bom: [
      { _id: 'prod-003', title: 'ESP32-WROOM-32D Development Board', price: 449, sku: 'SKU-ESP32-DEV-WROOM' }
    ]
  },
  {
    _id: 'art-03',
    title: 'LiPo Battery Safety & Power Management for Drone Applications',
    category: 'Hardware Benchmarks',
    author: 'Drone Tech Cell',
    readTime: '10 min',
    summary: 'Understanding C-ratings, internal resistance, balance charging, and low-voltage cutoff circuits to prevent thermal runaway in UAV applications.',
    content: `
### Key Battery Metrics for High-Current Drones
Calculating continuous current draw:
Max Continuous Discharge Amps = (Capacity in mAh / 1000) * Continuous C-Rating.
For a 2200mAh 45C pack, maximum sustained draw is 99 Amperes. Ensure wiring harness and XT60 connectors are rated accordingly.
    `,
    bom: []
  }
];

export default function TutorialsPage() {
  const dispatch = useDispatch();
  const [articles, setArticles] = useState(DEFAULT_ARTICLES);
  const [selectedArticle, setSelectedArticle] = useState(DEFAULT_ARTICLES[0]);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    fetch(`${API_URL}/api/articles`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.length > 0) {
          setArticles(data.data);
          setSelectedArticle(data.data[0]);
        }
      })
      .catch(err => console.warn('Using local tutorials baseline', err));
  }, []);

  const categories = ['All', 'Robotics & Autonomous Systems', 'Embedded Firmware & RTOS', 'Hardware Benchmarks'];

  const filteredArticles = activeFilter === 'All' 
    ? articles 
    : articles.filter(a => a.category === activeFilter);

  return (
    <main style={{ flex: 1, backgroundColor: 'var(--robu-bg-body)', paddingBottom: '60px' }}>
      {/* Breadcrumb */}
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--robu-border)', padding: '10px 0' }}>
        <div className="robu-container" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--robu-text-muted)' }}>
          <Link to="/" style={{ color: 'var(--robu-text-body)', textDecoration: 'none' }}>Home</Link>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--robu-primary-orange)', fontWeight: 600 }}>Robotics Tutorials & DIY Lab</span>
        </div>
      </div>

      <div className="robu-container" style={{ marginTop: '24px' }}>
        <div style={{ marginBottom: '20px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--robu-text-heading)', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <BookOpen size={24} color="var(--robu-primary-orange)" />
            <span>Robotics & Embedded Systems Engineering Lab</span>
          </h1>
          <p style={{ fontSize: '13.5px', color: 'var(--robu-text-muted)', margin: '4px 0 0' }}>
            In-depth hardware build guides, ROS2 architectures, schematics, and 1-click project parts kits.
          </p>
        </div>

        {/* Categories Pills */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: `1px solid ${activeFilter === cat ? 'var(--robu-primary-orange)' : 'var(--robu-border)'}`,
                backgroundColor: activeFilter === cat ? 'var(--robu-primary-orange)' : '#FFFFFF',
                color: activeFilter === cat ? '#FFFFFF' : 'var(--robu-text-body)',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 2-Column Reader Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '360px 1fr',
          gap: '24px',
          alignItems: 'start'
        }}>
          {/* Left: Article Directory */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredArticles.map(article => {
              const isSelected = selectedArticle?._id === article._id;
              return (
                <div 
                  key={article._id}
                  onClick={() => setSelectedArticle(article)}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    border: `2px solid ${isSelected ? 'var(--robu-primary-orange)' : 'var(--robu-border)'}`,
                    padding: '16px',
                    cursor: 'pointer',
                    boxShadow: isSelected ? '0 4px 12px rgba(255, 107, 0, 0.15)' : 'var(--robu-shadow-sm)',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--robu-purple)', textTransform: 'uppercase', marginBottom: '4px' }}>
                    {article.category}
                  </div>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--robu-text-heading)', margin: '0 0 6px', lineHeight: '1.4' }}>
                    {article.title}
                  </h3>
                  <p style={{ fontSize: '12px', color: 'var(--robu-text-muted)', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {article.summary}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--robu-text-muted)', marginTop: '10px' }}>
                    <span>By {article.author}</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Article Full Reading View */}
          {selectedArticle ? (
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid var(--robu-border)',
              padding: '32px',
              boxShadow: 'var(--robu-shadow-sm)'
            }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--robu-primary-orange)', textTransform: 'uppercase', marginBottom: '8px' }}>
                {selectedArticle.category}
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--robu-text-heading)', margin: '0 0 12px', lineHeight: '1.3' }}>
                {selectedArticle.title}
              </h2>
              <div style={{ display: 'flex', gap: '16px', fontSize: '12.5px', color: 'var(--robu-text-muted)', borderBottom: '1px solid var(--robu-border)', paddingBottom: '16px', marginBottom: '20px' }}>
                <span>Author: <strong>{selectedArticle.author}</strong></span>
                <span>Estimated Read Time: <strong>{selectedArticle.readTime}</strong></span>
              </div>

              {/* Bill of Materials (BOM) Box */}
              {selectedArticle.bom && selectedArticle.bom.length > 0 && (
                <div style={{
                  backgroundColor: '#F8FAFC',
                  borderRadius: '12px',
                  border: '1px solid var(--robu-border)',
                  padding: '20px',
                  marginBottom: '24px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--robu-text-heading)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Cpu size={16} color="var(--robu-primary-orange)" />
                      <span>Project Bill of Materials (BOM)</span>
                    </h4>
                    <button 
                      onClick={() => {
                        selectedArticle.bom.forEach(item => {
                          dispatch(addToCart({ product: item, quantity: 1 }));
                        });
                        alert('All project components added to your cart!');
                      }}
                      style={{
                        backgroundColor: 'var(--robu-primary-orange)',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '6px 12px',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Add Entire Kit to Cart
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {selectedArticle.bom.map(item => (
                      <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', backgroundColor: '#FFFFFF', padding: '8px 12px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                        <span>{item.title}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <strong style={{ color: 'var(--robu-primary-orange)' }}>₹{item.price}</strong>
                          <button 
                            onClick={() => dispatch(addToCart({ product: item, quantity: 1 }))}
                            style={{ background: 'none', border: 'none', color: 'var(--robu-purple)', fontWeight: 600, fontSize: '12px', cursor: 'pointer' }}
                          >
                            + Add
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Body Content */}
              <div style={{ fontSize: '14.5px', lineHeight: '1.8', color: 'var(--robu-text-body)', whiteSpace: 'pre-line' }}>
                {selectedArticle.content}
              </div>
            </div>
          ) : (
            <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid var(--robu-border)' }}>
              Select a tutorial on the left to start learning.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
