new Vue({
  el: "#app",
  data: {
    gameStarted: false,
    playerHealth: 100,
    monsterHealth: 100,
    turns: []
  },
  computed: {
    playerHealthbarWidth: function() {
      return { width: this.playerHealth + "%" };
    },
    monsterHealthbarWidth: function() {
      return { width: this.monsterHealth + "%" };
    }
  },
  methods: {
    startGame: function() {
      this.gameStarted = true;
      this.monsterHealth = 100;
      this.playerHealth = 100;
    },
    quitGame: function() {
      this.gameStarted = false;
      this.turns = [];
    },
    attack: function() {
      var damageDone = Math.round(Math.random() * 5) + 5;
      this.monsterHealth -= damageDone;
      this.addTurn(true, "damage", damageDone);
      this.endTurn();
    },
    specialAttack: function() {
      var damageDone = Math.round(Math.random() * 10) + 3;
      this.monsterHealth -= damageDone;
      this.addTurn(true, "damage", damageDone);
      this.endTurn();
    },
    heal: function() {
      var damageHealed = Math.round(Math.random() * 10) + 8;
      this.playerHealth += damageHealed;
      if (this.playerHealth > 100) {
        this.playerHealth = 100;
      }
      this.addTurn(true, "heal", damageHealed);
      this.endTurn();
    },
    endTurn: function() {
      var damageDone = Math.round(Math.random() * 5) + 5;
      this.addTurn(false, "damage", damageDone);
      this.playerHealth -= damageDone;
    },
    addTurn: function(wasPlayerTurn, action, amount) {
      this.turns.push({
        wasPlayerTurn: wasPlayerTurn,
        action: action,
        amount: amount
      });
    }
  },
  watch: {
    playerHealth: function(value) {
      if (value <= 0) {
        alert("You lose. Press Start Game to play again.");
        this.quitGame();
      }
    },
    monsterHealth: function(value) {
      if (value <= 0) {
        alert("You win! Press Start Game to play again.");
        this.quitGame();
      }
    }
  }
});
