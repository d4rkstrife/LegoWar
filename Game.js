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
            let i = Math.floor(this.round % 2);
            let j = Math.floor((this.round + 1) % 2);
            this.activePlayer = this.joueurs[i];
            this.passivePlayer = this.joueurs[j];
            this.activePlayer.state = "active";
            if (this.grille.state === "fight") {
                this.fight();
            } else {
                this.activePlayer.seDeplacer(this.grille, this);
            }
        }
    }
    fight() {
        console.log(this.activePlayer.damage)
        this.activePlayer.choisirPostureCombat(this);
    }


}


