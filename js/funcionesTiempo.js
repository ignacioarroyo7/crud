let contador = 1;

// ejecutar una accion despues de un tiempo

function saludar(){
    if(contador<=3){
    document.write('<br>Hola mundo<br>');
    contador++;
    }else{
        clearInterval(identificador)
    }
}

window.setTimeout(saludar,1000); //ejecuta una funcion pasado un tiempo en ms, dos parametros, (funcion,tiempo ms)


//funcion anonima, no tiene nombre, se las crea donde la tengo que ejecutar
setTimeout(function(){
    document.write('<br>Funcion anonima');
},2000);

setTimeout(() => {
    document.write('<br>Funcion anonima con funcion flecha');
},2100);


//setInterval metodo para ejecutar una funcion cada cierto tiempo en ms
let identificador = window.setInterval(saludar,4000);
