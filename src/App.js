import { useEffect, useState } from 'react';
import './App.css';
import { products } from './data/products';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';

const readRoute = () => window.location.hash.slice(1) || '/';
function App() {
  const [route, setRoute] = useState(readRoute);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onHash = () => setRoute(readRoute());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  useEffect(() => {
    const id = route.split('?')[0];
    if (id === '/nosotros' || id === '/contacto') {
      requestAnimationFrame(() => document.getElementById(id.slice(1))?.scrollIntoView({ behavior: 'smooth' }));
    } else window.scrollTo(0, 0);
  }, [route]);
  const path = route.split('?')[0];
  const selected = path.startsWith('/producto/') ? products.find((product) => product.id === path.split('/')[2]) : null;
  useEffect(() => {
    document.title = selected ? `${selected.name} | ADDY SHOP` : path === '/catalogo' ? 'Catálogo | ADDY SHOP' : 'ADDY SHOP | Bolsas y accesorios para tu estilo';
  }, [path, selected]);
  useEffect(() => {
    if (!searchOpen) return;
    const onKey = (event) => { if (event.key === 'Escape') setSearchOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [searchOpen]);

  return <>
    <Header onSearch={() => setSearchOpen(true)} />
    {path === '/catalogo' ? <Catalog route={route} />
      : selected ? <ProductDetail product={selected} />
      : path.startsWith('/producto/') ? <main className="not-found container"><h1>Producto no encontrado</h1><p>Este artículo ya no está en el catálogo.</p><a className="button button-dark" href="#/catalogo">Volver al catálogo</a></main>
      : path === '/ropa' || path === '/termos' ? <main className="coming-page"><div className="container coming-inner"><span className="eyebrow">ADDY SHOP / Próximamente</span><h1>{path === '/ropa' ? 'Ropa' : 'Termos'} para acompañar tu estilo.</h1><p>Estamos preparando esta categoría. Mientras tanto, descubre nuestra selección actual de bolsas y accesorios.</p><a className="button button-dark" href="#/catalogo">Explorar catálogo</a></div></main>
      : <Home />}
    <Footer />
    {searchOpen && <div className="search-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setSearchOpen(false); }}>
      <form className="search-panel" onSubmit={(event) => {
        event.preventDefault();
        const value = new FormData(event.currentTarget).get('search').trim();
        window.location.hash = `#/catalogo${value ? `?q=${encodeURIComponent(value)}` : ''}`;
        setSearchOpen(false);
      }}>
        <div className="search-panel-top"><label htmlFor="global-search">Buscar en ADDY SHOP</label><button type="button" className="icon-button" onClick={() => setSearchOpen(false)} aria-label="Cerrar búsqueda">×</button></div>
        <div className="search-panel-field"><input id="global-search" name="search" autoFocus placeholder="¿Qué estás buscando?" /><button className="button button-dark" type="submit">Buscar</button></div>
        <p>Explora bolsas, carteras y accesorios disponibles para consulta.</p>
      </form>
    </div>}
  </>;
}

export default App;
