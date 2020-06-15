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
            this.placerObjet(element);
        })
        this.joueurs.forEach(element => {
            this.placerObjet(element)
        })
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
    placerObjet(objet) {
        let ligneAleatoire = this.elementAleatoire(this.grille);
        let colonneAleatoire = this.elementAleatoire(this.grille[ligneAleatoire]);
        if (this.grille[ligneAleatoire][colonneAleatoire].statut == "case_vide") {
            this.grille[ligneAleatoire][colonneAleatoire].statut = "case_occupée";
            this.grille[ligneAleatoire][colonneAleatoire].content = objet;
            objet.position = [ligneAleatoire][colonneAleatoire];
            objet.coords = this.grille[ligneAleatoire][colonneAleatoire].coords;
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

}

