let carrito = JSON.parse(localStorage.getItem('carrito')) || [];//JSON.parse guarda carrito en la dblocal

function agregarAlCarrito(nombre, precio, talla, boton) {
  carrito.push({ nombre, precio, talla });
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCarrito();
  boton.innerText = "AGREGADO";
  setTimeout(() => boton.innerText = "AGREGAR", 1000);
}

function actualizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  lista.innerHTML = "";

  carrito.forEach((producto, index) => {
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerText =  `${producto.nombre}${producto.talla ? ' - Talla: ' + producto.talla: ''} - $${producto.precio}`;
      
    const btnEliminar = document.createElement("button");
    btnEliminar.innerText = "Eliminar";
    btnEliminar.onclick = () => eliminarDelCarrito(index);

      
    li.appendChild(p);
    li.appendChild(btnEliminar);
    lista.appendChild(li);
  });

  document.getElementById("contador-carrito").innerText = carrito.length;
}

function mostrarCarrito() {
  document.getElementById("carrito-menu").classList.toggle("oculto");
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  localStorage.setItem('carrito', JSON.stringify(carrito));//al eliminar el producto de carrito actualizamos la db
  actualizarCarrito();
}

function vaciarCarrito() {
  carrito = [];
  localStorage.removeItem('carrito');//removemos los productos de la db
  actualizarCarrito();
}

function realizarCompra() {
  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }
  alert("¡Gracias por tu compra!");
  carrito = [];
  localStorage.removeItem('carrito')//removemos los productos de la db
  actualizarCarrito();
  mostrarCarrito();
}//hay que tomar :)

function mostrarCarrito() {
  const menu = document.getElementById("carrito-menu");
  menu.classList.toggle("mostrar");
}

function toggleMenu() {
  document.getElementById("navMenu").classList.toggle("active");
}

// Al cargar la página, actualizar el carrito desde localStorage
document.addEventListener("DOMContentLoaded", actualizarCarrito);