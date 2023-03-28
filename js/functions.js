/*Array de objetos con los productos que ofrece Cultura Café*/
const productos = [{
        id: 1,
        nombre: 'Brasil Crucera',
        precio: 550,
        categoria: 'Pack de café',
        descripción: 'Café con notas de chocolate, azúcar moreno y naranja.',
        imagen: './img/bolsa-brasil.jpg'
    },
    {
        id: 2,
        nombre: 'Etiopía Najá',
        precio: 800,
        categoria: 'Pack de café',
        descripción: 'Café con notas de chocolate negro, manzana roja y lima',
        imagen: './img/bolsa-etiopia.jpg'
    },
    {
        id: 3,
        nombre: 'Guatemala GTA',
        precio: 700,
        categoria: 'Pack de café',
        descripción: 'Café con notas de mandarina, chocolate amargo y caramelo oscuro.',
        imagen: './img/bolsa-guate.jpg'
    },
    {
        id: 4,
        nombre: 'Everyday',
        precio: 690,
        categoria: 'Suscripción',
        descripción: 'Recibí 1 bolsa de 500 gr. de nuestro Everyday Coffee mensualmente.',
        imagen: './img/sus-everyday.png'
    },
    {
        id: 5,
        nombre: 'Simple',
        precio: 900,
        categoria: 'Suscripción',
        descripción: 'Recibí 2 bolsas de 250 gr. por mes de 2 orígenes distintos.',
        imagen: './img/sus-simple.png'
    },
    {
        id: 6,
        nombre: 'Doble Shot',
        precio: 1700,
        categoria: 'Suscripción',
        descripción: 'Recibí 4 bolsas de 250 gr. por mes de 2 orígenes distintos.',
        imagen: './img/sus-doble.png'
    },
];

/*Array vacío para almacenar los productos que se agregan al carrito.*/
const carrito = []

/*Variable que inicia en cero y se va actualizando cada vez que se agrega un producto al carrito*/
let precioTotal = 0;

/*Constante para obtener los datos que el usuario ingresa en el formulario*/
const form = document.getElementById("datos-usuario");

/*Método para obtener los datos ingresados por el usuario y almacenarlos en el localStorage. Luego los muestra en el HTML*/
form.addEventListener("submit", function (event){
    event.preventDefault();
    const nombre = form.elements["nombre"].value;
    const email = form.elements["email"].value;
    const telefono = form.elements["telefono"].value;

    const datosUsuario = {
        nombre,
        email,
        telefono,
    }

    localStorage.setItem("datosUsuario", JSON.stringify(datosUsuario));
    const nombreParrafo = document.getElementById("nombre-parrafo");
    nombreParrafo.textContent = `Nombre: ${nombre}`;
    const emailParrafo = document.getElementById("email-parrafo");
    emailParrafo.textContent = `Correo electrónico: ${email}`;
    const telefonoParrafo = document.getElementById("telefono-parrafo");
    telefonoParrafo.textContent = `Teléfono de contacto: ${telefono}`;

    form.reset();
})

/*Funcion LISTAR PRODUCTOS: Genera el HTML desde JS para mostrar los productos en la página, así es más sencillo actualizar o modificar la lista de productos que vendemos*/
function listarProductos() {
    for (const producto of productos) {
        let cardProducto = document.createElement('div')
        cardProducto.innerHTML = `
            <img class="foto-producto" src="${producto.imagen}"/>
            <h2>${producto.nombre}</h2>
            <p>${producto.descripción}</p>
            <h2>$${producto.precio}</h2>
            <button class="button" id=${producto.id} >Agregar al carrito</button>
        `
        cardProducto.className = 'card'
        let lista = document.getElementById('listProductos')
        lista.append(cardProducto)
        let botonParaAgregar = document.getElementById(`${producto.id}`)
        botonParaAgregar.addEventListener('click', agregarAlCarrito)
    }
}

/*Función AGREGAR AL CARRITO: se encarga de agregar de a un producto al carrito y suma las cantidades de cada uno*/
function agregarAlCarrito(e) {
    let id = Number(e.target.getAttribute("id"));
    let productoAAgregar = productos.find((producto) => producto.id === id);
    let productoEnCarrito = carrito.find((producto) => producto.id === productoAAgregar.id);

    if (productoEnCarrito && productoEnCarrito.cantidad > 0) {
        productoEnCarrito.cantidad++;
        productoEnCarrito.precioTotal += productoAAgregar.precio;
        let productoAnterior = document.getElementById(`producto${productoAAgregar.id}`);
        productoAnterior.innerHTML = `
            <p>${productoAAgregar.nombre} - Cantidad: ${productoEnCarrito.cantidad}</p>
            <h4>$ ${productoAAgregar.precio}</h4>
            <h4>Total de ${productoAAgregar.nombre} : $ ${productoEnCarrito.precioTotal}</h4>
        `;
    } else {
        let productoConCantidad = {
            ...productoAAgregar,
            cantidad: 1,
            precioTotal: productoAAgregar.precio
        };
        carrito.push(productoConCantidad);
        let cardCarrito = document.createElement("div");
        cardCarrito.innerHTML = `
            <p>${productoConCantidad.nombre} - Cantidad: 1</p>
            <h4>$ ${productoConCantidad.precio}</h4>
        `;
        cardCarrito.setAttribute("id", `producto${productoConCantidad.id}`);
        let carritoContendor = document.getElementById("carrito");
        carritoContendor.append(cardCarrito);
    }
    actualizarPrecioTotal();
}

/*Función ACTUALIZAR PRECIO TOTAL: Actualiza el precio total de la compra en el HTML*/
function actualizarPrecioTotal() {
    const precioTotalElement = document.getElementById('precioTotal');
    let precioTotal = carrito.reduce((total, producto) => {
        return total + producto.precioTotal;
    }, 0);
    precioTotalElement.innerHTML = `
    <h5>Total de tu compra $ ${precioTotal}</h5>
    `;
}

/*Llamado a función LISTAR PRODUCTOS*/
listarProductos()
