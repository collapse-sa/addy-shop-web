import { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import { SearchIcon } from './Icons';

const links = [
  ['Inicio','#/'],['Catálogo','#/catalogo'],['Bolsas','#/catalogo?categoria=Bolsas'],
  ['Accesorios','#/catalogo?categoria=Accesorios'],['Nosotros','#/nosotros'],['Contacto','#/contacto']
];

export default function Header({ onSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleLogoClick = (event) => {
    setMenuOpen(false);
    if ((window.location.hash.slice(1).split('?')[0] || '/') === '/') {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener('hashchange', close);
    return () => window.removeEventListener('hashchange', close);
  }, []);
  return <>
    <div className="announcement">Detalles para acompañar tu estilo <span>·</span> Consultas por WhatsApp</div>
    <header className="site-header">
      <div className="header-inner container">
        <button className="mobile-menu icon-button" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span/><span/><span/></button>
        <a className="brand" href="#/" aria-label="ADDY SHOP, inicio" onClick={handleLogoClick}><img src={logo} alt="ADDY SHOP" /></a>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Navegación principal">{links.map(([name, href]) => <a href={href} key={name} onClick={() => setMenuOpen(false)}>{name}</a>)}</nav>
        <div className="header-actions">
          <button className="icon-button" onClick={onSearch} aria-label="Buscar productos"><SearchIcon /></button>
        </div>
      </div>
    </header>
    {menuOpen && <button className="menu-scrim" aria-label="Cerrar menú" onClick={() => setMenuOpen(false)} />}
  </>;
}
