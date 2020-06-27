class Game {
  constructor(joueurs, grille) {
    this.joueurs = joueurs;
    this.grille = grille;
    this.round = 0;
    this.endGame = false;
    this.activePlayer;
    this.passivePlayer;
  }
  init() {
    if (!this.endGame) {

      let i = Math.floor(this.round % 2)
      let j = Math.floor((this.round + 1) % 2)
      this.activePlayer = this.joueurs[i];
      this.passivePlayer = this.joueurs[j];
      this.activePlayer.state = "active";
      if (this.grille.state === "fight") {
        this.fight(this.activePlayer, this.passivePlayer);
      } else {
        this.activePlayer.jouer(this.grille);
      }
      setInterval(() => { //boucle qui sert à savoir quand le joueur a joué, puis a passer au joueur suivant.
        if (this.activePlayer.state === "Tour fini") {
          this.round++;
          this.init();
        }
      }, 100);

    }

  }
  fight(activePlayer, passivePlayer) {
    activePlayer.choisirPostureCombat();
    setInterval(() => { //boucle qui sert à savoir quand le joueur a choisi sa posture.
      if (activePlayer.positionCombat === "attaque") {
        console.log(`${this.activePlayer.joueur} attaque`);
        activePlayer.attaquer(passivePlayer);
        this.activePlayer.state = "Tour fini";
      } else if (activePlayer.positionCombat === "défend") {
        console.log("il defend")
        this.activePlayer.state = "Tour fini";
      }
    }, 2000);

  }


}


