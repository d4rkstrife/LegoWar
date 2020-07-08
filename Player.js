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
        this.positionCombat = "Normale";
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
                let elementCoords = grille.positionToCoord(this.id);
                if (that.state == "active" && cases.indexOf(parseInt(this.id)) !== -1) {

                    if (grille.grille[elementCoords[0]][elementCoords[1]].statut == "case_vide") {
                        grille.deplacerJoueur(that.coords, elementCoords);
                        that.coords = elementCoords;
                        that.position = grille.coordsToPosition(that.coords);
                        $('.logs').append(`<p>${that.joueur} se déplace en ${that.coords}</p>`)


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
                        grille.state = "possible fight";
                        game.finirTour();
                    } else {
                        game.finirTour();
                    }
                    cases = [];

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
        $('.logs').append(`<p>${this.joueur} ramasse l'arme  ${this.armeEquipee.nom}</p>`)
    }
    attaquer(joueur) {
        if (this.state === "active") {
            if (joueur.positionCombat === "Normale") {
                joueur.pv = Math.floor(joueur.pv - this.damage);
                $('.logs').append(`<p>${this.joueur} attaque ${joueur.joueur} pour ${this.damage} points de dégats.</p>`)

            } else if (joueur.positionCombat === "défend") {
                joueur.pv = Math.floor(joueur.pv - (this.damage / 2));
                $('.logs').append(`<p>${this.joueur} attaque ${joueur.joueur} pour ${this.damage / 2} points de dégats.</p>`)
            } else {
                console.log("error")
            }
            if (joueur.pv <= 0) {
                joueur.pv = 0;
                joueur.state = "mort";
                $('.logs').append(`<p>${joueur.joueur} est mort.</p>`)
            }
            $(`#points_vie_${this.joueur}`).html(this.pv);
            $(`#points_vie_${joueur.joueur}`).html(joueur.pv);

        }
    }
    postureCombatChoisit(game, postureChoisit) {
        $('#fight').hide(0);
        this.positionCombat = postureChoisit;
        if (postureChoisit === "Normale") {
            $('.logs').append(`<p>${this.joueur} décide d'attaquer.</p>`);
            if ($(`#position_attaque_${this.joueur}`).hasClass("red")) {

            } else {
                $(`#position_defense_${this.joueur}`).removeClass("green");
                $(`#position_attaque_${this.joueur}`).addClass("red");
            }
            this.attaquer(game.passivePlayer);
            $('#sound2')[0].play();
        } else {
            if ($(`#position_attaque_${this.joueur}`).hasClass("red")) {
                $(`#position_attaque_${this.joueur}`).removeClass("red");
                $(`#position_defense_${this.joueur}`).addClass("green");
            }


            $('.logs').append(`<p>${this.joueur} décide de défendre.</p>`);
        }
        game.finirTour();

    }
    choisirPostureCombat(game) {

        if (this.state === "active") {
            $('#fight').show(0);
            $('#fight').html(`
            <h2>FIGHT!!</h2>
            <p id="attacking_player">${this.joueur}</p>
            <button class="attack_button" id="attack_button_${this.joueur}">Attaquer</button>
            <button class="def_button" id="def_button_${this.joueur}">Défendre</button>
            `);
            $(`#attack_button_${this.joueur}`).on('click', () => {

                this.postureCombatChoisit(game, "Normale");
            });

            $(`#def_button_${this.joueur}`).on('click', () => {
                this.postureCombatChoisit(game, "défend");
            });

        }

    }
    engagerCombat(grille, game) {
        $('#fight').show(0);
        $('#fight').html(`
        <h2>AGGRESSION!</h2>
        <p id="attacking_player">${this.joueur}</p>
        <button class="attack_button" id="attack_button_${this.joueur}">Combattre</button>
        <button class="def_button" id="def_button_${this.joueur}">Fuir</button>
        `);
        $(`#attack_button_${this.joueur}`).on('click', () => {
            $('#message_combat').show().animate({ width: "-=10%" });
            $('#sound1')[0].play();
            grille.state = "fight";
            this.choisirPostureCombat(game);
        });
        $(`#def_button_${this.joueur}`).on('click', () => {
            $('#fight').hide(0);
            grille.state = "préparation"
            this.seDeplacer(grille, game);
        });
    }
}
