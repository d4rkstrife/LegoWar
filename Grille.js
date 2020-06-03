class Grille {
    constructor(container, arme) {
        this.container = document.getElementById(container);
        this.arme = arme
        this.datas = new Array();
    }
    genererGrille(x, z) {

        for (let i = 0; i < x; i++) {
            const ligne = document.createElement("tr");
            this.container.appendChild(ligne);
            for (let y = 0; y < z; y++) {
                const colonne = document.createElement("td");
                ligne.appendChild(colonne);
                let id = i * 10 + y;
                colonne.id = id;
                colonne.className = "case_vide";
                this.datas[id] = { "statut": "case_vide" }
            }
        }
        this.placerObstacle(10);
        this.placerArme(this.arme.armeAleatoire(4));
    }
    placerObstacle(x) {
        for (let i = 0; i < x; i++) {
            let aleatoire = Math.floor(Math.random() * 100);
            let obstacle = document.getElementById(aleatoire);
            this.datas[aleatoire] = { "statut": "obstacle" };
            obstacle.className = "obstacle";
        }
    }
    placerArme(data) {
        data.forEach(element => {
            let aleatoire = Math.floor(Math.random() * this.datas.length);
            let nom = element[0];
            let damage = element[1];
            let skin = element[2];
            let image = new Image();
            image.src = "image/" + skin;
            let arme = document.getElementById(aleatoire);
            this.datas[aleatoire] = { "statut": "arme", "nom": nom, "degats": damage };
            arme.className = "arme";
            arme.appendChild(image);
        });
    }
    placerJoueur(nom) {

        let joueur = nom.initialiserPerso();
        let aleatoire = Math.floor(Math.random() * 100);
        let player = joueur[0];
        let skin = joueur[1];
        let cellAleatoire = document.getElementById(aleatoire);
        if (this.datas[aleatoire]["statut"] = "case_vide") {
            this.datas[aleatoire] = { "statut": player };
            cellAleatoire.className = player;
            cellAleatoire.appendChild(skin);
        } else {
            this.placerJoueur(nom);
        }
    }
    comparerPosition(joueur1, joueur2) {
        let diffPosition = joueur1.position - joueur2.position;
        while (diffPosition == 1 || diffPosition == -1 || diffPosition == 10 || diffPosition == -10) {
            joueur2.placerPersonnage();
        }
    }
}