import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setComparisonModalOpen, removeCompareItem, clearComparison } from '../redux/slices/comparisonSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { Trash2, Plus, SlidersHorizontal } from 'lucide-react';

export default function ComparisonModal() {
  const dispatch = useDispatch();
  const { items, isOpen } = useSelector((state) => state.comparison);

  if (!isOpen) return null;

  // Aggregate all unique specification keys across items
  const allSpecKeys = new Set();
  items.forEach(item => {
    const specsObj = item.specs instanceof Map ? Object.fromEntries(item.specs) : (item.specs || {});
    Object.keys(specsObj).forEach(k => allSpecKeys.add(k));
  });

  return (
    <div className="modal-overlay" onClick={() => dispatch(setComparisonModalOpen(false))}>
      <div className="modal-content" style={{ maxWidth: '960px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={() => dispatch(setComparisonModalOpen(false))}>✕</button>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <SlidersHorizontal size={20} color="var(--primary)" /> Component Technical Comparison (MOD-05)
            </h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Compare processor architectures, memory capacities, clock speeds, and hardware pinouts side-by-side.
            </p>
          </div>

          {items.length > 0 && (
            <button className="btn btn-outline btn-sm" onClick={() => dispatch(clearComparison())}>
              <Trash2 size={14} /> Clear All
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
            <p>No components selected for comparison.</p>
            <p style={{ fontSize: '0.82rem', marginTop: '0.5rem' }}>
              Click the compare icon (<SlidersHorizontal size={12} />) on any product card in the catalog to add it here.
            </p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="specs-table" style={{ width: '100%', minWidth: '650px' }}>
              <thead>
                <tr>
                  <th style={{ width: '180px' }}>Parameter</th>
                  {items.map(item => (
                    <th key={item._id} style={{ minWidth: '170px', verticalAlign: 'top', textAlign: 'center' }}>
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        style={{ width: '55px', height: '55px', objectFit: 'cover', borderRadius: '6px', marginBottom: '0.4rem' }} 
                      />
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.2rem' }}>
                        {item.title}
                      </div>
                      <div className="mono" style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '0.88rem' }}>
                        ₹{item.price}
                      </div>
                      <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.4rem', justifyContent: 'center' }}>
                        <button 
                          className="btn btn-primary btn-sm" 
                          onClick={() => dispatch(addToCart({ product: item, quantity: 1 }))}
                        >
                          <Plus size={12} /> Cart
                        </button>
                        <button 
                          className="btn btn-outline btn-sm" 
                          onClick={() => dispatch(removeCompareItem(item._id))}
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th style={{ color: 'var(--primary)', fontWeight: 700 }}>SKU Code</th>
                  {items.map(item => (
                    <td key={item._id} className="mono" style={{ textAlign: 'center' }}>{item.sku}</td>
                  ))}
                </tr>
                <tr>
                  <th style={{ color: 'var(--primary)', fontWeight: 700 }}>Brand</th>
                  {items.map(item => (
                    <td key={item._id} style={{ textAlign: 'center' }}>{item.brand}</td>
                  ))}
                </tr>
                <tr>
                  <th style={{ color: 'var(--primary)', fontWeight: 700 }}>Stock Availability</th>
                  {items.map(item => {
                    const avail = item.stockOnHand - (item.stockReserved || 0);
                    return (
                      <td key={item._id} style={{ textAlign: 'center' }}>
                        <span className={`badge ${avail > 0 ? 'badge-success' : 'badge-danger'}`}>
                          {avail > 0 ? `${avail} units` : 'Out of stock'}
                        </span>
                      </td>
                    );
                  })}
                </tr>
                {Array.from(allSpecKeys).map(specKey => (
                  <tr key={specKey}>
                    <th style={{ color: 'var(--text-muted)' }}>{specKey}</th>
                    {items.map(item => {
                      const specsObj = item.specs instanceof Map ? Object.fromEntries(item.specs) : (item.specs || {});
                      return (
                        <td key={item._id} style={{ textAlign: 'center' }}>
                          {specsObj[specKey] || '-'}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
