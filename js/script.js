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
      this.vista = new Vista(0)
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
   constructor(contador){
      //this.contadorTop = 10
      this.contadorItems=contador
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
      console.log(this.preguntaTipo.bind(nuevoItem));
      img.classList.add(this.preguntaTipo.bind(nuevoItem))

      //img.style.top = 10+'px'
      //img.style.left = Math.floor(Math.random() *85)+'%'
      img.setAttribute("id", this.contadorItems)
      img.setAttribute("draggable","true")
      img.setAttribute("ondragstart","drag(event)")
      //this.contadorTop=this.contadorTop+20
      this.contadorItems=+this.contadorItems+1
      console.log(this.contadorItems);
      
   }

   preguntaTipo(nuevoItem){
      for(let i=0; i<Modelo.itemsAmarillo.length;i++) {
         if(nuevoItem==Modelo.itemsAmarillo[i]){
            return 'itemAmarillo'
         }
      }

      for(let i=0; i<Modelo.itemsAzul.length;i++) {
         if(nuevoItem==Modelo.itemsAzul[i]){
            return 'itemAzul'
         }
      }

      for(let i=0; i<Modelo.itemsVerde.length;i++) {
         if(nuevoItem==Modelo.itemsVerde[i]){
            return 'itemVerde'
         }
      }
      return 'juan'
   }
}

class Modelo{
   constructor(){
      this.itemsAmarillo = ['lata.png']
      this.itemsAzul = ['carton.png','pelota.png']
      this.itemsVerde = [ 'mansana.png']
   }

   crearItem(){
      let random = Math.floor(Math.random() *3)

      switch (random) {
         case 0:
            return 'img/'+this.itemsAmarillo[Math.floor(Math.random() *this.itemsAmarillo.length)]
            break;
      
         case 1:
            return 'img/'+this.itemsAzul[Math.floor(Math.random() *this.itemsAzul.length)]
            break;
      
         case 2:
            return 'img/'+this.itemsVerde[Math.floor(Math.random() *this.itemsVerde.length)]
            break;
      
      }
      
   }
}

let verde=document.getElementById("pverde");
let azul=document.getElementById("pazul");
let amarillo=document.getElementById("pamarilla");


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

