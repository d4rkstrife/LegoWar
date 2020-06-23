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
            console.log(this.activePlayer.joueur);
            this.activePlayer.state = "active";
            this.activePlayer.jouer(this.grille);
            //     var interval = setInterval(this.verificationEtat(), 100);
            setInterval(() => { //boucle qui sert à savoir quand le joueur a joué, puis a passer au joueur suivant.
                if (this.activePlayer.state == "Tour fini") {
                    this.round++;
                    this.init();
                    clearInterval();
                }
            }, 100);

        }

    }
    //   verificationEtat() {
    //       if (this.activePlayer.state == "Tour fini") {
    //          this.round++;
    //          windows.clearInterval(interval);
    //          this.init();
    //      }

    //}


}


