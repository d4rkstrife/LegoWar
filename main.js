const armes = [
    ["couteau", 10, "couteau.png"],
    ["epee", 15, "épée.png"],
    ["hache", 20, "hache.png"],
    ["faux", 18, "faux.png"],
    ["sabre", 22, "sabre.png"]

];
const joueurs = [
    ["joueur1", 50, "Joueur1.png"],
    ["joueur2", 50, "Joueur2.png"]
]
let app = new App(armes, joueurs);
app.run();