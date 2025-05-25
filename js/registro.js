document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-registro');

    // Crear div para mostrar producto registrado
    const vistaPrevia = document.createElement('div');
    vistaPrevia.id = 'vista-previa';
    form.parentNode.insertBefore(vistaPrevia, form.nextSibling);

    function validarCampos() {
        const validaciones = {
            nombre: {
                validator: value => value.length > 0 && value.length <= 20,
                message: 'El nombre debe tener entre 1 y 20 caracteres'
            },
            categoria: {
                validator: value => value.length > 0,
                message: 'Debe seleccionar una categoría'
            },
            imagen: {
                validator: value => value.length > 0,
                message: 'Debe seleccionar una imagen'
            },
            codigo: {
                validator: value => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*\d).{8,}$/.test(value),
                message: 'El código debe tener al menos 8 caracteres, una minúscula, una mayúscula y dos números'
            },
            precio: {
                validator: value => !isNaN(value) && parseInt(value) > 0,
                message: 'El precio debe ser un número positivo'
            },
            marca: {
                validator: value => value.length > 0,
                message: 'La marca es requerida'
            },
            compatibilidad: {
                validator: value => value.length > 0,
                message: 'La compatibilidad es requerida'
            }
        };

        let errores = [];
        for (const [campo, config] of Object.entries(validaciones)) {
            const elemento = document.getElementById(campo);
            if (!config.validator(elemento.value.trim())) {
                errores.push(`${campo}: ${config.message}`);
            }
        }

        return errores;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validar todos los campos
        const errores = validarCampos();
        if (errores.length > 0) {
            alert('Errores de validación:\n' + errores.join('\n'));
            window.location.href = 'indicaciones.html';
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
            const productos = await obtenerProductos();
            const codigo = document.getElementById('codigo').value.trim();
            
            if (productos.some(p => p.codigo === codigo)) {
                alert('Error: Ya existe un producto con ese código');
                window.location.href = 'indicaciones.html';
                return;
            }

            // Agregar el nuevo producto
            await agregarProducto(nuevoProducto);
            await mostrarProductoRegistrado(nuevoProducto);
            // Limpiar el formulario
            form.reset();

            // Redirigir después de 2 segundos
            await new Promise(resolve => setTimeout(resolve, 2000));
            window.location.href = 'index.html';

        } catch (error) {
            console.error('Error:', error);
            alert('Error al registrar el producto');
            window.location.href = 'indicaciones.html';
        }
    });

    function mostrarProductoRegistrado(producto) {
        return new Promise((resolve) => {
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
            resolve();
        });
    }
});
