import React from 'react';
import TopUtilityBar from './TopUtilityBar';
import HeaderMain from './HeaderMain';
import StickyCategoryNav from './StickyCategoryNav';

export default function Navbar() {
  return (
    <div style={{ width: '100%' }}>
      {/* 1. Top Utility Bar */}
      <TopUtilityBar />

      {/* 2. Main Header (Logo, Dynamic Autocomplete Search, Actions Row) */}
      <HeaderMain />

      {/* 3. Sticky Mega Category Navigation */}
      <StickyCategoryNav />
    </div>
  );
}
