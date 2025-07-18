import React from 'react';
import './Header.css';

// PUBLIC_INTERFACE
function Header() {
  /** Header component displays the app title */
  return (
    <header className="notes-header">
      <h1 className="notes-app-title">Simple Notes</h1>
    </header>
  );
}

export default Header;
