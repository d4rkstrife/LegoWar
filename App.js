class App {
    constructor(joueur1, joueur2, grille, arme1, arme2) {
        this.grille = grille;
        this.joueur1 = joueur1;
        this.joueur2 = joueur2;
        this.arme1 = arme1;
        this.arme2 = arme2;
    }
    run() {
        this.grille.genererGrille();
        this.arme1.placerArme();
        this.arme2.placerArme();
        this.joueur1.placerPersonnage();
        this.joueur2.placerPersonnage();
        this.comparerPosition(this.joueur1, this.joueur2);
    }
    comparerPosition(joueur1, joueur2) {
        let diffPosition = joueur1.position - joueur2.position;
        while (diffPosition == 1 || diffPosition == -1 || diffPosition == 10 || diffPosition == -10) {
            joueur2.placerPersonnage();
        }
    }
}