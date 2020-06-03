class Personnage {
    constructor(joueur, skin) {
        this.joueur = joueur;
        this.position;
        this.image = new Image();
        this.image.src = "image/" + skin;
    }
    placerPersonnage() {
        let aleatoire = Math.floor(Math.random() * 100);
        let cellAleatoire = document.getElementById(aleatoire);
        if (cellAleatoire.className == "case_vide") {
            cellAleatoire.className = this.joueur;
            cellAleatoire.appendChild(this.image);

            this.position = cellAleatoire.id;
            console.log(this.position)
        } else {
            this.placerPersonnage();
        }
    }
    initialiserPerso() {
        let perso = new Array();
        perso.push(this.joueur, this.image);
        return perso;
    }


}