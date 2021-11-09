/**
   mecatron3k.js
   Controlador principal del juego Mecatron-3000
   @author Luis C Marzal
   @license GLP v3 2021 
**/
'use strict'



function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}

class Juego{
   constructor(){
      this.vista = new Vista()
      this.modelo = new Modelo()
      this.animador = null
      this.divPrincipal = null
      window.onload = this.iniciar.bind(this)
   }


   /**
    * Pone en marcha el juego
    */
   iniciar(){
      console.log('Iniciando...');
      this.divPrincipal = document.getElementById('divPrincipal')
      this.generadorItems= window.setInterval(this.generarItem.bind(this), 3000)
      this.animador = window.setInterval
   }

   generarItem(){
      let nuevoItem = this.modelo.crearItem()
      let contadorItems = 0
      this.vista.dibujar(divPrincipal, nuevoItem, contadorItems)
      contadorItems++
   }

}
/**
 * Clase vista que muestra el juego
 */
class Vista{
   constructor(){
      //this.contadorTop = 10
      this.contadorItems=0
   }

   /**
    * Dibuja el área dl juego
    * @param divPrincipal (HTMLDivElement) Div en el que dibujar el juego
    */
   dibujar(divPrincipal, nuevoItem, contadorItems){
      let img = document.createElement('img')
      
      divPrincipal.appendChild(img)
      if(contadorItems<0)
        img.insertBefore(img, document.getElementsByClassName('items'))
      img.setAttribute('src', nuevoItem)
      img.classList.add('items')
      //img.style.top = 10+'px'
      //img.style.left = Math.floor(Math.random() *85)+'%'
      img.setAttribute("id", contadorItems)
      img.setAttribute("draggable","true")
      img.setAttribute("ondragstart","drag(event)")
      //this.contadorTop=this.contadorTop+20
      this.contadorItems++
      console.log(contadorItems);
      
   }
}

class Modelo{
   constructor(){
      this.items = ['carton.png', 'lata.png', 'mansana.png', 'pelota.png']
   }

   crearItem(){
      return 'img/'+this.items[Math.floor(Math.random() *this.items.length)]
   }
}

let verde=document.getElementById("pverde");
let azul=document.getElementById("pazul");
let amarillo=document.getElementById("pamarilla");
let draggable=document.getElementById("drag1")
let draggable2=document.getElementById("drag2")
let draggable3=document.getElementById("drag3")


verde.setAttribute("ondrop", "drop(event)")
azul.setAttribute("ondrop", "drop(event)")
amarillo.setAttribute("ondrop", "drop(event)")


verde.setAttribute("ondragover", "allowDrop(event)")
azul.setAttribute("ondragover", "allowDrop(event)")
amarillo.setAttribute("ondragover", "allowDrop(event)")

/*
draggable.setAttribute("draggable","true")
draggable2.setAttribute("draggable","true")
draggable3.setAttribute("draggable","true")
draggable.setAttribute("ondragstart","drag(event)")
draggable2.setAttribute("ondragstart","drag(event)")
draggable3.setAttribute("ondragstart","drag(event)")
*/
  

var app = new Juego()

