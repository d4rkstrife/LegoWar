class Player {
    constructor(data, arme) {

        this.coords = [0, 0];
        this.position = 0;
        this.joueur = data[0];
        this.pv = data[1];
        this.armeEquipee = arme
        this.damage = this.armeEquipee.damage;
        this.image = new Image();
        this.image.src = "image/" + data[2];
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
                            grille.grille[elementCoords[0]][elementCoords[1]].statut = "case_occupée";
                            grille.grille[elementCoords[0]][elementCoords[1]].type = "joueur";
                            grille.grille[elementCoords[0]][elementCoords[1]].content = grille.grille[this.coords[0]][this.coords[1]].content;
                            grille.grille[this.coords[0]][this.coords[1]].content = null;
                            grille.grille[this.coords[0]][this.coords[1]].statut = "case_vide";
                            this.coords = elementCoords;
                            td[element.id].appendChild(grille.grille[elementCoords[0]][elementCoords[1]].content.image);
                            td[element.id].className = "joueur";
                            td.forEach(element => {
                                element.classList.remove("red");
                            });
                            cases = [];
                            this.state = "Tour fini";
                        } else if (grille.grille[elementCoords[0]][elementCoords[1]].type == "arme") {
                            this.equiperArme(grille.grille[elementCoords[0]][elementCoords[1]].content)
                            td.forEach(element => {
                                element.classList.remove("red");
                            })
                            this.state = "Tour fini";
                        } else {
                            console.log(grille.grille[elementCoords[0]][elementCoords[1]].content);
                            this.state = "Tour fini";
                        }
                    }

                }
            })
        })
    }
    equiperArme(arme) {
        console.log("equipe arme");
        this.armeEquipee = arme;
        this.damage = this.armeEquipee.damage;
        let damageElt = document.getElementById("degats_" + this.joueur);
        damageElt.textContent = this.damage;
        let armeElt = document.getElementById("arme_" + this.joueur);
        armeElt.src = this.armeEquipee.image.src;
        console.log(this.armeEquipee);
    }

    jouer(grille) {
        this.seDeplacer(grille)
    }


}
