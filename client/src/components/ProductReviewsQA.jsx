import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addReview, addQA } from '../redux/slices/communitySlice';
import { Star, MessageSquare, CheckCircle, HelpCircle, Send } from 'lucide-react';

export default function ProductReviewsQA({ product }) {
  const dispatch = useDispatch();
  const { reviews, qas } = useSelector((state) => state.community);
  const { user } = useSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState('reviews'); // 'reviews' or 'qa'

  // Review form state
  const [rating, setRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [hardwareSetup, setHardwareSetup] = useState('');

  // QA form state
  const [questionText, setQuestionText] = useState('');

  const productReviews = reviews.filter(r => r.sku === product.sku);
  const productQAs = qas.filter(q => q.sku === product.sku);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewTitle || !reviewComment) return;

    dispatch(addReview({
      _id: `rev-${Date.now()}`,
      sku: product.sku,
      authorName: user?.name || 'Verified Maker',
      rating,
      title: reviewTitle,
      comment: reviewComment,
      hardwareSetup: hardwareSetup || 'Tested in laboratory',
      isVerifiedPurchase: true,
      createdAt: new Date().toISOString()
    }));

    setReviewTitle('');
    setReviewComment('');
    setHardwareSetup('');
  };

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    if (!questionText) return;

    dispatch(addQA({
      _id: `qa-${Date.now()}`,
      sku: product.sku,
      question: questionText,
      askedBy: user?.name || 'Maker Engineer',
      answer: 'Our senior robotics hardware engineer will verify the datasheet specifications and reply to your question within 4 hours.',
      answeredBy: 'VoltCart Technical Support',
      createdAt: new Date().toISOString()
    }));

    setQuestionText('');
  };

  return (
    <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
        <button 
          className={`btn btn-sm ${activeTab === 'reviews' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveTab('reviews')}
        >
          <Star size={14} /> Customer Reviews ({productReviews.length})
        </button>
        <button 
          className={`btn btn-sm ${activeTab === 'qa' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveTab('qa')}
        >
          <HelpCircle size={14} /> Community Hardware Q&A ({productQAs.length})
        </button>
      </div>

      {/* Reviews Tab */}
      {activeTab === 'reviews' && (
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
            {productReviews.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No reviews yet. Be the first maker to review this hardware!</p>
            ) : (
              productReviews.map(r => (
                <div key={r._id} style={{ background: 'var(--bg-input)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <div style={{ display: 'flex', color: '#FBBF24' }}>
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={13} fill={i < r.rating ? '#FBBF24' : 'none'} />
                        ))}
                      </div>
                      <strong style={{ fontSize: '0.85rem' }}>{r.title}</strong>
                    </div>
                    {r.isVerifiedPurchase && (
                      <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>
                        <CheckCircle size={10} /> Verified Purchase
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-main)', marginBottom: '0.4rem', lineHeight: 1.5 }}>
                    {r.comment}
                  </p>
                  {r.hardwareSetup && (
                    <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--primary)' }}>
                      Setup: {r.hardwareSetup}
                    </div>
                  )}
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '0.3rem' }}>
                    By {r.authorName} • {new Date(r.createdAt || Date.now()).toLocaleDateString('en-IN')}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Write a Review Form */}
          <form onSubmit={handleReviewSubmit} style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
            <h5 style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.65rem' }}>Write a Component Review</h5>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.65rem', alignItems: 'center' }}>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Rating:</label>
              <select className="form-control" style={{ width: '130px', padding: '0.3rem 0.5rem' }} value={rating} onChange={(e) => setRating(parseInt(e.target.value))}>
                <option value={5}>⭐⭐⭐⭐⭐ (5/5)</option>
                <option value={4}>⭐⭐⭐⭐ (4/5)</option>
                <option value={3}>⭐⭐⭐ (3/5)</option>
                <option value={2}>⭐⭐ (2/5)</option>
                <option value={1}>⭐ (1/5)</option>
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Review Headline (e.g. Excellent PWM stability)" 
                required 
                value={reviewTitle} 
                onChange={(e) => setReviewTitle(e.target.value)} 
              />
              <textarea 
                className="form-control" 
                rows="2" 
                placeholder="Technical feedback (operating temperatures, ease of integration, IDE support)..." 
                required 
                value={reviewComment} 
                onChange={(e) => setReviewComment(e.target.value)} 
              />
              <input 
                type="text" 
                className="form-control" 
                placeholder="Test Environment (e.g. Arduino IDE 2.3 + PlatformIO)" 
                value={hardwareSetup} 
                onChange={(e) => setHardwareSetup(e.target.value)} 
              />
              <button type="submit" className="btn btn-primary btn-sm" style={{ alignSelf: 'flex-start', marginTop: '0.4rem' }}>
                <Send size={13} /> Submit Review
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Q&A Tab */}
      {activeTab === 'qa' && (
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
            {productQAs.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No questions asked yet. Ask a pinout or electrical question!</p>
            ) : (
              productQAs.map(q => (
                <div key={q._id} style={{ background: 'var(--bg-input)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                    <strong style={{ color: 'var(--primary)', fontSize: '0.85rem' }}>Q:</strong>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{q.question}</div>
                  </div>
                  {q.answer && (
                    <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'flex-start', background: 'rgba(6, 182, 212, 0.05)', padding: '0.5rem', borderRadius: '4px', borderLeft: '2px solid var(--primary)' }}>
                      <strong style={{ color: 'var(--success)', fontSize: '0.82rem' }}>A:</strong>
                      <div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-main)' }}>{q.answer}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>Answered by {q.answeredBy}</div>
                      </div>
                    </div>
                  )}
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '0.3rem' }}>
                    Asked by {q.askedBy}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Ask a Question Form */}
          <form onSubmit={handleQuestionSubmit} style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
            <h5 style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.5rem' }}>Ask a Technical / Pinout Question</h5>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input 
                type="text" 
                className="form-control" 
                placeholder="e.g. Can this board handle 5V logic on digital pins without level shifters?" 
                required 
                value={questionText} 
                onChange={(e) => setQuestionText(e.target.value)} 
              />
              <button type="submit" className="btn btn-primary btn-sm" style={{ whiteSpace: 'nowrap' }}>
                <Send size={13} /> Ask Question
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
