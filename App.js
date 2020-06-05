class App {
    constructor() {

    }
    run() {

        let joueur1 = new Personnage("joueur1", "Joueur1.png", 50);
        let joueur2 = new Personnage("joueur2", "Joueur2.png", 50);
        let arme1 = new Arme(armes[0]);
        let arme2 = new Arme(armes[1]);
        let arme3 = new Arme(armes[2]);
        let arme4 = new Arme(armes[3]);
        let grille = new Grille("grille_container", joueur1, joueur2, arme1, arme2, arme3, arme4);
        grille.genererGrille(10, 10, 15);
        console.log(grille.datas, joueur1.position, joueur2.position);

    }

}