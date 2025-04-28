document.getElementById('buscar').addEventListener('click', () => {
    const resultadosDiv = document.getElementById('resultados-busqueda');
    resultadosDiv.innerHTML = '<p>Buscando...</p>';

    setTimeout(() => {
        // Realizar la búsqueda
        const nombre = document.getElementById('filtro-nombre').value.toLowerCase();
        const categoria = document.getElementById('filtro-categoria').value;
        
        const productos = JSON.parse(localStorage.getItem('productos')) || [];
        const resultados = productos.filter(producto => {
            return (nombre === '' || producto.nombre.toLowerCase().includes(nombre)) &&
                   (categoria === '' || producto.categoria === categoria);
        });

        mostrarResultados(resultados);
    }, 2000);
});

function mostrarResultados(resultados) {
    const resultadosDiv = document.getElementById('resultados-busqueda');
    resultadosDiv.innerHTML = '';
    
    if (resultados.length === 0) {
        resultadosDiv.innerHTML = '<p>No se encontraron productos</p>';
        return;
    }

    resultadosDiv.className = 'grid-productos';
    
    resultados.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'producto-card';
        card.innerHTML = `
            <img src="../assets/img/${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>Categoría: ${producto.categoria}</p>
            <p>Precio: $${producto.precio.toLocaleString()}</p>
            <p>Marca: ${producto.marca}</p>
            <p>Compatibilidad: ${producto.compatibilidad}</p>
            <p>Código: ${producto.codigo}</p>
        `;
        resultadosDiv.appendChild(card);
    });
}
