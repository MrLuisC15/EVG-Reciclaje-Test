/**
   script.js
   Minijuego de reciclaje
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

function dropAmarillo(ev) {
   ev.preventDefault();
   var data = ev.dataTransfer.getData("text");
   if(document.getElementById(data).classList.value=='items itemAmarillo')
      ev.target.appendChild(document.getElementById(data));

}

function dropAzul(ev) {
   ev.preventDefault();
   var data = ev.dataTransfer.getData("text");
   if(document.getElementById(data).classList.value=='items itemAzul')
      ev.target.appendChild(document.getElementById(data));

 }

 function dropVerde(ev) {
   ev.preventDefault();
   var data = ev.dataTransfer.getData("text");
   if(document.getElementById(data).classList.value=='items itemVerde')
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
      this.generadorItems= window.setInterval(this.generarItem.bind(this), 10)
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
      this.itemsAmarillo = ['lata.png']
      this.itemsAzul = ['carton.png','pelota.png']
      this.itemsVerde = [ 'mansana.png']
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
      img.setAttribute('src', 'img/'+nuevoItem)
      img.classList.add('items')
      let clase = this.preguntaTipo(nuevoItem);
      img.classList.add(clase)

      img.style.top = Math.floor(Math.random() *290)+'px'
      img.style.left = Math.floor(Math.random() *94)+'%'
      img.setAttribute("id", this.contadorItems)
      img.setAttribute("draggable","true")
      img.setAttribute("ondragstart","drag(event)")
      //this.contadorTop=this.contadorTop+20
      this.contadorItems=+this.contadorItems+1
      
   }

   preguntaTipo(nuevoItem){
      
      for(let i=0; i<this.itemsAmarillo.length;i++) {
         if(nuevoItem==this.itemsAmarillo[i]){
            
            return "itemAmarillo"
         }
      }

      for(let i=0; i<this.itemsAzul.length;i++) {
         if(nuevoItem==this.itemsAzul[i]){
            return "itemAzul"
         }
      }

      for(let i=0; i<this.itemsVerde.length;i++) {
         if(nuevoItem==this.itemsVerde[i]){
            return "itemVerde"
         }
      }
      
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
            return this.itemsAmarillo[Math.floor(Math.random() *this.itemsAmarillo.length)]
            break;
      
         case 1:
            return this.itemsAzul[Math.floor(Math.random() *this.itemsAzul.length)]
            break;
      
         case 2:
            return this.itemsVerde[Math.floor(Math.random() *this.itemsVerde.length)]
            break;
      
      }
      
   }
}

let verde=document.getElementById("pverde");
let azul=document.getElementById("pazul");
let amarillo=document.getElementById("pamarilla");


verde.setAttribute("ondrop", "dropVerde(event)")
azul.setAttribute("ondrop", "dropAzul(event)")
amarillo.setAttribute("ondrop", "dropAmarillo(event)")


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

