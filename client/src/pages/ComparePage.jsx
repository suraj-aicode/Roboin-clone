import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeCompareItem, clearComparison } from '../redux/slices/comparisonSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { 
  SlidersHorizontal, 
  Trash2, 
  ShoppingCart, 
  ArrowLeft, 
  Home, 
  ChevronRight, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';

export default function ComparePage() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.comparison);

  // Extract all unique spec keys across all compared items
  const allSpecKeys = Array.from(
    new Set(
      items.flatMap(p => {
        if (!p.specs) return [];
        return p.specs instanceof Map ? Array.from(p.specs.keys()) : Object.keys(p.specs);
      })
    )
  );

  return (
    <main style={{ flex: 1, backgroundColor: 'var(--robu-bg-body)', paddingBottom: '60px' }}>
      {/* Breadcrumb */}
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--robu-border)', padding: '10px 0' }}>
        <div className="robu-container" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--robu-text-muted)' }}>
          <Link to="/" style={{ color: 'var(--robu-text-body)', textDecoration: 'none' }}>Home</Link>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--robu-primary-orange)', fontWeight: 600 }}>Product Comparison Matrix</span>
        </div>
      </div>

      <div className="robu-container" style={{ marginTop: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--robu-text-heading)', margin: 0 }}>
              Technical Specification Comparison
            </h1>
            <p style={{ fontSize: '13.5px', color: 'var(--robu-text-muted)', margin: '4px 0 0' }}>
              Compare hardware parameters, pinouts, processor architectures, and voltages across components.
            </p>
          </div>

          {items.length > 0 && (
            <button 
              onClick={() => dispatch(clearComparison())}
              style={{
                background: 'none',
                border: 'none',
                color: '#DC2626',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 600
              }}
            >
              Clear Comparison
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid var(--robu-border)',
            padding: '60px 24px',
            textAlign: 'center',
            boxShadow: 'var(--robu-shadow-sm)'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#EEF2FF',
              color: 'var(--robu-purple)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <SlidersHorizontal size={32} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--robu-text-heading)', margin: '0 0 6px' }}>
              No components selected for comparison
            </h3>
            <p style={{ color: 'var(--robu-text-muted)', fontSize: '14px', margin: '0 0 20px' }}>
              Click the "Compare" icon on any product card in the catalog to evaluate specs side-by-side.
            </p>
            <Link to="/" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'var(--robu-primary-orange)',
              color: '#FFFFFF',
              padding: '10px 20px',
              borderRadius: '8px',
              fontWeight: 700,
              textDecoration: 'none',
              fontSize: '13.5px'
            }}>
              <ArrowLeft size={16} />
              <span>Browse Catalog</span>
            </Link>
          </div>
        ) : (
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid var(--robu-border)',
            boxShadow: 'var(--robu-shadow-sm)',
            overflowX: 'auto'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
              <thead>
                <tr>
                  <th style={{ width: '220px', padding: '20px', textAlign: 'left', backgroundColor: '#F8FAFC', borderBottom: '1px solid var(--robu-border)', fontSize: '13px', color: 'var(--robu-text-muted)' }}>
                    Specification Parameter
                  </th>
                  {items.map(p => (
                    <th key={p._id} style={{ padding: '20px', textAlign: 'center', backgroundColor: '#F8FAFC', borderBottom: '1px solid var(--robu-border)', borderLeft: '1px solid var(--robu-border)' }}>
                      <div style={{ position: 'relative', paddingBottom: '10px' }}>
                        <button 
                          onClick={() => dispatch(removeCompareItem(p._id))}
                          style={{ position: 'absolute', top: '-10px', right: '-10px', background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
                        >
                          <Trash2 size={15} />
                        </button>
                        <img 
                          src={p.image || '/assets/images/arduino_uno_r4.jpg'} 
                          alt={p.title} 
                          style={{ width: '80px', height: '80px', objectFit: 'contain', margin: '0 auto 8px' }}
                        />
                        <div style={{ fontSize: '11px', color: 'var(--robu-text-muted)', fontWeight: 700 }}>{p.brand}</div>
                        <Link to={`/product/${p._id}`} style={{ textDecoration: 'none', color: 'var(--robu-text-heading)', fontSize: '13px', fontWeight: 700, display: 'block', margin: '4px 0 8px' }}>
                          {p.title}
                        </Link>
                        <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--robu-primary-orange)' }}>
                          ₹{p.price.toLocaleString('en-IN')}
                        </div>
                        <button 
                          onClick={() => dispatch(addToCart({ product: p, quantity: 1 }))}
                          style={{
                            marginTop: '10px',
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
                          Add to Cart
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '14px 20px', fontWeight: 700, fontSize: '13px', color: 'var(--robu-text-dark)', borderBottom: '1px solid var(--robu-border-light)' }}>
                    SKU Code
                  </td>
                  {items.map(p => (
                    <td key={p._id} style={{ padding: '14px 20px', textAlign: 'center', fontSize: '13px', borderBottom: '1px solid var(--robu-border-light)', borderLeft: '1px solid var(--robu-border)' }}>
                      {p.sku}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td style={{ padding: '14px 20px', fontWeight: 700, fontSize: '13px', color: 'var(--robu-text-dark)', borderBottom: '1px solid var(--robu-border-light)' }}>
                    Stock Availability
                  </td>
                  {items.map(p => {
                    const avail = p.stockOnHand - (p.stockReserved || 0);
                    return (
                      <td key={p._id} style={{ padding: '14px 20px', textAlign: 'center', fontSize: '13px', borderBottom: '1px solid var(--robu-border-light)', borderLeft: '1px solid var(--robu-border)' }}>
                        {avail > 0 ? (
                          <span style={{ color: '#059669', fontWeight: 700 }}>In Stock ({avail} units)</span>
                        ) : (
                          <span style={{ color: '#DC2626', fontWeight: 700 }}>Out of Stock</span>
                        )}
                      </td>
                    );
                  })}
                </tr>

                {allSpecKeys.map(specKey => (
                  <tr key={specKey}>
                    <td style={{ padding: '14px 20px', fontWeight: 600, fontSize: '13px', color: 'var(--robu-text-body)', borderBottom: '1px solid var(--robu-border-light)', backgroundColor: '#FAFAFA' }}>
                      {specKey}
                    </td>
                    {items.map(p => {
                      const val = p.specs?.[specKey] || (p.specs instanceof Map ? p.specs.get(specKey) : null);
                      return (
                        <td key={p._id} style={{ padding: '14px 20px', textAlign: 'center', fontSize: '13px', color: 'var(--robu-text-dark)', borderBottom: '1px solid var(--robu-border-light)', borderLeft: '1px solid var(--robu-border)' }}>
                          {val ? String(val) : '—'}
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
    </main>
  );
}
