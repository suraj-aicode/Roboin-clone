import React from 'react';
import { useDispatch } from 'react-redux';
import { setTutorialsModalOpen } from '../redux/slices/communitySlice';
import { Play, ChevronRight, Video, Clock } from 'lucide-react';

const TUTORIAL_VIDEOS = [
  {
    id: 'vid-1',
    title: 'How to Connect ESP32 to Wi-Fi & MQTT Cloud in 2 Minutes',
    duration: '2:14',
    tag: 'ESP32 & IoT',
    views: '48K views',
    gradient: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)',
    badgeColor: '#EF4123'
  },
  {
    id: 'vid-2',
    title: 'Arduino UNO R4 WiFi 12x8 LED Matrix Custom Animation Guide',
    duration: '1:58',
    tag: 'Arduino UNO R4',
    views: '32K views',
    gradient: 'linear-gradient(135deg, #0F172A 0%, #0284C7 100%)',
    badgeColor: '#0284C7'
  },
  {
    id: 'vid-3',
    title: 'LiPo Battery Safety, C-Rating & Safe Charging Rules Explained',
    duration: '2:30',
    tag: 'Drone Power',
    views: '75K views',
    gradient: 'linear-gradient(135deg, #18181B 0%, #D97706 100%)',
    badgeColor: '#D97706'
  },
  {
    id: 'vid-4',
    title: 'Bambu Lab & Ender 3 Direct Drive Hotend Nozzle Swap Quick Setup',
    duration: '2:05',
    tag: '3D Printing Lab',
    views: '26K views',
    gradient: 'linear-gradient(135deg, #3B0187 0%, #7C3AED 100%)',
    badgeColor: '#7C3AED'
  }
];

export default function TutorialsSection() {
  const dispatch = useDispatch();

  return (
    <section className="robu-container robu-section">
      <div className="robu-section-header">
        <h2 className="robu-section-title">
          <span style={{
            display: 'inline-block',
            width: '6px',
            height: '24px',
            backgroundColor: 'var(--robu-primary-orange)',
            borderRadius: '3px',
            marginRight: '4px'
          }} />
          <span>Robu Two-Minute Tutorials</span>
        </h2>
        <button
          onClick={() => dispatch(setTutorialsModalOpen(true))}
          className="robu-btn-purple-outline"
        >
          <span>View All Videos</span>
          <ChevronRight size={15} />
        </button>
      </div>

      {/* Horizontally Scrollable 4-Card Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '20px'
      }}>
        {TUTORIAL_VIDEOS.map((video) => (
          <div
            key={video.id}
            onClick={() => dispatch(setTutorialsModalOpen(true))}
            className="robu-card-lift"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid var(--robu-border)',
              overflow: 'hidden',
              cursor: 'pointer',
              boxShadow: 'var(--robu-shadow-sm)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Video Thumbnail Header with Play Button Overlay */}
            <div style={{
              height: '160px',
              background: video.gradient,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}>
              {/* Circuit Pattern overlay effect */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '16px 16px',
                opacity: 0.7
              }} />

              {/* Red YouTube Play Button Overlay */}
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                backgroundColor: '#FF0000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                boxShadow: '0 6px 16px rgba(255, 0, 0, 0.4)',
                zIndex: 2,
                transition: 'transform 0.2s ease'
              }}>
                <Play size={24} fill="#FFFFFF" style={{ marginLeft: '3px' }} />
              </div>

              {/* Video Duration Badge */}
              <div style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                color: '#FFFFFF',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '11px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                zIndex: 2
              }}>
                <Clock size={11} />
                <span>{video.duration}</span>
              </div>

              {/* Category Pill Tag */}
              <div style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(6px)',
                color: '#FFFFFF',
                padding: '3px 10px',
                borderRadius: '12px',
                fontSize: '11px',
                fontWeight: 700,
                zIndex: 2
              }}>
                {video.tag}
              </div>
            </div>

            {/* Video Card Body */}
            <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{
                fontSize: '14.5px',
                fontWeight: 700,
                color: 'var(--robu-text-heading)',
                lineHeight: '1.4',
                marginBottom: '10px'
              }}>
                {video.title}
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '12px',
                color: 'var(--robu-text-muted)'
              }}>
                <span>VoltCart Tech Lab</span>
                <span>{video.views}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
