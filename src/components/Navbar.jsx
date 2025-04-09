"use client";

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import './Navbar.css';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <span className="logo-icon">📊</span>
          <h1>PROJE YÖNETİMİ</h1>
        </div>
        
        <div className="nav-links">
          <NavLink href="/" label="Projeler" active={pathname === '/'} />
          <NavLink href="/gorevler" label="Görevler" active={pathname === '/gorevler'} />
          <NavLink href="/zaman-takibi" label="Zaman Takibi" active={pathname === '/zaman-takibi'} />
        </div>
        
        <div className="buttons">
          <button className="lang-button">
            TR
          </button>
          <button className="settings-button">
            <span>⚙️</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ href, label, active }) => {
  return (
    <Link href={href}>
      <span className={`nav-link ${active ? 'active' : ''}`}>
        {label}
      </span>
    </Link>
  );
};

export default Navbar; 