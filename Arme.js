class Arme {
    constructor(data) {
        this.data = data;
    }
    armeAleatoire(x) {
        let armesAleatoires = new Array();
        for (let i = 0; i < x; i++) {
            armesAleatoires.push(this.data[Math.floor(Math.random() * this.data.length)]);
        }
        return armesAleatoires;
    }
}