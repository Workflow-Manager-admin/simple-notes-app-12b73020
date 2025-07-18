import React from 'react';
import './MainLayout.css';

// PUBLIC_INTERFACE
function MainLayout({ left, right }) {
  /** 
   * Split pane: left (sidebar), right (editor/view).
   * @param {ReactNode} left - Component for left pane
   * @param {ReactNode} right - Component for right pane
   */
  return (
    <main className="main-layout">
      {left}
      <div className="main-layout-divider" />
      <div className="main-layout-right">{right}</div>
    </main>
  );
}

export default MainLayout;
