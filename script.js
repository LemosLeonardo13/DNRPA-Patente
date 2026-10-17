/* ===========================================================
   DNRPA - Prueba técnica
   Lógica de navegación entre pantallas + consulta de dominio.
   El dominio JXJ944 siempre devuelve el mismo resultado fijo.
   =========================================================== */

/* --- Datos "cargados" para el dominio de prueba --- */
const DOMINIO_VALIDO = "JXJ944";

const DATOS_DOMINIO = {
  dominio:  "JXJ944",
  titular:  "Lemos Leonardo Alberto",
  modelo:   "Fiat Palio Fire 1.4",
  estado:   "EN TRÁMITE"
};

/* ===========================================================
   NAVEGACIÓN ENTRE PANTALLAS
   =========================================================== */
function mostrarPantalla(id) {
  document.querySelectorAll(".pantalla").forEach(p => p.classList.remove("activa"));
  document.getElementById(id).classList.add("activa");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function irAChapas() {
  mostrarPantalla("pantalla-chapas");
}

function irAInicio(event) {
  if (event) event.preventDefault();
  // Limpiar el formulario al volver
  const input = document.getElementById("inputDominio");
  const resultado = document.getElementById("resultado");
  if (input) input.value = "";
  if (resultado) {
    resultado.classList.add("oculto");
    resultado.innerHTML = "";
  }
  mostrarPantalla("pantalla-inicio");
}

/* ===========================================================
   CONSULTA DE DOMINIO
   =========================================================== */
function buscarDominio() {
  const input = document.getElementById("inputDominio");
  const resultado = document.getElementById("resultado");

  // Normalizamos: sin espacios y en mayúsculas
  const valor = input.value.trim().toUpperCase().replace(/\s+/g, "");

  if (valor === "") {
    mostrarMensaje(resultado, "Por favor, ingrese un número de dominio.");
    return;
  }

  if (valor === DOMINIO_VALIDO) {
    mostrarDatos(resultado, DATOS_DOMINIO);
  } else {
    // Igual que el sitio real: si no hay datos, "Sin información"
    mostrarSinInfo(resultado, valor);
  }
}

/* --- Render del resultado correcto --- */
function mostrarDatos(contenedor, datos) {
  contenedor.innerHTML = `
    <ul>
      <li><strong>Número de dominio:</strong> ${datos.dominio}</li>
      <li><strong>Titular:</strong> ${datos.titular}</li>
      <li><strong>Modelo:</strong> ${datos.modelo}</li>
      <li><strong>Patente:</strong> <span class="estado-tramite">${datos.estado}</span></li>
    </ul>
  `;
  contenedor.classList.remove("oculto");
}

/* --- Dominio sin datos --- */
function mostrarSinInfo(contenedor, dominio) {
  contenedor.innerHTML = `
    <ul>
      <li><strong>Dominio:</strong> ${dominio}</li>
      <li style="color:#8a8a8a;">Sin información</li>
    </ul>
  `;
  contenedor.classList.remove("oculto");
}

/* --- Mensaje simple (validación) --- */
function mostrarMensaje(contenedor, texto) {
  contenedor.innerHTML = `<ul><li>${texto}</li></ul>`;
  contenedor.classList.remove("oculto");
}
