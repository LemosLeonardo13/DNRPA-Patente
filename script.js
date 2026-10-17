/* ===========================================================
   DNRPA - Prueba técnica
   Navegación entre pantallas + consulta de dominio.
   El dominio JXJ944 siempre devuelve el mismo resultado fijo.
   =========================================================== */

const DOMINIO_VALIDO = "JXJ944";

const DATOS_DOMINIO = {
  dominio: "JXJ944",
  titular: "Lemos Leonardo Alberto",
  modelo:  "Fiat Palio Fire 1.4"
};

/* ===================== NAVEGACIÓN ===================== */
function mostrarPantalla(id){
  document.querySelectorAll(".pantalla").forEach(p => p.classList.remove("activa"));
  document.getElementById(id).classList.add("activa");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function irAChapas(){
  mostrarPantalla("pantalla-chapas");
}

function irAInicio(event){
  if (event) event.preventDefault();
  const input = document.getElementById("inputDominio");
  const resultado = document.getElementById("resultado");
  if (input) input.value = "";
  if (resultado){ resultado.classList.add("oculto"); resultado.innerHTML = ""; }
  mostrarPantalla("pantalla-inicio");
}

/* ===================== CONSULTA ===================== */
function buscarDominio(){
  const input = document.getElementById("inputDominio");
  const resultado = document.getElementById("resultado");

  const valor = input.value.trim().toUpperCase().replace(/\s+/g, "");

  if (valor === ""){
    mostrarMensaje(resultado, "Por favor, ingrese un número de dominio.");
    return;
  }

  if (valor === DOMINIO_VALIDO){
    mostrarDatos(resultado, DATOS_DOMINIO);
  } else {
    mostrarSinInfo(resultado, valor);
  }
}

/* --- Resultado completo (datos + estado del trámite) --- */
function mostrarDatos(contenedor, datos){
  contenedor.innerHTML = `
    <div class="datos-box">
      <ul>
        <li><strong>Número de dominio:</strong> ${datos.dominio}</li>
        <li><strong>Titular:</strong> ${datos.titular}</li>
        <li><strong>Modelo:</strong> ${datos.modelo}</li>
        <li><strong>Patente:</strong> <span class="pill-tramite">EN TRÁMITE</span></li>
      </ul>
    </div>

    <div class="estado-box">
      <h3 class="estado-header">Estado del Trámite</h3>
      <div class="estado-body">
        <p class="estado-titulo">Trámite Pendiente</p>
        <p>El trámite que consultaste se encuentra en <strong>proceso</strong>.</p>
        <p>Desde la fecha de presentación el procesamiento estimado es según el trámite que realizaste.</p>
        <p>Comunicate con el Registro Seccional para coordinar el retiro.</p>
      </div>
    </div>
  `;
  contenedor.classList.remove("oculto");
}

/* --- Dominio sin datos --- */
function mostrarSinInfo(contenedor, dominio){
  contenedor.innerHTML = `
    <div class="msg-box">
      <p><strong>Dominio:</strong> ${dominio}</p>
      <p style="color:#8a8a8a;">Sin información</p>
    </div>
  `;
  contenedor.classList.remove("oculto");
}

/* --- Validación simple --- */
function mostrarMensaje(contenedor, texto){
  contenedor.innerHTML = `<div class="msg-box">${texto}</div>`;
  contenedor.classList.remove("oculto");
}
