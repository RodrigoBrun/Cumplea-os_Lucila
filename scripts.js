document.addEventListener('DOMContentLoaded', () => {
  const sobre = document.getElementById('sobre');
  const audio = document.getElementById('magia');

  sobre.addEventListener('click', () => {
    audio.play().catch(e => console.log('No se pudo reproducir el audio:', e));
    document.body.classList.add('abierto');
  });

  iniciarContador();
  configurarModalConfirmacion();
  configurarEnvioFormulario();
});

// ⏳ Contador circular hacia el evento
function iniciarContador() {
  const fechaEvento = new Date("August 15, 2025 21:00:00").getTime();

  const spanDias = document.getElementById("dias");
  const spanHoras = document.getElementById("horas");
  const spanMinutos = document.getElementById("minutos");
  const spanSegundos = document.getElementById("segundos");

  if (!spanDias || !spanHoras) return;

  setInterval(() => {
    const ahora = new Date().getTime();
    const distancia = fechaEvento - ahora;

    if (distancia <= 0) {
      spanDias.innerText = "0";
      spanHoras.innerText = "0";
      spanMinutos.innerText = "0";
      spanSegundos.innerText = "0";
      return;
    }

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    spanDias.innerText = dias;
    spanHoras.innerText = horas;
    spanMinutos.innerText = minutos;
    spanSegundos.innerText = segundos;
  }, 1000);
}

// 📍 Ir a una sección con scroll suave
function irASeccion(id) {
  const seccion = document.getElementById(id);
  if (seccion) {
    seccion.scrollIntoView({ behavior: "smooth" });
  }
}

// ✅ Modal de confirmación (solo se activa con el botón correcto)
function configurarModalConfirmacion() {
  const modal = document.getElementById("modalConfirmacion");

  // 👇 Buscamos el botón de "Confirmar asistencia" dentro del bloque específico
  const botonAbrir = document.querySelector("#info .bloque-info:last-of-type .boton-confirmar");
  const botonCerrar = document.querySelector(".cerrar-modal");

  if (!modal || !botonAbrir || !botonCerrar) return;

  botonAbrir.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  botonCerrar.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", e => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
}

// 💌 Envío automático del formulario a WhatsApp
function configurarEnvioFormulario() {
  const form = document.getElementById('formAsistencia');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const asiste = form.elements['asiste'].value;
    const nombre = form.elements['nombre'].value.trim();

    const extraInput = form.elements['extra'];
    const extra = extraInput ? extraInput.value.trim() : "";

    let mensaje = `Hola Lucila! Soy ${nombre} y `;

    if (asiste === "sí") {
      mensaje += `confirmo mi asistencia a tu cumple 🎉✨`;
    } else {
      mensaje += `no voy a poder asistir 😢`;
    }

    if (extra !== "") {
      mensaje += `\n\nExtra: ${extra}`;
    }

    const url = `https://wa.me/59896108633?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');

    document.getElementById("modalConfirmacion").style.display = "none";
    form.reset();
  });
}

// 📋 Función para copiar cuenta sin abrir modal
function copiarCuenta(event) {
  if (event) event.stopPropagation(); // 🔒 Detiene cualquier propagación que dispare otros efectos

  const cuenta = document.getElementById("cuentaItau");
  const numeroCuenta = cuenta.textContent.trim();

  navigator.clipboard.writeText(numeroCuenta)
    .then(() => {
      const original = cuenta.innerHTML;
      cuenta.innerHTML = "Copiado ✅";
      setTimeout(() => {
        cuenta.innerHTML = original;
      }, 1500);
    })
    .catch(err => {
      console.error("Error al copiar:", err);
    });
}
