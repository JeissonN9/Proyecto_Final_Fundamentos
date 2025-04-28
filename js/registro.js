document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-registro');

    // Crear div para mostrar producto registrado
    const vistaPrevia = document.createElement('div');
    vistaPrevia.id = 'vista-previa';
    form.parentNode.insertBefore(vistaPrevia, form.nextSibling);

    function validarCampos() {
        const validaciones = {
            nombre: value => value.length > 0 && value.length <= 20,
            categoria: value => value.length > 0,
            imagen: value => value.length > 0,
            codigo: value => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*\d).{8,}$/.test(value),
            precio: value => !isNaN(value) && parseInt(value) > 0,
            marca: value => value.length > 0,
            compatibilidad: value => value.length > 0
        };

        let errores = [];
        for (const [campo, validador] of Object.entries(validaciones)) {
            const elemento = document.getElementById(campo);
            if (!validador(elemento.value.trim())) {
                errores.push(campo);
            }
        }

        return errores;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validar código del producto
        const codigo = document.getElementById('codigo').value;
        const codigoValido = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*\d).{8,}$/.test(codigo);

        if (!codigoValido) {
            alert('El código del producto no cumple con los requisitos');
            setTimeout(() => {
                window.location.href = 'indicaciones.html';
            }, 1000);
            return;
        }

        // Si el código es válido, continuar con el registro
        const nuevoProducto = {
            nombre: document.getElementById('nombre').value,
            categoria: document.getElementById('categoria').value,
            imagen: document.getElementById('imagen').value,
            codigo: document.getElementById('codigo').value,
            precio: parseInt(document.getElementById('precio').value),
            marca: document.getElementById('marca').value,
            compatibilidad: document.getElementById('compatibilidad').value
        };

        try {
            const productosActuales = JSON.parse(localStorage.getItem('productos')) || [];
            productosActuales.push(nuevoProducto);
            localStorage.setItem('productos', JSON.stringify(productosActuales));

            // Mostrar el producto registrado
            mostrarProductoRegistrado(nuevoProducto);
            
            // Esperar 2 segundos y redirigir a la lista de productos
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } catch (error) {
            console.error('Error al guardar el producto:', error);
            alert('Error al registrar el producto');
        }
    });

    function mostrarProductoRegistrado(producto) {
        vistaPrevia.innerHTML = `
            <h3>Producto Registrado:</h3>
            <div class="producto-card">
                <img src="../../img/${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>Categoría: ${producto.categoria}</p>
                <p>Precio: $${producto.precio.toLocaleString()}</p>
                <p>Marca: ${producto.marca}</p>
                <p>Compatibilidad: ${producto.compatibilidad}</p>
                <p>Código: ${producto.codigo}</p>
            </div>
        `;
    }
});
