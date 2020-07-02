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
        console.log(this.round)
        let i = Math.floor(this.round % 2);
        let j = Math.floor((this.round + 1) % 2);
        this.activePlayer = this.joueurs[i];
        this.passivePlayer = this.joueurs[j];
        if (this.activePlayer.state === "mort") {
            alert(`${this.passivePlayer.joueur} remporte la partie`)
        } else {

            this.activePlayer.state = "active";
            if (this.grille.state === "fight") {
                this.fight();
            } else {
                this.activePlayer.seDeplacer(this.grille, this);
            }
        }


    }
    fight() {
        this.activePlayer.choisirPostureCombat(this);
    }


}


