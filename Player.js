class Player {
    constructor(data) {

        this.coords;
        this.joueur = data[0];
        this.pv = data[1];
        this.armeEquipee;
        this.damage = 10;
        this.skin = data[2];
        this.image = new Image();
        this.image.src = "image/" + this.skin;
        this.state = "En attente"
    }
    seDeplacer(grille) {

        let td = document.querySelectorAll('td');
        this.casesAccessibles(grille).forEach(element => {
            if (grille[element[0]][element[1]].statut !== "obstacle") {
                let id = this.coordsToPosition(element);
                td[id].classList.add("red");
                td[id].addEventListener('click', () => {
                    while (this.state == "active") {
                        if (grille[element[0]][element[1]].statut == "case_vide") {
                            grille[element[0]][element[1]].statut = "case_occupée";
                            grille[element[0]][element[1]].type = "joueur";
                            grille[element[0]][element[1]].content = grille[this.coords[0]][this.coords[1]].content;
                            grille[this.coords[0]][this.coords[1]].content = null;
                            grille[this.coords[0]][this.coords[1]].statut = "case_vide";
                            this.coords = element;
                            td[id].appendChild(grille[element[0]][element[1]].content.image);
                            td[id].className = "joueur";
                            td.forEach(element => {
                                element.classList.remove("red");
                            })
                            this.state = "Tour fini";

                        } else if (grille[element[0]][element[1]].type == "arme") {
                            this.equiperArme(grille[element[0]][element[1]].content)
                            td.forEach(element => {
                                element.classList.remove("red");
                            })
                            this.state = "Tour fini";
                        } else if (grille[element[0]][element[1]].type == "joueur") {
                            alert("let s fight!");
                            td.forEach(element => {
                                element.classList.remove("red");
                            });
                            this.state = "Tour fini";

                        } else {
                            console.log("erreur")
                            this.state = "Tour fini";
                        }
                    }

                })

            }
        })
    }
    equiperArme(arme) {
        console.log("equipe arme");
        this.armeEquipee = arme;
        this.damage = this.armeEquipee.damage;
        let damageElt = document.getElementById("degats_" + this.joueur);
        damageElt.textContent = this.damage;
        let armeElt = document.getElementById("arme_" + this.joueur);
        armeElt.src = "image/" + this.armeEquipee.skin;
        console.log(this.armeEquipee);
        this.state = "Tour fini";
    }

    jouer(grille) {
        this.seDeplacer(grille)
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
    casesAccessibles(grille) {
        let listeCases = [];
        //pour chaque direction on teste chaque cellule pour voir si elle existe et si elle est accessible.
        //vers la droite
        let case1 = [this.coords[0], this.coords[1] + 1];
        if (grille[case1[0]][case1[1]]) {
            listeCases.push(case1);
            let case2 = [this.coords[0], this.coords[1] + 2];
            if (grille[case2[0]][case2[1]] && grille[case1[0]][case1[1]].statut == "case_vide") {
                listeCases.push(case2);
                let case3 = [this.coords[0], this.coords[1] + 3];
                if (grille[case3[0]][case3[1]] && grille[case2[0]][case2[1]].statut == "case_vide") {
                    listeCases.push(case3);
                }
            }

        }
        //vers la gauche
        let case4 = [this.coords[0], this.coords[1] - 1];
        if (grille[case4[0]][case4[1]]) {
            listeCases.push(case4);
            let case5 = [this.coords[0], this.coords[1] - 2];
            if (grille[case5[0]][case5[1]] && grille[case4[0]][case4[1]].statut == "case_vide") {
                listeCases.push(case5);
                let case6 = [this.coords[0], this.coords[1] - 3];
                if (grille[case6[0]][case6[1]] && grille[case5[0]][case5[1]].statut == "case_vide") {
                    listeCases.push(case6);
                }
            }

        }
        //vers le bas
        let case7 = [this.coords[0] + 1, this.coords[1]];
        if (grille[case7[0]]) {
            if (grille[case7[0]][case7[1]]) {
                listeCases.push(case7);
                let case8 = [this.coords[0] + 2, this.coords[1]];
                if (grille[case8[0]]) {
                    if (grille[case8[0]][case8[1]] && grille[case7[0]][case7[1]].statut == "case_vide") {
                        listeCases.push(case8);
                        let case9 = [this.coords[0] + 3, this.coords[1]];
                        if (grille[case9[0]]) {
                            if (grille[case9[0]][case9[1]] && grille[case8[0]][case8[1]].statut == "case_vide") {
                                listeCases.push(case9);
                            }
                        }

                    }
                }
            }
        }
        //vers le haut
        let case10 = [this.coords[0] - 1, this.coords[1]];
        if (grille[case10[0]]) {
            if (grille[case10[0]][case10[1]]) {
                listeCases.push(case10);
                let case11 = [this.coords[0] - 2, this.coords[1]];
                if (grille[case11[0]]) {
                    if (grille[case11[0]][case11[1]] && grille[case10[0]][case10[1]].statut == "case_vide") {
                        listeCases.push(case11);
                        let case12 = [this.coords[0] - 3, this.coords[1]];
                        if (grille[case12[0]]) {
                            if (grille[case12[0]][case12[1]] && grille[case11[0]][case11[1]].statut == "case_vide") {
                                listeCases.push(case12);
                            }
                        }

                    }
                }
            }
        }


        return listeCases;

    }
}
