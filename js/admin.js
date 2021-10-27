import {
    validarCodigo,
    validarCampoRequerido,
    validarUrl,
    validarNumeros,
    validarGeneral,
  } from "./validaciones.js";


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
formProducto.addEventListener('submit', guardarProducto);

function guardarProducto(e){
    e.preventDefault();
    //verificar que pase todas las validaciones
    if(validarGeneral()){
        //crear el producto
        console.log('producto creado');
    }else{
        //no hago nada, el usuario corrije
        console.log('corregir producto');
    }
}