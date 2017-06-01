function Particle(dna){
  this.pos = createVector(width /2 , height-25);
  this.vel = createVector();
  this.acc = createVector();
  this.found = false;
  this.crash = false;
  this.hitEdge = false;
  this.hitTop = false;
  this.timeToTarget = Infinity;

  if (dna){
    this.dna = dna;
  } else {
    this.dna = new DNA();
  }

  this.fitness = 0;

  this.addForce = function(force){
    this.acc.add(force);
  }

  this.update = function(){
    var d = dist(this.pos.x,this.pos.y,target.x,target.y);
    //check for hitting target
    if (d < targetSize/2){
      this.found = true;
      this.pos = target.copy();
      if (count < this.timeToTarget){
          this.timeToTarget = count;
          this.timeToTarget = map(this.timeToTarget, 0, lifespan, 20, 1);
          //console.log(this.timeToTarget);
      }
    }

    //chect for hitting object
    if (this.pos.x > obX && this.pos.x < obX + obW && this.pos.y > obY && this.pos.y < obY + obH) {
      this.crash = true;
      //console.log("Crashed");
    }

    //check for offscreen
    if (this.pos.x > width || this.pos.x < 0) {
      this.hitEdge = true;

    }
    if (this.pos.y > height) { //not checking 0 as want to keep fitness here
      this.hitEdge = true;

    }
    if (this.pos.y < 0) { //not checking 0 as want to keep fitness here
      this.hitTop = true;
    }


    //particles run through DNA array of vectors to add force
    this.addForce(this.dna.genes[count]);

    //basic physics application if not found target
    if (!this.found && !this.crash && !this.hitEdge && !this.hitTop){
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0); //clear after each frame
    }

  }

  this.show = function(){
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    rectMode(CENTER);
    rect(0, 0, 18, 4);
    pop();
  }

  this.calcFitness = function(){
    //closer to rocket the better its fitness
    var d = dist(this.pos.x,this.pos.y,target.x,target.y);
    this.fitness = map(d, 0, width, width, 0);
    if (this.found){ //if found target boost fitness
      this.fitness *= 15;
      madeGoal ++;
      var madeGoalPerc = madeGoal / popAmount * 100;
      madeGoalPerc = Math.round(madeGoalPerc * 100) / 100; //rounds to 2dp
      madeGoalP.html("Made it to target: " + madeGoal + " (" + madeGoalPerc + "%)");

      if (madeGoalPerc > recordPerc){
        recordPerc = madeGoalPerc;
        recordPrecP.html("<b>Your record is " + madeGoalPerc + "% making it to target!</b>");
      }

      if (this.timeToTarget > 0) {
        this.fitness *= this.timeToTarget *2; //increases fitness further based on time to target
      }
    }
    if (this.crash){ //if crash reduce fitness
      this.fitness /= 90;
    }
    if (this.hitEdge){ //if crash reduce fitness
      this.fitness /= 25;
    }
    if (this.hitTop){ //if crash reduce fitness
      this.fitness /= 20;
    }
  }
}
