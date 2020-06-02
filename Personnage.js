class Personnage {
    constructor(data, joueur, skin) {
        this.data = data;
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
    seDeplacer() {
        let position = this.position;
        let image = this.image;
        let joueur = this.joueur;
        $(".case_vide").click(function () {
            console.log(position);
            $("#" + position).removeClass().addClass("case_vide");
            $("#" + position).empty();
            $("#" + this.id).removeClass().addClass(joueur);
            $("#" + this.id).append(image);
            position = this.id;
        })
        this.position = position;
    }

}