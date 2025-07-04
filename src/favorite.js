import {setupRandomButton} from './utils/randombtn.js'

setupRandomButton('randomLink');

const eliminarTodosBtn = document.getElementById('eliminarTodos');
const favoritosEl = document.getElementById('favoritos');

const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

//De esta forma mostramos los favoritos existentes y si no hay se le notifica el usuario que no añadio ningun favorito
if (favoritos.length === 0) {
    favoritosEl.innerHTML = '<p>No tienes países favoritos.</p>';
    eliminarTodosBtn.disabled = true;
} else {
    favoritos.forEach(pais => {
        const div = document.createElement('div');
        div.classList.add('country');

        div.innerHTML = `
            <img src="${pais.flags.svg}" alt="Bandera de ${pais.name.common}">
            <p>${pais.name.common}</p>
            <button class="grlbtn eliminar-individual" data-nombre="${pais.name.common}">Eliminar</button>
        `;

        div.addEventListener('click', () => {
            localStorage.setItem('paisSeleccionado', JSON.stringify(pais));
            window.location.href = '/src/pages/detalles.html';
        });

        favoritosEl.appendChild(div);
    });

    document.querySelectorAll('.eliminar-individual').forEach(boton => {
        boton.addEventListener('click', (e) => {
            e.stopPropagation();
            const nombre = e.target.getAttribute('data-nombre');
            eliminarFavorito(nombre);
        });
    });
}


//Con esto eliminamos todos los favoritos
eliminarTodosBtn.addEventListener('click', () => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "Esta acción eliminará todos tus favoritos.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#801616',
        cancelButtonColor: '#555',
        confirmButtonText: 'Sí, eliminar todos',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('favoritos');
            window.location.reload();
        }
    });
});

//Con esto se elimina el favorito elegido
function eliminarFavorito(nombre) {
    const nuevosFavoritos = favoritos.filter(pais => pais.name.common !== nombre);
    localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
    window.location.reload(); 
}
