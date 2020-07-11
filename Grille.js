class Grille {
    constructor(joueurs, armes) {
        this.joueurs = joueurs;
        this.armes = armes;
        this.grille = new Array();
        this.nbrColonnes;
        this.state = "préparation";
    }
    genererGrille(nbrLignes, nbrColonnes, nbrObstacles) {
        this.nbrColonnes = nbrColonnes;
        for (let i = 0; i < nbrLignes; i++) {
            let ligne = new Array();
            this.grille.push(ligne)
            for (let j = 0; j < nbrColonnes; j++) {
                const cell = {};
                ligne.push(cell);
                cell.statut = "case_vide";
                cell.coords = [i, j];
                cell.id = i * nbrColonnes + j;
                cell.content = null;
            }
        }
        //placement des obstacles
        for (let i = 0; i < nbrObstacles; i++) {
            this.placerObstacle();
        }
        //placement des armes
        this.armes.forEach(element => {
            if (element.nom !== "Couteau") {
                this.placerObjet(element, "arme");
            }
        });
        //placement des joueurs
        this.joueurs.forEach(element => {
            this.placerObjet(element, "joueur")
        });
        while (this.comparerPosition(this.joueurs[0], this.joueurs[1]) === true) {
            this.grille[this.joueurs[1].coords[0]][this.joueurs[1].coords[1]].statut = "case_vide";
            this.grille[this.joueurs[1].coords[0]][this.joueurs[1].coords[1]].content = null;
            this.grille[this.joueurs[1].coords[0]][this.joueurs[1].coords[1]].type = null;
            this.placerObjet(this.joueurs[1], "joueur");
        }

    }

    // methode qui crée la table grace a la grille
    render(container) {
        let table = document.getElementById(container);
        this.grille.forEach(element => {

            let ligne = document.createElement('tr');
            table.appendChild(ligne);
            element.forEach(element => {
                const cell = document.createElement('td');
                ligne.appendChild(cell)
                cell.id = element.id;
                cell.className = element.statut;
                if (element.statut === "case_occupée") {
                    cell.appendChild(element.content.image);
                    cell.className = "objet";
                }
            })
        })
    }
    //render pour une seule case
    renderCase(coords) {
        let id = this.coordsToPosition(coords);
        if (this.grille[coords[0]][coords[1]].statut === "case_vide") {
            $(`#${id}`).html('');
            $(`#${id}`).removeClass('objet').addClass('case_vide');
        } else if (this.grille[coords[0]][coords[1]].statut === "case_occupée") {
            if (this.grille[coords[0]][coords[1]].type === "joueur" || this.grille[coords[0]][coords[1]].type === "arme") {
                $(`#${id}`).html('');
                let image = new Image();
                image.src = `image/${this.grille[coords[0]][coords[1]].content.skin}`
                $(`#${id}`).append(image);
                $(`#${id}`).removeClass('case_vide').addClass('objet');
            } else if (this.grille[coords[0]][coords[1]].type === "joueur arme") {
                $(`#${id}`).html('');
                $(`#${id}`).append(this.grille[coords[0]][coords[1]].content2.image);
            }
        }

    }
    placerObstacle() {
        let ligneAleatoire = this.elementAleatoire(this.grille);
        let colonneAleatoire = this.elementAleatoire(this.grille[ligneAleatoire]);
        if (this.grille[ligneAleatoire][colonneAleatoire].statut === "case_vide") {
            this.grille[ligneAleatoire][colonneAleatoire].statut = "obstacle";
        } else {
            this.placerObstacle();
        }

    }
    placerObjet(objet, type) {
        let ligneAleatoire = this.elementAleatoire(this.grille);
        let colonneAleatoire = this.elementAleatoire(this.grille[ligneAleatoire]);
        if (this.grille[ligneAleatoire][colonneAleatoire].statut === "case_vide") {
            this.grille[ligneAleatoire][colonneAleatoire].statut = "case_occupée";
            this.grille[ligneAleatoire][colonneAleatoire].type = type;
            this.grille[ligneAleatoire][colonneAleatoire].content = objet;
            objet.coords = this.grille[ligneAleatoire][colonneAleatoire].coords;
            objet.position = this.coordsToPosition(objet.coords)
        } else {
            this.placerObjet(objet, type);
        };
    }
    elementAleatoire(element) {
        return Math.floor(Math.random() * element.length);
    }

    comparerPosition(objet1, objet2) {
        return ((objet1.coords[0] === objet2.coords[0] && (objet1.coords[1] - objet2.coords[1] === 1 || objet1.coords[1] - objet2.coords[1] === -1)) || (objet1.coords[1] === objet2.coords[1] && (objet1.coords[0] - objet2.coords[0] === 1 || objet1.coords[0] - objet2.coords[0] === -1)));
    }
    coordsToPosition(coords) { //transforme les coordonnées en int pour coincider avec les id.
        return coords[0] * 10 + coords[1]
    }
    positionToCoord(position) { //transforme la position en coordonnées
        let b = position % 10;
        let a = (position - b) / 10;
        return [a, b];
    }
    caseDestination(coordDestination, statutDestination, typeDestination, contentDestination, content2Destination) {
        this.grille[coordDestination[0]][coordDestination[1]].statut = statutDestination;
        this.grille[coordDestination[0]][coordDestination[1]].type = typeDestination;
        if (contentDestination !== -1) {
            this.grille[coordDestination[0]][coordDestination[1]].content = contentDestination;
        }
        if (content2Destination !== -1) {
            this.grille[coordDestination[0]][coordDestination[1]].content2 = content2Destination;
        }
    }
    caseOrigine(coordOrigine, contentOrigin, content2Origin, typeOrigin, statutOrigin) {
        if (contentOrigin !== -1) {
            this.grille[coordOrigine[0]][coordOrigine[1]].content = contentOrigin;
        }
        if (content2Origin !== -1) {
            this.grille[coordOrigine[0]][coordOrigine[1]].content2 = content2Origin;
        }

        this.grille[coordOrigine[0]][coordOrigine[1]].type = typeOrigin;
        if (statutOrigin !== -1) {
            this.grille[coordOrigine[0]][coordOrigine[1]].statut = statutOrigin;
        }

    }
    deplacerJoueur(coordOrigine, coordDestination) {
        if (this.grille[coordDestination[0]][coordDestination[1]].statut === "case_vide" && this.grille[coordOrigine[0]][coordOrigine[1]].type === "joueur") {
            this.caseDestination(coordDestination, "case_occupée", "joueur", this.grille[coordOrigine[0]][coordOrigine[1]].content, -1);
            this.caseOrigine(coordOrigine, null, -1, null, "case_vide");


        } else if ((this.grille[coordDestination[0]][coordDestination[1]].statut === "case_occupée" && this.grille[coordDestination[0]][coordDestination[1]].type === "arme") && this.grille[coordOrigine[0]][coordOrigine[1]].type == "joueur") {
            this.caseDestination(coordDestination, "case_occupée", "joueur arme", -1, this.grille[coordOrigine[0]][coordOrigine[1]].content);
            this.caseOrigine(coordOrigine, null, -1, null, "case_vide");

        } else if (this.grille[coordOrigine[0]][coordOrigine[1]].type === "joueur arme" && this.grille[coordDestination[0]][coordDestination[1]].statut === "case_vide") {
            this.caseDestination(coordDestination, "case_occupée", "joueur", this.grille[coordOrigine[0]][coordOrigine[1]].content2, -1);
            this.caseOrigine(coordOrigine, -1, null, "arme", -1);

        } else if (this.grille[coordOrigine[0]][coordOrigine[1]].type === "joueur arme" && this.grille[coordDestination[0]][coordDestination[1]].type === "arme") {
            this.caseDestination(coordDestination, "case_occupée", "joueur arme", -1, this.grille[coordOrigine[0]][coordOrigine[1]].content2);
            this.caseOrigine(coordOrigine, -1, null, "arme", -1);
        }
        this.renderCase(coordOrigine);
        this.renderCase(coordDestination);
    }
    casesAccessibles(origin, direction) {
        let listeCases = [];
        let i;
        let j;
        switch (direction) {
            case 'droite':
                i = 0;
                j = 1;
                break;
            case 'gauche':
                i = 0;
                j = -1;
                break;
            case 'bas':
                i = 1;
                j = 0;
                break;
            case 'haut':
                i = -1;
                j = 0;
                break;
        }

        let case1 = [origin[0] + i, origin[1] + j];
        let case1vide = false
        if (this.grille[case1[0]] && this.grille[case1[0]][case1[1]] && this.grille[case1[0]][case1[1]].statut !== "obstacle" && this.grille[case1[0]][case1[1]].type !== "joueur") {
            case1vide = true;
            listeCases.push(case1);
        }
        let case2 = [origin[0] + (2 * i), origin[1] + (2 * j)];
        let case2vide = false
        if (case1vide === true && this.grille[case2[0]] && this.grille[case2[0]][case2[1]] && this.grille[case2[0]][case2[1]].statut !== "obstacle" && this.grille[case2[0]][case2[1]].type !== "joueur") {
            listeCases.push(case2);
            case2vide = true;
        }

        let case3 = [origin[0] + (3 * i), origin[1] + (3 * j)];
        if (case2vide === true && this.grille[case3[0]] && this.grille[case3[0]][case3[1]] && this.grille[case3[0]][case3[1]].statut !== "obstacle" && this.grille[case3[0]][case3[1]].type !== "joueur") {
            listeCases.push(case3);
        }
        return listeCases;
    }
    marquerPossibilités(coordsArray) {
        coordsArray.forEach(element => {
            if ($(`#${this.coordsToPosition(element)}`).hasClass("case_vide")) {
                $(`#${this.coordsToPosition(element)}`).addClass("green");
            } else {
                $(`#${this.coordsToPosition(element)}`).addClass("red");
            }

        })
    }


}

