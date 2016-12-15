var Gauntlet = Gauntlet || {};
Gauntlet.Armory = {};
 Gauntlet.Armory.Weapon = function() {
  this.name = "bare hands";
  this.damage = 1;
  this.hands = 2;
  //console.log(Gauntlet.Armory.Weapon)
  this.toString = function() {
    return this.name;
  }
};
//console.log(Gauntlet.Armory.Weapon)

Gauntlet.Armory.Dagger = function() {
  this.name = "dagger";
  this.damage = 4;
  this.hands = 1;
};

Gauntlet.Armory.Dagger.prototype = new Gauntlet.Armory.Weapon();
//Dagger.prototype = new Weapon();

Gauntlet.Armory.BroadSword = function() {
  this.name = "broad sword";
  this.damage = 14;
  this.hands = 2;
};
Gauntlet.Armory.BroadSword.prototype = new Gauntlet.Armory.Weapon();
//BroadSword.prototype = new Weapon();

Gauntlet.Armory.WarAxe = function() {
  this.name = "war axe";
  this.damage = 18;
  this.hands = 2;
};
Gauntlet.Armory.WarAxe.prototype = new Gauntlet.Armory.Weapon();
//WarAxe.prototype = new Weapon();
