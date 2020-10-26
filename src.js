var data;
function preload(){
  data = loadJSON("Data.json");
}

function setup() {
    createCanvas(600, 600);
    noLoop();
    console.log(data[0]["Cantón"])
}
  
function draw() {
    if (mouseIsPressed) {
      fill(0);
    } else {
      fill(255);
    }
    ellipse(300, 300, 80, 80);
    var l;
}