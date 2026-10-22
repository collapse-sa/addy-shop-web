import { fireEvent, render, screen } from '@testing-library/react';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import { products } from './data/products';
import { productMessage, whatsappUrl, WHATSAPP_NUMBER } from './shop';

test('el catálogo incluye 24 artículos con imágenes e identificadores únicos', () => {
  expect(products).toHaveLength(24);
  expect(new Set(products.map((item) => item.id)).size).toBe(24);
  expect(products.every((item) => item.image && item.price > 0 && item.availability)).toBe(true);
});

test('la búsqueda filtra por nombre y muestra el contador correcto', () => {
  render(<Catalog route="/catalogo" />);
  fireEvent.change(screen.getByLabelText('Buscar por nombre'), { target: { value: 'acolchada' } });
  expect(screen.getByText('3 productos')).toBeInTheDocument();
  expect(screen.queryByText('Set de fragancias y pulsera')).not.toBeInTheDocument();
});

test('cada tarjeta conserva detalles y una consulta individual codificada', () => {
  render(<Catalog route="/catalogo?q=acolchada" />);
  const product = products[0];
  const link = screen.getByRole('link', { name: `Consultar por WhatsApp sobre ${product.name}` });
  const url = new URL(link.href);
  expect(url.origin).toBe('https://wa.me');
  expect(url.pathname).toBe(`/${WHATSAPP_NUMBER}`);
  expect(url.searchParams.get('text')).toBe(productMessage(product));
  expect(screen.getByRole('link', { name: `Ver detalles de ${product.name}` })).toHaveAttribute('href', `#/producto/${product.id}`);
  expect(screen.queryByRole('button', { name: /agregar|carrito/i })).not.toBeInTheDocument();
});

test('el detalle permite consultar el producto directamente', () => {
  const product = products[8];
  render(<ProductDetail product={product} />);
  const link = screen.getByRole('link', { name: 'Consultar por WhatsApp' });
  expect(link).toHaveAttribute('href', whatsappUrl(productMessage(product)));
  expect(screen.queryByText('Cantidad')).not.toBeInTheDocument();
});
