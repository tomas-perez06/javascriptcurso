// Productos
const productos = [
  { id: 1, nombre: "Remera", precio: 5000 },
  { id: 2, nombre: "Pantalón", precio: 9000 },
  { id: 3, nombre: "Campera", precio: 15000 }
];

// Carrito (desde localStorage si existe)
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// DOM
const contenedorProductos = document.getElementById("productos");
const contenedorCarrito = document.getElementById("carrito");
const totalHTML = document.getElementById("total");
const btnFinalizar = document.getElementById("finalizar");
const mensaje = document.getElementById("mensaje");

// Mostrar productos
function mostrarProductos() {
  contenedorProductos.innerHTML = "";
  productos.forEach(prod => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${prod.nombre}</h3>
      <p>Precio: $${prod.precio}</p>
      <button onclick="agregarAlCarrito(${prod.id})">Agregar al carrito</button>
    `;
    contenedorProductos.appendChild(div);
  });
}

// Mostrar carrito
function mostrarCarrito() {
  contenedorCarrito.innerHTML = "";
  carrito.forEach((prod, index) => {
    const item = document.createElement("p");
    item.innerHTML = `
      ${prod.nombre} - $${prod.precio}
      <button onclick="eliminarDelCarrito(${index})">❌</button>
    `;
    contenedorCarrito.appendChild(item);
  });

  const total = carrito.reduce((acc, p) => acc + p.precio, 0);
  totalHTML.textContent = `Total: $${total}`;
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Agregar producto
function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  carrito.push(producto);
  mostrarCarrito();
  mostrarMensaje(`Agregaste ${producto.nombre} al carrito ✅`, "ok");
}

// Eliminar producto
function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  mostrarCarrito();
  mostrarMensaje("Producto eliminado ❌", "error");
}

// Finalizar compra
btnFinalizar.addEventListener("click", () => {
  if (carrito.length === 0) {
    mostrarMensaje("El carrito está vacío 🚫", "error");
  } else {
    carrito = [];
    mostrarCarrito();
    mostrarMensaje("¡Gracias por tu compra! 🎉", "ok");
    localStorage.removeItem("carrito");
  }
});

function mostrarMensaje(texto, tipo) {
  // Limpiar mensaje anterior
  mensaje.textContent = texto;
  mensaje.className = tipo;

  // Fade out automático después de 8 segundos
  setTimeout(() => {
    mensaje.classList.add("oculto");
    setTimeout(() => {
      mensaje.textContent = "";
      mensaje.className = "";
    }, 500); // coincide con la transición de CSS
  }, 8000);
}

// Inicializar
mostrarProductos();
mostrarCarrito();
