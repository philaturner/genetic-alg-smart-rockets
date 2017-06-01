function DNA(genes){
  //array full of random vectors which gets applied to particles based on lifespan of frames
  if (genes){
    this.genes = genes;
  } else { //if doesn't recieved genes create random
    this.genes = [];
    for (var i = 0; i < lifespan; i++){
      this.genes[i] = p5.Vector.random2D();
      this.genes[i].setMag(maxForce); //set magnitute on force so they don't go cray as fuck
    }
  }

  this.crossover = function(partner){
    var newgenes = [];
    var midpoint = floor(random(this.genes.length));
    for (i = 0; i < this.genes.length; i++){
      if (i > midpoint){
        newgenes[i] = this.genes[i];
      } else {
        newgenes[i] = partner.genes[i];
      }
    }
    return new DNA(newgenes);
  }

  this.mutation = function(){
    //10% mutation factor to recieve random vector instead
    for (i = 0; i < this.genes.length; i++){
        if (random(1) < 0.01){
          this.genes[i] = p5.Vector.random2D();
          this.genes[i].setMag(maxForce);
        }
    }
  }

}
