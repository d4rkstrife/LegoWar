class Game {
    constructor(joueurs, grille) {
        this.joueurs = joueurs;
        this.grille = grille;
        this.round = 0;
        this.endGame = false;
        this.activePlayer;
    }
    init() {
        if (!this.endGame) {

            let i = Math.floor(this.round % 2);
            this.activePlayer = this.joueurs[i];
            console.log(i, this.round)
            this.activePlayer.state = "active";
            this.activePlayer.jouer(this.grille.grille);
            setInterval(() => { //boucle qui sert à savoir quand le joueur a joué, puis a passer au joueur suivant.
                if (this.activePlayer.state == "A joué") {
                    this.round++;
                    this.init();
                }
            }, 100);

        }

    }
}

