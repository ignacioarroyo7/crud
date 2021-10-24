function validarCampoRequerido(input){
    console.log(input);
    if(input.value.trim().length != ''){//al input que recibo por parametro, le tomo el value(lo que tiene escrito) y la funcion trim es para quitar espacios vacios al principio de la cadena de texto
        input.className ='form-control is-valid';
        return true;
    }else {
        input.className='form-control is-invalid';
        return false;
    }

}

//validar la parte de los numeros
function validarNumeros(input){
    //creamos la expresion regular
    let patron = /^[0-9]{1,4}$/; //expresion regular acepto numeros entre el 0 y el 9, y debo poner como minimo 1 y como maximo 4 digitos

    if(patron.test(input.value)){
        input.className = 'form-control is-valid';
        return true;
    }else{
        input.className = 'form-control is-invalid';
        return false;
    }
}


function validarCodigo(input){
    if(input.value.trim() != '' && input.value.trim().length >= 3){
        input.className += ' is-valid';
        return true;
    }else{
        input.className += ' is-invalid'
        return false;
    }
}

//esto es para manejar los eventos desde js para evitar injection HTML
//traer los input/textarea que interesan
let codigo = document.querySelector('#codigo');
let producto =document.querySelector('#producto');
let descripcion = document.querySelector('#descripcion');
let cantidad =document.querySelector('#cantidad');
let url = document.querySelector('#url');

//le agregamos el evento
//agarramos un objeto y le agregamos un escuchador de eventos
codigo.addEventListener('blur',() => {validarCampoRequerido(codigo)});
producto.addEventListener('blur',() => {validarCampoRequerido(producto)});
descripcion.addEventListener('blur',() => {validarCampoRequerido(descripcion)});
cantidad.addEventListener('blur',() => {validarNumeros(cantidad)});
url.addEventListener('blur',() => {validarCampoRequerido(url)});