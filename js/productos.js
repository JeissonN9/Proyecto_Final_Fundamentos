// Variables para paginación
let paginaActual = 1;
const productosPorPagina = 15;

// Función para mostrar los productos
async function mostrarProductos(pagina = 1) {
    try {
        const productos = await obtenerProductos();
        const totalPaginas = Math.ceil(productos.length / productosPorPagina);
        
        // Validar límites de página
        if (pagina < 1) pagina = 1;
        if (pagina > totalPaginas) pagina = totalPaginas;
        
        // Actualizar estado de la página
        paginaActual = pagina;
        
        // Actualizar información de paginación
        document.getElementById('pagina-actual').textContent = 
            `Página ${pagina} de ${totalPaginas}`;
        
        const inicio = (pagina - 1) * productosPorPagina;
        const fin = inicio + productosPorPagina;
        const productosAPintar = productos.slice(inicio, fin);
        
        // Actualizar botones de paginación
        document.getElementById('anterior').disabled = pagina <= 1;
        document.getElementById('siguiente').disabled = pagina >= totalPaginas;
        
        // Renderizar productos
        const contenedor = document.getElementById('productos-lista');
        contenedor.innerHTML = '';
        
        productosAPintar.forEach(producto => {
            const card = document.createElement('div');
            card.className = 'producto-card';
            card.innerHTML = `
                <img src="../assets/img/${producto.imagen}" 
                     alt="${producto.nombre}" 
                     onerror="this.src='../assets/img/default.png'">
                <h3>${producto.nombre}</h3>
                <p>Categoría: ${producto.categoria}</p>
                <p>Precio: $${producto.precio.toLocaleString()}</p>
                <p>Marca: ${producto.marca}</p>
                <p>Compatibilidad: ${producto.compatibilidad}</p>
                <p>Código: ${producto.codigo}</p>
            `;
            contenedor.appendChild(card);
        });
        
    } catch (error) {
        console.error('Error al mostrar productos:', error);
        throw error;
    }
}

// Event listeners para paginación
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await mostrarProductos(paginaActual);
        
        document.getElementById('anterior').addEventListener('click', async () => {
            if (paginaActual > 1) {
                paginaActual--;
                await mostrarProductos(paginaActual);
            }
        });

        document.getElementById('siguiente').addEventListener('click', async () => {
            const productos = await obtenerProductos();
            const totalPaginas = Math.ceil(productos.length / productosPorPagina);
            
            if (paginaActual < totalPaginas) {
                paginaActual++;
                await mostrarProductos(paginaActual);
            }
        });
    } catch (error) {
        console.error('Error al inicializar la página:', error);
        document.getElementById('productos-lista').innerHTML = 
            '<p>Error al cargar los productos. Por favor, intente más tarde.</p>';
    }
});

// Iniciar cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos(paginaActual);
});
