'use strict'
let verde=document.getElementById("pverde");
let azul=document.getElementById("pazul");
let amarillo=document.getElementById("pamarilla");
let draggable=document.getElementById("drag1")
let draggable2=document.getElementById("drag2")
let draggable3=document.getElementById("drag3")

verde.setAttribute("ondrop", "drop(event)")
azul.setAttribute("ondrop", "drop(event)")
amarillo.setAttribute("ondrop", "drop(event)")
draggable.setAttribute("draggable","true")
draggable2.setAttribute("draggable","true")
draggable3.setAttribute("draggable","true")

verde.setAttribute("ondragover", "allowDrop(event)")
azul.setAttribute("ondragover", "allowDrop(event)")
amarillo.setAttribute("ondragover", "allowDrop(event)")
draggable.setAttribute("ondragstart","drag(event)")
draggable2.setAttribute("ondragstart","drag(event)")
draggable3.setAttribute("ondragstart","drag(event)")

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