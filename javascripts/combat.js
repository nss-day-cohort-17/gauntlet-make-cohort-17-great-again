var playerDamage = 0;
var enemyDamage = 0;
var playerTotalDamage = 0;
var enemyTotalDamage = 0;

function combat() {
  playerDamage = currentPlayer.weapon.damage + playerTotalDamageBonus;
  enemyDamage = currentEnemy.weapon.damage + enemyTotalDamageBonus;
  console.log("pDam:", playerDamage, "eDam", enemyDamage)
  console.log("playerHealth:", playerHealth, "enemyHealth", enemyHealth)
  enemyHealth = enemyHealth - playerDamage;
  playerHealth = playerHealth - enemyDamage;
  console.log("playerHealth:", playerHealth, "enemyHealth", enemyHealth)
  playerTotalDamage += playerDamage;
  enemyTotalDamage += enemyDamage;
  combatValidation()
}


function finaleCard(){
  //loads player class
  $(".playerDamage").append(" "+playerDamage);
  //loads player weapon
  $(".playerTotalDamage").append(" "+playerTotalDamage);
  //loads player health
  $(".playerEndingHealth").append(" "+playerHealth);
  //loads enemy class
  $(".monsterDamage").append(" "+enemyDamage);
  //loads enemy weapon
  $(".monsterTotalDamage").append(" "+enemyTotalDamage);
  //loads enemy health
  $(".monsterEndingHealth").append(" "+enemyHealth);
}
