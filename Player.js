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
        this.state = "En attente";
        this.positionCombat = "En préparation"
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

        let td = document.querySelectorAll('td');
        td.forEach(element => {
            element.addEventListener('click', () => {

                if (this.state == "active" && cases.indexOf(parseInt(element.id)) !== -1) {
                    let elementCoords = grille.positionToCoord(element.id);
                    if (grille.grille[elementCoords[0]][elementCoords[1]].statut == "case_vide") {
                        grille.deplacerJoueur(this.coords, elementCoords);
                        this.coords = elementCoords;
                        this.position = grille.coordsToPosition(this.coords);


                    } else if (grille.grille[elementCoords[0]][elementCoords[1]].type == "arme") {
                        this.equiperArme(grille.grille[elementCoords[0]][elementCoords[1]]);
                        grille.deplacerJoueur(this.coords, elementCoords);
                        this.coords = elementCoords;
                        this.position = grille.coordsToPosition(this.coords);


                    } else {
                        alert("Avancez au corps à corps pour attaquer");

                    }
                    if (grille.comparerPosition(grille.joueurs[0], grille.joueurs[1]) === true) {
                        grille.state = "fight";
                        this.choisirPostureCombat();
                    }
                    console.log(grille.state)
                    td.forEach(element => {
                        element.classList.remove("red");
                        element.classList.remove("green");
                    })
                    cases = [];
                    this.state = "Tour fini";
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
        let damageElt = $(`#degats_${this.joueur}`);
        damageElt.text(`${this.armeEquipee.nom} : ${this.damage} dégats`);
        let armeElt = $(`#arme_${this.joueur}`);
        armeElt.attr("src", this.armeEquipee.image.src);
        $('#console').html(`${this.joueur} équipe l'arme ${this.armeEquipee.nom}`);
    }
    jouer(grille) {
        if (grille.state === "fight") {
            $('#console').html(`Il est l heure de se battre`);
        } else {
            $('#console').html(`${this.joueur} doit se déplacer.`)
            this.seDeplacer(grille);
        }
    }
    attaquer(joueur) {
        if (joueur.positionCombat === "attaque") {
            joueur.pv = joueur.pv - this.damage;
        } else {
            joueur.pv = joueur.pv - (this.damage / 2);
        }
    }
    choisirPostureCombat() {

    }
}
