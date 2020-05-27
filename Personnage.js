class Personnage {
    constructor(data, joueur) {
        this.data = data;
        this.joueur = joueur
        this.xPosition = 0;
        this.yPosition = 0;
    }
    placerPersonnage() {
        this.ligneAleatoire();
        this.colonneAleatoire();

        if (this.data[this.xPosition][this.yPosition] == "0") {
            if (this.joueur == "joueur1") {
                this.data[this.xPosition][this.yPosition] = 2;
            } else {
                this.data[this.xPosition][this.yPosition] = 3;
            }
        } else {
            this.placerPersonnage();
        }
    }
    nombreAleatoire(max) {
        return Math.floor(Math.random() * max);
    }

    ligneAleatoire() {
        this.xPosition = this.nombreAleatoire(this.data.length);
    }
    colonneAleatoire() {
        this.yPosition = this.nombreAleatoire(this.data[this.xPosition].length);
    }
}