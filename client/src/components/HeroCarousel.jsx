import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Zap, Award, Sparkles } from 'lucide-react';

const HERO_SLIDES = [
  {
    id: 1,
    tag: 'NEW LAUNCH 2026',
    title: 'Raspberry Pi 5 - 8GB Single Board Computer',
    subtitle: 'Broadcom BCM2712 Quad-core ARM Cortex-A76 @ 2.4GHz with PCIe 2.0 & Dual 4Kp60 HDR Displays',
    badge: 'Official Distributor Stock',
    price: '₹7,999',
    buttonText: 'Order Raspberry Pi 5',
    targetUrl: '/product/prod-002',
    bgGradient: 'linear-gradient(135deg, #1E1B4B 0%, #3B0187 60%, #4C1D95 100%)',
    accentColor: '#EF4123',
    image: '/assets/images/raspberry_pi_5.jpg',
    specs: ['8GB LPDDR4X', 'PCIe 2.0 NVMe', 'Dual 4K Micro-HDMI']
  },
  {
    id: 2,
    tag: 'OFFICIAL ARDUINO BOARD',
    title: 'Arduino UNO R4 WiFi & Minima Edition',
    subtitle: 'Renesas RA4M1 32-bit ARM Cortex-M4 MCU with ESP32-S3 Cloud Connectivity & Built-in 12x8 LED Matrix',
    badge: '100% Genuine Arduino',
    price: '₹2,499',
    buttonText: 'Buy Arduino UNO R4',
    targetUrl: '/product/prod-001',
    bgGradient: 'linear-gradient(135deg, #0F172A 0%, #0369A1 50%, #0284C7 100%)',
    accentColor: '#F59E0B',
    image: '/assets/images/arduino_uno_r4.jpg',
    specs: ['ARM Cortex-M4', 'Wi-Fi & BLE 5.0', '12x8 LED Matrix']
  },
  {
    id: 3,
    tag: 'PROTOTYPING & PRODUCTION',
    title: 'Custom Battery Packs & On-Demand PCB Prototyping',
    subtitle: 'Industrial grade spot-welded Lithium-ion battery packs with smart BMS & rapid Turnkey PCB fabrication',
    badge: 'Same Day Dispatch',
    price: 'Custom Quotation',
    buttonText: 'Calculate Custom Quote',
    targetUrl: '/b2b-quote',
    bgGradient: 'linear-gradient(135deg, #18181B 0%, #1F2937 50%, #EF4123 100%)',
    accentColor: '#10B981',
    image: '/assets/images/esp32_dev_board.jpg',
    specs: ['Smart BMS Integrated', 'High Discharge 18650/21700', 'IPC Class 2 Testing']
  }
];

import { Cpu, Printer, Scissors, BatteryCharging } from 'lucide-react';

const QUICK_SERVICES = [
  {
    id: 'pcb',
    title: 'PCB Manufacturing',
    subtitle: 'High Precision Quick-Turn',
    icon: Cpu,
    color: '#10B981',
    link: '/b2b-quote'
  },
  {
    id: '3d-printing',
    title: '3D Printing Service',
    subtitle: 'FDM, SLA & Industrial SLS',
    icon: Printer,
    color: '#3B82F6',
    link: '/b2b-quote'
  },
  {
    id: 'laser-cutting',
    title: 'Laser Cutting',
    subtitle: 'Custom Acrylic & Sheet Metal',
    icon: Scissors,
    color: '#F59E0B',
    link: '/b2b-quote'
  },
  {
    id: 'battery-pack',
    title: 'Custom Battery Pack',
    subtitle: 'Lithium-ion & BMS Packs',
    icon: BatteryCharging,
    color: '#EF4444',
    link: '/b2b-quote'
  }
];

export default function HeroCarousel() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const totalSlides = HERO_SLIDES.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 4800);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, currentSlide]);

  return (
    <div 
      className="robu-container"
      style={{ marginTop: '16px', marginBottom: '24px' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: '270px 1fr',
        gap: '16px',
        alignItems: 'stretch'
      }}>
        {/* Left Column: Robu 4 Stacked Quick Service Cards */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          {QUICK_SERVICES.map((srv) => {
            const SrvIcon = srv.icon;
            return (
              <div
                key={srv.id}
                onClick={() => navigate(srv.link)}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--robu-border-card)',
                  borderRadius: '8px',
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  flex: 1,
                  transition: 'all 0.2s ease',
                  boxShadow: 'var(--robu-shadow-sm)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--robu-primary-purple)';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(56, 6, 128, 0.1)';
                  e.currentTarget.style.transform = 'translateX(3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--robu-border-card)';
                  e.currentTarget.style.boxShadow = 'var(--robu-shadow-sm)';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--robu-purple-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--robu-primary-purple)'
                  }}>
                    <SrvIcon size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--robu-text-dark)', lineHeight: 1.2 }}>
                      {srv.title}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--robu-text-muted)', marginTop: '2px' }}>
                      {srv.subtitle}
                    </div>
                  </div>
                </div>

                <div style={{
                  fontSize: '11.5px',
                  fontWeight: 700,
                  color: 'var(--robu-primary-purple)',
                  whiteSpace: 'nowrap'
                }}>
                  Order ›
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Promotional Hero Carousel */}
        <div style={{
          position: 'relative',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: 'var(--robu-shadow-sm)',
          border: '1px solid var(--robu-border-card)',
          backgroundColor: '#1E1B4B'
        }}>
          {/* Sliding Track for Smooth Slide Transition */}
          <div style={{
            display: 'flex',
            width: `${totalSlides * 100}%`,
            transform: `translateX(-${(currentSlide * 100) / totalSlides}%)`,
            transition: 'transform 0.55s cubic-bezier(0.25, 1, 0.5, 1)'
          }}>
          {HERO_SLIDES.map((slide) => (
            <div
              key={slide.id}
              style={{
                width: `${100 / totalSlides}%`,
                background: slide.bgGradient,
                padding: '44px 56px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: '#FFFFFF',
                minHeight: '340px',
                boxSizing: 'border-box',
                position: 'relative'
              }}
            >
              {/* Text & Campaign Content */}
              <div style={{ maxWidth: '640px', zIndex: 2 }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(8px)',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.8px',
                  marginBottom: '14px',
                  color: '#FFFFFF'
                }}>
                  <Sparkles size={14} color={slide.accentColor} />
                  <span>{slide.tag}</span>
                </div>

                <h2 style={{
                  fontSize: '32px',
                  lineHeight: '1.2',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  marginBottom: '12px',
                  fontFamily: 'var(--font-robu-heading)'
                }}>
                  {slide.title}
                </h2>

                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.5',
                  color: 'rgba(255, 255, 255, 0.85)',
                  marginBottom: '20px',
                  maxWidth: '560px'
                }}>
                  {slide.subtitle}
                </p>

                {/* Specs Pill row */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
                  {slide.specs.map(spec => (
                    <span 
                      key={spec}
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.12)',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 600,
                        border: '1px solid rgba(255, 255, 255, 0.2)'
                      }}
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* CTA & Price Row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <button
                    onClick={() => slide.targetUrl && navigate(slide.targetUrl)}
                    style={{
                      background: 'linear-gradient(135deg, #EF4123 0%, #F97316 100%)',
                      color: '#FFFFFF',
                      padding: '12px 28px',
                      borderRadius: '10px',
                      fontSize: '15px',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 4px 18px rgba(239, 65, 35, 0.45)',
                      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 22px rgba(239, 65, 35, 0.6)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 18px rgba(239, 65, 35, 0.45)';
                    }}
                  >
                    <span>{slide.buttonText}</span>
                    <ArrowRight size={16} />
                  </button>

                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>Starting from</span>
                    <span style={{ fontSize: '22px', fontWeight: 800, color: '#FFFFFF' }}>{slide.price}</span>
                  </div>
                </div>
              </div>

              {/* Right Hero Visual Card */}
              <div 
                style={{
                  position: 'relative',
                  zIndex: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                onClick={() => slide.targetUrl && navigate(slide.targetUrl)}
              >
                <div style={{
                  width: '260px',
                  height: '260px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <img 
                    src={slide.image} 
                    alt={slide.title}
                    style={{
                      maxHeight: '100%',
                      maxWidth: '100%',
                      objectFit: 'contain',
                      transition: 'transform 0.4s ease'
                    }}
                    onError={(e) => { e.currentTarget.src = '/assets/images/raspberry_pi_5.jpg'; }}
                  />
                </div>

                <div style={{
                  position: 'absolute',
                  bottom: '-10px',
                  right: '-10px',
                  backgroundColor: 'var(--robu-primary-orange)',
                  color: '#FFFFFF',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: 800,
                  boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                }}>
                  {slide.badge}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Left Arrow Navigation Button */}
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          style={{
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            color: 'var(--robu-text-heading)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            zIndex: 10,
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.85)'}
        >
          <ChevronLeft size={22} />
        </button>

        {/* Right Arrow Navigation Button */}
        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          style={{
            position: 'absolute',
            right: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            color: 'var(--robu-text-heading)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            zIndex: 10,
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.85)'}
        >
          <ChevronRight size={22} />
        </button>

        {/* Dot Indicators */}
        <div style={{
          position: 'absolute',
          bottom: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '8px',
          zIndex: 10
        }}>
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              style={{
                width: currentSlide === idx ? '26px' : '8px',
                height: '8px',
                borderRadius: '4px',
                backgroundColor: currentSlide === idx ? 'var(--robu-primary-purple)' : 'rgba(255, 255, 255, 0.5)',
                transition: 'all 0.3s ease',
                border: 'none',
                cursor: 'pointer'
              }}
            />
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
