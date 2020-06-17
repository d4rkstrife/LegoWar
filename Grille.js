class Grille {
    constructor(joueurs, armes) {
        this.joueurs = joueurs;
        this.armes = armes;
        this.grille = new Array();
        this.nbrColonnes;
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
        for (let i = 0; i < nbrObstacles; i++) {
            this.placerObstacle();
        }
        this.armes.forEach(element => {
            if (element.nom !== "couteau") {
                this.placerObjet(element, "arme");
            }

        });
        this.joueurs.forEach(element => {
            this.placerObjet(element, "joueur")
        });
        this.comparerPositionJoueur(this.joueurs[0], this.joueurs[1]);
    }


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
                if (element.statut == "case_occupée") {
                    cell.appendChild(element.content.image);
                    cell.className = "joueur";
                }
            })
        })
    }


    placerObstacle() {
        let ligneAleatoire = this.elementAleatoire(this.grille);
        let colonneAleatoire = this.elementAleatoire(this.grille[ligneAleatoire]);
        if (this.grille[ligneAleatoire][colonneAleatoire].statut == "case_vide") {
            this.grille[ligneAleatoire][colonneAleatoire].statut = "obstacle";
        } else {
            this.placerObstacle();
        }

    }
    placerObjet(objet, type) {
        let ligneAleatoire = this.elementAleatoire(this.grille);
        let colonneAleatoire = this.elementAleatoire(this.grille[ligneAleatoire]);
        if (this.grille[ligneAleatoire][colonneAleatoire].statut == "case_vide") {
            this.grille[ligneAleatoire][colonneAleatoire].statut = "case_occupée";
            this.grille[ligneAleatoire][colonneAleatoire].type = type;
            this.grille[ligneAleatoire][colonneAleatoire].content = objet;
            //    objet.position = [ligneAleatoire][colonneAleatoire];
            objet.coords = this.grille[ligneAleatoire][colonneAleatoire].coords;
            objet.position = this.coordsToPosition(objet.coords)
        } else {
            this.placerObjet(objet);
        };
    }
    elementAleatoire(element) {
        return Math.floor(Math.random() * element.length);
    }
    comparerPositionJoueur(joueur1, joueur2) {
        console.log(joueur1.position, joueur2.position)
        while (joueur1.position - joueur2.position == 1 || joueur1.position - joueur2.position == -1 || joueur1.position - joueur2.position == 10 || joueur1.position - joueur2.position == -10) {
            this.grille[joueur2.position] = { statut: "case_vide", id: joueur2.position };
            this.placerObjet(joueur2);
        }
    }
    coordsToPosition(coords) { //transforme les coordonnées en int pour coincider avec les id.

        return coords[0] * 10 + coords[1]
    }
    positionToCoord(position) { //transforme la position en coordonnées
        let b = position % 10;
        let a = (position - b) / 10;
        let coords = [a, b];
        return coords
    }
    casesAccessibles(coords) {
        let listeCases = [];
        //pour chaque direction on teste chaque cellule pour voir si elle existe et si elle est accessible.
        //vers la droite
        let case1 = [coords[0], coords[1] + 1];
        if (this.grille[case1[0]][case1[1]] && this.grille[case1[0]][case1[1]].statut !== "obstacle") {
            listeCases.push(case1);
            let case2 = [coords[0], coords[1] + 2];
            if (this.grille[case2[0]][case2[1]] && this.grille[case2[0]][case2[1]].statut !== "obstacle") {
                listeCases.push(case2);
                let case3 = [coords[0], coords[1] + 3];
                if (this.grille[case3[0]][case3[1]] && this.grille[case3[0]][case3[1]].statut !== "obstacle") {
                    listeCases.push(case3);
                }
            }

        }
        //  vers la gauche
        let case4 = [coords[0], coords[1] - 1];
        if (this.grille[case4[0]][case4[1]] && this.grille[case4[0]][case4[1]].statut !== "obstacle") {
            listeCases.push(case4);
            let case5 = [coords[0], coords[1] - 2];
            if (this.grille[case5[0]][case5[1]] && this.grille[case5[0]][case5[1]].statut !== "obstacle") {
                listeCases.push(case5);
                let case6 = [coords[0], coords[1] - 3];
                if (this.grille[case6[0]][case6[1]] && this.grille[case6[0]][case6[1]].statut !== "obstacle") {
                    listeCases.push(case6);
                }
            }

        }
        //vers le bas
        let case7 = [coords[0] + 1, coords[1]];
        if (this.grille[case7[0]]) {
            if (this.grille[case7[0]][case7[1]] && this.grille[case7[0]][case7[1]].statut !== "obstacle") {
                listeCases.push(case7);
                let case8 = [coords[0] + 2, coords[1]];
                if (this.grille[case8[0]]) {
                    if (this.grille[case8[0]][case8[1]] && this.grille[case8[0]][case8[1]].statut !== "obstacle") {
                        listeCases.push(case8);
                        let case9 = [coords[0] + 3, coords[1]];
                        if (this.grille[case9[0]]) {
                            if (this.grille[case9[0]][case9[1]] && this.grille[case9[0]][case9[1]].statut !== "obstacle") {
                                listeCases.push(case9);
                            }
                        }

                    }
                }
            }
        }
        //vers le haut
        let case10 = [coords[0] - 1, coords[1]];
        if (this.grille[case10[0]]) {
            if (this.grille[case10[0]][case10[1]] && this.grille[case10[0]][case10[1]].statut !== "obstacle") {
                listeCases.push(case10);
                let case11 = [coords[0] - 2, coords[1]];
                if (this.grille[case11[0]]) {
                    if (this.grille[case11[0]][case11[1]] && this.grille[case11[0]][case11[1]].statut !== "obstacle") {
                        listeCases.push(case11);
                        let case12 = [coords[0] - 3, coords[1]];
                        if (this.grille[case12[0]]) {
                            if (this.grille[case12[0]][case12[1]] && this.grille[case12[0]][case12[1]].statut !== "obstacle") {
                                listeCases.push(case12);
                            }
                        }

                    }
                }
            }
        }


        return listeCases;

    }
    marquerPossibilités(coordsArray) {
        coordsArray.forEach(element => {
            let caseRouge = document.getElementById(this.coordsToPosition(element));
            caseRouge.classList.add("red");
        })
    }


}

