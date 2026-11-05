import {
  buscarAsientosContiguos,
  contarAsientos,
  crearSala,
  describirAsientosContiguos,
  mostrarSala,
  reservarAsiento,
} from "./cinema";

const sala = crearSala();
console.log(reservarAsiento(sala, 0, 1));
mostrarSala(sala);

const [ocupados, disponibles] = contarAsientos(sala);
console.log(`Ocupados: ${ocupados} | Disponibles: ${disponibles}`);
console.log(describirAsientosContiguos(buscarAsientosContiguos(sala)));
