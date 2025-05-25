document.getElementById('buscar').addEventListener('click', async () => {
    const resultadosDiv = document.getElementById('resultados-busqueda');
    resultadosDiv.innerHTML = '<p>Buscando...</p>';

    try {
        await buscarProductos();
    } catch (error) {
        resultadosDiv.innerHTML = '<p>Error al realizar la búsqueda</p>';
        console.error('Error:', error);
    }
});

let paginaActual = 1;
const resultadosPorPagina = 10;
let resultadosActuales = [];

document.addEventListener('DOMContentLoaded', () => {
    const btnBuscar = document.getElementById('buscar');
    const btnLimpiar = document.getElementById('limpiar-filtros');
    
    // Event listener para el botón de búsqueda
    btnBuscar.addEventListener('click', async () => {
        const nombre = document.getElementById('filtro-nombre').value.toLowerCase();
        const categoria = document.getElementById('filtro-categoria').value;
        const precioMax = document.getElementById('filtro-precio').value;
        const marca = document.getElementById('filtro-marca').value.toLowerCase();
        
        try {
            const productos = await obtenerProductos();
            resultadosActuales = productos.filter(producto => {
                return (!nombre || producto.nombre.toLowerCase().includes(nombre)) &&
                       (!categoria || producto.categoria === categoria) &&
                       (!precioMax || producto.precio <= parseFloat(precioMax)) &&
                       (!marca || producto.marca.toLowerCase().includes(marca));
            });
            
            document.getElementById('total-resultados').textContent = 
                `Se encontraron ${resultadosActuales.length} productos`;
            
            paginaActual = 1;
            mostrarResultados();
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('total-resultados').textContent = 'Error al buscar productos';
        }
    });
    
    // Event listener para el botón limpiar
    btnLimpiar.addEventListener('click', async () => {
        // Limpiar campos
        document.getElementById('filtro-nombre').value = '';
        document.getElementById('filtro-categoria').value = '';
        document.getElementById('filtro-precio').value = '';
        document.getElementById('filtro-marca').value = '';
        
        try {
            // Recargar todos los productos
            const productos = await obtenerProductos();
            resultadosActuales = productos;
            
            // Actualizar vista
            document.getElementById('total-resultados').textContent = 
                `Se encontraron ${resultadosActuales.length} productos`;
            paginaActual = 1;
            mostrarResultados();
        } catch (error) {
            console.error('Error al limpiar filtros:', error);
            document.getElementById('total-resultados').textContent = 'Error al cargar productos';
        }
    });
    
    // Event listeners para paginación
    document.getElementById('anterior').addEventListener('click', () => {
        if (paginaActual > 1) {
            paginaActual--;
            mostrarResultados();
        }
    });

    document.getElementById('siguiente').addEventListener('click', () => {
        const totalPaginas = Math.ceil(resultadosActuales.length / resultadosPorPagina);
        if (paginaActual < totalPaginas) {
            paginaActual++;
            mostrarResultados();
        }
    });
});

function mostrarResultados() {
    const inicio = (paginaActual - 1) * resultadosPorPagina;
    const fin = inicio + resultadosPorPagina;
    const productosPagina = resultadosActuales.slice(inicio, fin);
    
    const tbody = document.querySelector('#tabla-resultados tbody');
    tbody.innerHTML = '';
    
    productosPagina.forEach(producto => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="../assets/img/${producto.imagen}" alt="${producto.nombre}" class="tabla-imagen"></td>
            <td>${producto.nombre}</td>
            <td>${producto.categoria}</td>
            <td>$${producto.precio.toLocaleString()}</td>
            <td>${producto.marca}</td>
            <td>${producto.compatibilidad}</td>
            <td>
                <button class="btn-eliminar" data-codigo="${producto.codigo}">
                    Eliminar
                </button>
            </td>
        `;
        
        // Añadir event listener para el botón eliminar
        const btnEliminar = tr.querySelector('.btn-eliminar');
        btnEliminar.addEventListener('click', async () => {
            if (confirm('¿Está seguro de eliminar este producto?')) {
                try {
                    await eliminarProducto(producto.codigo);
                    // Actualizar resultados después de eliminar
                    const productos = await obtenerProductos();
                    resultadosActuales = productos;
                    mostrarResultados();
                    document.getElementById('total-resultados').textContent = 
                        `Se encontraron ${resultadosActuales.length} productos`;
                } catch (error) {
                    console.error('Error al eliminar:', error);
                    alert('Error al eliminar el producto');
                }
            }
        });
        
        tbody.appendChild(tr);
    });
    
    actualizarPaginacion();
}

function cambiarPagina(direccion) {
    const totalPaginas = Math.ceil(resultadosActuales.length / resultadosPorPagina);
    const nuevaPagina = paginaActual + direccion;
    
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
        paginaActual = nuevaPagina;
        mostrarResultados();
    }
}

function actualizarPaginacion() {
    const totalPaginas = Math.ceil(resultadosActuales.length / resultadosPorPagina);
    document.getElementById('pagina-actual').textContent = 
        `Página ${paginaActual} de ${totalPaginas}`;
    
    document.getElementById('anterior').disabled = paginaActual <= 1;
    document.getElementById('siguiente').disabled = paginaActual >= totalPaginas;
}
