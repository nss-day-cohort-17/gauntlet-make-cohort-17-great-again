var currentPlayer = {};
var currentEnemy = {};

// variables to track bonuses

var playerTotalIntelligenceBonus = 0;
var enemyTotalIntelligenceBonus = 0;
var playerTotalDamageBonus = 0;
var enemyTotalDamageBonus = 0;
var playerTotalStrengthBonus = 0;
var enemyTotalStrengthBonus = 0;
var playerTotalStealthBonus = 0;
var enemyTotalStealthBonus = 0;

var playerHealth = 0;
var enemyHealth = 0;
/*
  Test code to generate a human player and an orc player
 */
var warrior = new Gauntlet.Combatants.Human();
warrior.generateWeapon() // This will be used for "Surprise me" option
warrior.generateClass();  // This will be used for "Surprise me" option
console.log(warrior.toString());

currentEnemy = new Gauntlet.Combatants.Orc();
currentEnemy.generateClass();
currentEnemy.generateWeapon(Gauntlet.Armory.BroadSword());
console.log(currentEnemy.toString());


var playerHealth = 0;
var enemyHealth = 0;


/*
  Test code to generate a spell
 */

function addBonuses() {
  console.log("currentPlayer:", currentPlayer)
  console.log("orc:", currentEnemy)
  playerTotalStrengthBonus += currentPlayer.class.strengthBonus
  console.log("strength bonus:", playerTotalStrengthBonus)
  enemyTotalStrengthBonus += currentEnemy.class.strengthBonus
  console.log("orc strength bonus:", enemyTotalStrengthBonus)
  console.log(currentPlayer.class.__proto__.magical)
  if (currentPlayer.class.__proto__.magical === true) {
    playerTotalIntelligenceBonus += currentPlayer.class.intelligenceBonus
    console.log("int bonus:", playerTotalIntelligenceBonus)
    playerTotalDamageBonus = playerTotalIntelligenceBonus;
  } else if (currentPlayer.class.__proto__.stealthy === true) {
    playerTotalStealthBonus += currentPlayer.class.stealthBonus
    console.log("stealth bonus:", playerTotalStealthBonus)
    playerTotalDamageBonus = playerTotalStealthBonus + playerTotalStrengthBonus
  } else {
    playerTotalDamageBonus = playerTotalStrengthBonus
  }
  if (currentEnemy.class.__proto__.magical === true) {
    enemyTotalIntelligenceBonus += currentEnemy.class.intelligenceBonus
    console.log("orc int bonus:", enemyTotalIntelligenceBonus)
    enemyTotalDamageBonus = enemyTotalIntelligenceBonus
  } else if (currentEnemy.class.__proto__.stealthy === true){
    enemyTotalStealthBonus += currentEnemy.class.stealthBonus
    console.log("orc stealth bonus:", enemyTotalStealthBonus)
    enemyTotalDamageBonus = enemyTotalStealthBonus + enemyTotalStrengthBonus
  } else {
    enemyTotalDamageBonus = enemyTotalStrengthBonus
  }
}

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

        if (moveAlong) {
          addBonuses();

        }
        break;
      }
    }


    if (moveAlong) {
      $(".card").hide();
      $("." + nextCard).show();
    }
  });


/*
    When any enter is hit,
    move on to the next view.
   */
  $("html").keypress(function(e) {
    console.log(e);
    if(e.keyCode === 13 ) {
      console.log("enter");
      if ($("#player-name").val() === "") {
            $(".no-name").show();
      } else if ($("#player-name").val() !== "") {
          grabName();
          $(".card--name").hide();
         $(".card--class").show();
      }
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
  enemyHealth = currentEnemy.health + currentEnemy.class.healthBonus;
  //loads player name
  $(".playerName").text([Gauntlet.Combatants.Player.prototype.name]);
  //loads player class
  $(".playerClass").text([currentPlayer.class.name]);
  //loads player weapon
  $(".playerWeapon").text([currentPlayer.weapon]);
  //loads player health
  $(".playerHealth").text([playerHealth]);
  //loads enemy name
  $(".monsterName").text("Orc");
  //loads enemy class
  $(".monsterClass").text([currentEnemy.class.name]);
  //loads enemy weapon
  $(".monsterWeapon").text([currentEnemy.weapon.name]);
  //loads enemy health
  $(".monsterHealth").text([enemyHealth]);
}


//checks if battle should continue
function combatValidation(){
  if(playerHealth > 0 && enemyHealth > 0){
    $(".playerHealth").text([playerHealth]);
    $(".monsterHealth").text([enemyHealth]);
    //enemyHealth -= 70;
  }else if(playerHealth > 0 && enemyHealth <= 0){
    finaleCard();
    $("body").addClass("win-finale-card");
    $(".card").hide();
    $(".card--finale").show();

    console.log("you win")
  }else if(playerHealth <= 0 && enemyHealth > 0){
    finaleCard();
    $("body").addClass("lost-finale-card")
    $(".card").hide();
    $(".card--finale" ).show();
    console.log("you lose")
  }else if(playerHealth <= 0 && enemyHealth <= 0){
    finaleCard();
    console.log("you tie")
    $(".card").hide();
    $(".card--finale").show();
  }
}


//event listener for Attack button
$(".attack-btn").click(combat);
