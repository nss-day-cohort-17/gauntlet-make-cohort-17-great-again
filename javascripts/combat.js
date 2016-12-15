function combat() {
  var playerDamage = currentPlayer.weapon.damage + playerTotalDamageBonus;
  var enemyDamage = currentEnemy.weapon.damage + enemyTotalDamageBonus;
  console.log("pDam:", playerDamage, "eDam", enemyDamage)
  console.log("playerHealth:", playerHealth, "enemyHealth", enemyHealth)
  enemyHealth = enemyHealth - playerDamage;
  playerHealth = playerHealth - enemyDamage;
  console.log("playerHealth:", playerHealth, "enemyHealth", enemyHealth)
  combatValidation()
}
