import { jQuery } from 'jquery.js';

var filePath = 'C:\Users\adria\Documents\OneDrive - Estudiantes ITCR\II SEMESTRE 2020\Visualización de Información\-VI-Visualizaciones-Jerarquicas\Data.json'
var data = jQuery.getJSON(filePath, {
    tagmode: "any",
    format: "json"
})
console.log(data.collection.lenght);
function setup() {
    createCanvas(600, 600);
    noLoop();
}
  
function draw() {
    if (mouseIsPressed) {
      fill(0);
    } else {
      fill(255);
    }
    ellipse(50, 50, 80, 80);
    var l;
}