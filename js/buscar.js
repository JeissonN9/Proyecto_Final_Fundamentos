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
    
    btnBuscar.addEventListener('click', realizarBusqueda);
    btnLimpiar.addEventListener('click', limpiarFiltros);
    
    document.getElementById('anterior').addEventListener('click', () => cambiarPagina(-1));
    document.getElementById('siguiente').addEventListener('click', () => cambiarPagina(1));
});

function buscarProductos() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const nombre = document.getElementById('filtro-nombre').value.toLowerCase();
            const categoria = document.getElementById('filtro-categoria').value;
            const precioMax = document.getElementById('filtro-precio').value;
            const marca = document.getElementById('filtro-marca').value.toLowerCase();
            
            const productos = obtenerProductos();
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
            resolve();
        }, 2000);
    });
}

async function realizarBusqueda() {
    try {
        await buscarProductos();
    } catch (error) {
        console.error('Error al realizar la búsqueda:', error);
    }
}

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
        `;
        tbody.appendChild(tr);
    });
    
    actualizarPaginacion();
}

function limpiarFiltros() {
    document.getElementById('filtro-nombre').value = '';
    document.getElementById('filtro-categoria').value = '';
    document.getElementById('filtro-precio').value = '';
    document.getElementById('filtro-marca').value = '';
    document.getElementById('total-resultados').textContent = '';
    document.querySelector('#tabla-resultados tbody').innerHTML = '';
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
    
    document.getElementById('anterior').disabled = paginaActual === 1;
    document.getElementById('siguiente').disabled = paginaActual === totalPaginas;
}
