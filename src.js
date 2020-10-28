var data; //json con los datos
var dataFilt; //variable para el arreglo de objetos
var sel;
var coorProv, coorCant, coorDist;

var canvasW = 1360;
var canvasH = 736;
function preload(){
  data = loadJSON("Data.json");
}

function setup() {
  noLoop();
  //crea el canvas
  createCanvas(canvasW, canvasH);

  //filtro para los datos
  dataFilt = [];
  var max = Object.keys(data).length;
  var i = 0;
  while(i < max){
    dataFilt.push(data[i]);
    i = i+1;
  }
  //dataFilt ya contiene un arreglo de objetos console.log(dataFilt);

  sel = createSelect();
  sel.position(10, 10);
  sel.option('Provincias');
  sel.option('Cantones');
  sel.option('Distritos');
  sel.selected('Provincias');
  sel.changed(auxdraw);

}

function auxdraw() {
  let item = sel.value();
  if(item == "Provincias"){
    dibujarProv();
  }
  else if(item == "Cantones"){
    dibujarCant();
  }
}
  
function dibujarProv() {
  coorProv=[];
  var prov = provincias(dataFilt);
  var cW = parseInt(canvasW/2);
  var cH = parseInt(canvasH/2);
  drawNodo(cW, cH);
  var angulo = 360/prov.length;
  var actualX = cW;
  var actualY = parseInt(canvasH/4);
  var i = 0;
  while(i < prov.length){
    var dx = actualX - cW; //distancia en x
    var dy = actualY - cH; //distancia en y
    var radio = Math.sqrt(dx * dx + dy * dy); //radio de la trayectoria
    actualX = parseInt(cW + radio * Math.cos(angulo*(i+1)*(Math.PI/180))); //calcula el nuevo x con la rotacion
    actualY = parseInt(cH + radio * Math.sin(angulo*(i+1)*(Math.PI/180))); //calcula nuevo y con la rotacion
    drawNodo(actualX, actualY); //dibuja
    line(cW,cH,actualX,actualY);
    coorProv.push([prov[i],actualX,actualY]); //lo agrega a la lista de las coordenadas
    //setLabels(i.toString(), 15,0,30,15,actualX,actualY);
    
    i = i+1;
  }
}

function dibujarCant() {
  coorProv = [];
  coorCant = [];
  var prov = provincias(dataFilt);
  var cW = parseInt(canvasW/2);
  var cH = parseInt(canvasH/2);
  drawNodo(cW, cH);
  var angulo = 360/prov.length;
  var actualX = cW;
  var actualY = parseInt(canvasH/4);
  var i = 0;
  while(i < prov.length){
    var dx = actualX - cW; //distancia en x
    var dy = actualY - cH; //distancia en y
    var radio = Math.sqrt(dx * dx + dy * dy); //radio de la trayectoria
    actualX = parseInt(cW + radio * Math.cos(angulo*(Math.PI/180))); //calcula el nuevo x con la rotacion
    actualY = parseInt(cH + radio * Math.sin(angulo*(Math.PI/180))); //calcula nuevo y con la rotacion
    drawNodo(actualX, actualY); //dibuja
    line(cW,cH,actualX,actualY);
    coorProv.push([prov[i],actualX,actualY]); //lo agrega a la lista de las coordenadas
    
    //dibuja los cantones
    var cant = cantones(dataFilt, prov[i]);
    var angulo2 = angulo/cant.length;
    var actualX2 = cW;
    var actualY2 = parseInt(canvasH/8);
    var j = 0;
    var l_v = cant.length;
    while(j < 1){
      var l_u = 0;
      var dx2 = actualX2 - cW;
      var dy2 = actualY2 - cH;
      var radio2 = Math.sqrt(dx2 * dx2 + dy2 * dy2); //radio de la trayectoria
      actualX2 = parseInt(cW + radio2 * Math.cos(angulo2*(Math.PI/180))); //calcula el nuevo x con la rotacion
      actualY2 = parseInt(cH + radio2 * Math.sin(angulo2*(Math.PI/180))); //calcula nuevo y con la rotacion
      drawNodo(actualX2, actualY2); //dibuja
      var coorXPadre = coorProv.filter(d => d[0] == prov[i])[0][1];
      console.log(coorXPadre);
      var coorYPadre = coorProv.filter(d => d[0] == prov[i])[0][2];
      line(coorXPadre,coorYPadre,actualX2,actualY2);
      coorCant.push([prov[i],cant[j],actualX2,actualY2]); //lo agrega a la lista de las coordenadas
      angulo2 += angulo/cant.length;
      j = j+1;
    }
    angulo += 360/prov.length;
    i = i+1;
  }
}


//FUNCIONES AUXILIARES
//funcion para sacar las distintas provincias
function provincias(data) {
  var colProv = Array.from(data,(d => d.Provincia));
  var distProv = colProv.filter(onlyUnique);
  return distProv;
}

//funcion que me retorna los distintos cantones segun una provincia
function cantones(data, prov) {
  var colCant = Array.from(data.filter(tupla => tupla.Provincia == prov),(d => d.Cantón));
  var distCant = colCant.filter(onlyUnique);
  return distCant;
}

//funcion que me retorna los distintos distritos segun una provincia, un canton 
function distritos(data, prov, cant) {
  var colDist = Array.from(data.filter(tupla => (tupla.Provincia == prov && tupla.Cantón == cant)),(d => d.Distrito));
  var distDist = colDist.filter(onlyUnique);
  return distDist;
}

//funcion que retorna la cantidad de distritos por una provincia
function cantDistByProv(data, prov){
  var colDist = Array.from(data.filter(tupla => (tupla.Provincia == prov)),(d => d.Distrito));
  //var distDist = colDist.filter(onlyUnique);
  return colDist.length;
}


//funcion que retorna la cantidad de cantones por provincia
function cantCantByProv(data, prov){
  var colCant = Array.from(data.filter(tupla => (tupla.Provincia == prov)),(d => d.Cantón));
  var distCant = colCant.filter(onlyUnique);
  return distCant.length;
}

//funcion que retorna la cantidad de distritos por canton, prov
function cantDistByCantProv(data, prov, cant){
   var colDist = Array.from(data.filter(tupla => (tupla.Provincia == prov && tupla.Cantón == cant)),(d => d.Distrito));
  var distDist = colDist.filter(onlyUnique);
  return distDist;
}

//funcion para filtrar
//fuente: https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

//Funcion auxiliar para dibujar un nodo
function drawNodo(x, y){
  fill("#000000");
  ellipse(x, y, 10, 10);
}

function setLabels(NombreNodo, Activos, Fallecidos, Acumulados, Recuperados, x, y){
  var letra = 15;
  textSize(letra);
  if(x < (canvasW/2) && y < (canvasH/2)){
    var desvX = 15;
    text(NombreNodo, x+desvX, y+(letra));
    text(Activos, x+desvX , y+(letra*2));
    text(Fallecidos, x+desvX, y+(letra*3));
    text(Acumulados, x+desvX , y+(letra*4));
    text(Recuperados, x+desvX , y+(letra*5));
  }
  else if(x >= (canvasW/2) && y < (canvasH/2)){
    var desvX = -15*3;
    text(NombreNodo, x+desvX, y+(letra));
    text(Activos, x+desvX , y+(letra*2));
    text(Fallecidos, x+desvX, y+(letra*3));
    text(Acumulados, x+desvX , y+(letra*4));
    text(Recuperados, x+desvX , y+(letra*5));
  }
  else if(x < (canvasW/2) && y >= (canvasH/2)){
    var desvX = 15;
    var desvY = -80;
    text(NombreNodo, x+desvX, y+(letra)+desvY);
    text(Activos, x+desvX , y+(letra*2)+desvY);
    text(Fallecidos, x+desvX, y+(letra*3)+desvY);
    text(Acumulados, x+desvX , y+(letra*4)+desvY);
    text(Recuperados, x+desvX , y+(letra*5)+desvY);
  }
  else if(x >= (canvasW/2) && y >= (canvasH/2)){
    var desvX = -15*3;
    var desvY = -80;
    text(NombreNodo, x+desvX, y+(letra)+desvY);
    text(Activos, x+desvX , y+(letra*2)+desvY);
    text(Fallecidos, x+desvX, y+(letra*3)+desvY);
    text(Acumulados, x+desvX , y+(letra*4)+desvY);
    text(Recuperados, x+desvX , y+(letra*5)+desvY);
  }
}

function anguloNodo(angulo,hojasHijo,anguloHijo,hojas){
  return
}