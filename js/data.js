// Función para inicializar los productos si no existen
function inicializarProductos() {
    // Forzar actualización de productos
    localStorage.removeItem('productos');
    if (!localStorage.getItem('productos')) {
        const productosIniciales = [
            {
                "nombre": "Batería 12V",
                "categoria": "Eléctrico",
                "imagen": "bateria.png",
                "codigo": "abc16b937",
                "precio": 220390,
                "marca": "ACDelco",
                "compatibilidad": "Hyundai Tucson"
            },
            {
                "nombre": "Filtro de Aceite",
                "categoria": "Filtros",
                "imagen": "filtro_aceite.png",
                "codigo": "LMn97c670",
                "precio": 379382,
                "marca": "NGK",
                "compatibilidad": "Hyundai Tucson"
            },
            {
                "nombre": "Pastillas de Freno",
                "categoria": "Frenos",
                "imagen": "pastillas_freno.png",
                "codigo": "LMn66d847",
                "precio": 291697,
                "marca": "ACDelco",
                "compatibilidad": "Ford Ranger"
            },
            {
                "nombre": "Amortiguador Delantero",
                "categoria": "Suspensión",
                "imagen": "amortiguador.png",
                "codigo": "LMn77e976",
                "precio": 296343,
                "marca": "Monroe",
                "compatibilidad": "Ford Ranger"
            },
            {
                "nombre": "Aceite 10W40",
                "categoria": "Lubricantes",
                "imagen": "aceite.png",
                "codigo": "abc80f799",
                "precio": 310377,
                "marca": "Delphi",
                "compatibilidad": "Kia Sportage"
            },
            {
                "nombre": "Correa de Distribución",
                "categoria": "Motor",
                "imagen": "correa.png",
                "codigo": "abc36g374",
                "precio": 402176,
                "marca": "Bosch",
                "compatibilidad": "Toyota Hilux"
            },
            {
                "nombre": "Alternador",
                "categoria": "Eléctrico",
                "imagen": "alternador.png",
                "codigo": "PQr41h642",
                "precio": 134558,
                "marca": "ACDelco",
                "compatibilidad": "Mazda CX-5"
            },
            {
                "nombre": "Bujía de Encendido",
                "categoria": "Encendido",
                "imagen": "bujia.png",
                "codigo": "xyz35i837",
                "precio": 288006,
                "marca": "Valeo",
                "compatibilidad": "Renault Duster"
            },
            {
                "nombre": "Sensor de Oxígeno",
                "categoria": "Sensores",
                "imagen": "sensor_oxigeno.png",
                "codigo": "PQr42j499",
                "precio": 59209,
                "marca": "Delphi",
                "compatibilidad": "Nissan Versa"
            },
            {
                "nombre": "Radiador Aluminio",
                "categoria": "Motor",
                "imagen": "radiador.png",
                "codigo": "PQr71k761",
                "precio": 115449,
                "marca": "Denso",
                "compatibilidad": "Ford Ranger"
            },
            {
                "nombre": "Filtro de aire",
                "categoria": "Lubricacion",
                "imagen": "filtro_aire.png",
                "codigo": "PQr51l936",
                "precio": 296784,
                "marca": "Toyota filter",
                "compatibilidad": "Toyota"
            },
            {
                "nombre": "Discos de freno",
                "categoria": "Frenos",
                "imagen": "discos_freno.png",
                "codigo": "abc20m371",
                "precio": 266385,
                "marca": "imporbrake",
                "compatibilidad": "Nissan Versa"
            },
            {
                "nombre": "Luces Traceras Toyota Hilux",
                "categoria": "Luces",
                "imagen": "luz_tracera_toyota_hilux.png",
                "codigo": "LMn31n524",
                "precio": 153950,
                "marca": "Toyota",
                "compatibilidad": "Toyota Hilux"
            },
            {
                "nombre": "Espejo Retrovisor",
                "categoria": "Espejos",
                "imagen": "espejo_retrovisor_foton.png",
                "codigo": "xyz14o581",
                "precio": 1687962,
                "marca": "Auman",
                "compatibilidad": "Foton Auman"
            },
            {
                "nombre": "Parabrisas Mazda CX-5",  
                "categoria": "Cristales",
                "imagen": "parabrisas_mazda_cx5.png",
                "codigo": "PQr54p348",
                "precio": 3687243,
                "marca": "Mazada",
                "compatibilidad": "Mazda CX-5"
            },
            {
                "nombre": "Fusible de 32 Vcc 10 A",
                "categoria": "Eléctrico",
                "imagen": "fusible_32v_rojo.png",
                "codigo": "abc68q470",
                "precio": 17235,
                "marca": "Steren",
                "compatibilidad": "Generico"
            },
            {
                "nombre": "Inyector de Combustible",
                "categoria": "Motor",
                "imagen": "inyector_combustible.png",
                "codigo": "rst88r689",
                "precio": 364982,
                "marca": "KIA",
                "compatibilidad": "KIA RIO"
            },
            {
                "nombre": "intercooler",
                "categoria": "Motor",
                "imagen": "intercooler.png",
                "codigo": "rst10s987",
                "precio": 3258022,
                "marca": "Kenworth",
                "compatibilidad": "Kenworth T800"
            },
            {
                "nombre": "Culata Chevrolet Spark GT",
                "categoria": "Motor",
                "imagen": "culata_chevrolet_sparkgt.png",
                "codigo": "LMn88t751",
                "precio": 4369789,
                "marca": "Chevrolet",
                "compatibilidad": "Chevrolet Spark GT"
            },
            {
                "nombre": "Guardapolvo delantero",
                "categoria": "Accesorios",
                "imagen": "guardapolvo_delantero.png",
                "codigo": "abc66u965",
                "precio": 268999,
                "marca": "Renault",
                "compatibilidad": "Renault Duster"
            },
            {
                "nombre": "Batería 12V",
                "categoria": "Eléctrico",
                "imagen": "bateria.png",
                "codigo": "abc46v912",
                "precio": 143636,
                "marca": "Bosch",
                "compatibilidad": "Chevrolet Aveo"
            },
            {
                "nombre": "Filtro de Aceite",
                "categoria": "Filtros",
                "imagen": "filtro_aceite.png",
                "codigo": "rst90w636",
                "precio": 271378,
                "marca": "Valeo",
                "compatibilidad": "Kia Sportage"
            },
            {
                "nombre": "Pastillas de Freno",
                "categoria": "Frenos",
                "imagen": "pastillas_freno.png",
                "codigo": "abc19x321",
                "precio": 63663,
                "marca": "Castrol",
                "compatibilidad": "Mazda CX-5"
            },
            {
                "nombre": "Amortiguador Delantero",
                "categoria": "Suspensión",
                "imagen": "amortiguador.png",
                "codigo": "xyz62y390",
                "precio": 252404,
                "marca": "Valeo",
                "compatibilidad": "Honda Civic"
            },
            {
                "nombre": "Aceite 10W40",
                "categoria": "Lubricantes",
                "imagen": "aceite.png",
                "codigo": "abc22z779",
                "precio": 337542,
                "marca": "Delphi",
                "compatibilidad": "Kia Sportage"
            },
            {
                "nombre": "Correa de Distribución",
                "categoria": "Motor",
                "imagen": "correa.png",
                "codigo": "abc18a369",
                "precio": 173212,
                "marca": "Bosch",
                "compatibilidad": "Kia Sportage"
            },
            {
                "nombre": "Alternador",
                "categoria": "Eléctrico",
                "imagen": "alternador.png",
                "codigo": "xyz66b536",
                "precio": 140290,
                "marca": "Valeo",
                "compatibilidad": "Toyota Hilux"
            },
            {
                "nombre": "Bujía de Encendido",
                "categoria": "Encendido",
                "imagen": "bujia.png",
                "codigo": "rst75c486",
                "precio": 287136,
                "marca": "ACDelco",
                "compatibilidad": "Honda Civic"
            },
            {
                "nombre": "Sensor de Oxígeno",
                "categoria": "Sensores",
                "imagen": "sensor_oxigeno.png",
                "codigo": "PQr61d664",
                "precio": 58547,
                "marca": "Castrol",
                "compatibilidad": "Chevrolet Aveo"
            },
            {
                "nombre": "Radiador Aluminio",
                "categoria": "Motor",
                "imagen": "radiador.png",
                "codigo": "abc19e856",
                "precio": 104807,
                "marca": "Valeo",
                "compatibilidad": "Hyundai Tucson"
            },
            {
                "nombre": "Batería 12V",
                "categoria": "Eléctrico",
                "imagen": "bateria.png",
                "codigo": "xyz40f876",
                "precio": 78614,
                "marca": "Bosch",
                "compatibilidad": "Hyundai Tucson"
            },
            {
                "nombre": "Filtro de Aceite",
                "categoria": "Filtros",
                "imagen": "filtro_aceite.png",
                "codigo": "abc82g697",
                "precio": 316778,
                "marca": "Bosch",
                "compatibilidad": "Hyundai Tucson"
            },
            {
                "nombre": "Pastillas de Freno",
                "categoria": "Frenos",
                "imagen": "pastillas_freno.png",
                "codigo": "xyz65h583",
                "precio": 92371,
                "marca": "Denso",
                "compatibilidad": "Renault Duster"
            },
            {
                "nombre": "Amortiguador Delantero",
                "categoria": "Suspensión",
                "imagen": "amortiguador.png",
                "codigo": "rst87i696",
                "precio": 272057,
                "marca": "Mann",
                "compatibilidad": "Toyota Hilux"
            },
            {
                "nombre": "Aceite 10W40",
                "categoria": "Lubricantes",
                "imagen": "aceite.png",
                "codigo": "xyz89j196",
                "precio": 213982,
                "marca": "Castrol",
                "compatibilidad": "Nissan Versa"
            },
            {
                "nombre": "Correa de Distribución",
                "categoria": "Motor",
                "imagen": "correa.png",
                "codigo": "LMn38k336",
                "precio": 183397,
                "marca": "Monroe",
                "compatibilidad": "Hyundai Tucson"
            },
            {
                "nombre": "Alternador",
                "categoria": "Eléctrico",
                "imagen": "alternador.png",
                "codigo": "PQr43l841",
                "precio": 145419,
                "marca": "NGK",
                "compatibilidad": "Nissan Versa"
            },
            {
                "nombre": "Bujía de Encendido",
                "categoria": "Encendido",
                "imagen": "bujia.png",
                "codigo": "abc74m903",
                "precio": 163161,
                "marca": "Delphi",
                "compatibilidad": "Hyundai Tucson"
            },
            {
                "nombre": "Sensor de Oxígeno",
                "categoria": "Sensores",
                "imagen": "sensor_oxigeno.png",
                "codigo": "rst84n524",
                "precio": 416184,
                "marca": "Mobil",
                "compatibilidad": "Nissan Versa"
            },
            {
                "nombre": "Radiador Aluminio",
                "categoria": "Motor",
                "imagen": "radiador.png",
                "codigo": "xyz10o346",
                "precio": 342301,
                "marca": "Denso",
                "compatibilidad": "Ford Ranger"
            },
            {
                "nombre": "Batería 12V",
                "categoria": "Eléctrico",
                "imagen": "bateria.png",
                "codigo": "abc51p326",
                "precio": 429883,
                "marca": "Valeo",
                "compatibilidad": "Nissan Versa"
            },
            {
                "nombre": "Filtro de Aceite",
                "categoria": "Filtros",
                "imagen": "filtro_aceite.png",
                "codigo": "xyz72q409",
                "precio": 133402,
                "marca": "Bosch",
                "compatibilidad": "Hyundai Tucson"
            },
            {
                "nombre": "Pastillas de Freno",
                "categoria": "Frenos",
                "imagen": "pastillas_freno.png",
                "codigo": "rst73r181",
                "precio": 175584,
                "marca": "NGK",
                "compatibilidad": "Nissan Versa"
            },
            {
                "nombre": "Amortiguador Delantero",
                "categoria": "Suspensión",
                "imagen": "amortiguador.png",
                "codigo": "abc75s438",
                "precio": 155074,
                "marca": "ACDelco",
                "compatibilidad": "Nissan Versa"
            },
            {
                "nombre": "Aceite 10W40",
                "categoria": "Lubricantes",
                "imagen": "aceite.png",
                "codigo": "abc56t638",
                "precio": 424564,
                "marca": "ACDelco",
                "compatibilidad": "Mazda CX-5"
            },
            {
                "nombre": "Correa de Distribución",
                "categoria": "Motor",
                "imagen": "correa.png",
                "codigo": "abc29u624",
                "precio": 392159,
                "marca": "Mobil",
                "compatibilidad": "Volkswagen Jetta"
            },
            {
                "nombre": "Alternador",
                "categoria": "Eléctrico",
                "imagen": "alternador.png",
                "codigo": "rst74v100",
                "precio": 422219,
                "marca": "Monroe",
                "compatibilidad": "Toyota Hilux"
            },
            {
                "nombre": "Bujía de Encendido",
                "categoria": "Encendido",
                "imagen": "bujia.png",
                "codigo": "abc51w545",
                "precio": 437710,
                "marca": "ACDelco",
                "compatibilidad": "Kia Sportage"
            },
            {
                "nombre": "Sensor de Oxígeno",
                "categoria": "Sensores",
                "imagen": "sensor_oxigeno.png",
                "codigo": "xyz43x592",
                "precio": 214930,
                "marca": "NGK",
                "compatibilidad": "Volkswagen Jetta"
            }
        ];

        localStorage.setItem('productos', JSON.stringify(productosIniciales));
    }
}

// Función auxiliar para obtener productos
function obtenerProductos() {
    return JSON.parse(localStorage.getItem('productos')) || [];
}

// Función para agregar un nuevo producto
function agregarProducto(producto) {
    const productos = obtenerProductos();
    productos.push(producto);
    localStorage.setItem('productos', JSON.stringify(productos));
}

// Inicializar productos al cargar el script
inicializarProductos();
