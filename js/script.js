/** 
 * @file Script para el minijuego de reciclaje.
 * @author Luis Carlos Marzal de la Concepción
 * @author Diego Carrión Rodríguez
 * @author Kilian Benavente Ortega
 * @author Mario Pérez Pizarro
 * @license GPL-3.0
*/
'use strict'

/**
 * Instanciamos la puntación ,velocidad, nivel de juego y los sonidos.
 */
let puntos = 0
let nivel = 1
let velocidad = 2000
let pausa = 0
let generadorItems = null
let contadorPerder= 0
let acierto = document.createElement("AUDIO");
acierto.setAttribute("src","sonidos/acierto.mp3");
let fallo = document.createElement("AUDIO");
fallo.setAttribute("src","sonidos/perder.mp3");
let pasarNivel = document.createElement("AUDIO");
pasarNivel.setAttribute("src","sonidos/pasarNivel.mp3");
let perder = document.createElement("AUDIO");
perder.setAttribute("src","sonidos/lose.mp3");
const MUSICAFONDO=document.querySelector("#musica-fondo");
MUSICAFONDO.loop=true;
const F11=document.querySelector("#f11");
F11.onclick=pantallaCompleta;
/*
let acierto = new Audio('../sonidos/acierto.wav')
let fallo = new Audio('../sonidos/fallo.wav')
let pasarNivel = new Audio('../sonidos/pasarNivel.wav')
let perder = new Audio('../sonidos/perder.wav')
*/
window.addEventListener("keydown", (e)=>{
   if(e.key=="F11"){
      e.preventDefault();
   }
   if(e.key=="f"){
      pantallaCompleta();
   }
})

function pantallaCompleta(){
   if(document.fullscreenElement){
      document.exitFullscreen();
      F11.innerHTML='<i class="bi bi-fullscreen"></i>';
   }else{
      document.documentElement.requestFullscreen();
      F11.innerHTML='<i class="bi bi-fullscreen-exit"></i>';
   }
}
let puntosCookie
let divMax=document.getElementById('puntosMaximos')
let subeNivel = false

if(!document.cookie) {
   document.cookie = 'puntosMax = 0';
   puntosCookie = getCookie('puntosMax')
   divMax.innerHTML = puntosCookie
}
else {
   puntosCookie = getCookie('puntosMax')
   divMax.innerHTML = puntosCookie
}


function getCookie(cname) {
   let name = cname + "=";
   let ca = document.cookie.split(';');
   for(let i = 0; i < ca.length; i++) {
     let c = ca[i];
     while (c.charAt(0) == ' ') {
       c = c.substring(1);
     }
     if (c.indexOf(name) == 0) {
       return c.substring(name.length, c.length);
     }
   }
   return "";
 }




/**
 * @function allowDrop
 * @description Función que permitirá arrastar un objeto.
 *
 * @param {Event} ev Evento de la función.
 */
function allowDrop(ev) {
   ev.preventDefault();
}
/**
 * @function drag
 * @description Función que gestionará el objeto mientras lo arrastremos.
 *
 * @param {Event} ev Evento de la función.
 */
function drag(ev) {
   ev.dataTransfer.setData("text", ev.target.id);
   while(document.getElementsByClassName('marcado')[0]){
      document.getElementsByClassName('marcado')[0].classList.remove('marcado')
   }
}

/**
 * @function clickItem
 * @description Función que gestionará el objeto mientras lo cliquemos.
 *
 * @param {Event} ev Evento de la función.
 */
 function clickItem(ev) {
   //ev.dataTransfer.setData("text", ev.target.id);
   while(document.getElementsByClassName('marcado')[0]){
      document.getElementsByClassName('marcado')[0].classList.remove('marcado')
   }
   ev.target.classList.add('marcado')

}

/**
 * @function dropAmarillo
 * @description Función que gestiona cuando soltamos un objeto en el contenedor amarillo.
 *
 * @param {Event} ev Basura que introducimos en el contenedor. Si está en el contendor correcto será borrada, si no, expulsada.
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
         contadorPerder--
         papelera.style.backgroundColor = "greenyellow"
         
      }
      else {
         fallo.play()
         papelera.style.backgroundColor = "red"
         puntos=puntos-nivel
         let divPuntos=document.getElementById('puntos')
         divPuntos.innerHTML = puntos
      }

      setTimeout(() => {
         papelera.style.background = "#ffffff"
      }, 750);
   }
}
/**
 * @function dropAzul
 * @description Función que gestiona cuando soltamos un objeto en el contenedor azul.
 *
 * @param {Event} ev Basura que introducimos en el contenedor. Si está en el contendor correcto será borrada, si no, expulsada.
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
         contadorPerder--
         papelera.style.backgroundColor = "greenyellow"
         
      }
      else {
         fallo.play()
         papelera.style.backgroundColor = "red"
         puntos=puntos-nivel
         let divPuntos=document.getElementById('puntos')
         divPuntos.innerHTML = puntos
      }

      setTimeout(() => {
         papelera.style.background = "#ffffff"
      }, 750);
   }
 }
/**
 * @function dropVerde
 * @description Función que gestiona cuando soltamos un objeto en el contenedor verde.
 *
 * @param {Event} ev Basura que introducimos en el contenedor. Si está en el contendor correcto será borrada, si no, expulsada.
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
         contadorPerder--
         papelera.style.backgroundColor = "greenyellow"
         
      }
      else {
         fallo.play()
         papelera.style.backgroundColor = "red"
         puntos=puntos-nivel
         let divPuntos=document.getElementById('puntos')
         divPuntos.innerHTML = puntos
      }

      setTimeout(() => {
         papelera.style.background = "#ffffff"
      }, 750);
   }
 }


/*if(!document.cookie ) {
   document.cookie = newCookie
   document.cookie = "puntos = 1"
}*/

/**
 * @function masPunto
 * @description Suma puntos extra a la puntuación total y comprueba si hay que subir de nivel.
 */
function masPunto(){
   puntos=puntos+1*nivel
   let divPuntos=document.getElementById('puntos')
   divPuntos.innerHTML = puntos

   let divNivel=document.getElementById('nivel')
   divNivel.innerHTML = nivel

   

   if(puntosCookie<puntos){
      document.cookie = 'puntosMax = '+puntos
      divMax.innerHTML = puntos
   }


   //console.log(puntos);
   if(puntos>=15 && nivel==1) {
      subeNivel=true
      pasarNivel.play()
      nivel=2
      velocidad=1500
      puntos=15
      MUSICAFONDO.playbackRate=1.1;
      divPuntos.innerHTML = puntos
      divNivel.innerHTML = nivel
      document.body.style.backgroundImage= 'url(img/fondoN2.jpg)'
      document.getElementById('divPrincipal').style.borderColor = 'red'
      document.getElementById('papeleras').style.borderColor = 'red'
   }
   if(puntos>=50 && nivel==2) {
      subeNivel=true
      pasarNivel.play()
      nivel=3
      velocidad=1250
      puntos=50
      MUSICAFONDO.playbackRate=1.25;
      divPuntos.innerHTML = puntos
      divNivel.innerHTML = nivel
      document.body.style.backgroundImage= 'url(img/fondoN3.jpg)'
      document.getElementById('divPrincipal').style.borderColor = 'blue'
      document.getElementById('papeleras').style.borderColor = 'blue'
   }
   if(puntos>=100 && nivel==3) {
      subeNivel=true
      pasarNivel.play()
      nivel=4
      velocidad=1100
      puntos=100
      MUSICAFONDO.playbackRate=1.5;
      divPuntos.innerHTML = puntos
      divNivel.innerHTML = nivel
      document.body.style.backgroundImage= 'url(img/fondoN4.jpg)'
      document.getElementById('divPrincipal').style.borderColor = 'purple'
      document.getElementById('papeleras').style.borderColor = 'purple'
   }
   if(puntos>=200 && nivel==4) {
      subeNivel=true
      pasarNivel.play()
      nivel=5
      velocidad=1000
      puntos=200
      MUSICAFONDO.playbackRate=1.75;
      divPuntos.innerHTML = puntos
      divNivel.innerHTML = nivel
      document.body.style.backgroundImage= 'url(img/fondoN5.jpg)'
      document.getElementById('divPrincipal').style.borderColor = 'magenta'
      document.getElementById('papeleras').style.borderColor = 'magenta'
   }
   if(puntos>=350 && nivel==5) {
      subeNivel=true
      pasarNivel.play()
      nivel=6
      velocidad=850
      puntos=350
      MUSICAFONDO.playbackRate=2;
      divPuntos.innerHTML = puntos
      divNivel.innerHTML = nivel
      document.body.style.backgroundImage= 'url(img/fondoN6.jpg)'
      document.getElementById('divPrincipal').style.borderColor = 'yellow'
      document.getElementById('papeleras').style.borderColor = 'yellow'
   }
   if(puntos>=500 && nivel==6) {
      subeNivel=true
      pasarNivel.play()
      nivel=7
      velocidad=700
      puntos=500
      MUSICAFONDO.playbackRate=2.25;
      divPuntos.innerHTML = puntos
      divNivel.innerHTML = nivel
      document.body.style.backgroundImage= 'url(img/fondoN7.jpg)'
      document.getElementById('divPrincipal').style.borderColor = 'brown'
      document.getElementById('papeleras').style.borderColor = 'brown'
   }
   if(puntos>=1000 && nivel==7) {
      subeNivel=true
      pasarNivel.play()
      nivel=8
      velocidad=550
      puntos=1000
      MUSICAFONDO.playbackRate=2.5;
      divPuntos.innerHTML = puntos
      divNivel.innerHTML = nivel
      document.body.style.backgroundImage= 'url(img/fondoN8.jpg)'
      document.getElementById('divPrincipal').style.borderColor = 'cyan'
      document.getElementById('papeleras').style.borderColor = 'cyan'
   }
   if(puntos>=2000 && nivel==8) {
      subeNivel=true
      pasarNivel.play()
      nivel=9
      velocidad=400
      puntos=2000
      MUSICAFONDO.playbackRate=2.75;
      divPuntos.innerHTML = puntos
      divNivel.innerHTML = nivel
      document.body.style.backgroundImage= 'url(img/fondoN9.jpg)'
      document.getElementById('divPrincipal').style.borderColor = 'pink'
      document.getElementById('papeleras').style.borderColor = 'pink'
   }
   if(puntos>=5000 && nivel==9) {
      subeNivel=true
      pasarNivel.play()
      nivel=10
      velocidad=250
      puntos=5000
      MUSICAFONDO.playbackRate=3;
      divPuntos.innerHTML = puntos
      divNivel.innerHTML = nivel
      document.body.style.backgroundImage= 'url(img/fondoN10.jpg)'
      document.getElementById('divPrincipal').style.borderColor = 'black'
      document.getElementById('papeleras').style.borderColor = 'black'
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
    * @function iniciar
    * @description Pone en marcha el juego.
    * @memberof Juego
    */
   iniciar(){
      console.log('Iniciando...');
      this.divPrincipal = document.getElementById('divPrincipal')
      this.intervaloItem()

      //console.log(this);

   }
   /**
    * @function intervaloItem
    * @description Establece la velocidad a la que aparecerán los objetos.
    * @memberof Juego
    */
   intervaloItem(){
      generadorItems= window.setInterval(this.generarItem.bind(this), velocidad)
     
   }
   /**
    * @function generarItem
    * @description Crea un nuevo objeto basura.
    * @memberof Juego
    */
   generarItem(){
      let nuevoItem = this.modelo.crearItem()
      let contadorItems = 0
      let divPuntos=document.getElementById('puntos')

      if(pausa==2) {
         contadorPerder++
         
         this.vista.dibujar(divPrincipal, nuevoItem, contadorItems)
         contadorItems++
         this.comprobarPerder()
         
      }
      if(subeNivel|| pausa==1){
         if(subeNivel) {
            this.limpiarPantalla()
            subeNivel=false
         }
         window.clearInterval(generadorItems)
         this.intervaloItem()
         
         divPuntos.innerHTML = puntos
         pausa=2
      }
   }
   /**
    * @function comprobarPerder
    * @description Cuenta cuánta basura hay para ver si debe mostrar o no la pantalla de Game Over.
    * @memberof Juego
    */
   comprobarPerder(){
      if(contadorPerder>=10 && nivel==1) {
         this.perder()
      }
      if(contadorPerder>=20 && nivel==2) {
         this.perder()
      }
      if(contadorPerder>=30 && nivel==3) {
         this.perder()
      }
      if(contadorPerder>=40 && nivel==4) {
         this.perder()
      }
      if(contadorPerder>=50 && nivel==5) {
         this.perder()
      }
      if(contadorPerder>=60 && nivel==6) {
         this.perder()
      }
      if(contadorPerder>=80 && nivel==7) {
         this.perder()
      }
      if(contadorPerder>=100 && nivel==8) {
         this.perder()
      }
      if(contadorPerder>=120 && nivel==9) {
         this.perder()
      }
      if(contadorPerder>=140 && nivel==10) {
         this.perder()
      }
   }

   /**
    * @function perder
    * @description Muestra la pantalla de Game Over.
    * @memberof Juego
    */
   perder(){
      window.clearInterval(generadorItems)
      perder.play()
      this.limpiarPantalla()
      this.divPrincipal
      let divPerder= document.createElement('div')
      let img = document.createElement('img')
      img.setAttribute('src', 'img/GameOver.png');
      document.body.appendChild(divPerder);
      divPerder.classList.add('gameOver');
      divPerder.appendChild(img);
      MUSICAFONDO.playbackRate=0




      //divPerder.textContent=`Has perdido en el nivel ${nivel}`
      pausa=0
   }
   
   limpiarPantalla(){
      while(this.divPrincipal.childElementCount>0) {
         this.divPrincipal.removeChild(this.divPrincipal.children[0])
      }
   }
  
}
/**
 *Clase vista que muestra el juego.
 *
 * @class Vista
 */
class Vista{
   constructor(contador){
      //this.contadorTop = 10
      this.contadorItems=contador
      this.itemsAmarillo = ['lata.png','actimel.png','plasticoPajita.png','pelota.png','bebidoMora.png','bollicao.png','zumito.png','zumotropical.png']
      this.itemsAzul = ['carton.png','pajita.png','bolaPapel.png']
      this.itemsVerde = [ 'manzana.png','platano.png','naranja.png','melocoton.png','kiwi.png']
   }

   /**
    * @function dibujar
    * @description Dibuja los elementos del juego.
    * @param {HTMLDivElement} divPrincipal Contenedor donde aperecerá la basura.
    * @param {String} nuevoItem Objeto basura que se introducirá en el contenedor.
    * @param {BigInteger} contadorItems Variable que llevará la cuenta de toda la basura que hay.
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

      //img.style.top = Math.floor(Math.random() *290)+'px'
      if(Math.floor(Math.random() *2)==1) { //
         img.style.top = Math.floor(Math.random() *50)+'%'
      }
      else{
         img.style.bottom = Math.floor(Math.random() *50)+'%'
      }

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
    * @function preguntaTipo
    * @description Valida a qué contenedor debe ir cada objeto basura.
    * @param {String} nuevoItem Objeto basura creado.
    * @return {String} Contenedor al que debe ir.
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
 *Clase Modelo encargada de la parte lógica del programa.
 *
 * @class Modelo
 */
class Modelo{
   constructor(){
      this.itemsAmarillo = ['lata.png','actimel.png','plasticoPajita.png','bebidoMora.png','bollicao.png','zumito.png','zumotropical.png']
      this.itemsAzul = ['carton.png','pelota.png','pajita.png','bolaPapel.png']
      this.itemsVerde = [ 'manzana.png','platano.png','naranja.png','melocoton.png','kiwi.png']
   }
   /**
    * @function crearItem
    * @description Crea un nuevo objeto basura.
    * @return {*} Objeto basura.
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

let boton = document.getElementById('bIniciar')
boton.setAttribute("onclick", "clickIniciar()")

/**
 * @function clickIniciar
 * @description Inicia el juego al hacer click.
 */
function clickIniciar() {
   MUSICAFONDO.play();
   let boton = document.getElementById('bIniciar')
   boton.style.display = 'none'
   pausa=1
}

var app = new Juego()


