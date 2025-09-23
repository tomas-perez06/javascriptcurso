// Carrito (desde localStorage si existe)
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// DOM
const contenedorProductos = document.getElementById("products");
const listaCarrito = document.getElementById("cartList");
const totalCarrito = document.getElementById("cartTotal");
const btnCheckout = document.getElementById("btnCheckout");
const btnToggleCart = document.getElementById("btnCart");
const cartSection = document.getElementById("cartSection");
const btnCloseCart = document.getElementById("btnCloseCart");
const cartCount = document.getElementById("cartCount");

let productos = []; // aquí cargaremos el JSON

// Cargar productos desde JSON
async function loadProducts() {
  try {
    const response = await fetch("products.json");
    if (!response.ok) throw new Error("No se pudo cargar products.json");
    productos = await response.json();
    mostrarProductos();
  } catch (error) {
    console.error("Error al cargar productos:", error);
    Swal.fire({
      title: "Error",
      text: "No se pudieron cargar los productos.",
      icon: "error",
      confirmButtonText: "Ok"
    });
  }
}

// Mostrar productos
function mostrarProductos() {
  contenedorProductos.innerHTML = "";
  productos.forEach(prod => {
    const div = document.createElement("div");
    div.classList.add("product-card");
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
  listaCarrito.innerHTML = "";
  carrito.forEach((prod, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${prod.nombre} - $${prod.precio}
      <button onclick="eliminarDelCarrito(${index})">❌</button>
    `;
    listaCarrito.appendChild(li);
  });

  const total = carrito.reduce((acc, p) => acc + p.precio, 0);
  totalCarrito.textContent = `Total: $${total}`;

  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContador();
}

// Actualizar contador del carrito
function actualizarContador() {
  cartCount.textContent = carrito.length;
}

// Agregar producto al carrito
function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  carrito.push(producto);
  mostrarCarrito();

  Swal.fire({
    title: "Producto agregado",
    text: `${producto.nombre} se sumó al carrito`,
    icon: "success",
    confirmButtonText: "Aceptar"
  });
}

// Eliminar producto del carrito
function eliminarDelCarrito(index) {
  const eliminado = carrito.splice(index, 1);
  mostrarCarrito();

  Swal.fire({
    title: "Producto eliminado",
    text: `${eliminado[0].nombre} fue eliminado del carrito`,
    icon: "info",
    confirmButtonText: "Ok"
  });
}

// Finalizar compra
btnCheckout.addEventListener("click", () => {
  if (carrito.length === 0) {
    Swal.fire({
      title: "Carrito vacío",
      text: "Agrega productos antes de comprar.",
      icon: "error",
      confirmButtonText: "Ok"
    });
  } else {
    const total = carrito.reduce((acc, p) => acc + p.precio, 0);
    Swal.fire({
      title: "Compra realizada 🎉",
      html: `<p>Gracias por tu compra</p><p>Total: <b>$${total}</b></p>`,
      icon: "success",
      confirmButtonText: "Genial"
    });

    carrito = [];
    mostrarCarrito();
    localStorage.removeItem("carrito");
    cartSection.classList.add("hidden");
  }
});

// Mostrar/Ocultar carrito
btnToggleCart.addEventListener("click", () => {
  cartSection.classList.toggle("hidden");
});
btnCloseCart.addEventListener("click", () => {
  cartSection.classList.add("hidden");
});

// Inicialización
loadProducts();
mostrarCarrito();
