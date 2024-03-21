// Este array no se puede modificar,
var posibilidades = ["piedra", "papel", "tijera"];

// CONFIGURACIÓN DE LA APLICACIÓN (CONFIGURACIÓN DE LOS BOTONES).

// Configuración del primer botón "¡JUGAR!", invocaremos la función "introducirNombre()" cuando suceda el evento "click".
document.getElementsByTagName("button")[0].addEventListener("click", introducirNombre, false);

// Configuración del segundo botón "¡YA!", invocaremos la función "tirarJugada()" cuando suceda el evento "click".
document.getElementsByTagName("button")[1].addEventListener("click", tirarJugada, false);

// Configuración del tercer botón "¡RESET!", invocaremos la función "reset()" cuando suceda el evento "click".
document.getElementsByTagName("button")[2].addEventListener("click", reset, false);


// CONFIGURACIÓN DE LA APLICACIÓN (CONFIGURACIÓN DE LAS OPCIONES DEL JUGADOR).

// Declaramos una variable que será vinculada al tag "<img>" para vincular la selección de la opción del jugador.
var opciones = document.getElementsByTagName("img");
// Recorremos las opciones con un bucle for, en la longitud a recorrer le restamos 1 ya que tenemos 4 tags <img> en el html y solo son las 3 primeras las opciones que son seleccionables por el jugador para el juego.
for (var i = 0; i < opciones.length-1; i++) {
	// Vinculamos cada opción al array posibilidades definido al principio.
	opciones[i].id = posibilidades[i];
	opciones[i].src = crearRutaImagen(posibilidades[i], "Jugador");
	// Le damos funcionalidad al seleccionar la imagen, llamaremos a la función seleccionTiradaJugador con el evento "click".
	opciones[i].addEventListener("click", seleccionTiradaJugador, false);
}


// COMIENZO DE LA PARTIDA.

// Declaración e iniciación de la variable nombre que se muestra vacía.
var nombre = "";

// Función que usamos para comprobar que el <input> donde vamos a poner nuestro nombre de jugador es completado correctamente de acuerdo a los requisitos requeridos.
function comprobarNombre(nombreAComprobar) {
	// El nombre debe tener más de 3 caracteres y el primero de ellos no debe de ser un número.
	if ((nombreAComprobar.length > 3) && (isNaN(nombreAComprobar[0]))) {
		return true;
	} else {
		return false;
	}
}

// Función para realizar las funcionalidades solicitadas en la actividad de acuerdo a los requisitos del comienzo de la partida.
function introducirNombre() {
	// Variable que selecciona el primer <input>, el nombre del jugador.
	let nombreIntroducido = document.getElementsByTagName("input")[0];
	// Variable que selecciona el segundo <input>, el número de partidas que vamos a jugar.
	let partidas = document.getElementsByTagName("input")[1];
	// Condición if en la que invocamos la función previamente definida respecto a los requisitos que debe tener el <input> del nombre del jugador.
	if (!comprobarNombre(nombreIntroducido.value)) {
		// Si el valor introducido no se ajusta a las condiciones de la función entonces le añadimos a la variable el estilo de clase del archivo .css que tenemos predefinido en la actividad, de tal forma que se pondrá con el fondo color rojo.
		nombreIntroducido.classList.add("fondoRojo");
		// Realizamos el mismo proceso de comprobación con la variable definida para el <input> destinado a introducir el número de partidas que queremos jugar.
	} else if (partidas.value <= 0) {
		// Si el valor introducido es menor o igual a 0 entonces quitamos el fondo rojo previo de nombreIntroducido y se lo añadimos a partidas.
		nombreIntroducido.classList.remove("fondoRojo");
		partidas.classList.add("fondoRojo");
		// En este último else recopilamos el funcionamiento a seguir por el archivo .js cuando los valores se introducen correctamente. Vincularemos el valor introducido a las variables que corresponden.
	} else {
		nombreIntroducido.classList.remove("fondoRojo");
		partidas.classList.remove("fondoRojo");
		nombre = nombreIntroducido.value;
		total.innerHTML = partidas.value;
		nombreIntroducido.disabled = true;
		partidas.disabled = true;
	}
}


// ELECCIÓN Y TIRADA.

// Declaramos la variable máquina y se la asignamos al último índice de la colección de elementos <img>
var maquina = document.getElementsByTagName("img")[document.getElementsByTagName("img").length-1];

// Función con la que creamos una variable la cual llevará asociada un valor aleatorio resultado del método Math que nos devuelve un número entre 0 y 1, este número queda redondeado con floor y al mismo tiempo multiplicado por el parámetro introducido en la función.
function valorAleatorio(listaPosibilidades) {
	let aleatorio = Math.floor(Math.random() * listaPosibilidades.length);
	// Nos devuelve un valor aleatorio de la lista introducida.
	return listaPosibilidades[aleatorio] ;
}

// Función que usaremos que llevar la ruta de la imagen.
function crearRutaImagen(valor, tipo) {
	return "img/" + valor + tipo + ".png";
}

// Función para la tirada de la jugada
function tirarJugada() {
	// Vamos a comprobar si estamos dentro del juego, esto lo hacemos comprobando que el valor en html con el id actual, es decir, el número de partida en la que actualmente estamos, es inferior al total de partidas que habíamos indicado que íbamos a jugar.
	if (actual.innerHTML < total.innerHTML) {
		// Ejecutamos la función del número aleatorio y se lo asignamos a la variable tiradaMaquina.
		tiradaMaquina = valorAleatorio(posibilidades);
		// Configuramos el src del .html con el id maquina utilizando la función que previamente habíamos definido para ello.
		maquina.src = crearRutaImagen(tiradaMaquina, "Ordenador");
		maquina.id = tiradaMaquina;
		// Incrementamos en 1 el marcador de jugadas para realizar el seguimiento de acuerdo a nuestras especificaciones.
		actual.innerHTML = Number(actual.innerHTML) + 1;
		// Pasaremos el valor de tiradaMaquina como parámetro en la función definada a continuación.
		calculoResultado(tiradaMaquina);
	}
}

// Funcion para el elemento que hemos seleccionado.
function seleccionTiradaJugador(e) {
	// Le añadimos la clase seleccionado del .css al elemento que hemos seleccionado para resaltarlo con las características definidas en el propio .css
	e.target.classList.add("seleccionado");
	e.target.classList.remove("noSeleccionado");
	// Le cambiamos la apariencia al resto de elementos que no sean el que hemos seleccionado.
	for (var j = 0; j < opciones.length-1; j++) {
		if (opciones[j] != e.target) {
			opciones[j].classList.remove("seleccionado");
			opciones[j].classList.add("noSeleccionado");
		}
	}
}

// HISTORIAL DE PARTIDAS.

// Función para localizar la opción seleccionada por nosotros y obtener su id
function calculoResultado(tirada) {
	for (var i = 0; i < opciones.length-1; i++) {
		// Verificamos que la clase del elemento es seleccionado, es decir, nuestra opción.
		if (opciones[i].classList == "seleccionado") {
			// Almacenamos el id del elemento seleccionado en la variable seleccionado.
			var seleccionado = opciones[i].id;
		}
	}

	// Comparamos las tiradas nuestras y de la máquina para determinar el resultado de acuerdo al array inical definido "posibilidades".
	// Si la posición de la tirada de la máquina es una antes de la posición de la tirada seleccionada por nosotros o la máquina tiene la última posición y el nosotros tenemos la primera, entonces el nosotros ganamos.
	// Si esta condición no se cumple, pasamos al siguiente else if. 
	if ((posibilidades.indexOf(maquina.id) == posibilidades.indexOf(seleccionado)-1) || ((posibilidades.indexOf(maquina.id) == posibilidades.length-1) && (posibilidades.indexOf(seleccionado) == 0))) {
		// Ganamos nostros.
		historial.innerHTML += "<li>Gana " + nombre +"</li>\n";
	} else if (posibilidades.indexOf(maquina.id) == posibilidades.indexOf(seleccionado)) {
		// Empate
		historial.innerHTML += "<li>Empate</li>\n";
	} else {
		// Gana la máquina
		historial.innerHTML += "<li>Gana la máquina</li>\n";
	}
	// En todos los casos se añaden elementos <li> al elemento <ul> con id historial para indicar los resultados de las partidas.
}

function reset() {
	// Definimos variables internas de la función asignadas al primer y segundo elemento del .html con el tag input.
	let nombreIntroducido = document.getElementsByTagName("input")[0];
	let partidas = document.getElementsByTagName("input")[1];
	// Restauramos los parámetros de ambas funciones.
	nombreIntroducido.disabled = false;
	partidas.disabled = false;
	// Campo partidas a 0.
	partidas.value = 0;
	// Los marcadores de total y actual a 0.
	total.innerHTML = "0";
	actual.innerHTML = "0";
	// Reiniciamos la apariencia de las opciones.
	for (var j = 0; j < opciones.length-1; j++) {
		opciones[j].classList.remove("seleccionado");
		opciones[j].classList.remove("noSeleccionado");
	}
	// Establecemos la primera opción como la opción por defecto de seleccionado.
	opciones[0].classList.add("seleccionado");
	// Restauramos la imagen por defecto en la última opción.
	opciones[opciones.length-1].src = crearRutaImagen("", "defecto");;
	// Agregamos un elemento al historial indicando "Nueva partida".
	historial.innerHTML += "<li>Nueva partida</li>\n";
}