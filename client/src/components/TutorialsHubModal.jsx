import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { BookOpen, Code2, Cpu, ArrowRight, Eye, Tag, CheckCircle2 } from 'lucide-react';
import { API_URL } from '../config/api';

export default function TutorialsHubModal({ isOpen, onClose }) {
  const dispatch = useDispatch();

  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    if (isOpen) {
      fetch(`${API_URL}/api/articles`)
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data) {
            setArticles(data.data);
            if (!selectedArticle && data.data.length > 0) {
              setSelectedArticle(data.data[0]);
            }
          }
        })
        .catch(err => console.warn('Could not load articles from server', err));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const categories = ['All', 'Robotics & Autonomous Systems', 'Embedded Firmware & RTOS', 'Hardware Benchmarks'];

  const filteredArticles = activeFilter === 'All' 
    ? articles 
    : articles.filter(a => a.category === activeFilter);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '960px', height: '85vh', display: 'flex', flexDirection: 'column' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BookOpen size={20} color="var(--primary)" /> Robotics Tutorials & Project Lab (MOD-17)
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Hardware build logs, ROS2 architectures, FreeRTOS benchmarks, and electrical schematics.
            </p>
          </div>
        </div>

        {/* Categories Bar */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
          {categories.map(cat => (
            <button 
              key={cat}
              className={`btn btn-sm ${activeFilter === cat ? 'btn-primary' : 'btn-outline'}`}
              style={{ fontSize: '0.75rem', padding: '0.3rem 0.7rem' }}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 2-Column Reader Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '1.5rem', flex: 1, overflow: 'hidden' }}>
          {/* Article List Column */}
          <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingRight: '0.5rem' }}>
            {filteredArticles.map(art => (
              <div 
                key={art._id || art.slug}
                onClick={() => setSelectedArticle(art)}
                style={{ 
                  background: selectedArticle?.slug === art.slug ? 'rgba(6, 182, 212, 0.12)' : 'var(--bg-input)',
                  border: selectedArticle?.slug === art.slug ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.85rem',
                  cursor: 'pointer',
                  transition: 'var(--transition)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-dim)', marginBottom: '0.3rem' }}>
                  <span>{art.readTime}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <Eye size={12} /> {art.views} reads
                  </span>
                </div>
                <h4 style={{ fontSize: '0.88rem', fontWeight: 700, lineHeight: 1.3, marginBottom: '0.4rem', color: 'var(--text-main)' }}>
                  {art.title}
                </h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {art.summary}
                </p>
              </div>
            ))}
          </div>

          {/* Active Article Full View Column */}
          <div style={{ overflowY: 'auto', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.5rem' }}>
            {selectedArticle ? (
              <div>
                <span className="badge badge-indigo" style={{ marginBottom: '0.6rem' }}>
                  {selectedArticle.category}
                </span>

                <h1 style={{ fontSize: '1.5rem', fontWeight: 800, lineHeight: 1.3, marginBottom: '0.5rem' }}>
                  {selectedArticle.title}
                </h1>

                <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '1.25rem' }}>
                  By <strong>{selectedArticle.author}</strong> • {selectedArticle.readTime}
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', borderLeft: '3px solid var(--primary)', padding: '0.85rem', borderRadius: '4px', marginBottom: '1.25rem', fontSize: '0.85rem', color: 'var(--text-main)', fontStyle: 'italic' }}>
                  "{selectedArticle.summary}"
                </div>

                <div style={{ fontSize: '0.85rem', lineHeight: 1.7, color: 'var(--text-main)', whiteSpace: 'pre-line' }}>
                  {selectedArticle.content}
                </div>

                {/* Compatible SKUs */}
                {selectedArticle.compatibleSkus?.length > 0 && (
                  <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Cpu size={14} /> Components Used in this Blueprint (BOM)
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {selectedArticle.compatibleSkus.map(sku => (
                        <span key={sku} className="mono" style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', color: 'var(--text-main)' }}>
                          {sku}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)' }}>Select an article to begin reading.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
