var data; //json con los datos
var dataFilt;
function preload(){
  data = loadJSON("Data.json");
}

function setup() {
    createCanvas(1024, 720);
    //filtro para los datos
    dataFilt = [];
    var max = Object.keys(data).length;
    var i = 0;
    while(i < max){
      dataFilt.push(data[i]);
      i = i+1;
    }
    console.log(dataFilt);
    //dataFilt ya contiene un arreglo de objetos
}
  
function draw() {
    ellipse(512, 360, 80, 80);
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

//funcion para filtrar
//fuente: https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function drawAux(NombreNodo, Activos, Fallecidos, Acumulados, Recuperados){

}