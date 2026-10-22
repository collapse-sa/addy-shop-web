const fs = require('node:fs/promises');
const path = require('node:path');
const { setTimeout: delay } = require('node:timers/promises');
const sharp = require('sharp');

const root = path.resolve(__dirname, '..');
const productsFile = path.join(root, 'src', 'data', 'products.js');
const originalDir = path.join(root, 'src', 'assets', 'img');
const catalogDir = path.join(root, 'public', 'catalog');
const widths = [640, 900];

async function writeWebp(target, data) {
  for (let attempt = 0; attempt < 8; attempt++) {
    try {
      await fs.writeFile(target, data);
      return;
    } catch (error) {
      if (attempt === 7 || !['EACCES', 'EPERM', 'EBUSY', 'UNKNOWN', 'EINVAL'].includes(error.code)) throw error;
      await delay(100 * (attempt + 1));
    }
  }
}

async function main() {
  const productsSource = await fs.readFile(productsFile, 'utf8');
  const imports = new Map(
    [...productsSource.matchAll(/^import\s+(image\d+)\s+from\s+['"]\.\.\/assets\/img\/([^'"]+)['"];?$/gm)]
      .map(([, variable, filename]) => [variable, filename])
  );
  const imageList = productsSource.match(/const images\s*=\s*\[([^\]]+)\]/);

  if (!imageList || imports.size === 0 || imageList[1].replace(/\bimage\d+\b|[\s,]/g, '') !== '') {
    throw new Error('No se pudo leer la correspondencia de imágenes en src/data/products.js.');
  }

  const productImages = imageList[1].match(/\bimage\d+\b/g) || [];
  if (productImages.length !== imports.size || new Set(productImages).size !== productImages.length) {
    throw new Error('La lista de imágenes debe contener cada fotografía importada una sola vez.');
  }

  await fs.mkdir(catalogDir, { recursive: true });

  for (const [index, variable] of productImages.entries()) {
    const filename = imports.get(variable);
    if (!filename) throw new Error(`Falta el archivo original para ${variable}.`);

    const source = path.join(originalDir, filename);
    const metadata = await sharp(source).metadata();
    if (!metadata.width || metadata.width < Math.max(...widths)) {
      throw new Error(`${filename} no tiene resolución suficiente para generar 900 px.`);
    }

    const id = String(index + 1).padStart(2, '0');
    for (const width of widths) {
      const target = path.join(catalogDir, `${id}-${width}.webp`);
      const webp = await sharp(source)
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 90, effort: 6, smartSubsample: true })
        .toBuffer();
      await writeWebp(target, webp);
    }
    console.log(`${id}: ${filename} → ${widths.map((width) => `${id}-${width}.webp`).join(', ')}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
