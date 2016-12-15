/*
  Test code to generate a human player and an orc player
 */
var warrior = new Gauntlet.Combatants.Human();
warrior.generateWeapon() // This will be used for "Surprise me" option
warrior.generateClass();  // This will be used for "Surprise me" option
console.log(warrior.toString());

var orc = new Gauntlet.Combatants.Orc();
orc.generateClass();
orc.generateWeapon(Gauntlet.Armory.BroadSword());
console.log(orc.toString());


var playerHealth = 0;
var enemyHealth = 0;


/*
  Test code to generate a spell
 */


$(document).ready(function() {
  /*
    Show the initial view that accepts player name
   */
  $("#player-setup").show();






/*
Default parameters for page
*/

//hides alerts on page load
//no class alert
$(".no-name").hide();
$(".no-class").hide();
$(".no-weapon").hide();
$(".no-spell").hide();



  /*
    When any button with card__link class is clicked,
    move on to the next view.
   */
  $(".card__link").click(function(e) {
    var nextCard = $(this).attr("next");
    var moveAlong = false;

    switch (nextCard) {
      case "card--class":
        moveAlong = ($("#player-name").val() !== "");
        if ($("#player-name").val() === "") {
          $(".no-name").show();}
        break;
      case "card--weapon":
        moveAlong = (currentPlayer !== undefined);
        if (currentPlayer === undefined) {
          $(".no-class").show();}
        break;
      case "card--spell":
        moveAlong = (currentPlayer.weapon !== undefined);
        if (currentPlayer.weapon === undefined) {
          $(".no-weapon").show();}
        break;
      case "card--battleground":
        moveAlong = (currentPlayer.spell !== undefined);
        if (currentPlayer.spell === undefined) {
          $(".no-spell").show();}
        else if (currentPlayer.spell !== undefined) {
          loadCards();
        }
        break;
      }


    if (moveAlong) {
      $(".card").hide();
      $("." + nextCard).show();
    }
  });


  /*
    When the back button clicked, move back a view
   */
  $(".card__back").click(function(e) {
    var previousCard = $(this).attr("previous");
    $(".card").hide();
    $("." + previousCard).show();
  });

});


//Capture Player Name

function grabName() {
  if($("#player-name").val() === "") {
    Gauntlet.Combatants.Player.prototype.name = "Unknown Adventurer";
  } else {
     Gauntlet.Combatants.Player.prototype.name = $("#player-name").val();

  console.log(Gauntlet.Combatants.Player.prototype.name);
  }
}

//event listener for apply name
$("#select_class").click(grabName);



//Apply Class
var currentPlayer  = new Gauntlet.Combatants.Human();

function applyClass(e) {

  var whichClass = e.target.innerText.toLowerCase();
  var whichClassCase = whichClass[0].toUpperCase() + whichClass.slice(1);

  if (whichClassCase === "Surprise me") {
    console.log(currentPlayer)

    currentPlayer.class = currentPlayer.generateClass()
    console.log(currentPlayer)
  } else if(whichClassCase === "Select weapon") {

  } else {
  currentPlayer.class = new Gauntlet.GuildHall[whichClassCase];
  }
  console.log("Your choice: ", whichClassCase);
}



//event listener for each class button

$("#class-select").click(applyClass);



//Pick Weapon

function applyWeapon(e)  {

  var whichClass = e.target.innerText.toLowerCase();
  var whichClassWordsArray = whichClass.split(" ");
  var whichClassCase;
  var words = "";
  for (var i = 0; i < whichClassWordsArray.length; i++) {
    words += (whichClassWordsArray[i].toString()[0].toUpperCase() + whichClassWordsArray[i].toString().slice(1));
    }
    whichClassCase = words;
// if you selected Surprise me, will run random weapon function
  if (whichClassCase === "SurpriseMe") {
    currentPlayer.weapon = currentPlayer.generateWeapon()
    //if selected select Spell, does nothing and moves on to next card
  } else if(whichClassCase === "SelectSpell") {

  }
//if select Dagger, assigns new Dagger to player
  else if(whichClassCase === "Dagger") {

    currentPlayer.weapon =  new Gauntlet.Armory.Dagger()
  }
//if select Broad Sword, assigns new BroadSword to player
  else if(whichClassCase === "BroadSword") {
    currentPlayer.weapon = new Gauntlet.Armory.BroadSword();
  }
// if selected War Axe, assigns new War Axe to player
  else if(whichClassCase === "WarAxe") {
    currentPlayer.weapon = new Gauntlet.Armory.WarAxe();

  }

  console.log("Your weapon: ", whichClassCase);
}


//event listener for each weapon button


$("#weapon-select").click(applyWeapon);


//Pick Spell

function applySpell(e)  {

  var whichSpell = e.target.innerText.toLowerCase();

currentPlayer.spell = new Gauntlet.SpellBook.Spell()
// if you selected Surprise me, will run random spell function
  if (whichSpell === "surprise me") {
    currentPlayer.spell = new Gauntlet.SpellBook.Sphere();

    console.log("spell: ", currentPlayer.spell);
    //currentPlayer.spell.damageTypes = new Gauntlet.SpellBook.Sphere();

    //currentPlayer.spell.damage = new Gauntlet.SpellBook.Sphere.damage;
    //if selected select Spell, does nothing and moves on to next card
  } else if(whichSpell === "defeat your enemies") {

  }
//if select any spell type, will create a new random Sphere spell with the selected damage type
  else {
    //currentPlayer.spell = new Gauntlet.SpellBook.Spell()
      currentPlayer.spell.damageTypes = [whichSpell];
    };


  console.log(currentPlayer)
  console.log("Your spell: ", whichSpell);
}



//event listener for each spell button


$("#spell-select").click(applySpell);



//Load Player and Enemy stats onto page -> function called by selecting defeat your enemies if all selections made

function loadCards() {
  // tabulates health based on random health and healthBonus
  playerHealth = currentPlayer.health + currentPlayer.class.healthBonus;
  //loads player name
  $(".playerName").text([Gauntlet.Combatants.Player.prototype.name]);
  //loads player class
  $(".playerClass").text([currentPlayer.name]);
  //loads player weapon
  $(".playerWeapon").text([currentPlayer.weapon]);
  //loads player health
  $(".playerHealth").text([playerHealth]);
  //loads enemy name
  $(".monsterName").text("Orc");
  //loads enemy class
  $(".monsterClass").text([orc.class.name]);
  //loads enemy weapon
  $(".monsterWeapon").text([orc.weapon.name]);
  //loads enemy health
  $(".monsterHealth").text([orc.health]);
}
