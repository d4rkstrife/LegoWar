class App {
    constructor() {

    }
    run() {
        let arme = new Arme(armes);


        let joueur1 = new Personnage("joueur1", "Joueur1.png");
        let joueur2 = new Personnage("joueur2", "Joueur2.png");
        let grille = new Grille("grille_container", arme, joueur1);
        grille.genererGrille(10, 10);
        grille.comparerPosition(joueur1, joueur2);
        console.log(grille.datas);
        grille.placerJoueur(joueur1);
        grille.placerJoueur(joueur2);
    }
    comparerPosition(joueur1, joueur2) {
        let diffPosition = joueur1.position - joueur2.position;
        while (diffPosition == 1 || diffPosition == -1 || diffPosition == 10 || diffPosition == -10) {
            joueur2.placerJoueur("a");
        }
    }
}