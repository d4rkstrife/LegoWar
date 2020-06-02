class Grille {
    constructor(container, data) {
        this.container = document.getElementById(container);
        this.data = data;
    }
    genererGrille() {
        for (let i = 0; i < this.data.length; i++) {
            const ligne = document.createElement("tr");
            this.container.appendChild(ligne);
            for (let y = 0; y < this.data.length; y++) {
                const colonne = document.createElement("td");
                ligne.appendChild(colonne);
                colonne.id = i * 10 + y;
                colonne.className = "case_vide"
            }
        }
        this.placerObstacle(10);
    }
    placerObstacle(x) {
        for (let i = 0; i < x; i++) {
            let aleatoire = Math.floor(Math.random() * 100);
            let obstacle = document.getElementById(aleatoire);
            obstacle.className = "obstacle";
        }
    }
}