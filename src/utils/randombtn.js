//Funcion para buscar un pais random
export function setupRandomButton(buttonId) {
    const randomLink = document.getElementById(buttonId);

    if (randomLink) {
        randomLink.addEventListener('click', () => {
            fetch('https://restcountries.com/v3.1/all?fields=name,flags,continents,capital,region,population')
                .then(response => response.json())
                .then(data => {
                    const randomIndex = Math.floor(Math.random() * data.length);
                    const randomPais = data[randomIndex];

                    localStorage.setItem('paisSeleccionado', JSON.stringify(randomPais));
                    window.location.href = '/detalles.html';
                })
                .catch(error => console.error('Error al obtener un país aleatorio:', error));
        });
    }
}
