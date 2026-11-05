// Gestor de asientos de cine: la sala se representa con un arreglo bidimensional.

export const TOTAL_FILAS = 8;
export const TOTAL_COLUMNAS = 10;
export const LIBRE = 0;
export const OCUPADO = 1;

// Crea una sala de 8 filas y 10 columnas con todos los asientos disponibles.
export function crearSala(): number[][] {
  const sala: number[][] = [];

  for (let fila = 0; fila < TOTAL_FILAS; fila++) {
    const asientos: number[] = [];

    for (let columna = 0; columna < TOTAL_COLUMNAS; columna++) {
      asientos.push(LIBRE);
    }

    sala.push(asientos);
  }

  return sala;
}

// Muestra la sala en la consola: X para ocupado, L para libre, con números de fila y columna.
export function mostrarSala(sala: number[][]): void {
  let encabezado = "Fila/Col ";

  for (let columna = 0; columna < TOTAL_COLUMNAS; columna++) {
    encabezado += `${columna} `;
  }

  console.log(encabezado);

  for (let fila = 0; fila < sala.length; fila++) {
    let lineaDeAsientos = `${fila}`.padEnd(9, " ");

    for (let columna = 0; columna < sala[fila].length; columna++) {
      if (sala[fila][columna] === OCUPADO) {
        lineaDeAsientos += "X ";
      } else {
        lineaDeAsientos += "L ";
      }
    }

    console.log(lineaDeAsientos);
  }
}
