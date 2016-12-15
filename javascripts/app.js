/*
  Test code to generate a human player and an orc player
 */
var warrior = new Gauntlet.Combatants.Human();
warrior.setWeapon(new WarAxe());
warrior.generateClass();  // This will be used for "Surprise me" option
console.log(warrior.toString());

var orc = new Gauntlet.Combatants.Orc();
orc.generateClass();
orc.setWeapon(new BroadSword());
console.log(orc.toString());

/*
  Test code to generate a spell
 */
var spell = new Gauntlet.SpellBook.Sphere();
console.log("spell: ", spell.toString());


$(document).ready(function() {
  /*
    Show the initial view that accepts player name
   */
  $("#player-setup").show();

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
        break;
      case "card--weapon":
        moveAlong = ($("#player-name").val() !== "");
        break;
      case "card--spell":
        moveAlong = ($("#player-name").val() !== "");
        break;
      case "card--battleground":
        moveAlong = ($("#player-name").val() !== "");
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
  if(document.querySelector("#player-name").value === "") {
    Gauntlet.Combatants.Player.prototype.name = "Unknown Adventurer";
  } else {
     Gauntlet.Combatants.Player.prototype.name = document.querySelector("#player-name").value;
  }
  console.log(Gauntlet.Combatants.Player.prototype.name);
}

//event listener for apply name
$("#select_class").click(grabName);



//Apply Class
var currentPlayer;

function applyClass(e) {

  var whichClass = e.target.innerText.toLowerCase();
  var whichClassCase = whichClass[0].toUpperCase() + whichClass.slice(1);

  if (whichClassCase === "Surprise me") {
    console.log("cows");
  } else if(whichClassCase === "Select weapon") {

  } else {
  currentPlayer = new Gauntlet.GuildHall[whichClassCase];
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
    console.log("cows");
    //if selected select Spell, does nothing and moves on to next card
  } else if(whichClassCase === "SelectSpell") {

  }
//if select Dagger, assigns new Dagger to player
  else if(whichClassCase === "Dagger") {
    currentPlayer.weapon = new Dagger();
  }
//if select Broad Sword, assigns new BroadSword to player
  else if(whichClassCase === "BroadSword") {
    currentPlayer.weapon = new BroadSword();
  }
// if selected War Axe, assigns new War Axe to player
  else if(whichClassCase === "WarAxe") {
    currentPlayer.weapon = new WarAxe();
  }

  console.log("Your weapon: ", whichClassCase);
}



//event listener for each weapon button


$("#weapon-select").click(applyWeapon);


//Pick Spell

function applySpell(e)  {

  var whichClass = e.target.innerText.toLowerCase();
  var whichClassWordsArray = whichClass.split(" ");
  var whichClassCase;
  var words = "";
  for (var i = 0; i < whichClassWordsArray.length; i++) {
    words += (whichClassWordsArray[i].toString()[0].toUpperCase() + whichClassWordsArray[i].toString().slice(1));
    }
    whichClassCase = words;
// if you selected Surprise me, will run random spell function
  if (whichClassCase === "SurpriseMe") {
    console.log("cows");
    //if selected select Spell, does nothing and moves on to next card
  } else if(whichClassCase === "DefeatYourEnemies") {

  }
//if select any spell type, will create a new random Sphere spell with the selected damage type
  else {
    currentPlayer.spell = new Gauntlet.SpellBook.Spell()
      currentPlayer.spell.damageTypes = [whichClassCase];
    };


  console.log(currentPlayer)
  console.log("Your spell: ", whichClassCase);
}



//event listener for each spell button


$("#spell-select").click(applySpell);
