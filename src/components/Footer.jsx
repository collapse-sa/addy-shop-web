import logoInfo from '../assets/logo-info.png';
import { WHATSAPP_NUMBER, whatsappUrl } from '../shop';
import './Footer.css';

export default function Footer() { return <footer className="site-footer"><div className="container footer-grid">
  <div className="footer-intro"><a href="#/" aria-label="ADDY SHOP, inicio"><img src={logoInfo} alt="ADDY SHOP" /></a><p>Lo bonito también se compra.</p><span>Una boutique de bolsas y accesorios para encontrar esos detalles que van contigo.</span></div>
  <div><h3>Explora</h3><a href="#/">Inicio</a><a href="#/catalogo">Catálogo</a><a href="#/nosotros">Nosotros</a><a href="#/contacto">Contacto</a></div>
  <div><h3>Categorías</h3><a href="#/catalogo">Todos</a><a href="#/catalogo?categoria=Bolsas">Bolsas</a><a href="#/catalogo?categoria=Accesorios">Accesorios</a></div>
  <div><h3>Hablemos</h3><p>¿Encontraste algo que te gustó?</p><a href={whatsappUrl('Hola, me gustaría conocer más sobre ADDY SHOP.')} target="_blank" rel="noopener noreferrer">WhatsApp · +52 {WHATSAPP_NUMBER.slice(2,4)} {WHATSAPP_NUMBER.slice(4,8)} {WHATSAPP_NUMBER.slice(8)}</a></div>
  </div><div className="container footer-bottom"><span>© {new Date().getFullYear()} ADDY SHOP. Todos los derechos reservados.</span><span>Hecho para encontrar lo bonito.</span></div></footer>; }
