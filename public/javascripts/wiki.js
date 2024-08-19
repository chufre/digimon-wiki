document.getElementById("filtroResultados").addEventListener("change", updateResults);

// actualizar digimons segun los filtros
function updateResults() {
    // cantidad de digimons a mostrar
    var mostrando = 0;
    // nivel seleccionado
    var levelSelected = document.getElementById("levelSelect").value;
    // nombre para filtrar
    var nameTxt = document.getElementById("nameTxt").value.toUpperCase();
    // cards de digimons
    var cards = document.getElementById("digimonCards").children;
    for (let card of cards) {
        if (card.textContent.includes(": " + levelSelected) && card.id.toUpperCase().substring(5).includes(nameTxt)) {
            // si se encuentra el nivel y el texto a filtrar se encuentra en el nombre, se quita la propiedad "d-none" para mostrar la carta
            card.classList.remove("d-none");
            mostrando++;
        } else {
            // en caso contrario, se oculta
            card.classList.add("d-none");
        }
    }
    // actualizar numero de resultados
    document.getElementById("resultados").innerHTML = " Se encontraron " + mostrando + " Digimons";
    // si no hay resultados, mostrar mensaje explicando
    if (!mostrando) {
        document.getElementById("sinResultados").classList.remove("d-none");
    } else {
        document.getElementById("sinResultados").classList.add("d-none");
    }
};

// quitar los filtros para volver a mostrar todos los digimons
function quitarFiltros() {
    document.getElementById("levelSelect").value = "";
    document.getElementById("nameTxt").value = "";
    updateResults();
}
