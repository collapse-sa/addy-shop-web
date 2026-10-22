import { products } from '../data/products';
import ProductGrid from '../components/ProductGrid';
import { ArrowIcon } from '../components/Icons';
import { WHATSAPP_NUMBER, whatsappUrl } from '../shop';
import bolsoHome from '../assets/bolso-home.png';
import bolsoHome1 from '../assets/bolso-home1.png';
import logoInfo from '../assets/logo-info.png';
import './Hero.css';
import './Categories.css';

const featuredIds = ['24','15','13','17'];
const featured = featuredIds.map((id) => products.find((product) => product.id === id));

export default function Home() { return <main>
  <section className="hero"><div className="container hero-inner">
    <div className="hero-copy"><h1 className="hero-identity"><img src={logoInfo} alt="ADDY SHOP, bolsas y accesorios" fetchPriority="high" /></h1><p>Descubre bolsos, accesorios y detalles que complementan tu estilo. Piezas para llevar contigo todos los días.</p><div className="hero-actions"><a className="button button-dark" href="#/catalogo">Explorar catálogo <ArrowIcon /></a><a className="text-link" href={whatsappUrl('Hola, me gustaría conocer más sobre los productos de ADDY SHOP.')} target="_blank" rel="noopener noreferrer">Escribir por WhatsApp <ArrowIcon /></a></div></div>
    <div className="hero-visual"><div className="hero-photo hero-photo-main"><img src={bolsoHome1} alt="Bolsa de mano negra" fetchPriority="high" /></div><div className="hero-photo hero-photo-secondary"><img src={bolsoHome} alt="Bolsa de hombro acolchada chocolate" /></div></div>
  </div></section>
  <div className="benefit-strip"><div className="container"><span>Una selección con personalidad</span><span>Detalles para cada ocasión</span><span>Consulta fácil por WhatsApp</span></div></div>

  <section className="section categories-section container" aria-labelledby="categories-heading"><div className="section-heading split-heading"><div><span className="eyebrow">Explora a tu manera</span><h2 id="categories-heading">Cada detalle cuenta.</h2></div><p>Descubre piezas que suman algo especial a tu día. Empieza por la categoría que más va contigo.</p></div>
    <div className="category-grid">
      <a className="category-card category-bags category-photo category-photo-all" href="#/catalogo"><img src={products[16].image} alt="Bolso tote acolchado negro" loading="lazy" /><span className="category-shade"/><span className="category-copy"><small>01 / Todos</small><strong>Todos</strong><em>Encuentra tu próximo favorito.</em><p>Explora nuestra selección de bolsos y accesorios para complementar tu estilo.</p><span>Ver catálogo <ArrowIcon /></span></span></a>
      <a className="category-card category-photo category-photo-bags" href="#/catalogo?categoria=Bolsas"><img src={products[23].image} alt="Bolsa de hombro acolchada chocolate" loading="lazy" /><span className="category-shade"/><span className="category-copy"><small>02 / Bolsas</small><strong>Bolsas</strong><em>El complemento perfecto.</em><p>Descubre bolsos que combinan estilo, personalidad y versatilidad.</p><span>Ver bolsas <ArrowIcon /></span></span></a>
      <a className="category-card category-photo category-photo-accessories" href="#/catalogo?categoria=Accesorios"><img src={products[8].image} alt="Cartera compacta rosa" loading="lazy" /><span className="category-shade"/><span className="category-copy"><small>03 / Accesorios</small><strong>Accesorios</strong><em>Pequeños detalles, gran estilo.</em><p>Encuentra accesorios ideales para complementar cada ocasión.</p><span>Ver accesorios <ArrowIcon /></span></span></a>
    </div>
  </section>

  <section className="section featured-section"><div className="container"><div className="section-heading featured-heading"><div><span className="eyebrow">Una selección especial</span><h2>Favoritos de la colección</h2></div><a className="text-link" href="#/catalogo">Ver todo el catálogo <ArrowIcon /></a></div><ProductGrid products={featured} /><p className="section-footnote">Precios de muestra en MXN. Disponibilidad por confirmar.</p></div></section>

  <section className="editorial-section"><div className="container editorial-inner"><div className="editorial-visual"><img src={products[12].image} alt="Bolsa de mano estampada beige" loading="lazy" /><span>AD · 01</span></div><div className="editorial-copy"><span className="eyebrow">El encanto está en los detalles</span><h2>Encuentra esa pieza que se siente <em>muy tú.</em></h2><p>Una bolsa puede acompañarte a todas partes. Un accesorio puede cambiarlo todo. En ADDY SHOP reunimos opciones para que elijas lo que mejor expresa tu estilo.</p><a className="button button-outline" href="#/catalogo">Descubre la colección <ArrowIcon /></a></div></div></section>

  <section className="about-contact container" id="nosotros"><div className="about-block"><span className="eyebrow">Sobre nosotros</span><h2>Lo bonito también se compra.</h2><p>ADDY SHOP es una boutique de bolsas, ropa y accesorios pensada para quienes disfrutan los detalles. Queremos que explorar, elegir y consultar tus piezas favoritas sea una experiencia sencilla y agradable.</p><a className="text-link" href="#/catalogo">Explorar productos <ArrowIcon /></a></div><div className="contact-block" id="contacto"><span className="eyebrow">Estamos para ayudarte</span><h2>¿Platicamos?</h2><p>Si viste algo que te gustó, escríbenos. Te ayudamos a confirmar disponibilidad y el proceso de compra.</p><a className="button button-dark" href={whatsappUrl('Hola, me gustaría consultar los productos de ADDY SHOP.')} target="_blank" rel="noopener noreferrer">Escribir por WhatsApp <ArrowIcon /></a><span className="contact-number">+52 {WHATSAPP_NUMBER.slice(2,4)} {WHATSAPP_NUMBER.slice(4,8)} {WHATSAPP_NUMBER.slice(8)}</span></div></section>
  </main>; }
