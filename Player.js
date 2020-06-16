class Player {
    constructor(data, arme) {
        this.position;
        this.joueur = data[0];
        this.pv = data[1];
        this.armeEquipee = arme
        this.damage = this.armeEquipee.damage;
        this.skin = data[2];
        this.image = new Image();
        this.image.src = "image/" + this.skin;
    }
}