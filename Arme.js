class Arme {
    constructor(data) {
        this.nom = data[0];
        this.damage = data[1];
        this.skin = data[2];
        this.image = new Image();
        this.image.src = `image/${data[2]}`;
    }

}