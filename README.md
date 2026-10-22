# ADDY SHOP

Boutique digital en React. El catálogo incluye 24 fotografías del negocio, filtros, búsqueda, ordenamiento, fichas de producto y enlaces individuales para consultar por WhatsApp. No hay pagos ni confirmación automática de pedidos.

## Ejecutar

```bash
npm install
npm start
```

Abre `http://localhost:3000`. Para validar una versión de producción, ejecuta `npm run build`. Las pruebas se ejecutan con `CI=true npm test -- --watch=false` (en PowerShell: `$env:CI='true'; npm.cmd test -- --watch=false`).

## Editar contenido

- **Productos:** `src/data/products.js`. Allí se cambian nombre, categoría, subcategoría, precio provisional en MXN, color, descripción, disponibilidad, etiqueta e imagen. Las 24 imágenes originales están en `src/assets/img/` y sus nombres no se modificaron.
- **WhatsApp:** `src/shop.js`, constante `WHATSAPP_NUMBER`. Allí está configurado el número actual. Usa el formato internacional `52` seguido de los 10 dígitos del número mexicano. `productMessage` genera el texto de consulta de cada producto.
- **Marca y textos de portada:** `src/pages/Home.jsx` y `src/assets/logo.png`.
- **Diseño responsive:** `src/App.css` y `src/index.css`.
- **SEO básico:** `public/index.html`; el título de cada vista también se actualiza en `src/App.js`.

Los artículos de Ropa y Termos se muestran como próximos porque todavía no se proporcionaron fotografías ni inventario para esas categorías. Todos los precios actuales son ejemplos y la disponibilidad figura como “Por confirmar”.

La navegación usa rutas con `#` para que las fichas y filtros compartidos funcionen incluso en hosting estático sin configuración adicional del servidor.
