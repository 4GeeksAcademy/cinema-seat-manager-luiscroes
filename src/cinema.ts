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

// Comprueba si la fila y la columna existen dentro de la sala.
export function esPosicionValida(fila: number, columna: number): boolean {
  const filaValida = Number.isInteger(fila) && fila >= 0 && fila < TOTAL_FILAS;
  const columnaValida = Number.isInteger(columna) && columna >= 0 && columna < TOTAL_COLUMNAS;

  return filaValida && columnaValida;
}

// Reserva un asiento si existe y está libre. Devuelve un mensaje con el resultado.
export function reservarAsiento(sala: number[][], fila: number, columna: number): string {
  if (!esPosicionValida(fila, columna)) {
    return `Reserva fallida: la fila ${fila}, columna ${columna} no existe.`;
  }

  if (sala[fila][columna] === OCUPADO) {
    return `Reserva fallida: la fila ${fila}, columna ${columna} ya está ocupada.`;
  }

  sala[fila][columna] = OCUPADO;
  return `Reserva confirmada: fila ${fila}, columna ${columna}.`;
}

// Cuenta los asientos de la sala. Devuelve [ocupados, disponibles].
export function contarAsientos(sala: number[][]): number[] {
  let ocupados = 0;
  let disponibles = 0;

  for (let fila = 0; fila < sala.length; fila++) {
    for (let columna = 0; columna < sala[fila].length; columna++) {
      if (sala[fila][columna] === OCUPADO) {
        ocupados++;
      } else {
        disponibles++;
      }
    }
  }

  return [ocupados, disponibles];
}

// Busca el primer par de asientos libres contiguos en una misma fila.
// Devuelve [[fila, columna], [fila, columna + 1]], o un arreglo vacío si no hay ninguno.
export function buscarAsientosContiguos(sala: number[][]): number[][] {
  for (let fila = 0; fila < sala.length; fila++) {
    for (let columna = 0; columna < sala[fila].length - 1; columna++) {
      if (sala[fila][columna] === LIBRE && sala[fila][columna + 1] === LIBRE) {
        return [
          [fila, columna],
          [fila, columna + 1],
        ];
      }
    }
  }

  return [];
}

// Convierte el resultado de la búsqueda en un mensaje claro para el personal.
export function describirAsientosContiguos(asientos: number[][]): string {
  if (asientos.length === 0) {
    return "No hay asientos contiguos disponibles.";
  }

  const [fila, primeraColumna] = asientos[0];
  const segundaColumna = asientos[1][1];

  return `Asientos contiguos encontrados: fila ${fila}, columnas ${primeraColumna} y ${segundaColumna}.`;
}
