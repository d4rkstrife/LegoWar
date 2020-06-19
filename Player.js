class Player {
    constructor(data, arme) {

        this.coords = [0, 0];
        this.position;
        this.joueur = data[0];
        this.pv = data[1];
        this.armeEquipee = arme
        this.damage = this.armeEquipee.damage;
        this.image = new Image();
        this.image.src = `image/${data[2]}`;
        this.state = "En attente"
    }
    seDeplacer(grille) {

        grille.marquerPossibilités(grille.casesAccessibles(this.coords));
        let cases = [];
        grille.casesAccessibles(this.coords).forEach(element => {

            cases.push(grille.coordsToPosition(element));
        })
        let td = document.querySelectorAll('td');
        td.forEach(element => {
            element.addEventListener('click', () => {
                if (this.state == "active") {
                    if (cases.indexOf(parseInt(element.id)) !== -1) {
                        let elementCoords = grille.positionToCoord(element.id);
                        if (grille.grille[elementCoords[0]][elementCoords[1]].statut == "case_vide") {
                            grille.deplacerJoueur(this.coords, elementCoords);
                            this.coords = elementCoords;
                            this.position = grille.coordsToPosition(this.coords);
                            td.forEach(element => {
                                element.classList.remove("red");
                                element.classList.remove("green");
                            });
                            cases = [];
                            this.state = "Tour fini";

                        } else if (grille.grille[elementCoords[0]][elementCoords[1]].type == "arme") {
                            this.equiperArme(grille.grille[elementCoords[0]][elementCoords[1]]);
                            grille.deplacerJoueur(this.coords, elementCoords);
                            this.coords = elementCoords;
                            this.position = grille.coordsToPosition(this.coords);
                            td.forEach(element => {
                                element.classList.remove("red");
                                element.classList.remove("green");
                            })
                            cases = [];
                            this.state = "Tour fini";

                        } else {
                            alert("Pas encore prêt au combat");
                            td.forEach(element => {
                                element.classList.remove("red");
                                element.classList.remove("green");
                            })
                            cases = [];
                            this.state = "Tour fini";
                        }
                    }

                }
            })
        })
    }
    equiperArme(emplacement) {
        let arme = emplacement.content
        let armeTemp = this.armeEquipee;
        this.armeEquipee = arme;
        emplacement.content = armeTemp;
        this.damage = this.armeEquipee.damage;
        let damageElt = document.getElementById(`degats_${this.joueur}`);
        damageElt.textContent = this.damage;
        let armeElt = document.getElementById(`arme_${this.joueur}`);
        armeElt.src = this.armeEquipee.image.src;
    }
    jouer(grille) {
        this.seDeplacer(grille)
    }
}
