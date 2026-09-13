import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setActiveCategory } from '../redux/slices/productSlice';
import CategoryPage from '../components/CategoryPage';
import { ChevronRight, Home } from 'lucide-react';

export default function CategoryPageWrapper() {
  const { slug } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (slug) {
      dispatch(setActiveCategory(slug));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [slug, dispatch]);

  return (
    <main style={{ flex: 1, backgroundColor: 'var(--robu-bg-body)', paddingBottom: '40px' }}>
      {/* Category Breadcrumb */}
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--robu-border)', padding: '10px 0' }}>
        <div className="robu-container" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--robu-text-muted)' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--robu-text-body)', textDecoration: 'none' }}>
            <Home size={14} />
            <span>Home</span>
          </Link>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--robu-primary-orange)', fontWeight: 600, textTransform: 'capitalize' }}>
            {slug ? slug.replace(/-/g, ' ') : 'Category'}
          </span>
        </div>
      </div>

      <CategoryPage categorySlug={slug || 'microcontrollers'} />
    </main>
  );
}
