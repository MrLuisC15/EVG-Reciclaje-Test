/** 
 * @file Script para el minijuego de reciclaje
 * @author Luis Carlos Marzal de la Concepción
 * @author Diego Carrión Rodríguez
 * @author Kilian Benavente Ortega
 * @author Mario Pérez Pizarro
 * @license GPL-3.0
*/
'use strict'

/**
 * Instanciamos la puntación ,velocidad, nivel de juego y los sonidos
 */
let puntos = 0
let nivel = 1
let velocidad=1500
let generadorItems = null
let acierto = document.createElement("AUDIO");
acierto.setAttribute("src","acierto.mp3");
let fallo = document.createElement("AUDIO");
fallo.setAttribute("src","fallo.mp3");
let pasarNivel = document.createElement("AUDIO");
pasarNivel.setAttribute("src","pasarNivel.mp3");
let perder = document.createElement("AUDIO");
perder.setAttribute("src","perder.mp3");
/*
let acierto = new Audio('../sonidos/acierto.wav')
let fallo = new Audio('../sonidos/fallo.wav')
let pasarNivel = new Audio('../sonidos/pasarNivel.wav')
let perder = new Audio('../sonidos/perder.wav')
*/
/**
 *Función que permitirá arrastar un objeto
 *
 * @param {*} ev Evento de la función
 */
function allowDrop(ev) {
   ev.preventDefault();
}
/**
 *Función que gestionará el objeto mientras lo arrastremos
 *
 * @param {*} ev Evento de la función
 */
function drag(ev) {
   ev.dataTransfer.setData("text", ev.target.id);
   while(document.getElementsByClassName('marcado')[0]){
      document.getElementsByClassName('marcado')[0].classList.remove('marcado')
   }
}

/**
 *Función que gestionará el objeto mientras lo arrastremos
 *
 * @param {*} ev Evento de la función
 */
 function clickItem(ev) {
   //ev.dataTransfer.setData("text", ev.target.id);
   while(document.getElementsByClassName('marcado')[0]){
      document.getElementsByClassName('marcado')[0].classList.remove('marcado')
   }
   ev.target.classList.add('marcado')

}

/**
 *Función que gestiona cuando soltamos un objeto en el contenedor amarillo
 *
 * @param {*} ev Basura que introducimos en el contenedor. Si está en el contendor correcto será borrada, si no, expulsada
 */
function dropAmarillo(ev) {
   ev.preventDefault();
   if(ev.dataTransfer || document.getElementsByClassName('marcado')[0]) {
      if(document.getElementsByClassName('marcado')[0]) {
         var data = document.getElementsByClassName('marcado')[0].id
      }
      else {
         var data = ev.dataTransfer.getData("text");
      }

      let papelera = document.getElementById('imgamarilla')
      if(document.getElementById(data).classList.value=='items itemAmarillo' || document.getElementById(data).classList.value=='items itemAmarillo marcado'){
         ev.target.appendChild(document.getElementById(data));
         ev.target.removeChild(document.getElementById(data));
         acierto.play()
         masPunto()
         papelera.style.backgroundColor = "greenyellow"
         
      }
      else {
         fallo.play()
         papelera.style.backgroundColor = "red"
         
      }

      setTimeout(() => {
         papelera.style.background = "#ffffff"
      }, 750);
   }
}
/**
 *Función que gestiona cuando soltamos un objeto en el contenedor azul
 *
 * @param {*} ev Basura que introducimos en el contenedor. Si está en el contendor correcto será borrada, si no, expulsada
 */
function dropAzul(ev) {
   ev.preventDefault();
   if(ev.dataTransfer || document.getElementsByClassName('marcado')[0]) {
      if(document.getElementsByClassName('marcado')[0]) {
         var data = document.getElementsByClassName('marcado')[0].id
      }
      else {
         var data = ev.dataTransfer.getData("text");
      }
      let papelera = document.getElementById('imgazul')
      if(document.getElementById(data).classList.value=='items itemAzul' || document.getElementById(data).classList.value=='items itemAzul marcado'){
         ev.target.appendChild(document.getElementById(data));
         ev.target.removeChild(document.getElementById(data));
         acierto.play()
         masPunto()
         papelera.style.backgroundColor = "greenyellow"
         
      }
      else {
         fallo.play()
         papelera.style.backgroundColor = "red"
         
      }

      setTimeout(() => {
         papelera.style.background = "#ffffff"
      }, 750);
   }
 }
/**
 *Función que gestiona cuando soltamos un objeto en el contenedor verde
 *
 * @param {*} ev Basura que introducimos en el contenedor. Si está en el contendor correcto será borrada, si no, expulsada
 */
 function dropVerde(ev) {
   ev.preventDefault();
   if(ev.dataTransfer || document.getElementsByClassName('marcado')[0]) {
      if(document.getElementsByClassName('marcado')[0]) {
         var data = document.getElementsByClassName('marcado')[0].id
      }
      else {
         var data = ev.dataTransfer.getData("text");
      }
      
      let papelera = document.getElementById('imgverde')
      if(document.getElementById(data).classList.value=='items itemVerde' || document.getElementById(data).classList.value=='items itemVerde marcado'){
         ev.target.appendChild(document.getElementById(data));
         ev.target.removeChild(document.getElementById(data));
         acierto.play()
         masPunto()
         papelera.style.backgroundColor = "greenyellow"
         
      }
      else {
         fallo.play()
         papelera.style.backgroundColor = "red"
         
      }

      setTimeout(() => {
         papelera.style.background = "#ffffff"
      }, 750);
   }
 }

   

/**
 *Suma un punto extra a la puntuación total
 */
function masPunto(){
   puntos=puntos+1
   let divPuntos=document.getElementById('puntos')
   divPuntos.innerHTML = puntos

   let divNivel=document.getElementById('nivel')
   divNivel.innerHTML = nivel
   //console.log(puntos);
   if(puntos==5 && nivel==1) {
      pasarNivel.play()
      puntos=1
      nivel=2
      velocidad=1000 //1000
      divPuntos.innerHTML = puntos
      divNivel.innerHTML = nivel
      document.body.style.backgroundImage= 'url(img/fondoN2.jpg)'
      document.getElementById('divPrincipal').style.borderColor = 'red'
      document.getElementById('papeleras').style.borderColor = 'red'
   }
   if(puntos==15 && nivel==2) {
      pasarNivel.play()
      puntos=1
      nivel=3
      velocidad=750
      divPuntos.innerHTML = puntos
      divNivel.innerHTML = nivel
      document.body.style.backgroundImage= 'url(img/fondoN3.jpg)'
      document.getElementById('divPrincipal').style.borderColor = 'blue'
      document.getElementById('papeleras').style.borderColor = 'blue'
   }
   if(puntos==35 && nivel==3) {
      pasarNivel.play()
      puntos=1
      nivel=4
      velocidad=500
      divPuntos.innerHTML = puntos
      divNivel.innerHTML = nivel
      document.body.style.backgroundImage= 'url(img/fondoN4.jpg)'
      document.getElementById('divPrincipal').style.borderColor = 'purple'
      document.getElementById('papeleras').style.borderColor = 'purple'
   }
}

/**
 *Clase controlador. Se encarga de llamar a los métodos de Vista y Modelo.
 *
 * @class Juego
 */
class Juego{
   constructor(){
      this.vista = new Vista(0)
      this.modelo = new Modelo()
      this.animador = null
      this.divPrincipal = null
      this.puntos = 0
      window.onload = this.iniciar.bind(this)
   }


   /**
    * Pone en marcha el juego
    */
   iniciar(){
      console.log('Iniciando...');
      this.divPrincipal = document.getElementById('divPrincipal')
      this.intervaloItem()

      //console.log(this);

   }

   intervaloItem(){
      generadorItems= window.setInterval(this.generarItem.bind(this), velocidad)
     
   }

   /**
    *Crea un nuevo objeto basura
    *
    * @memberof Juego
    */
   generarItem(){
      let nuevoItem = this.modelo.crearItem()
      let contadorItems = 0
      this.vista.dibujar(divPrincipal, nuevoItem, contadorItems)
      contadorItems++
      if((nivel==2 || nivel==3 || nivel==4)&& puntos==1){
         window.clearInterval(generadorItems)
         this.intervaloItem()
      }
   }

  
}
/**
 *Clase vista que muestra el juego
 *
 * @class Vista
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
    *Dibuja los elementos del juego
    *
    * @param {*} divPrincipal Contenedor donde aperecerá la basura
    * @param {*} nuevoItem Objeto basura que se introducirá en el contenedor
    * @param {*} contadorItems Variable que llevará la cuenta de toda la basura que hay
    * @memberof Vista
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
      if(Math.floor(Math.random() *2)==1) { //
         img.style.left = Math.floor(Math.random() *50)+'%'
      }
      else{
         img.style.right = Math.floor(Math.random() *50)+'%'
      }

      //img.style.marginRight = '100px'
      img.setAttribute("id", this.contadorItems)
      img.setAttribute("draggable","true")
      img.setAttribute("ondragstart","drag(event)")
      img.setAttribute("onclick","clickItem(event)")

      //this.contadorTop=this.contadorTop+20
      this.contadorItems=+this.contadorItems+1
      
   }
   /**
    *Valida a qué contenedor debe ir cada objeto basura
    *
    * @param {*} nuevoItem Objeto basura creado
    * @return {*} Contenedor al que debe ir
    * @memberof Vista
    */
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
/**
 *Clase Modelo encargada de la parte lógica del programa
 *
 * @class Modelo
 */
class Modelo{
   constructor(){
      this.itemsAmarillo = ['lata.png']
      this.itemsAzul = ['carton.png','pelota.png']
      this.itemsVerde = [ 'mansana.png']
   }
   /**
    *Crea un nuevo objeto basura
    *
    * @return {*} Objeto basura
    * @memberof Modelo
    */
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

verde.setAttribute("onclick", "dropVerde(event)")
azul.setAttribute("onclick", "dropAzul(event)")
amarillo.setAttribute("onclick", "dropAmarillo(event)")


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

