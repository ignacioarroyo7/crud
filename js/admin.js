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
let codigo = document.querySelector("#codigo");
let producto = document.querySelector("#producto");
let descripcion = document.querySelector("#descripcion");
let cantidad = document.querySelector("#cantidad");
let url = document.querySelector("#url");
let formProducto = document.querySelector("#formProducto");
let listaProductos = [];
let productoExistente = false; /// si es false significa que tengo que agregar un nuevo producto, si es true tengo que modificar uno existente

let btnNuevoProducto = document.querySelector("#btnNuevoProducto");
cargaInicial();

//le agregamos el evento
//agarramos un objeto y le agregamos un escuchador de eventos
codigo.addEventListener("blur", () => {
  validarCodigo(codigo);
});
producto.addEventListener("blur", () => {
  validarCampoRequerido(producto);
});
descripcion.addEventListener("blur", () => {
  validarCampoRequerido(descripcion);
});
cantidad.addEventListener("blur", () => {
  validarNumeros(cantidad);
});
url.addEventListener("blur", () => {
  validarUrl(url);
});
formProducto.addEventListener("submit", guardarProducto);
btnNuevoProducto.addEventListener("click", limpiarFormulario);

function guardarProducto(e) {
  e.preventDefault();
  //verificar que pase todas las validaciones
  if (validarGeneral()) {
    //crear el producto de acuerdo al valor de la variable productoExistente
    if (productoExistente === false) {
      agregarProducto();
      productoExistente = true;
    } else {
      //si el producto existe, entonces tengo que modificar el producto
      actualizarProducto();
      productoExistente = false;
    }
  }
}

function agregarProducto() {
  //crea un objeto producto
  let productoNuevo = new Producto(
    codigo.value,
    producto.value,
    descripcion.value,
    cantidad.value,
    url.value
  );
  console.log(productoNuevo);

  //cargar el objeto producto dentro del arreglo
  listaProductos.push(productoNuevo);

  //al arreglo de productos lo almacenamos en localstorage
  localStorage.setItem("arregloProductos", JSON.stringify(listaProductos)); //stringify convierte el codigo a formato json

  //limpiar el formulario
  limpiarFormulario();

  //agregar el producto nuevo en la fila de la tabla
  crearFilas(productoNuevo);

  //mostrar un mensaje que indique que se agrego el producto correctamente
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Producto agregado correctamente",
    showConfirmButton: false,
    timer: 1500,
  });
}

function limpiarFormulario() {
  //reset limpia los value de los input
  formProducto.reset();
  codigo.className = "form-control";
  producto.className = "form-control";
  descripcion.className = "form-control";
  cantidad.className = "form-control";
  url.className = "form-control";

  //resetear el valor de la variable booleana productoExistente a false

  productoExistente = false;
}

function cargaInicial() {
  //traer los datos del localStorage
  listaProductos = JSON.parse(localStorage.getItem("arregloProductos")) || []; //metodo parse convierte de formato json a codigo

  listaProductos.forEach((itemProducto) => {
    //itemProducto es el parametro que representa cada elemento en cada vuelta del for
    crearFilas(itemProducto);
  });
}

function crearFilas(itemProducto) {
  let tabla = document.querySelector("#tablaProducto");
  tabla.innerHTML += `<tr>
    <th scope="row">${itemProducto.codigo}</th>
    <td>${itemProducto.producto}</td>
    <td>${itemProducto.descripcion}</td>
    <td>${itemProducto.cantidad}</td>
    <td>${itemProducto.url}</td>
    <td>
      <button class="btn btn-warning" onclick='prepararEdicion(${itemProducto.codigo})'><i class="fas fa-edit"></i></button>
      <button class="btn btn-danger" onclick='eliminarProducto(${itemProducto.codigo})'><i class="fas fa-trash-alt light"></i></button>
    </td>
  </tr>`;
}

window.prepararEdicion = (codigoProducto) => {
  //window es un objeto global que se accede desde el archivo HTML o JS, le creo una propiedad prepararEdicion y desde esa llamo a la funcion, con una funcion anonima. lo hago para poder usar la funcion local al HTML, para poder usar el onclick porque es admin.js es tipo modulo
  console.log(codigoProducto);
  //buscar el objeto
  //find devuelve un objeto, y a ese objeto le obtengo el codigo
  let productoBuscado = listaProductos.find((itemProducto) => {
    return itemProducto.codigo == codigoProducto; //verifica si el item del itemProducto actual es el mismo que el codigoProducto que recibe por parametro
  });
  console.log(productoBuscado);

  //mostrarlo en el formulario
  codigo.value = productoBuscado.codigo;
  producto.value = productoBuscado.producto;
  descripcion.value = productoBuscado.descripcion;
  cantidad.value = productoBuscado.cantidad;
  url.value = productoBuscado.url;

  //cambio el valor de la variable productoExistente
  productoExistente = true;
};

function actualizarProducto() {
  //buscar la posicion del elemento a editar dentro del arreglo
  //findIndex, busca el elemento y nos devuelve la posicion del elemento que cumple la condicion logica que le paso
  let posicionProducto = listaProductos.findIndex((itemProducto) => {
    return itemProducto.codigo == codigo.value; //quiero retornar el elemento del array que su codigo coincida con el que esta esccrito en el value codigo del formulario
  });

  //modificar los datos de esa posicion del arreglo
  listaProductos[posicionProducto].producto = producto.value;
  listaProductos[posicionProducto].descripcion = descripcion.value;
  listaProductos[posicionProducto].cantidad = cantidad.value;
  listaProductos[posicionProducto].url = url.value;

  //modificar el localstorage
  localStorage.setItem("arregloProductos", JSON.stringify(listaProductos));
  //volver a dibujar la tabla con los nuevos datos reutilizando a la funcion
  borrarFilas();
  listaProductos.forEach((itemProducto) => {
    crearFilas(itemProducto);
  });

  //limpiar formulario
  limpiarFormulario();

  //mostrar un mensaje al usuario
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Producto editado correctamente",
    showConfirmButton: false,
    timer: 1500,
  });
}

function borrarFilas() {
  let tabla = document.querySelector("#tablaProducto");
  tabla.innerHTML = "";
}

window.eliminarProducto = (codigoProducto) => {
  Swal.fire({
    title: "Estás seguro que quieres eliminar este producto?",
    text: "Una vez eliminado no se puede recuperar el producto",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Borrar producto",
    cancelButtonText: "Cancelar",
  }).then((result) => { //el then(entonces) es lo que esta esperando el resultado de una promesa, en este caso la promesa es esperar la respuesta del usuario, mientras tanto se queda esperando la pagina sin hacer nada hasta que reciba una respuesta.
    if (result.isConfirmed) {
      ///aqui borramos el producto dentro del arreglo
      let productosFiltrados = listaProductos.filter((itemProducto) => {
        return itemProducto.codigo != codigoProducto; //filter me filtra todos los elementos que cumplan con la condicion logica en el nuevo arreglo productosFiltrados, de este modo lo dejo fuera al que coincida con el codigo que recibo por parametro
      });
      //actualizo el array listaProductos
      listaProductos = productosFiltrados;
      //actualizo el localStorage
      localStorage.setItem("arregloProductos", JSON.stringify(listaProductos));
      //dibujar de nuevo la tabla
      borrarFilas();
      listaProductos.forEach((itemProducto) => {
        crearFilas(itemProducto);
      });

      Swal.fire("Eliminado!", "El producto ha sido eliminado", "success");
    }
  });
};
