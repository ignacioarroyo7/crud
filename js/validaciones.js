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
    let patron = /^[0-9]{1,4}$/; //expresion regular acepto numeros entre el 0 y el 9, y debo poner como minimo 1 y como maximo 4 digitos, $ cierre

    if(input.value.trim() != '' && patron.test(input.value.trim())){
        input.className = 'form-control is-valid';
        return true;
    }else{
        input.className = 'form-control is-invalid';
        return false;
    }
}

function validarUrl(input){
    let patron = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
    if(input.value.trim() != '' && input.value.trim()!= '' && patron.test(input.value.trim())){
        input.className = 'form-control is-valid';
        return true;
    }else{
        input.className = 'form-control is-invalid';
        return false;
    }
}


function validarCodigo(input){
    if(input.value.trim() != '' && input.value.trim().length >= 3){
        input.className ='form-control is-valid';
        return true;
    }else{
        input.className = 'form-control is-invalid';
        return false;
    }
}

function validarGeneral(e){ //para cuando apreto en el boton guardar, e o event, es que hago referencia al objeto event
    //previene que recargue la pagina despues del submit
    e.preventDefault();
    alerta = document.querySelector('#msjAlert');
    //if(true//false), pq todas las funciones devuelven un true o false
    if(validarCodigo(codigo) && validarUrl(url) && validarCampoRequerido(producto) && validarCampoRequerido(descripcion) &&validarNumeros(cantidad)){
        alerta.className='alert alert-danger mt-4 d-none';
    }else{
        
        //aqui mostrar el alert html
        alerta.className='alert alert-danger mt-4';
    }

}

//esto es para manejar los eventos desde js para evitar injection HTML
//traer los input/textarea que interesan
let codigo = document.querySelector('#codigo');
let producto =document.querySelector('#producto');
let descripcion = document.querySelector('#descripcion');
let cantidad =document.querySelector('#cantidad');
let url = document.querySelector('#url');
let formProducto = document.querySelector('#formProducto');


//le agregamos el evento
//agarramos un objeto y le agregamos un escuchador de eventos
codigo.addEventListener('blur',() => {validarCodigo(codigo)});
producto.addEventListener('blur',() => {validarCampoRequerido(producto)});
descripcion.addEventListener('blur',() => {validarCampoRequerido(descripcion)});
cantidad.addEventListener('blur',() => {validarNumeros(cantidad)});
url.addEventListener('blur',()=>{validarUrl(url)});
formProducto.addEventListener('submit',validarGeneral);