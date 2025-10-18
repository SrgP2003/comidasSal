import { getAllComidas } from './apiComidasSal.js';

async function run() {
  try {
    const comidas = await getAllComidas();
    console.log('Cantidad de comidas:', Array.isArray(comidas) ? comidas.length : 'no es arreglo');
    console.log('Primeros 3 items:', comidas.slice(0, 3));
  } catch (err) {
    console.error('Error al obtener comidas:', err.message || err);
    process.exitCode = 1;
  }
}

run();
