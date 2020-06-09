class Player {
    constructor(joueur, skin, pv, arme) {
        this.joueur = joueur;
        this.position = {};
        this.damage = arme.damage;
        this.pv = pv;
        this.arme = arme
        this.image = new Image();
        this.image.src = "image/" + skin;
    }
    afficherStat(container) {
        console.log($(container + " #points_vie").html());
        $(container + " #points_vie").html(this.pv);
        $(container + " #degats_joueur").html(this.damage);
        $(container + " #arme_joueur").attr('src', 'image/' + this.arme.skin)
    }
}