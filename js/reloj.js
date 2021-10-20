

function obtenerFecha(){
//obtener la fecha y hora actual

let fecha = new Date();
console.log(fecha);
//devuelve el numero del dia o del mes, comenzando por 0 el domingo y enero
console.log(fecha.getDay());
console.log(fecha.getMonth());
console.log(fecha.getFullYear());

let dias = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
let meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];


let parrafoFecha = document.querySelector('#fecha');
console.log(parrafoFecha)
parrafoFecha.innerHTML=`${dias[fecha.getDay()]} ${fecha.getDay()} de ${meses[fecha.getMonth()]} de ${fecha.getFullYear()}`;

let parrafoHora = document.querySelector('#hora');
console.log(parrafoHora);
parrafoHora.innerHTML = `${fecha.getHours()} : ${fecha.getMinutes()} : ${fecha.getSeconds()}`;
}

setInterval(obtenerFecha,1000);