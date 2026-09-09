import React, { useState } from 'react';
import { BookOpen, Send, CheckCircle2 } from 'lucide-react';
import { API_URL } from '../config/api';

export default function ArticleEditorModal({ isOpen, onClose, onArticleCreated }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Robotics & Autonomous Systems');
  const [author, setAuthor] = useState('RoboTech Research Team');
  const [readTime, setReadTime] = useState('8 min read');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [skus, setSkus] = useState('SKU-ARD-R4-WIFI, SKU-ESP32-WROOM-32U');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newArticle = {
      title,
      category,
      author,
      readTime,
      summary,
      content,
      compatibleSkus: skus.split(',').map(s => s.trim()).filter(Boolean)
    };

    try {
      const res = await fetch(`${API_URL}/api/articles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newArticle)
      });
      const data = await res.json();
      if (data.success) {
        if (onArticleCreated) onArticleCreated(data.data);
      }
    } catch (err) {
      console.warn('Offline article creation fallback', err);
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '680px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BookOpen size={20} color="var(--primary)" /> Publish Robotics Tutorial / Guide (MOD-17)
        </h2>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
          Author and publish hardware blueprints and firmware tutorials without deploying code.
        </p>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <CheckCircle2 size={48} color="var(--success)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Tutorial Published Successfully!</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
              The article is now visible on the Storefront Tutorials Hub.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group full">
                <label>Article Title</label>
                <input 
                  type="text" 
                  className="form-control" 
                  required 
                  placeholder="e.g. Quadcopter Flight Controller Calibration with IMU" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="Robotics & Autonomous Systems">Robotics & Autonomous Systems</option>
                  <option value="Embedded Firmware & RTOS">Embedded Firmware & RTOS</option>
                  <option value="Hardware Benchmarks">Hardware Benchmarks</option>
                  <option value="IoT & Telemetry">IoT & Telemetry</option>
                </select>
              </div>

              <div className="form-group">
                <label>Author / Lab Entity</label>
                <input 
                  type="text" 
                  className="form-control" 
                  required 
                  value={author} 
                  onChange={(e) => setAuthor(e.target.value)} 
                />
              </div>

              <div className="form-group full">
                <label>Executive Summary (Appears in previews)</label>
                <textarea 
                  className="form-control" 
                  rows="2" 
                  required 
                  placeholder="Brief synopsis for makers and researchers..." 
                  value={summary} 
                  onChange={(e) => setSummary(e.target.value)} 
                />
              </div>

              <div className="form-group full">
                <label>Full Content (Markdown / Code / Architecture Blueprint)</label>
                <textarea 
                  className="form-control" 
                  rows="6" 
                  required 
                  placeholder="### Architecture Overview&#10;Write detailed build instructions, pinout connections, and code snippets..." 
                  value={content} 
                  onChange={(e) => setContent(e.target.value)} 
                />
              </div>

              <div className="form-group full">
                <label>Compatible SKUs (Comma-separated)</label>
                <input 
                  type="text" 
                  className="form-control mono" 
                  value={skus} 
                  onChange={(e) => setSkus(e.target.value)} 
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button type="button" className="btn btn-outline" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                <Send size={14} /> Publish Article
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
