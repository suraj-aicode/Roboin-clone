import React from 'react';
import { BookOpen, Calendar, Clock, ChevronRight, ArrowRight } from 'lucide-react';

const BLOG_POSTS = [
  {
    id: 'blog-1',
    title: 'Arduino Physical AI Challenge India 2026: Competition Rules & Starter Kits',
    snippet: 'Discover the latest edge AI microcontrollers, sensor kits, and how students across India are building smart autonomous machines.',
    date: 'Oct 04, 2026',
    readTime: '5 min read',
    tag: 'Artificial Intelligence',
    tagColor: 'var(--robu-primary-orange)',
    gradient: 'linear-gradient(135deg, #1E1B4B 0%, #4338CA 100%)'
  },
  {
    id: 'blog-2',
    title: 'Raspberry Pi 5 vs Arduino Uno R4: In-Depth Hardware & Performance Benchmark',
    snippet: 'Comparing processing throughput, PCIe storage speeds, Wi-Fi connectivity, and power draw across robotics use cases.',
    date: 'Sep 28, 2026',
    readTime: '7 min read',
    tag: 'Dev Boards',
    tagColor: '#0284C7',
    gradient: 'linear-gradient(135deg, #0F172A 0%, #0369A1 100%)'
  },
  {
    id: 'blog-3',
    title: 'The Ultimate Guide to LiPo Batteries: C-Rating, Cell Balancing & Safe Charging',
    snippet: 'Essential safety rules every drone pilot and EV enthusiast must follow to prevent thermal runaway and extend battery cycle life.',
    date: 'Sep 19, 2026',
    readTime: '6 min read',
    tag: 'Power & Batteries',
    tagColor: '#10B981',
    gradient: 'linear-gradient(135deg, #18181B 0%, #D97706 100%)'
  },
  {
    id: 'blog-4',
    title: 'Silent Stepper Drivers Compared: A4988 vs DRV8825 vs Trinamic TMC2209',
    snippet: 'Why StealthChop technology in TMC2209 transforms noisy 3D printer and CNC stepper motors into whisper-quiet precision movements.',
    date: 'Sep 12, 2026',
    readTime: '8 min read',
    tag: '3D Printing & CNC',
    tagColor: '#8B5CF6',
    gradient: 'linear-gradient(135deg, #3B0187 0%, #6D28D9 100%)'
  }
];

export default function BlogSection() {
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
          <span>Latest Engineering Blogs & Guides</span>
        </h2>
        <a href="#blogs" className="robu-btn-purple-outline">
          <span>View All Articles</span>
          <ChevronRight size={15} />
        </a>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px'
      }}>
        {BLOG_POSTS.map((post) => (
          <article
            key={post.id}
            className="robu-card-lift"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid var(--robu-border)',
              overflow: 'hidden',
              boxShadow: 'var(--robu-shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer'
            }}
          >
            {/* Header Art / Simulated Photo */}
            <div style={{
              height: '150px',
              background: post.gradient,
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative'
            }}>
              <div>
                <span style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.25)',
                  backdropFilter: 'blur(6px)',
                  color: '#FFFFFF',
                  padding: '3px 10px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: 700
                }}>
                  {post.tag}
                </span>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '11px',
                color: 'rgba(255, 255, 255, 0.85)'
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={12} />
                  {post.date}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={12} />
                  {post.readTime}
                </span>
              </div>
            </div>

            {/* Post Content */}
            <div style={{
              padding: '18px',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <h3 style={{
                  fontSize: '15.5px',
                  fontWeight: 700,
                  color: 'var(--robu-text-heading)',
                  lineHeight: '1.35',
                  marginBottom: '8px'
                }}>
                  {post.title}
                </h3>
                <p style={{
                  fontSize: '13px',
                  color: 'var(--robu-text-muted)',
                  lineHeight: '1.45',
                  marginBottom: '16px'
                }}>
                  {post.snippet}
                </p>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13px',
                fontWeight: 700,
                color: 'var(--robu-purple)'
              }}>
                <span>Read Article</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
