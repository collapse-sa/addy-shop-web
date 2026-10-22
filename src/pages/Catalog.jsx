import { useMemo, useState } from 'react';
import { products } from '../data/products';
import ProductGrid from '../components/ProductGrid';

const categories = [...new Set(products.map((product) => product.category))];
const types = [...new Set(products.filter((product) => product.category === 'Bolsas').map((product) => product.subcategory))];
const normalize = (value) => value.toLocaleLowerCase('es-MX').normalize('NFD').replace(/[\u0300-\u036f]/g,'');

export default function Catalog({ route }) {
  const params = new URLSearchParams(route.split('?')[1] || '');
  const initialCategory = params.get('categoria') || '';
  const initialQuery = params.get('q') || '';
  const [category, setCategory] = useState(initialCategory);
  const [query, setQuery] = useState(initialQuery);
  const [type, setType] = useState('');
  const [sort, setSort] = useState('featured');
  const [lastRoute, setLastRoute] = useState(route);
  if (lastRoute !== route) { setLastRoute(route); setCategory(initialCategory); setQuery(initialQuery); setType(''); }
  const visible = useMemo(() => {
    const result = products.filter((product) => (!category || product.category === category) && (!type || product.subcategory === type) && (!query || normalize(product.name).includes(normalize(query))));
    if (sort === 'price-asc') result.sort((a,b) => a.price - b.price);
    if (sort === 'price-desc') result.sort((a,b) => b.price - a.price);
    if (sort === 'name') result.sort((a,b) => a.name.localeCompare(b.name,'es-MX'));
    return result;
  }, [category, query, type, sort]);
  const clear = () => { setCategory(''); setQuery(''); setType(''); setSort('featured'); window.location.hash = '#/catalogo'; };
  return <main className="catalog-page"><section className="catalog-intro"><div className="container"><span className="eyebrow">ADDY SHOP / Colección</span><h1>Piezas para cada momento.</h1><p>Explora la selección de bolsas, carteras y accesorios. Encuentra ese detalle que va contigo.</p></div></section>
    <div className="container catalog-layout"><aside className="catalog-sidebar"><span className="eyebrow">Filtrar colección</span><div className="filter-group"><h2>Categorías</h2><button className={!category ? 'filter-choice active' : 'filter-choice'} onClick={() => {setCategory('');setType('');}}>Todos <span>{products.length}</span></button>{categories.map((name) => <button key={name} className={category === name ? 'filter-choice active' : 'filter-choice'} onClick={() => {setCategory(name);setType('');}}>{name}<span>{products.filter((product) => product.category === name).length}</span></button>)}</div><div className="filter-group"><h2>Tipo de bolsa</h2>{types.map((name) => <button key={name} className={type === name ? 'filter-choice active' : 'filter-choice'} onClick={() => {setCategory('Bolsas');setType(type === name ? '' : name);}}>{name}<span>{products.filter((product) => product.subcategory === name).length}</span></button>)}</div><button className="text-button reset-button" onClick={clear}>Limpiar filtros</button></aside>
    <div className="catalog-content"><div className="catalog-controls"><div className="catalog-search"><label htmlFor="catalog-search">Buscar por nombre</label><input id="catalog-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Busca una pieza especial..." /></div><div className="catalog-selects"><label className="mobile-category">Categoría<select value={category} onChange={(event) => {setCategory(event.target.value);setType('');}}><option value="">Todas</option>{categories.map((name) => <option key={name} value={name}>{name}</option>)}</select></label><label>Tipo de bolsa<select value={type} onChange={(event) => {setType(event.target.value);if(event.target.value)setCategory('Bolsas');}}><option value="">Todos los tipos</option>{types.map((name) => <option key={name} value={name}>{name}</option>)}</select></label><label>Ordenar por<select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Selección original</option><option value="price-asc">Precio: menor a mayor</option><option value="price-desc">Precio: mayor a menor</option><option value="name">Nombre: A a Z</option></select></label></div></div><div className="results-row"><span>{visible.length} {visible.length === 1 ? 'producto' : 'productos'}</span><span>Precios provisionales en MXN</span></div>{visible.length ? <ProductGrid products={visible} /> : <div className="no-results"><h2>No encontramos coincidencias</h2><p>Prueba con otro término o elimina los filtros para ver toda la colección.</p><button className="button button-dark" onClick={clear}>Ver todos los productos</button></div>}</div></div>
  </main>;
}
