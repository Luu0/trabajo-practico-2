import {setupRandomButton} from './utils/randombtn.js'

setupRandomButton('randomLink');

const favoritosEl = document.getElementById('favoritos');

const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

if (favoritos.length === 0) {
    favoritosEl.innerHTML = '<p>No tienes países favoritos.</p>';
} else {
    favoritos.forEach(pais => {
        const div = document.createElement('div');
        div.classList.add('country');

        div.innerHTML = `
            <img src="${pais.flags.svg}" alt="Bandera de ${pais.name.common}">
            <p>${pais.name.common}</p>
            <button class="grlbtn" data-nombre="${pais.name.common}">Eliminar</button>
        `;

        div.addEventListener('click', () => {
            localStorage.setItem('paisSeleccionado', JSON.stringify(pais));
            window.location.href = '/src/pages/detalles.html';
        });

        favoritosEl.appendChild(div);
    });

    document.querySelectorAll('.grlbtn').forEach(boton => {
        boton.addEventListener('click', (e) => {
            const nombre = e.target.getAttribute('data-nombre');
            eliminarFavorito(nombre);
        });
    });
}

function eliminarFavorito(nombre) {
    const nuevosFavoritos = favoritos.filter(pais => pais.name.common !== nombre);
    localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
    window.location.reload(); 
}


