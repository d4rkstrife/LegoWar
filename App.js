class App {
    constructor(obstacle, joueur1, joueur2, grille) {
        this.obstacle = obstacle;
        this.grille = grille;
        this.joueur1 = joueur1;
        this.joueur2 = joueur2;
    }
    run() {
        this.obstacle.placerObstacle(10);
        this.joueur1.placerPersonnage();
        this.joueur2.placerPersonnage();
        this.comparerPosition(this.joueur1, this.joueur2);
        this.grille.render();
        console.log(data)
    }
    comparerPosition(objet1, objet2) {
        while (objet1.xPosition == objet2.xPosition || objet1.yPosition == objet2.yPosition) {
            objet2.data[objet2.xPosition][objet2.yPosition] = 0;
            objet2.placerPersonnage();
        }
    }
}