class Player {
    constructor(data) {
        this.position;
        this.joueur = data[0];
        this.pv = data[1];
        //this.armeEquipee; 
        this.damage = 10;
        this.skin = data[2];
        this.image = new Image();
        this.image.src = "image/" + this.skin;
    }
}