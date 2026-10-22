import { formatPrice, productMessage, whatsappUrl } from '../shop';
import { ArrowIcon } from './Icons';

export default function ProductCard({ product }) {
  const catalogPhoto = `${process.env.PUBLIC_URL}/catalog/${product.id.padStart(2, '0')}`;
  return <article className="product-card">
    <a className="product-image" href={`#/producto/${product.id}`} aria-label={`Ver detalles de ${product.name}`}>
      <img src={`${catalogPhoto}-900.webp`} srcSet={`${catalogPhoto}-640.webp 640w, ${catalogPhoto}-900.webp 900w`} sizes="(max-width: 600px) calc((100vw - 43px) / 2), (max-width: 800px) calc((100vw - 60px) / 2), 320px" width="900" height="1125" alt={product.name} loading="lazy" decoding="async" />
      {product.label && <span className="product-badge">{product.label}</span>}
    </a>
    <div className="product-card-body">
      <span className="eyebrow">{product.subcategory}</span>
      <a href={`#/producto/${product.id}`} className="product-name">{product.name}</a>
      <div className="product-card-row">{product.price != null && <span className="price">{formatPrice(product.price)}</span>}</div>
      <div className="product-card-actions"><a className="detail-link" href={`#/producto/${product.id}`}>Ver detalles <ArrowIcon /></a><a className="product-whatsapp" href={whatsappUrl(productMessage(product))} target="_blank" rel="noopener noreferrer" aria-label={`Consultar por WhatsApp sobre ${product.name}`}>Consultar por WhatsApp <ArrowIcon /></a></div>
    </div>
  </article>;
}
