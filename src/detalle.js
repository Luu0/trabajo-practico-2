import {setupRandomButton} from './utils/randombtn'

setupRandomButton('randomLink');

const pais = JSON.parse(localStorage.getItem('paisSeleccionado'));

if (pais) {
    const contenedor = document.getElementById('detallesPais');

    contenedor.innerHTML = `
        <div class="detalle-container">
            <div class="bandera">
                <img src="${pais.flags.svg}" alt="Bandera de ${pais.name.common}">
            </div>
            <div class="informacion">
                <h1>${pais.name.common}</h1>
                <p><strong>Nombre Oficial:</strong> ${pais.name.official || 'No disponible'}</p>
                <p><strong>Continente:</strong> ${pais.continents ? pais.continents[0] : 'No disponible'}</p>
                <p><strong>Capital:</strong> ${pais.capital ? pais.capital[0] : 'No disponible'}</p>
                <p><strong>Región:</strong> ${pais.region || 'No disponible'}</p>
                <p><strong>Población:</strong> ${pais.population || 'No disponible'}</p>
                <button id="agregarFavorito">Agregar a Favoritos</button>
                <button id="volver">Volver</button>
            </div>
        </div>
    `;

    document.getElementById('volver').addEventListener('click', () => {
        window.location.href = '/index.html';
    });
} else {
    document.body.innerHTML = '<h2>No se encontraron datos del país.</h2>';
}

//Añadir a favoritos
document.getElementById('agregarFavorito').addEventListener('click', () => {
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    // Evitar duplicados
    if (!favoritos.some(fav => fav.name.common === pais.name.common)) {
        favoritos.push(pais);
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
        Swal.fire({
            icon: 'success',
            title: '¡Agregado!',
            text: 'El país fue agregado a tus favoritos',
            confirmButtonColor: '#801616'
        });

    } else {
        Swal.fire({
            icon: 'warning',
            title: '¡Agregado!',
            text: 'El pais ya esta en tus favoritos!',
            confirmButtonColor: '#801616'
        });
    }
});
