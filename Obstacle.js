class Obstacle {
    constructor(data) {
        this.data = data;
    }
    placerObstacle(nombre) {
        for (let i = 0; i < nombre; i++) {
            this.data[this.ligneAleatoire()][this.colonneAleatoire()] = 1;

        }
    }
    nombreAleatoire(max) {
        return Math.floor(Math.random() * max);
    }

    ligneAleatoire() {
        let ligne = this.nombreAleatoire(this.data.length);
        return ligne;
    }
    colonneAleatoire() {
        let colonne = this.nombreAleatoire(this.data[this.ligneAleatoire()].length);
        return colonne;
    }
}