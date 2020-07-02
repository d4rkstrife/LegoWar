class Player {
    constructor(data, arme) {

        this.coords = [0, 0];
        this.position;
        this.joueur = data[0];
        this.pv = data[1];
        this.skin = data[2];
        this.armeEquipee = arme
        this.damage = this.armeEquipee.damage;
        this.image = new Image();
        this.image.src = `image/${data[2]}`;
        this.state = "En attente"
    }
    seDeplacer(grille) {

        let cases = [];
        let directions = ["droite", "gauche", "bas", "haut"];
        directions.forEach(element => {
            grille.marquerPossibilités(grille.casesAccessibles(this.coords, element));
            grille.casesAccessibles(this.coords, element).forEach(element => {
                cases.push(grille.coordsToPosition(element));
            })
        })
        let that = this;
        $('td').each(function () {
            $(this).one("click", () => {
                if (that.state == "active" && cases.indexOf(parseInt(this.id)) !== -1) {
                    let elementCoords = grille.positionToCoord(this.id);
                    if (grille.grille[elementCoords[0]][elementCoords[1]].statut == "case_vide") {
                        grille.deplacerJoueur(that.coords, elementCoords);
                        that.coords = elementCoords;
                        that.position = grille.coordsToPosition(that.coords);


                    } else if (grille.grille[elementCoords[0]][elementCoords[1]].type == "arme") {
                        that.equiperArme(grille.grille[elementCoords[0]][elementCoords[1]]);
                        grille.deplacerJoueur(that.coords, elementCoords);
                        that.coords = elementCoords;
                        that.position = grille.coordsToPosition(that.coords);


                    } else {
                        alert("Pas encore prêt au combat");

                    }
                    $('td').each(function () {
                        $(this).removeClass('red');
                        $(this).removeClass('green');
                    })
                    cases = [];
                    that.state = "Tour fini";
                }
            })
        });
    }
    equiperArme(emplacement) {
        let arme = emplacement.content
        let armeTemp = this.armeEquipee;
        this.armeEquipee = arme;
        emplacement.content = armeTemp;
        this.damage = this.armeEquipee.damage;
        let damageElt = $(`#degats_${this.joueur}`);
        damageElt.text(`${this.armeEquipee.nom} : ${this.damage} dégats`);
        let armeElt = $(`#arme_${this.joueur}`);
        armeElt.attr("src", this.armeEquipee.image.src);
    }
    jouer(grille) {
        this.seDeplacer(grille)
    }
}
