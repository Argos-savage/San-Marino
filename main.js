console.log("Página de la empresa cargada correctamente")

const STORAGE_CITAS_KEY = "sm_citas_sanmarino";

const yearSpan = document.querySelector("#current-year");

if(yearSpan) {
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
    console.log("Año Actualizado en el footer:", currentYear);
}
const btnHorario = document.querySelector("#btn-horario");
const horario = document.querySelector("#horario");

if(btnHorario && horario){
    btnHorario.addEventListener ("click",()=>{
        const estaOculto = horario.classList.contains("oculto");

        if(estaOculto){
            horario.classList.remove("oculto");
            btnHorario.textContent = "Ocultar horario";
        }else{
            horario.classList.add("oculto");
            btnHorario.textContent="Ver horario de atención";
        }
    });
}
const carrusel = document.querySelectorAll(".carrusel");

carrusel.forEach((carrusel) => {
    const imagenes = carrusel.querySelectorAll(".carrusel-track img");
    const btnprevia = carrusel.querySelector(".carrusel-btn.previa");
    const btnproximo = carrusel.querySelector(".carrusel-btn.proximo");

    if(imagenes.length === 0 || !btnprevia || !btnproximo) return;
    
    let indiceActual=0;

    function mostrarImagen(index){
        imagenes.forEach((img, i) => {
            img.classList.toggle("activa", i === index);
        });
    }
    mostrarImagen(indiceActual);

    btnproximo.addEventListener("click",() => {
        indiceActual = (indiceActual + 1) % imagenes.length;
        mostrarImagen(indiceActual);
    });
    btnprevia.addEventListener("click",()=> {
        indiceActual=(indiceActual - 1 + imagenes.length) % imagenes.length;
        mostrarImagen(indiceActual);
    });
})
const whatsappNumber = 584129474320
const formCita = document.querySelector(".form-cita");
const totalSpan = document.querySelector("#total-estimado");

if (formCita && totalSpan) {
  const preciosServicios = {
    "Alineación": 25,
    "Balanceo": 40,
    "Cambio de aceite": 30,
    "Revisión de frenos": 15,
    "Revisión general": 10,
    "Otro servicio": 0,
  };

  const checkboxesServicios = formCita.querySelectorAll('input[name="servicios"]');

  function actualizarTotal() {
    let total = 0;

    checkboxesServicios.forEach((chk) => {
      if (chk.checked) {
        const precio = preciosServicios[chk.value] || 0;
        total += precio;
      }
    });

    totalSpan.textContent = `$${total}`;
  }

  checkboxesServicios.forEach((chk) => {
    chk.addEventListener("change", actualizarTotal);
  });

  actualizarTotal();


  const whatsappNumber = "584129474320";

  formCita.addEventListener("submit", (event) => {
    event.preventDefault();

    const datos = new FormData(formCita);

    const nombre = datos.get("nombre") || "Sin nombre";
    const telefono = datos.get("telefono") || "Sin teléfono";
    const vehiculo = datos.get("vehiculo") || "Sin vehículo";
    const placa = datos.get("placa") || "Sin placa";
    const comentario = datos.get("comentario") || "Sin comentarios";
    const serviciosSeleccionados = datos.getAll("servicios");
    const aceptaPromos = datos.get("acepta_promos") ? "Sí" : "No";
    const totalTexto = totalSpan.textContent || "$0";

const cita = {
      fechaISO: new Date().toISOString(),
      nombre,
      telefono,
      vehiculo,
      placa,
      servicios: serviciosSeleccionados,
      comentario,
      aceptaPromos,
      total: totalTexto,
    };

    try {
      const citasPrevias = JSON.parse(localStorage.getItem(STORAGE_CITAS_KEY) || "[]");
      citasPrevias.push(cita);
      localStorage.setItem(STORAGE_CITAS_KEY, JSON.stringify(citasPrevias));
      console.log("Cita guardada en localStorage:", cita);
    } catch (error) {
      console.error("Error guardando cita en localStorage", error);
    }

    const mensaje = `
Hola, soy ${nombre}

WhatsApp / Teléfono: ${telefono}

Vehículo: ${vehiculo}

Placa: ${placa}

Servicios que deseo realizar:
${serviciosSeleccionados.length ? "• " + serviciosSeleccionados.join("\n• ") : "No indiqué servicios"}

Comentario sobre el carro:
${comentario}

Acepto recibir promociones: ${aceptaPromos}

Total estimado: ${totalTexto}

Enviado desde la web de Auto Servicio San Marino.
    `.trim();

    const textoCodificado = encodeURIComponent(mensaje);

    const urlWhatsApp = `https://wa.me/${whatsappNumber}?text=${textoCodificado}`;

    window.location.href = urlWhatsApp;
  });
}

(function () {
  const tablaBody = document.querySelector("#tabla-citas-body");
  if (!tablaBody) return; 
  let citas = [];
  try {
    citas = JSON.parse(localStorage.getItem(STORAGE_CITAS_KEY) || "[]");
  } catch (error) {
    console.error("Error leyendo citas de localStorage", error);
  }

  if (!citas.length) {
    tablaBody.innerHTML = `
      <tr>
        <td colspan="7">No hay citas guardadas todavía en este navegador.</td>
      </tr>
    `;
    return;
  }

  const filasHtml = citas.map((cita, index) => {
    const fechaObj = new Date(cita.fechaISO || Date.now());
    const fechaBonita = fechaObj.toLocaleString("es-VE", {
      dateStyle: "short",
      timeStyle: "short",
    });

    const serviciosTexto = (cita.servicios || []).join(", ");

    return `
      <tr>
        <td>${index + 1}</td>
        <td>${fechaBonita}</td>
        <td>${cita.nombre || ""}</td>
        <td>${cita.vehiculo || ""}</td>
        <td>${cita.placa || ""}</td>
        <td>${serviciosTexto}</td>
        <td>${cita.total || ""}</td>
      </tr>
    `;
  }).join("");

  tablaBody.innerHTML = filasHtml;
})();
