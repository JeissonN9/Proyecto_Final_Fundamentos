// Variables para paginación
let paginaActual = 1;
const productosPorPagina = 15;

function eliminarProducto(codigo) {
    if (confirm('¿Está seguro de eliminar este producto?')) {
        let productos = obtenerProductos();
        productos = productos.filter(p => p.codigo !== codigo);
        localStorage.setItem('productos', JSON.stringify(productos));
        mostrarProductos(paginaActual);
    }
}

// Función para mostrar los productos
function mostrarProductos(pagina = 1) {
    const productos = obtenerProductos();
    const contenedor = document.getElementById('productos-lista');
    const totalPaginas = Math.ceil(productos.length / productosPorPagina);
    
    // Actualizar número de página visible
    const paginaInfo = document.getElementById('pagina-actual');
    paginaInfo.textContent = `Página ${pagina} de ${totalPaginas}`;
    
    // Calcular productos para esta página
    const inicio = (pagina - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;
    const productosAPintar = productos.slice(inicio, fin);
    
    // Limpiar contenedor
    contenedor.innerHTML = '';
    
    // Mostrar productos
    productosAPintar.forEach(producto => {
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
        contenedor.appendChild(card);
    });

    // Actualizar estado de botones
    document.getElementById('anterior').disabled = pagina === 1;
    document.getElementById('siguiente').disabled = pagina === totalPaginas;
}

// Event listeners para paginación
document.getElementById('anterior').addEventListener('click', () => {
    if (paginaActual > 1) {
        paginaActual--;
        mostrarProductos(paginaActual);
        window.scrollTo(0, 0); // Volver al inicio de la página
    }
});

document.getElementById('siguiente').addEventListener('click', () => {
    const productos = obtenerProductos();
    const totalPaginas = Math.ceil(productos.length / productosPorPagina);
    if (paginaActual < totalPaginas) {
        paginaActual++;
        mostrarProductos(paginaActual);
        window.scrollTo(0, 0); // Volver al inicio de la página
    }
});

// Iniciar cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos(paginaActual);
});
