import "./style.css";
import {
  OCUPADO,
  TOTAL_COLUMNAS,
  buscarAsientosContiguos,
  contarAsientos,
  crearSala,
  describirAsientosContiguos,
  reservarAsiento,
} from "./cinema";

// Estado de la pantalla: la sala y el par de asientos resaltado.
let sala = crearSala();
let parContiguo: number[][] = [];

const mapa = document.querySelector<HTMLDivElement>("#mapa")!;
const mensaje = document.querySelector<HTMLParagraphElement>("#mensaje")!;
const ocupadosTexto = document.querySelector<HTMLSpanElement>("#ocupados")!;
const disponiblesTexto = document.querySelector<HTMLSpanElement>("#disponibles")!;
const botonBuscar = document.querySelector<HTMLButtonElement>("#buscar")!;
const botonReiniciar = document.querySelector<HTMLButtonElement>("#reiniciar")!;

// Comprueba si un asiento forma parte del par contiguo resaltado.
function esParContiguo(fila: number, columna: number): boolean {
  for (let indice = 0; indice < parContiguo.length; indice++) {
    if (parContiguo[indice][0] === fila && parContiguo[indice][1] === columna) {
      return true;
    }
  }

  return false;
}

// Crea una etiqueta con el número de una fila o columna.
function crearEtiqueta(texto: string): HTMLSpanElement {
  const etiqueta = document.createElement("span");
  etiqueta.textContent = texto;
  etiqueta.className = "flex items-center justify-center text-xs text-stone-400";
  return etiqueta;
}

// Crea el botón de un asiento según su estado actual.
function crearAsiento(fila: number, columna: number): HTMLButtonElement {
  const ocupado = sala[fila][columna] === OCUPADO;
  const boton = document.createElement("button");

  boton.type = "button";
  boton.textContent = ocupado ? "X" : "L";
  boton.setAttribute("aria-label", `Fila ${fila}, columna ${columna}, ${ocupado ? "ocupado" : "libre"}`);
  boton.className = "aspect-square min-w-0 rounded-sm text-xs font-semibold sm:text-sm ";

  if (ocupado) {
    boton.className += "bg-red-300 text-red-950";
  } else if (esParContiguo(fila, columna)) {
    boton.className += "bg-amber-400 text-stone-950";
  } else {
    boton.className += "bg-emerald-200 text-emerald-950 hover:bg-emerald-100";
  }

  boton.addEventListener("click", () => {
    mensaje.textContent = reservarAsiento(sala, fila, columna);
    parContiguo = [];
    pintarSala();
  });

  return boton;
}

// Vuelve a dibujar el mapa y actualiza el conteo de asientos.
function pintarSala(): void {
  mapa.replaceChildren(crearEtiqueta(""));

  for (let columna = 0; columna < TOTAL_COLUMNAS; columna++) {
    mapa.append(crearEtiqueta(`${columna}`));
  }

  for (let fila = 0; fila < sala.length; fila++) {
    mapa.append(crearEtiqueta(`${fila}`));

    for (let columna = 0; columna < sala[fila].length; columna++) {
      mapa.append(crearAsiento(fila, columna));
    }
  }

  const [ocupados, disponibles] = contarAsientos(sala);
  ocupadosTexto.textContent = `${ocupados}`;
  disponiblesTexto.textContent = `${disponibles}`;
}

// Resalta el primer par libre y muestra el resultado de la búsqueda.
botonBuscar.addEventListener("click", () => {
  const resultado = buscarAsientosContiguos(sala);

  parContiguo = typeof resultado === "string" ? [] : resultado;
  mensaje.textContent = describirAsientosContiguos(resultado);
  pintarSala();
});

// Deja todos los asientos disponibles de nuevo.
botonReiniciar.addEventListener("click", () => {
  sala = crearSala();
  parContiguo = [];
  mensaje.textContent = "Sala reiniciada: todos los asientos están disponibles.";
  pintarSala();
});

mensaje.textContent = "Selecciona un asiento para empezar.";
pintarSala();
