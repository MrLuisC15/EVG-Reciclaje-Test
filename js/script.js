'use strict'
verde=document.getElementById("pverde");
azul=document.getElementById("pazul");
amarillo=document.getElementById("pamarillo");
verde.ondrop=drop(event)
azul.ondrop=drop(event)
amarillo.ondrop=drop(event)

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