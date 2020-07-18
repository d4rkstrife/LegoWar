class Game {
    constructor(joueurs, grille) {
        this.joueurs = joueurs;
        this.grille = grille;
        this.round = 0;
        this.activePlayer;
        this.passivePlayer;
    }
    init() {
        console.log(this.round)
        let i = Math.floor(this.round % 2);
        let j = Math.floor((this.round + 1) % 2);
        this.activePlayer = this.joueurs[i];
        this.passivePlayer = this.joueurs[j];
        $(`#${this.activePlayer.position}`).fadeTo(0, 1);
        $(`#${this.passivePlayer.position}`).fadeTo(0, 0.5);
        $(`#points_vie_${this.activePlayer.joueur}`).html(this.activePlayer.pv);
        $(`#points_vie_${this.passivePlayer.joueur}`).html(this.passivePlayer.pv);
        if (this.activePlayer.state === "mort") {
            $('#fight').show();
            $('#fight').html(`
        <h2>GAME OVER</h2>
        <p id="attacking_player">${this.passivePlayer.joueur} remporte la partie!!</p>
        <button onClick="window.location.reload();">Rejouer</button>
        
        `);

        } else {

            this.activePlayer.state = "active";
            if (this.grille.state === "possible fight") {
                this.activePlayer.fuirCombat(this.grille, this)
            } else if (this.grille.state === "fight") {
                this.activePlayer.choisirPostureCombat(this);
            } else {
                this.activePlayer.seDeplacer(this.grille, this);
            }
        }


    }
    finirTour() {
        this.activePlayer.state = "Tour fini";
        this.round++;
        this.init();
    }


}


