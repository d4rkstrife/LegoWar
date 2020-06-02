

class Arme {
    constructor(data) {
        this.data = data;
        this.arme = this.armeAleatoire();
        this.nom = this.arme[0];
        this.damage = this.arme[1];
        this.skin = this.arme[2];
    }
    placerArme() {
        let aleatoire = Math.floor(Math.random() * 100);
        let image = new Image();
        image.src = "image/" + this.skin;
        let cellAleatoire = document.getElementById(aleatoire);
        if (cellAleatoire.className == "case_vide") {
            cellAleatoire.className = this.nom + " arme";
            cellAleatoire.appendChild(image)
            this.position = aleatoire;
        } else {
            this.placerArme();
        }
    }
    armeAleatoire() {
        let alea = Math.floor(Math.random() * this.data.length);
        return this.data[alea];

    }
}