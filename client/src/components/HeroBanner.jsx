import React from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedProduct } from '../redux/slices/productSlice';
import { setComparisonModalOpen } from '../redux/slices/comparisonSlice';
import { Cpu, ArrowRight } from 'lucide-react';

export default function HeroBanner({ featuredProduct }) {
  const dispatch = useDispatch();

  return (
    <section className="hero-banner">
      <div>
        <div className="hero-tag">FEATURED COMPONENT SPOTLIGHT</div>
        <h1 className="hero-title">Arduino R4 WiFi & Raspberry Pi 5 Next-Gen Boards</h1>
        <p className="hero-desc">
          Build high-performance robotics, IoT nodes, and AI vision systems with server-authoritative inventory, 32-bit ARM Cortex processors, and verified technical datasheets.
        </p>
        <div className="hero-actions">
          {featuredProduct && (
            <button 
              className="btn btn-primary"
              onClick={() => dispatch(setSelectedProduct(featuredProduct))}
            >
              Inspect Technical Specs <ArrowRight size={15} />
            </button>
          )}
          <button 
            className="btn btn-outline"
            onClick={() => dispatch(setComparisonModalOpen(true))}
          >
            Compare Microcontrollers
          </button>
        </div>
      </div>
      <div className="hero-img-box">
        <img 
          src="/assets/images/arduino_uno_r4.jpg" 
          alt="Arduino Uno R4 WiFi" 
          className="hero-img"
        />
      </div>
    </section>
  );
}
