class Grille {
    constructor(joueur1, joueur2, arme1, arme2, arme3, arme4) {
        this.joueur1 = joueur1;
        this.joueur2 = joueur2;
        this.arme1 = arme1;
        this.arme2 = arme2;
        this.arme3 = arme3;
        this.arme4 = arme4;
        this.datas = new Array();
    }
    genererGrille(nbrLignes, nbrColonnes, nbrObstacles) {

        for (let i = 0; i < nbrLignes; i++) {
            const ligneDatas = new Array()
            this.datas.push(ligneDatas);
            for (let j = 0; j < nbrColonnes; j++) {
                const cell = {};
                ligneDatas.push(cell);
                cell.coords = { i, j };
                cell.statut = "case_vide";
                cell.isEmpty = true;
                cell.skin = "none"
            }
        }
        this.placerObstacle(nbrObstacles);
        this.placerArme(this.arme1);
        this.placerArme(this.arme2);
        this.placerArme(this.arme3);
        this.placerArme(this.arme4);
        this.placerJoueur(this.joueur1);
        this.placerJoueur(this.joueur2);
        this.comparerPosition(this.joueur1, this.joueur2);
    }

    render(container) {
        container = document.getElementById(container)
        for (let i = 0; i < this.datas.length; i++) {
            const ligne = document.createElement("tr");
            container.appendChild(ligne);
            for (let j = 0; j < this.datas[i].length; j++) {
                const colonne = document.createElement("td");
                ligne.appendChild(colonne);
                let id = i * 10 + j;
                colonne.id = id;
                colonne.className = this.datas[i][j].statut;
                if (this.datas[i][j].statut == "joueur1") {
                    colonne.appendChild(this.datas[i][j].skin);
                } else if (this.datas[i][j].statut == "joueur2") {
                    colonne.appendChild(this.datas[i][j].skin);
                } else if (this.datas[i][j].statut == "arme") {
                    colonne.appendChild(this.datas[i][j].skin);
                }
            }
        }
    }
    placerObstacle(nbrObstacles) {
        for (let i = 0; i < nbrObstacles; i++) {
            let xAleatoire = Math.floor(Math.random() * this.datas.length);
            let yAleatoire = Math.floor(Math.random() * this.datas[xAleatoire].length);
            this.datas[xAleatoire][yAleatoire].statut = "obstacle";
            this.datas[xAleatoire][yAleatoire].isEmpty = false;
        }
    }
    placerArme(data) {
        let xAleatoire = Math.floor(Math.random() * this.datas.length);
        let yAleatoire = Math.floor(Math.random() * this.datas[xAleatoire].length);
        let nom = data.nom;
        let damage = data.damage;
        let skin = data.skin;
        let image = new Image();
        image.src = "image/" + skin;
        if (this.datas[xAleatoire][yAleatoire].isEmpty == true) {
            this.datas[xAleatoire][yAleatoire].statut = "arme";
            this.datas[xAleatoire][yAleatoire].nom = nom;
            this.datas[xAleatoire][yAleatoire].degats = damage;
            this.datas[xAleatoire][yAleatoire].isEmpty = false;
            this.datas[xAleatoire][yAleatoire].skin = image;
        } else {
            this.placerArme(data);
        };
    }
    placerJoueur(nom) {

        let xAleatoire = Math.floor(Math.random() * this.datas.length);
        let yAleatoire = Math.floor(Math.random() * this.datas[xAleatoire].length);
        let player = nom.joueur;
        let skin = nom.image;
        if (this.datas[xAleatoire][yAleatoire].isEmpty == true) {
            this.datas[xAleatoire][yAleatoire].statut = player;
            this.datas[xAleatoire][yAleatoire].skin = skin;
            this.datas[xAleatoire][yAleatoire].isEmpty = false;
            nom.position.x = xAleatoire;
            nom.position.y = yAleatoire;
        } else {
            this.placerJoueur(nom);
        }
    }
    comparerPosition(joueur1, joueur2) {
        while ((joueur1.position.x == joueur2.position.x && (joueur1.position.y - joueur2.position.y == -1 || joueur1.position.y - joueur2.position.y == 1)) || (joueur1.position.y == joueur2.position.y && (joueur1.position.x - joueur2.position.x == -1 || joueur1.position.x - joueur2.position.x == 1))) {

            console.log("trop pret");
            this.datas[joueur2.position.x][joueur2.position.y].statut = "case_vide";
            this.datas[joueur2.position.x][joueur2.position.y].isEmpty = true;
            this.datas[joueur2.position.x][joueur2.position.y].skin = "none";
            this.placerJoueur(this.joueur2);
        }

    }

}