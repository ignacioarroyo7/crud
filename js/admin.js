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

    //al arreglo de productos lo almacenamos en localstorage
    localStorage.setItem('arregloProductos',JSON.stringify(listaProductos)); //stringify convierte el codigo a formato json

    //limpiar el formulario
    limpiarFormulario();

    //agregar el producto nuevo en la fila de la tabla
    crearFilas(productoNuevo);

    //mostrar un mensaje que indique que se agrego el producto correctamente

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
    
    listaProductos.forEach((itemProducto) => { //itemProducto es el parametro que representa cada elemento en cada vuelta del for
        crearFilas(itemProducto);
    });
}

function crearFilas(itemProducto){
    let tabla = document.querySelector('#tablaProducto');
    tabla.innerHTML += `<tr>
    <th scope="row">${itemProducto.codigo}</th>
    <td>${itemProducto.producto}</td>
    <td>${itemProducto.descripcion}</td>
    <td>${itemProducto.cantidad}</td>
    <td>${itemProducto.url}</td>
    <td>
      <button class="btn btn-warning"><i class="fas fa-edit"></i></button>
      <button class="btn btn-danger"><i class="fas fa-trash-alt light"></i></button>
    </td>
  </tr>`
}