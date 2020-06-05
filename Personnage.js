class Personnage {
    constructor(joueur, skin, pv) {
        this.joueur = joueur;
        this.position;
        this.pv = pv;
        this.image = new Image();
        this.image.src = "image/" + skin;
    }
}