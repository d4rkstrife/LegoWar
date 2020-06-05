class Grille {
    constructor(container, joueur1, joueur2, arme1, arme2, arme3, arme4) {
        this.container = document.getElementById(container);
        this.joueur1 = joueur1;
        this.joueur2 = joueur2;
        this.arme1 = arme1;
        this.arme2 = arme2;
        this.arme3 = arme3;
        this.arme4 = arme4;
        this.datas = new Array();
    }
    genererGrille(x, y, nbrObstacles) {

        for (let i = 0; i < x; i++) {
            const ligne = document.createElement("tr");
            this.container.appendChild(ligne);
            for (let j = 0; j < y; j++) {
                const colonne = document.createElement("td");
                ligne.appendChild(colonne);
                let id = i * 10 + j;
                colonne.id = id;
                colonne.className = "case_vide";
                this.datas[id] = {};
                this.datas[id].statut = "case_vide";
                this.datas[id].isEmpty = true;
            }
        }
        this.placerObstacle(nbrObstacles);
        this.placerArme(this.arme1);
        this.placerArme(this.arme2);
        this.placerArme(this.arme3);
        this.placerArme(this.arme4);
        console.log(this.joueur1)
        this.placerJoueur(this.joueur1);
        this.placerJoueur(this.joueur2);
        this.comparerPosition(this.joueur1, this.joueur2);
    }
    placerObstacle(nbrObstacles) {
        for (let i = 0; i < nbrObstacles; i++) {
            let aleatoire = Math.floor(Math.random() * this.datas.length);
            let obstacle = document.getElementById(aleatoire);
            this.datas[aleatoire].statut = "obstacle";
            this.datas[aleatoire].isEmpty = false;
            obstacle.className = "obstacle";
        }
    }
    placerArme(data) {
        let aleatoire = Math.floor(Math.random() * this.datas.length);
        let nom = data.nom;
        let damage = data.damage;
        let skin = data.skin;
        let image = new Image();
        image.src = "image/" + skin;
        if (this.datas[aleatoire].isEmpty == true) {
            let arme = document.getElementById(aleatoire);
            this.datas[aleatoire] = { "statut": "arme", "nom": nom, "degats": damage };
            this.datas[aleatoire].isEmpty = false;
            arme.className = "arme";
            arme.appendChild(image);
        } else {
            this.placerArme(data);
        };
    }
    placerJoueur(nom) {

        //  let joueur = nom.initialiserPerso();
        let aleatoire = Math.floor(Math.random() * this.datas.length);
        let player = nom.joueur;
        let skin = nom.image;
        let cellAleatoire = document.getElementById(aleatoire);
        if (this.datas[aleatoire].isEmpty == true) {
            this.datas[aleatoire].statut = player;
            this.datas[aleatoire].isEmpty = false;
            cellAleatoire.className = player;
            cellAleatoire.appendChild(skin);
            nom.position = aleatoire;
        } else {
            this.placerJoueur(nom);
        }
    }
    comparerPosition(joueur1, joueur2) {
        while (joueur1.position - joueur2.position == 1 || joueur1.position - joueur2.position == -1 || joueur1.position - joueur2.position == 10 || joueur1.position - joueur2.position == -10) {
            console.log("trop pret")
            this.datas[joueur2.position].statut = "case_vide";
            this.datas[joueur2.position].isEmpty = true;
            this.placerJoueur(this.joueur2);
        }

    }

}