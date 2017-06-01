/*
Exmaple based on smart rockets
http://www.blprnt.com/smartrockets/

Population of particles created with a random DNA array of vectors, these are cycled through to distate how they move
Fitness of population calculated based on distance to target
Factors affecting fitness is hitting obsticle or hitting edge of screen except top
Mating pool generated based on this fitness with higher fitness object having more rep in mating pool
Child is chosen with some mutation percentage (10%) and added to new population
Added improved fitness for speed to target
*/

var population;
var popAmount = 250;
var framert = 60;
var lifespan = 425;
var lifecounter = 425;
var lifeSpanP;
var PopulationP;
var avgFitnessP;
var madeGoalP;
var count = 0;
var popCount = 1;
var target;
var maxForce = 0.2;
var targetSize = 50;
var madeGoal = 0;
var button;
var introText;
var sliderP;
var popSizeP;
var recordPrecP;
var recordPerc = 0;

//obsticle variables
var obX = 200;
var obY = 180;
var obW = 200;
var obH = 10;

function setup() {
  createCanvas(600,400);
  button = createButton('Start');
  button.position(width - 52, height - 26);
  introText = createP("<b><font color=white>Select population size and press start</font></b><br>");
  introText.position(18, height - 22);
  sliderP = createSlider(50, 2000, 250);
  sliderP.position(325, height - 25);
  popSizeP = createP("<b><font color=orange>" + sliderP.value()+"</font></b>");
  popSizeP.position(465, height - 22);
  sliderP.changed(refreshP);
  lifeSpanP = createP("Lifespan: Not Known");
  PopulationP = createP("<b>Generation #0</b>");
  avgFitnessP = createP("Average fitness: Not Known");
  madeGoalP = createP("Made it to target: Not Known");
  recordPrecP = createP("");
  noFill();
  stroke(0);
  strokeWeight(0);
  button.mousePressed(run);
  //population = new Population(); //create new population of particles
  target = createVector(width/2,50);
}

function refreshP(){
  popSizeP.html("<b><font color=orange>" + sliderP.value()+"</font></b>");
}

function run(){
  popAmount = sliderP.value();
  population = new Population(); //create new population of particles
  button.hide();
  introText.hide();
  popSizeP.hide();
  sliderP.hide();
}

function draw() {

    frameRate(framert);
    background(81);
    if (population){
    population.generate();  //run population w/ updates and show funtions
    lifeSpanP.html("Lifespan: " + lifecounter);
    PopulationP.html("<b>Generation #" + popCount +"</b>");
    count++;
    lifecounter--;
    if (count == lifespan){
      //create new pop based on fitness of prior pop
      //population = new Population();
      population.evaluate();
      population.selection();
      popCount++;
      count = 0;
      madeGoal = 0;
      lifecounter = lifespan;
    }
  }
  //draw obsticle
  fill(200,0,0,200);
  rect(obX, obY, obW, obH);

  //draw target

  fill(0,220,0,200);
  ellipse(target.x,target.y,targetSize,targetSize);
  fill(81);
  ellipse(target.x,target.y,targetSize/1.5,targetSize/1.5);
  fill(0,220,0,200);
  ellipse(target.x,target.y,targetSize/4,targetSize/4);
}
