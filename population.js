function Population(){
  this.particles = [];
  this.matingpool = [];
  this.popsize = popAmount;

  for (i = 0; i < this.popsize; i ++){
      this.particles[i] = new Particle();
  }

  this.generate = function(){
    for (i = 0; i < this.popsize; i ++){
        //var pColour = map(count, 0, lifespan, 0, 255)
        fill(255,204,0,150);
        this.particles[i].update();
        this.particles[i].show();
    }
  }

  this.evaluate = function(){
    var maxFit = 0;
    for (i = 0; i < this.popsize; i ++){
      this.particles[i].calcFitness();
      if (this.particles[i].fitness > maxFit){
        maxFit = this.particles[i].fitness;
      }
    }
    var avgFit = 0;
    //normalise fitness accross population
    for (i = 0; i < this.popsize; i ++){
      this.particles[i].fitness /= maxFit;
      avgFit += this.particles[i].fitness;
    }
    avgFitnessP.html("Average Fitness: " + floor(avgFit));

    this.matingpool = []; //clear each time
    for (i = 0; i < this.popsize; i ++){
      var n = this.particles[i].fitness * 100;
      for (j = 0; j < n; j ++){
        //add to mating pool based on fitness i.e if fitness of 3 would be in pool 3 times, fitness of 100 in pool 100 times
        this.matingpool.push(this.particles[i]);
      }
    }
  }

  this.selection = function(){
    var newParticles = [];
    for (var i = 0; i < this.particles.length; i++){
      var parentA = random(this.matingpool).dna;
      var parentB = random(this.matingpool).dna;
      var child = parentA.crossover(parentB);
      child.mutation();
      newParticles[i] = new Particle(child);
    }
    this.particles = newParticles;
  }
}
