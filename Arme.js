class Arme {
    constructor(data) {
        this.position;
        this.nom = data[0];
        this.damage = data[1];
        this.image = new Image();
        this.image.src = "image/" + data[2];
    }

}