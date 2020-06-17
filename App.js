class App {
    constructor(armes, joueurs) {
        this.armes = armes;
        this.joueurs = joueurs;
        this.joueursCollection = [];
        this.armesCollection = [];

    }
    run() {

        this.armes.forEach(element => {
            this.armesCollection.push(new Arme(element));
        });
        this.joueurs.forEach(element => {
            this.joueursCollection.push(new Player(element, this.armesCollection[0]));
        });
        let grille = new Grille(this.joueursCollection, this.armesCollection);
        grille.genererGrille(10, 10, 10);
        grille.render("grille_container");
        console.log(grille.coordsToPosition(this.joueursCollection[0].coords))
        let game = new Game(this.joueursCollection, grille);
        game.init();
        console.log(grille.grille);

    }

}