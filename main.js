data = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
const armes = [
    ["epee", 5, "épée.png"],
    ["hache", 10, "hache.png"],
    ["faux", 8, "faux.png"],
    ["sabre", 12, "sabre.png"]

];

let grille = new Grille("grille_container", data);
let arme1 = new Arme(armes);
let arme2 = new Arme(armes);
let joueur1 = new Personnage(data, "joueur1", "Joueur1.png");
let joueur2 = new Personnage(data, "joueur2", "Joueur2.png");
let app = new App(joueur1, joueur2, grille, arme1, arme2);
app.run();