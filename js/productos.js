// Variables para paginación
let paginaActual = 1;
const productosPorPagina = 15;

// Función para mostrar los productos
async function mostrarProductos(pagina = 1) {
    try {
        const productos = await obtenerProductos();
        const totalPaginas = Math.ceil(productos.length / productosPorPagina);
        
        document.getElementById('pagina-actual').textContent = `Página ${pagina} de ${totalPaginas}`;
        
        const inicio = (pagina - 1) * productosPorPagina;
        const fin = inicio + productosPorPagina;
        const productosAPintar = productos.slice(inicio, fin);
        
        await renderizarProductos(productosAPintar);
        actualizarBotonesPaginacion(pagina, totalPaginas);
    } catch (error) {
        console.error('Error al mostrar productos:', error);
    }
}

function renderizarProductos(productos) {
    return new Promise((resolve) => {
        const contenedor = document.getElementById('productos-lista');
        contenedor.innerHTML = '';
        
        productos.forEach(producto => {
            const card = document.createElement('div');
            card.className = 'producto-card';
            card.innerHTML = `
                <img src="../assets/img/${producto.imagen}" alt="${producto.nombre}" onerror="this.src='../assets/img/default.png'">
                <h3>${producto.nombre}</h3>
                <p>Categoría: ${producto.categoria}</p>
                <p>Precio: $${producto.precio.toLocaleString()}</p>
                <p>Marca: ${producto.marca}</p>
                <p>Compatibilidad: ${producto.compatibilidad}</p>
                <p>Código: ${producto.codigo}</p>
            `;
            contenedor.appendChild(card);
        });
        
        resolve();
    });
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
