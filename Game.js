class Game {
    constructor(joueurs, grille) {
        this.joueurs = joueurs;
        this.grille = grille;
        this.round = 0;
        this.player;
    }
    init() {
        if (this.round % 2 == 0) {
            this.player = this.joueurs[0];
        } else {
            this.player = this.joueurs[1];
        };
        console.log(this.player);
        this.player.seDeplacer(this.grille.grille);

    }
}