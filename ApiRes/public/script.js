// URL base de la API (gratuita y sin API key)
const API_URL = "https://pokeapi.co/api/v2/pokemon/";

// Referencias a los elementos del HTML
const formulario = document.getElementById("formulario");
const entrada = document.getElementById("entrada");
const botonAleatorio = document.getElementById("aleatorio");
const mensaje = document.getElementById("mensaje");
const tarjeta = document.getElementById("tarjeta");

// Función principal: pide los datos a la API
async function buscarPokemon(consulta) {
  mensaje.className = "mensaje";
  mensaje.textContent = "Buscando...";
  tarjeta.classList.add("oculto");

  try {
    // fetch() hace la petición HTTP a la API
    const respuesta = await fetch(API_URL + consulta.toLowerCase().trim());

    // Si el Pokémon no existe, la API responde con 404
    if (!respuesta.ok) {
      throw new Error("No encontré ese Pokémon. Revisa el nombre o número.");
    }

    // Convertimos la respuesta a un objeto JavaScript
    const datos = await respuesta.json();
    mostrarPokemon(datos);
    mensaje.textContent = "";
  } catch (error) {
    mensaje.className = "mensaje error";
    mensaje.textContent = error.message.includes("fetch")
      ? "Error de conexión. Intenta de nuevo."
      : error.message;
  }
}

// Pinta los datos recibidos en la página
function mostrarPokemon(p) {
  document.getElementById("nombre").textContent = p.name;
  document.getElementById("numero").textContent =
    "#" + String(p.id).padStart(3, "0");

  const imagen = document.getElementById("imagen");
  imagen.src = p.sprites.other["official-artwork"].front_default || p.sprites.front_default;
  imagen.alt = p.name;

  // La API da altura en decímetros y peso en hectogramos
  document.getElementById("altura").textContent = p.height / 10 + " m";
  document.getElementById("peso").textContent = p.weight / 10 + " kg";

  // Tipos
  const contenedorTipos = document.getElementById("tipos");
  contenedorTipos.innerHTML = "";
  p.types.forEach((t) => {
    const span = document.createElement("span");
    span.className = "tipo " + t.type.name;
    span.textContent = t.type.name;
    contenedorTipos.appendChild(span);
  });

  // Estadísticas con barras
  const contenedorStats = document.getElementById("stats");
  contenedorStats.innerHTML = "";
  p.stats.forEach((s) => {
    const fila = document.createElement("div");
    fila.className = "stat";
    const porcentaje = Math.min((s.base_stat / 150) * 100, 100);
    fila.innerHTML = `
      <span>${s.stat.name.replace("-", " ")}</span>
      <strong>${s.base_stat}</strong>
      <div class="barra"><div style="width:${porcentaje}%"></div></div>
    `;
    contenedorStats.appendChild(fila);
  });

  tarjeta.classList.remove("oculto");
}

// Evento: enviar el formulario
formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  buscarPokemon(entrada.value);
});

// Evento: Pokémon aleatorio (hay más de 1000, usamos los primeros 1025)
botonAleatorio.addEventListener("click", () => {
  const id = Math.floor(Math.random() * 1025) + 1;
  entrada.value = id;
  buscarPokemon(id);
});

// Al cargar la página mostramos uno por defecto
buscarPokemon("pikachu");