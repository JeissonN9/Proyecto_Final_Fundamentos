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

        // Validar todos los campos
        const errores = validarCampos();
        if (errores.length > 0) {
            alert('Los siguientes campos son inválidos: ' + errores.join(', ') + 
                  '\nSerás redirigido a la página de indicaciones.');
            setTimeout(() => {
                window.location.href = 'indicaciones.html';
            }, 1500);
            return;
        }

        // Crear objeto del nuevo producto
        const nuevoProducto = {
            nombre: document.getElementById('nombre').value.trim(),
            categoria: document.getElementById('categoria').value.trim(),
            imagen: document.getElementById('imagen').value.trim(),
            codigo: document.getElementById('codigo').value.trim(),
            precio: parseInt(document.getElementById('precio').value),
            marca: document.getElementById('marca').value.trim(),
            compatibilidad: document.getElementById('compatibilidad').value.trim()
        };

        try {
            // Verificar si el código ya existe
            const productos = JSON.parse(localStorage.getItem('productos')) || [];
            if (productos.some(p => p.codigo === nuevoProducto.codigo)) {
                alert('Ya existe un producto con ese código.\nSerás redirigido a la página de indicaciones.');
                setTimeout(() => {
                    window.location.href = 'indicaciones.html';
                }, 1500);
                return;
            }

            // Agregar el nuevo producto
            productos.push(nuevoProducto);
            localStorage.setItem('productos', JSON.stringify(productos));

            // Mostrar el producto registrado
            mostrarProductoRegistrado(nuevoProducto);
            
            // Limpiar el formulario
            form.reset();

            // Redirigir después de 2 segundos
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);

        } catch (error) {
            console.error('Error al guardar el producto:', error);
            alert('Error al registrar el producto.\nSerás redirigido a la página de indicaciones.');
            setTimeout(() => {
                window.location.href = 'indicaciones.html';
            }, 1500);
        }
    });

    function mostrarProductoRegistrado(producto) {
        vistaPrevia.innerHTML = `
            <h3>Producto Registrado:</h3>
            <div class="producto-card">
                <img src="../assets/img/${producto.imagen}" alt="${producto.nombre}">
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
