'use strict'
let verde=document.getElementById("pverde");
let azul=document.getElementById("pazul");
let amarillo=document.getElementById("pamarillo");
verde.ondrop=drop
azul.ondrop=drop
amarillo.ondrop=drop

verde.ondragover=allowDrop(event)
azul.ondragover=allowDrop(event)
amarillo.ondragover=allowDrop(event)
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