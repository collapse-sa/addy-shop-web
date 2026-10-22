export const WHATSAPP_NUMBER = '528120760220';
export const formatPrice = (amount) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(amount);
export const whatsappUrl = (message) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
export const productMessage = (product) =>
  `Hola, me interesa el producto ${product.name}. ¿Podrían proporcionarme más información sobre disponibilidad y precio?`;
