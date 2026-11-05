import { contarAsientos, crearSala, mostrarSala, reservarAsiento } from "./cinema";

const sala = crearSala();
console.log(reservarAsiento(sala, 3, 2));
console.log(reservarAsiento(sala, 3, 2));
console.log(reservarAsiento(sala, 8, 0));
mostrarSala(sala);

const [ocupados, disponibles] = contarAsientos(sala);
console.log(`Ocupados: ${ocupados} | Disponibles: ${disponibles}`);
