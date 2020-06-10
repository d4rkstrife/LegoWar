class Player {
    constructor(data) {
        this.position;
        this.joueur = data[0];
        this.pv = data[1];
        this.damage = 10;
        this.skin = data[2];
        this.image = new Image();
        this.image.src = "image/" + this.skin;
    }
    seDeplacer(grille) {
        let td = document.getElementsByTagName('td');
        for (let i = 0; i < td.length; i++) {
            td[i].addEventListener('click', () => {
                console.log(grille[td[i].id])
            })
        }

    }
}


