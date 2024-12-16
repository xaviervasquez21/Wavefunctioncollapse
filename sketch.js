const celdas = [];
let RETICULAX = document.getElementById("cellSize").value;
let RETICULAY;
let ancho;
let alto;
const startButton = document.getElementById("start");

const azulejos = [];
const NA = 15;

function preload() {
  for (let i = 0; i < NA; i++) {
    azulejos[i] = loadImage("./tiles/tile" + i + ".png");
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  ancho = width / RETICULAX;
  alto = ancho;
  RETICULAY = Math.floor(height / ancho);

  let opcionesI = [];
  for (let i = 0; i < azulejos.length; i++) {
    opcionesI.push(i);
  }

  for (let i = 0; i < RETICULAX * RETICULAY; i++) {
    celdas[i] = {
      colapsada: false,
      opciones: opcionesI,
    };
  }

  //startButton.addEventListener("click", resetAll);
}

function draw() {
  const celdasDisponibles = celdas.filter((celda) => {
    return celda.colapsada == false;
  });

  if (celdasDisponibles.length > 0) {
    celdasDisponibles.sort((a, b) => {
      return a.opciones.length - b.opciones.length;
    });

    const celdasPorColapsar = celdasDisponibles.filter((celda) => {
      return celda.opciones.length == celdasDisponibles[0].opciones.length;
    });

    const celdaSeleccionada = random(celdasPorColapsar);
    celdaSeleccionada.colapsada = true;

    const opcionSeleccionada = random(celdaSeleccionada.opciones);
    celdaSeleccionada.opciones = [opcionSeleccionada];

    //print(opcionSeleccionada);

    for (let x = 0; x < RETICULAX; x++) {
      for (let y = 0; y < RETICULAY; y++) {
        const celdaIndex = x + y * RETICULAX;
        const celdaActual = celdas[celdaIndex];
        if (celdaActual.colapsada) {
          const indiceAzulejo = celdaActual.opciones[0];
          const reglasActuales = reglas[indiceAzulejo];
          print(reglasActuales);

          image(azulejos[indiceAzulejo], x * ancho, y * alto, ancho, alto);

          // Monitorear UP
          if (y > 0) {
            const indiceUP = x + (y - 1) * RETICULAX;
            const celdaUp = celdas[indiceUP];
            if (!celdaUp.colapsada) {
              cambiarDireccion(celdaUp, reglasActuales["UP"], "DOWN");
            }
          }

          // Monitorear RIGHT
          if (x < RETICULAX - 1) {
            const indiceRight = x + 1 + y * RETICULAX;
            const celdaRight = celdas[indiceRight];
            if (!celdaRight.colapsada) {
              cambiarDireccion(celdaRight, reglasActuales["RIGHT"], "LEFT");
            }
          }

          // Monitorear DOWN
          if (y < RETICULAY - 1) {
            const indiceDown = x + (y + 1) * RETICULAX;
            const celdaDown = celdas[indiceDown];
            if (!celdaDown.colapsada) {
              cambiarDireccion(celdaDown, reglasActuales["DOWN"], "UP");
            }
          }

          // Monitorear LEFT
          if (x > 0) {
            const indiceLeft = x - 1 + y * RETICULAX;
            const celdaLeft = celdas[indiceLeft];
            if (!celdaLeft.colapsada) {
              cambiarDireccion(celdaLeft, reglasActuales["LEFT"], "RIGHT");
            }
          }
        } else {
          //strokeWeight(2);
          //rect(x * ancho, y * alto, ancho, alto);
        }
      }
    }
  } else {
  }
}

function cambiarDireccion(_celda, _regla, _opuesto) {
  const nuevasOpciones = [];
  for (let i = 0; i < _celda.opciones.length; i++) {
    if (_regla == reglas[_celda.opciones[i]][_opuesto]) {
      nuevasOpciones.push(_celda.opciones[i]);
    }
  }
  _celda.opciones = nuevasOpciones;
  print(nuevasOpciones);
}

function resetAll() {
  RETICULAX = document.getElementById("cellSize").value;
  ancho = width / RETICULAX;
  alto = ancho;
  RETICULAY = Math.floor(height / ancho);

  background(255, 255, 255);

  let opcionesI = [];
  for (let i = 0; i < azulejos.length; i++) {
    opcionesI.push(i);
  }

  for (let i = 0; i < RETICULAX * RETICULAY; i++) {
    celdas[i] = {
      colapsada: false,
      opciones: opcionesI,
    };
  }
}

// Espera a que todo el contenido del DOM esté completamente cargado
// antes de ejecutar el código contenido en este bloque.
document.addEventListener("DOMContentLoaded", () => {
  // Obtiene una referencia al botón con el id "start".
  const startButton = document.getElementById("start");

  // Añade un evento de tipo "click" al botón.
  // Cuando se hace clic en el botón, se ejecutará la función "resetAll".
  startButton.addEventListener("click", resetAll);
});
