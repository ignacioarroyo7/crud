import {
    validarCodigo,
    validarCampoRequerido,
    validarUrl,
    validarNumeros,
    validarGeneral,
  } from "./validaciones.js";
import { Producto } from "./productoClass.js";


//esto es para manejar los eventos desde js para evitar injection HTML
//traer los input/textarea que interesan
let codigo = document.querySelector('#codigo');
let producto =document.querySelector('#producto');
let descripcion = document.querySelector('#descripcion');
let cantidad =document.querySelector('#cantidad');
let url = document.querySelector('#url');
let formProducto = document.querySelector('#formProducto');
let listaProductos = [];

cargaInicial();

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
        agregarProducto();
    }else{
        //no hago nada, el usuario corrije
        console.log('corregir producto');
    }
}

function agregarProducto(){
    //crea un objeto producto
    let productoNuevo = new Producto(codigo.value, producto.value,descripcion.value, cantidad.value, url.value);
    console.log(productoNuevo);

    //cargar el objeto producto dentro del arreglo
    listaProductos.push(productoNuevo);
    //limpiar el formulario
    limpiarFormulario();

    //al arreglo de productos lo almacenamos en localstorage
    localStorage.setItem('arregloProductos',JSON.stringify(listaProductos)); //stringify convierte el codigo a formato json

    //mostrar un mensaje que indique que se agrego el producto correctamente


    //agregar el objeto producto a una tabla
}

function limpiarFormulario(){
    //reset limpia los value de los input
    formProducto.reset();
    codigo.className ='form-control';
    producto.className  ='form-control';
    descripcion.className  ='form-control';
    cantidad.className  ='form-control';
    url.className ='form-control';
    
}

function cargaInicial(){
    //traer los datos del localStorage
    listaProductos = JSON.parse(localStorage.getItem('arregloProductos'))||[]; //metodo parse convierte de formato json a codigo 
}