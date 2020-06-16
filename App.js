class App {
    constructor(armes, joueurs) {
        this.armes = armes;
        this.joueurs = joueurs;
        this.joueur = [];
        this.arme = [];

    }
    run() {

        this.armes.forEach(element => {
            this.arme.push(new Arme(element));
        })
        this.joueurs.forEach(element => {
            this.joueur.push(new Player(element, this.arme[0]));
        });
        let grille = new Grille(this.joueur, this.arme);
        grille.genererGrille(10, 10, 10);
        grille.render("grille_container");

    }

}