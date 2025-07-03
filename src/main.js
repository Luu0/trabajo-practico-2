import {setupRandomButton} from './utils/randombtn.js'

const contenedorEl = document.getElementById('banderas');
const prevButtonEl = document.getElementById('prev');
const nextButtonEl = document.getElementById('next');
const pageInfoEl = document.getElementById('page-info');
const buscadorEl = document.getElementById('buscador');
const filtroRegionEl = document.getElementById('filtroRegion')


setupRandomButton('randomLink');

let currenturl = 'https://restcountries.com/v3.1/all?fields=name,flags,continents,capital,region,population';

let paises = [];
let paisesFiltrados = [];
let currentPage = 1;
const itemPerPage = 33;



// Llamada a la API 
fetch(currenturl)
    .then(response => response.json())
    .then(data => {
        paises = data; 
        paisesFiltrados = paises
        mostrarBanderas(); 
    })
    .catch(error => console.error('Error al obtener los países:', error));

// Mostrar banderas de la página actual
function mostrarBanderas() {
    contenedorEl.innerHTML = '';

    const startIndex = (currentPage - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;

    const paisesPagina = paisesFiltrados.slice(startIndex, endIndex);

    paisesPagina.forEach(pais => {
        const div = document.createElement('div');
        div.classList.add('country');

        div.innerHTML = `
            <img src="${pais.flags.svg}" alt="Bandera de ${pais.name.common}">
            <p>${pais.name.common}</p>
        `;

        div.addEventListener('click', () => {
            localStorage.setItem('paisSeleccionado', JSON.stringify(pais));
            window.location.href = '/src/pages/detalles.html';
        });

        contenedorEl.appendChild(div);
    });

    actualizarBotones(); 
}

// Actualiza los botones y el indicador de página
function actualizarBotones() {
    pageInfoEl.textContent = `Página ${currentPage} de ${Math.ceil(paisesFiltrados.length / itemPerPage)}`;
    prevButtonEl.disabled = currentPage === 1;
    nextButtonEl.disabled = currentPage === Math.ceil(paisesFiltrados.length / itemPerPage);
}

// Eventos de navegación
prevButtonEl.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        mostrarBanderas();
    }
});


nextButtonEl.addEventListener('click', () => {
    if (currentPage < Math.ceil(paises.length / itemPerPage)) {
        currentPage++;
        mostrarBanderas();
    }
});


//Evento para el buscador 
buscadorEl.addEventListener('input', () => {
    const texto = buscadorEl.value.toLowerCase();
    const regionSeleccionada = filtroRegionEl.value;

    paisesFiltrados = paises.filter(pais => {
        const nombreCoincide = pais.name.common.toLowerCase().includes(texto);
        const regionCoincide = regionSeleccionada === '' || pais.region === regionSeleccionada;
        return nombreCoincide && regionCoincide;
    });

    currentPage = 1;
    mostrarBanderas();
});

filtroRegionEl.addEventListener('change', () => {
    const regionSeleccionada = filtroRegionEl.value;
    const texto = buscadorEl.value.toLowerCase();

    paisesFiltrados = paises.filter(pais => {
        const nombreCoincide = pais.name.common.toLowerCase().includes(texto);
        const regionCoincide = regionSeleccionada === '' || pais.region === regionSeleccionada;
        return nombreCoincide && regionCoincide;
    });

    currentPage = 1;
    mostrarBanderas();
});
