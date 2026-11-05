import {
  TOTAL_COLUMNAS,
  TOTAL_FILAS,
  buscarAsientosContiguos,
  contarAsientos,
  crearSala,
  describirAsientosContiguos,
  mostrarSala,
  reservarAsiento,
} from "./cinema";

// Muestra el título, el mapa, el conteo y el resultado de buscar asientos contiguos.
function mostrarEscenario(titulo: string, sala: number[][]): void {
  console.log(`\n=== ${titulo} ===`);
  mostrarSala(sala);

  const [ocupados, disponibles] = contarAsientos(sala);
  console.log(`Ocupados: ${ocupados} | Disponibles: ${disponibles}`);
  console.log(describirAsientosContiguos(buscarAsientosContiguos(sala)));
}

// Reserva todos los asientos excepto las posiciones [fila, columna] indicadas.
function ocuparSalaExcepto(sala: number[][], asientosLibres: number[][]): void {
  for (let fila = 0; fila < TOTAL_FILAS; fila++) {
    for (let columna = 0; columna < TOTAL_COLUMNAS; columna++) {
      let debeQuedarLibre = false;

      for (let indice = 0; indice < asientosLibres.length; indice++) {
        if (asientosLibres[indice][0] === fila && asientosLibres[indice][1] === columna) {
          debeQuedarLibre = true;
        }
      }

      if (!debeQuedarLibre) {
        reservarAsiento(sala, fila, columna);
      }
    }
  }
}

// Escenario 1: sala vacía, con todos los asientos disponibles.
const salaVacia = crearSala();
mostrarEscenario("Sala vacía", salaVacia);

// Escenario 2: sala parcialmente ocupada, con ejemplos de cada mensaje de reserva.
const salaParcial = crearSala();
console.log("\n--- Reservas de prueba ---");
console.log(reservarAsiento(salaParcial, 0, 1));
console.log(reservarAsiento(salaParcial, 0, 4));
console.log(reservarAsiento(salaParcial, 0, 5));
console.log(reservarAsiento(salaParcial, 3, 2));
console.log(reservarAsiento(salaParcial, 3, 2));
console.log(reservarAsiento(salaParcial, 8, 0));
console.log(reservarAsiento(salaParcial, 2, 10));
mostrarEscenario("Sala parcialmente ocupada", salaParcial);

// Escenario 3: sala casi llena, solo con asientos sueltos disponibles.
const salaCasiLlena = crearSala();
ocuparSalaExcepto(salaCasiLlena, [
  [0, 0],
  [2, 4],
  [5, 7],
  [7, 9],
]);
mostrarEscenario("Sala casi llena (solo asientos sueltos)", salaCasiLlena);

// Escenario 4: sala completamente llena, sin asientos disponibles.
const salaLlena = crearSala();
ocuparSalaExcepto(salaLlena, []);
mostrarEscenario("Sala completamente llena", salaLlena);
console.log(reservarAsiento(salaLlena, 4, 4));
