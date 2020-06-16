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
            for (let j = 0; j < nbrColonnes; j++) {
                const cell = {};
                this.grille.push(cell);
                cell.statut = "case_vide";
                cell.id = i * nbrColonnes + j;
            }
        }
        for (let i = 0; i < nbrObstacles; i++) {
            this.placerObstacle();
        }
        this.armes.forEach(element => {
            //if arme0...
            this.placerObjet(element);
        })
        this.joueurs.forEach(element => {
            this.placerObjet(element)
        })
        this.comparerPositionJoueur(this.joueurs[0], this.joueurs[1]);
    }

    render(container) {
        let table = document.getElementById(container);
        this.grille.forEach(element => {
            if (element.id % this.nbrColonnes == 0) {
                let colonne = document.createElement('tr');
                table.appendChild(colonne);
            }
            const cell = document.createElement('td');
            cell.id = element.id;
            cell.className = element.statut;
            table.lastChild.appendChild(cell);
            if (element.statut == "case_occupée") {
                cell.appendChild(element.content.image);
                cell.className = "joueur";
            };
        });
        console.log(this.grille)
    }
    placerObstacle() {
        let caseAleatoire = this.elementAleatoire();
        if (this.grille[caseAleatoire].statut == "case_vide") {
            this.grille[caseAleatoire].statut = "obstacle";
        } else {
            this.placerObstacle();
        }

    }
    placerObjet(objet) {
        let caseAleatoire = this.elementAleatoire();
        if (this.grille[caseAleatoire].statut == "case_vide") {
            this.grille[caseAleatoire].statut = "case_occupée";
            this.grille[caseAleatoire].content = objet;
            objet.position = caseAleatoire;
        } else {
            this.placerObjet(objet);
        };
    }
    elementAleatoire() {
        return Math.floor(Math.random() * this.grille.length);
    }
    comparerPositionJoueur(joueur1, joueur2) {
        while (joueur1.position - joueur2.position == 1 || joueur1.position - joueur2.position == -1 || joueur1.position - joueur2.position == 10 || joueur1.position - joueur2.position == -10) {
            this.grille[joueur2.position] = { statut: "case_vide", id: joueur2.position };
            this.placerObjet(joueur2);
        }
    }

}

