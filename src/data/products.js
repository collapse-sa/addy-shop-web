import image1 from '../assets/img/bolso_1.png';
import image2 from '../assets/img/bolso_2.png';
import image3 from '../assets/img/bolso_3.png';
import image4 from '../assets/img/bolso_4.png';
import image5 from '../assets/img/bolso_5.png';
import image6 from '../assets/img/bolso_6.png';
import image7 from '../assets/img/bolso_7.png';
import image8 from '../assets/img/bolso_8.png';
import image9 from '../assets/img/bolso_9.png';
import image10 from '../assets/img/bolso_10.png';
import image11 from '../assets/img/bolso_11.png';
import image12 from '../assets/img/bolso_12.png';
import image13 from '../assets/img/bolso_13.png';
import image14 from '../assets/img/bolso_14.png';
import image15 from '../assets/img/bolso_15.png';
import image16 from '../assets/img/bolso_16.png';
import image17 from '../assets/img/bolso_17.png';
import image18 from '../assets/img/bolso_18.png';
import image19 from '../assets/img/bolso_19.png';
import image20 from '../assets/img/bolso_20.png';
import image21 from '../assets/img/bolso_21.png';
import image22 from '../assets/img/bolso_22.png';
import image23 from '../assets/img/bolso_23.png';
import image24 from '../assets/img/bolso_24.png';

// Precios de muestra en MXN. Sustituye cada ficha cuando se confirme el inventario.
const images = [image1,image2,image3,image4,image5,image6,image7,image8,image9,image10,image11,image12,image13,image14,image15,image16,image17,image18,image19,image20,image21,image22,image23,image24];
const details = [
  ['Bolsa de hombro acolchada negra','Bolsas','De hombro',800,'Negro','Diseño acolchado con solapa y cadena. Una pieza versátil para acompañar tus looks.','Destacado'],
  ['Fragancias y pulseras', 'Accesorios', 'Sets', 250, 'Varios', 'Cada artículo tiene un precio individual de $250 MXN. Los productos se venden por separado, no como conjunto.'],
  ['Set de carteras en tono arena','Accesorios','Carteras',800,'Arena','Piezas compactas en tonos neutros presentadas en caja.'],
  ['Set de cartera y accesorio beige','Accesorios','Carteras',800,'Beige','Un conjunto de accesorios de uso diario en una paleta discreta.'],
  ['Set de cartera y accesorio rojo','Accesorios','Carteras',800,'Rojo','Accesorios compactos en un tono rojo protagonista.'],
  ['Set de carteras oscuras','Accesorios','Carteras',800,'Negro','Piezas compactas oscuras presentadas en caja.'],
  ['Set de carteras negras','Accesorios','Carteras',800,'Negro','Dos accesorios compactos para llevar lo esencial.'],
  ['Cartera de muñeca café','Accesorios','Carteras',300,'Café','Cartera pequeña con correa de muñeca.'],
  ['Cartera compacta rosa','Accesorios','Carteras',300,'Rosa','Formato compacto en rosa suave para los esenciales.','Nuevo'],
  ['Cartera compacta roja','Accesorios','Carteras',300,'Rojo','Un toque de color en un formato ligero y práctico.'],
  ['Bolso pequeño negro con cadena','Bolsas','Cruzada',650,'Negro','Bolso compacto con cadena y correa para llevar lo necesario.'],
  ['Bolsa cruzada de estampado café','Bolsas','Cruzada',650,'Café','Silueta compacta con estampado y correa ajustable.'],
  ['Bolsa de mano estampada beige','Bolsas','De mano',850,'Beige','Silueta estructurada con asas cortas y correa larga.','Destacado'],
  ['Bolsa de mano estampada café','Bolsas','De mano',850,'Café','Bolsa estructurada con asas superiores y estampado.'],
  ['Bolsa de mano estructurada negra','Bolsas','De mano',850,'Negro','Líneas definidas y asas cortas para un estilo pulido.','Nuevo'],
  ['Bolsa de mano estampada en tonos tierra','Bolsas','De mano',800,'Café','Formato estructurado con asas y correa larga.'],
  ['Bolso tote acolchado negro','Bolsas','Tote',750,'Negro','Tote de líneas rectas y detalle acolchado.','Destacado'],
  ['Bolso tote negro','Bolsas','Tote',900,'Negro','Silueta amplia con asas superiores y correa larga.'],
  ['Bolso tote claro','Bolsas','Tote',850,'Crema','Una opción de tono claro y perfil limpio para todos los días.'],
  ['Bolso tote beige','Bolsas','Tote',850,'Beige','Silueta amplia en un tono neutro fácil de combinar.'],
  ['Bolso tote estampado café','Bolsas','Tote',850,'Café','Formato amplio con estampado en tonos café.'],
  ['Bolso tote estampado marrón','Bolsas','Tote',850,'Marrón','Bolso amplio con asas superiores y estampado.'],
  ['Bolsa de hombro acolchada camel','Bolsas','De hombro',800,'Camel','Solapa acolchada, cadena y un tono cálido.','Destacado'],
  ['Bolsa de hombro acolchada chocolate','Bolsas','De hombro',800,'Chocolate','Silueta compacta acolchada con detalle de cadena.','Destacado'],
];

export const products = details.map(([name, category, subcategory, price, color, description, label], index) => ({
  id: String(index + 1), name, category, subcategory, price, image: images[index], description, color,
  availability: 'Por confirmar', label: label || null,
}));
