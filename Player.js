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
        this.positionCombat = "défend";
    }
    seDeplacer(grille, game) {

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
                    if (grille.comparerPosition(grille.joueurs[0], grille.joueurs[1]) === true) {
                        grille.state = "fight";
                        game.fight();
                    } else {
                        cases = [];
                        that.state = "Tour fini";
                        game.round++;
                        game.init()
                    }

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
    attaquer(joueur) {
        if (this.state === "active") {
            if (joueur.positionCombat === "attaque") {
                joueur.pv = Math.floor(joueur.pv - this.damage);
            } else if (joueur.positionCombat === "défend") {
                joueur.pv = Math.floor(joueur.pv - (this.damage / 2));
            } else {
                console.log("error")
            }
        }
    }
    choisirPostureCombat(game) {

        if (this.state === "active") {
            $(`#fight_${this.joueur}`).show();
            $(`#attack_button_${this.joueur}`).on('click', () => {
                $(`#fight_${this.joueur}`).hide();
                this.positionCombat = "attaque";
                this.attaquer(game.passivePlayer);
                $(`#points_vie_${game.activePlayer.joueur}`).html(game.activePlayer.pv);
                $(`#points_vie_${game.passivePlayer.joueur}`).html(game.passivePlayer.pv);
                this.state = "Tour fini";
                game.round++;
                game.init();
            });
            $(`#def_button_${this.joueur}`).on('click', () => {
                $(`#fight_${this.joueur}`).hide();
                this.positionCombat = "défend";
                $(`#points_vie_${game.activePlayer.joueur}`).html(game.activePlayer.pv);
                $(`#points_vie_${game.passivePlayer.joueur}`).html(game.passivePlayer.pv);
                this.state = "Tour fini";
                game.round++;
                game.init();
            });

        }

    }
}
