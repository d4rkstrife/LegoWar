const armes = [
    ["Couteau", 10, "couteau.png"],
    ["Epée", 15, "épée.png"],
    ["Hache", 20, "hache.png"],
    ["Faux", 18, "faux.png"],
    ["Sabre", 22, "sabre.png"]

];
const joueurs = [
    ["joueur1", 100, "Joueur1.png"],
    ["joueur2", 100, "Joueur2.png"]
]
let app = new App(armes, joueurs);
app.run();