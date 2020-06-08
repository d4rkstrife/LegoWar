class Player {
    constructor(joueur, skin, pv) {
        this.joueur = joueur;
        this.position = {};
        this.damage = 10;
        this.pv = pv;
        this.image = new Image();
        this.image.src = "image/" + skin;
    }
    afficherStat() {

    }
}