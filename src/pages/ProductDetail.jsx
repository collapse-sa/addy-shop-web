import { useRef, useState } from 'react';
import { products } from '../data/products';
import { formatPrice, productMessage, whatsappUrl } from '../shop';
import ProductGrid from '../components/ProductGrid';
import ImageLightbox from '../components/ImageLightbox';
import { ArrowIcon } from '../components/Icons';

export default function ProductDetail({ product }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const imageButtonRef = useRef(null);
  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4);

  const closeLightbox = () => {
    setLightboxOpen(false);
    imageButtonRef.current?.focus();
  };

  return <main className="detail-page container">
    <nav className="breadcrumb" aria-label="Ruta de navegación"><a href="#/">Inicio</a><span>/</span><a href="#/catalogo">Catálogo</a><span>/</span><span>{product.name}</span></nav>
    <div className="detail-layout">
      <div className="detail-image">
        <button ref={imageButtonRef} className="detail-image-trigger" type="button" aria-label={`Ampliar fotografía de ${product.name}`} onClick={() => setLightboxOpen(true)}>
          <img src={product.image} alt={product.name} />
        </button>
        {product.label && <span className="product-badge">{product.label}</span>}
      </div>
      <div className="detail-info"><span className="eyebrow">ADDY SHOP / {product.category} / {product.subcategory}</span><h1>{product.name}</h1>{product.price != null && <><p className="detail-price">{formatPrice(product.price)}</p><p className="provisional-note">Precio de muestra en MXN</p></>}<div className="detail-divider"/><p className="detail-description">{product.description}</p><dl className="detail-facts"><div><dt>Color</dt><dd>{product.color}</dd></div><div><dt>Categoría</dt><dd>{product.category}</dd></div><div><dt>Disponibilidad</dt><dd>{product.availability}</dd></div></dl><div className="detail-divider"/><a className="button button-dark full-width" href={whatsappUrl(productMessage(product))} target="_blank" rel="noopener noreferrer">Consultar por WhatsApp <ArrowIcon /></a><p className="detail-help">Consulta directamente con ADDY SHOP la disponibilidad y el precio de esta pieza.</p></div>
    </div>
    {related.length > 0 && <section className="related-section"><div className="section-heading featured-heading"><div><span className="eyebrow">Sigue explorando</span><h2>También te puede gustar</h2></div><a className="text-link" href="#/catalogo">Ver catálogo <ArrowIcon /></a></div><ProductGrid products={related} /></section>}
    {lightboxOpen && <ImageLightbox images={[product.image]} alt={product.name} onClose={closeLightbox} />}
  </main>;
}
