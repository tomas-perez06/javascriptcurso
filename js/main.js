// Declaración de variables y arrays
const productos = [
  { id: 1, nombre: "Remera", precio: 5000 },
  { id: 2, nombre: "Pantalón", precio: 9000 },
  { id: 3, nombre: "Campera", precio: 15000 }
];

let carrito = [];
let total = 0;

// Función para mostrar productos disponibles
function mostrarProductos() {
  console.log("Productos disponibles:");
  productos.forEach(prod => {
    console.log(`${prod.id}. ${prod.nombre} - $${prod.precio}`);
  });
}

// Función para agregar productos al carrito
function agregarAlCarrito() {
  let seleccion = prompt("Ingrese el ID del producto que desea agregar:\n1. Remera\n2. Pantalón\n3. Campera");
  let producto = productos.find(p => p.id === parseInt(seleccion));

  if (producto) {
    carrito.push(producto);
    total += producto.precio;
    alert(`Agregaste ${producto.nombre} al carrito.\nTotal actual: $${total}`);
  } else {
    alert("Producto no encontrado. Intente nuevamente.");
  }
}

// Función para finalizar la compra
function finalizarCompra() {
  if (carrito.length === 0) {
    alert("No agregaste ningún producto.");
    return;
  }

  let confirmar = confirm(`Tu total es $${total}. ¿Deseás finalizar la compra?`);

  if (confirmar) {
    alert("¡Gracias por tu compra!");
  } else {
    alert("Compra cancelada.");
  }
}

// Inicio del simulador
function iniciarSimulador() {
  alert("Bienvenido a la Tienda Virtual");

  mostrarProductos();

  let continuar = true;

  while (continuar) {
    agregarAlCarrito();
    continuar = confirm("¿Querés agregar otro producto?");
  }

  finalizarCompra();
}

// Llamada inicial
iniciarSimulador();
