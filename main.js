console.log("Página de la empresa cargada correctamente")

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