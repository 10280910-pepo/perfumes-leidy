// ===== CARRITO DE COMPRAS =====

let carrito = [];

function agregarAlCarrito(nombre, precio) {
    const perfumeExistente = carrito.find(
        perfume => perfume.nombre === nombre
    );

    if (perfumeExistente) {
        perfumeExistente.cantidad++;
    } else {
        carrito.push({
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });
    }

    mostrarCarrito();
    alert(`¡${nombre} agregado al carrito!`);
}

function mostrarCarrito() {
    const lista = document.getElementById("listaCarrito");
    const totalElemento = document.getElementById("total");

    lista.innerHTML = "";

    if (carrito.length === 0) {
        lista.innerHTML =
            '<p class="text-secondary">Todavía no has agregado perfumes.</p>';
        totalElemento.textContent = "$0.00";
        return;
    }

    let total = 0;

    carrito.forEach((perfume, indice) => {
        const subtotal = perfume.precio * perfume.cantidad;
        total += subtotal;

        const producto = document.createElement("div");
        producto.className =
            "d-flex justify-content-between align-items-center gap-3 py-3 border-bottom";

        producto.innerHTML = `
            <div>
                <strong>${perfume.nombre}</strong>
                <p class="mb-0">
                    $${perfume.precio.toFixed(2)} × ${perfume.cantidad}
                </p>
            </div>

            <div class="text-end">
                <strong>$${subtotal.toFixed(2)}</strong>
                <br>
                <button class="btn btn-sm btn-outline-warning mt-2"
                    onclick="eliminarDelCarrito(${indice})">
                    Quitar
                </button>
            </div>
        `;

        lista.appendChild(producto);
    });

    totalElemento.textContent = `$${total.toFixed(2)}`;
}

function eliminarDelCarrito(indice) {
    carrito.splice(indice, 1);
    mostrarCarrito();
}

function vaciarCarrito() {
    carrito = [];
    mostrarCarrito();
}
// ===== CAMBIAR IDIOMA =====

let idiomaActual = "es";
let traducciones = {};

async function cargarTraducciones() {
    try {
        const respuesta = await fetch('./traducciones.json');

        if (!respuesta.ok) {
            throw new Error("No se pudo cargar translations.json");
        }

        traducciones = await respuesta.json();
    } catch (error) {
        console.error("Error al cargar las traducciones:", error);
    }
}

function cambiarIdioma() {
    const nuevoIdioma = idiomaActual === "es" ? "en" : "es";
    const textos = traducciones[nuevoIdioma];

    if (!textos) {
        alert("No se pudieron cargar las traducciones.");
        return;
    }

    idiomaActual = nuevoIdioma;

    const mapa = {
        "Inicio": "inicio",
        "Perfumes": "perfumes",
        "Nosotros": "nosotros",
        "Contacto": "contacto",
        "Comprar": "comprar",
        "Explorar colección": "explorar",
        "Nuestra colección": "coleccion",
        "Nuestros perfumes": "catalogo",
        "Agregar": "agregar",
        "Tu carrito": "carrito",
        "Vaciar carrito": "vaciar",
        "La esencia de la elegancia.": "mensaje"
    };

    document.querySelectorAll(".nav-link").forEach(enlace => {
        const clave = mapa[enlace.textContent.trim()];
        if (clave) enlace.textContent = textos[clave];
    });

    document.querySelectorAll(".navbar .btn-gold").forEach(boton => {
        if (boton.textContent.includes("Comprar") ||
            boton.textContent.includes("Shop now")) {
            boton.innerHTML = `<i class="bi bi-bag"></i> ${textos.comprar}`;
        }
    });

    const subtitulo = document.querySelector(".hero .subtitle");
    if (subtitulo) subtitulo.textContent = textos.subtitulo;

    const titulo = document.querySelector(".hero h1");
    if (titulo) {
        titulo.innerHTML = textos.titulo.replace(", ", ",<br>");
        const palabras = titulo.querySelector("br");
        if (palabras && palabras.nextSibling) {
            const ultimaParte = palabras.nextSibling.textContent;
            palabras.nextSibling.textContent = "";
            const span = document.createElement("span");
            span.textContent = ultimaParte;
            palabras.after(span);
        }
    }

    const descripcion = document.querySelector(".hero-text p");
    if (descripcion) descripcion.textContent = textos.descripcion;

    const explorar = document.querySelector(".hero-text .btn-gold");
    if (explorar) {
        explorar.innerHTML =
            `${textos.explorar} <i class="bi bi-arrow-right"></i>`;
    }

    const tituloColeccion = document.querySelector("#coleccion h2");
    if (tituloColeccion) tituloColeccion.textContent = textos.coleccion;

    const tituloCatalogo = document.querySelector("#catalogo h2");
    if (tituloCatalogo) tituloCatalogo.textContent = textos.catalogo;

    const tituloCarrito = document.querySelector("#carrito h2");
    if (tituloCarrito) {
        tituloCarrito.innerHTML =
            `<i class="bi bi-bag-check"></i> ${textos.carrito}`;
    }

    const tituloTotal = document.querySelector("#carrito h4");
    if (tituloTotal) {
        const totalAnterior = document.getElementById("total").textContent;
        tituloTotal.textContent = `${textos.total}: ${totalAnterior}`;
        tituloTotal.innerHTML =
            `${textos.total}: <span id="total">${totalAnterior}</span>`;
    }

    const vaciar = document.querySelector("#carrito .btn-gold");
    if (vaciar) vaciar.textContent = textos.vaciar;

    const footer = document.querySelector(".footer p");
    if (footer) footer.textContent = textos.mensaje;
}

// Cargar traducciones al abrir la página
cargarTraducciones();