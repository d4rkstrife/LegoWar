class App {
    constructor(armes, joueurs) {
        this.armes = armes;
        this.joueurs = joueurs;
        this.joueursCollection = [];
        this.armesCollection = [];

    }
    run() {
        this.joueurs.forEach(element => {
            this.joueursCollection.push(new Player(element));
        });
        this.armes.forEach(element => {
            this.armesCollection.push(new Arme(element));
        })
        let grille = new Grille(this.joueursCollection, this.armesCollection);
        grille.genererGrille(10, 10, 10);
        grille.render("grille_container");
        console.log(this.joueursCollection[0].coordsToPosition(this.joueursCollection[0].coords))
        let game = new Game(this.joueursCollection, grille);
        //     console.log(grille.grille);
        game.init();
        console.log(grille.grille);

    }

}