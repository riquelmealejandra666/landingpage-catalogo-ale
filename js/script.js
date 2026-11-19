/* =========================================================
   ALE — Espejos Encantados | Script principal
   1) Menú móvil  2) Botones WhatsApp por producto
   ========================================================= */

/* ---------- Configuración WhatsApp ---------- */
/* Número de WhatsApp de la tienda (con código de país, sin + ni espacios) */
const numeroWhatsapp = "56957071102";

/* ---------- 1) Menú móvil (hamburguesa) ---------- */
/* Obtiene el botón y la lista del menú */
const botonMenu = document.getElementById("boton-menu");
const listaMenu = document.getElementById("lista-menu");

/* Al hacer clic en el botón, abre o cierra el menú */
botonMenu.addEventListener("click", function () {
  const abierta = listaMenu.classList.toggle("abierta");
  botonMenu.setAttribute("aria-expanded", abierta ? "true" : "false");
});

/* Si el usuario elige un enlace, cierra el menú en móvil */
listaMenu.addEventListener("click", function (event) {
  if (event.target.closest("a")) {
    listaMenu.classList.remove("abierta");
    botonMenu.setAttribute("aria-expanded", "false");
  }
});

/* ---------- 2) Botones WhatsApp de cada producto ---------- */
/* Busca todos los botones con clase "boton-whatsapp" dentro de las tarjetas */
const botonesProducto = document.querySelectorAll(".tarjeta-espejo .boton-whatsapp");

/* Por cada botón, arma el mensaje según el producto */
botonesProducto.forEach(function (boton) {
  boton.addEventListener("click", function () {
    /* Lee el nombre y precio guardados en el HTML (data-nombre / data-precio) */
    const nombre = boton.getAttribute("data-nombre") || "este espejo";
    const precio = boton.getAttribute("data-precio") || "";

    /* Mensaje automático en WhatsApp */
    const mensaje = `Hola, me interesa este espejo: ${nombre} (${precio}). ¿Sigue disponible?`;

    /* Abre WhatsApp con el mensaje ya escrito */
    const url = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  });
});

/* ---------- 3) Año automático en el pie de página ---------- */
const anioActual = document.getElementById("anio-actual");
if (anioActual) {
  anioActual.textContent = new Date().getFullYear();
}

/* ---------- 4) Ampliación de fotos del catálogo ---------- */
const visorImagen = document.getElementById("visor-imagen");
const imagenAmpliada = visorImagen.querySelector(".imagen-ampliada");
const pieImagenAmpliada = visorImagen.querySelector(".pie-imagen-ampliada");
const botonCerrarVisor = visorImagen.querySelector(".boton-cerrar-visor");

document.querySelectorAll(".boton-ampliar").forEach(function (boton) {
  boton.addEventListener("click", function () {
    const imagen = boton.closest(".contenedor-imagen").querySelector(".imagen-espejo");
    const nombreProducto = boton.closest(".tarjeta-espejo").querySelector(".nombre-espejo").textContent;

    imagenAmpliada.src = imagen.src;
    imagenAmpliada.alt = imagen.alt;
    pieImagenAmpliada.textContent = nombreProducto;
    visorImagen.showModal();
  });
});

botonCerrarVisor.addEventListener("click", function () {
  visorImagen.close();
});

visorImagen.addEventListener("click", function (event) {
  if (event.target === visorImagen) {
    visorImagen.close();
  }
});
