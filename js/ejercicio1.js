let numero;
function numeroAzar(){
    numero = Math.floor(Math.random()*101);
    console.log(numero);
}
function enviar(){
    let nroIngresado = parseInt(document.getElementById('numeroIngresado').value);
    console.log(nroIngresado);
    if(nroIngresado==numero){
        alert('Adivinaste!!!');
    }else if(nroIngresado<numero){
        alert('El numero ingresado es menor');
    }else{
        alert('El numero ingresado es mayor');
    }
}
