// Excercici inical	
// Variables globales exercici inicial BASE DATOS
let dades;
let meteoArray = new Array();
let tablaData = new Object();	//se usa para mostrar tabla vertical
let maxLength;

// fetchingData();
// async function fetchingData() {
// 	try {

// 		const responseMeteorits = await fetch("../data/earthMeteorites.json");
// 		const dataMeteorits = await responseMeteorits.json();
// 		dades = dataMeteorits;
// 		meteoArray.push(...dades.map(meteorit => meteorit.name));
// 		//console.log("Meteorits 1:", dades[5].name);

// 		mostrarConsola();
// 	} catch(error) {
// 		console.log("Error en fetch data", error);
// 	}
// }

// function mostrarConsola() {
// 	maxLength = Math.max(
// 		superArray.meteorits.length
// 	);

// 	// Crear un array de objetos para representar la tabla
// 	tablaData = Array.from({ length: maxLength }, (_, index) => ({
// 		EarthMeteorite: superArray.meteorits[index] || ''
// 	}));
// 	console.table(tablaData);
// 	convertirArray();
// }

// EXERCICI 1
// Variables globales para las tablas exercici 1
let objetoMeteoritArray = new Array();
let col = 4;
let url_img_flecha = "https://cdn-icons-png.flaticon.com/512/57/57032.png";
let elGrafico;
let orden = 'asc'; //gestionará el switch para ordenar


// Part 1
inicialitzaPagina();
//carga base datos y carga la pagina
function inicialitzaPagina() {	
	// Meteorits
	fetch("../data/earthMeteorites.json")
	.then(function(response) { return response.json()})
	.then(function(data) {
		dades = data;
		dades.forEach(element=>{
				objetoMeteoritArray.push(element);
		})
        printList(objetoMeteoritArray)
	})
	.catch(function (err) {
		console.log(err);
	});
}
function recargaPagina() {
	location.reload();
}
//Asigna la tabla y llama al order sergun columna
function orderBy(param) {
	let arrayTabla = [...objetoMeteoritArray];	
	orderByTabla(arrayTabla, param);
}
function swithCaseOrden() {
	switch (orden) {
		case 'asc':
			orden = 'desc';
			break;
		case 'desc':
			orden = 'asc';
			break;
	}
}
//ordena la tabla segun el array y valor a ordenar
function orderByTabla(aOrdenar, tipo) {
	swithCaseOrden();
	if (orden == 'asc') {
		aOrdenar.sort(function(a,b){ 			
			if (a[tipo] > b[tipo]) { return 1};	//si es mayor +1
			if (a[tipo] < b[tipo]) { return -1};	//es menor -1
			return 0; //si es igual ni suma ni resta
		});			
	}
	else if (orden == 'desc') {
		aOrdenar.sort(function(a,b){ 
			if (a[tipo] < b[tipo]) { return 1};	//si es menor +1
			if (a[tipo] > b[tipo]) { return -1};	//es mayor -1
			return 0; //si es igual ni suma ni resta
		});
	} 
	else {
		console.log("falla al ordenar la tabla");
	}
	printList(aOrdenar);
}
//busqueda per coincidencia de nom
function searchListLive(condicion) {
	meteoBuscar = [...objetoMeteoritArray];
	let cumpleCondicion = new Array();

	let condicionBusqueda = condicion;
	condicionBusqueda.toLocaleLowerCase();
	
        meteoBuscar.forEach(element => {
            if(element.name.toLocaleLowerCase().includes(condicionBusqueda)) {
                cumpleCondicion.push(element);
            }
        });
	printList(cumpleCondicion);	
}
function calcMitjana() {
	let mitjana = 0;
	let obj = new Array();

    obj = [...objetoMeteoritArray];

		obj.forEach(element => {
			if (element.mass != null) {
				mitjana += parseInt(element.mass);
			}
		});
		mitjana = (mitjana/obj.length).toFixed(2);
		alert("La mitjana de la massa d'un meteorit es de " + mitjana);

}
//crea la tabla y la muestra en el html
function printList(lista) {
	let div = document.getElementById("container-tabla");
	let tabla = `<table class="tabla">`;
    let arr_coord = []; //guardar coordenadas
    tabla += `<tr>`;
	//asignar titulos de la tabla	
		tabla += `<td>Id <img class="img_" src="${url_img_flecha}" width="15px" onclick="orderBy('id')"></td>`;
		tabla += `<td>Recclass <img class="img_" src="${url_img_flecha}" width="15px" onclick="orderBy('recclass')"></td>`;
		tabla += `<td>Name <img class="img_" src="${url_img_flecha}" width="15px" onclick="orderBy('name')"></td>`;
		tabla += `<td>Mass <img class="img_" src="${url_img_flecha}" width="15px" onclick="orderBy('mass')"></td>`;	
		tabla += `<td></td>`;
	tabla += `</tr>`;

	for (var i = 0; i < lista.length; i++) {
		tabla += `<tr>`;

        tabla += `<td>${lista[i].id}  </td>`;
        tabla += `<td>${lista[i].recclass}</td>`;
        tabla += `<td>${lista[i].name}</td>`;
        tabla += `<td>${lista[i].mass}</td>`;	
		if (lista[i].geolocation && lista[i].geolocation.coordinates) {			
			arr_coord = lista[i].geolocation.coordinates;
        	tabla += `<td><button onclick="addMarker('${arr_coord}')">veure mapa</button></td>`;			
		}
	}
	tabla += `</tr>`;

	tabla += `</table>`;
	div.innerHTML = tabla;
}

var map;
function addMarker(coord) {	
	if (typeof map != null && map != undefined) {
		map.remove();
	}
	//Convierte en array Y ELIMINA los corchetes que vienen junto al string coord
	let tmp = coord.slice(1,-1).split(',');
	let tmp2 = tmp.map(function(str){return parseFloat(str);});

	map = L.map('map').setView(tmp, 13);
	L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(map);
	//L.marker(tmp).addTo(map);
	L.circle(tmp, {
		color: 'red',
		fillColor: '#f03',
		fillOpacity: 0.5,
		radius: 500
	}).addTo(map);
}

