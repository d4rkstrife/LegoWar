class Grille {
    constructor(container, data) {
        this.container = document.getElementById(container);
        this.data = data;
    }
    render() {
        for (let i = 0; i < this.data.length; i++) {
            const ligne = document.createElement("tr");
            this.container.appendChild(ligne);
            for (let y = 0; y < this.data.length; y++) {
                const colonne = document.createElement("td");
                ligne.appendChild(colonne);
                if (this.data[i][y] == "1") {
                    let image = new Image();
                    image.src = "obstacle.png";
                    colonne.appendChild(image);
                } else if (this.data[i][y] == "2") {
                    let image = new Image();
                    image.src = "mario.png";
                    colonne.appendChild(image);
                } else if (this.data[i][y] == "3") {
                    let image = new Image();
                    image.src = "luigi.png";
                    colonne.appendChild(image);
                }
            }
        }
    }
}