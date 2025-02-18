class Songo {
    constructor() {
        this.coteJoueur1 = new Array(7);
        this.coteJoueur2 = new Array(7);
        this.pointJoueur1 = 0;
        this.pointJoueur2 = 0;
    }


// Méthode qui retourne le nombre de pions du joueur idJ
    nbPoints(idJ){
        let pions = 0;
        if(idJ < 18){
            let joueur = this.coteJoueur1;
            for (let i = 0; i < 7; i++) {
                pions += joueur[i];
            }
        }else {
            let joueur = this.coteJoueur2;
            for (let i = 0; i < 7; i++) {
                pions += joueur[i];
            }
        }
        return pions;
    }

        // Méthodes de gestion de joueur
        joueurActif(idJ){
            if (idJ < 18) {
                return this.coteJoueur1;
            } else {
                return this.coteJoueur2;
            }
        }
        joueurOppose(idJ){
            if (idJ < 18) {
                return this.coteJoueur2;
            } else {
                return this.coteJoueur1;
            }
        }
        nbPionsEnJeu(){        // Pour les deux côtés
            return this.nbPoints(10)+ this.nbPoints(20);
        }


// fonction qui dit si le joueur idJ est bloqué en retournant 0 ou 1

    estBloque(idJ){
        var joueur;
        if (idJ > 18) {
            joueur = this.coteJoueur1;
        } else {
            joueur = this.coteJoueur2;
        }
        let i = 0;
        let b = 0;
        while(i < 7 && b == 0){
            joueur[i] == 0 ? b = 0: b = 1; 
            i++;
        }
        return b;         // 0 si est bloqué et 1 sinon
    }


// Méthode qui effectue une distribution

    distribution(idJ) {
        let joueur = this.joueurActif(idJ);
        var x = idJ;       // Variable qui permet de passer du côté opposé
        var c;             // indice de la case choisie
        if (idJ < 18) {
            c = idJ - 10;
        }else {
            c = idJ - 20;
        }
        var p = joueur[c];  // nombre de points de la case
        joueur[c] = 0;
        var d = c;
        let q = 0;          // Garantit qu'on passe du coté opoosé au plus 3 fois( nombre de passages vers le côté opposé)
        while (p > 0) {
            if (d >= 6) {
                if (x < 18){
                    d = 0;
                    while( q < 3){
                        joueur = this.joueurOppose(x);
                        q++;
                        x += 10;
                        break;
                    }
                }else{
                    d = 0;
                    while (q < 3){
                        joueur = this.joueurOppose(x);
                        q++;
                        x -= 10;
                        break;
                    }
                }
            }else {
                d++;
            }
            bloc :{
                for (var j = d; j < 7 && p > 0 && d <= 6; j++) {
                    if (q == 2 && j == c){  // Si on est revenu à la case choisie ?
                        d = 6;
                        break bloc;
                    }
                    joueur[j]++;
                    d++;
                    p--;
                }
            }

        }
        // Afin de définir une valeur comparable à idJ pour établir s'il pourrait avoir une prise
        let h = j-1;  // Dernière case de la distribution
        if (idJ < 18){
            if (q == 1 || q == 3) {
                h += 20;
            }else if (q == 2){
                h += 10;
            }
        }else {
            if (q == 1 || q == 3) {
                h += 10;
            }else if (q == 2){
                h += 20;
            }
        }

        return h;
    }

    // Méthode qui réalise une prise

    prise(idJ){
        let d = this.distribution(idJ);
        if ((idJ < 18 && d > 19) || (idJ > 18 && d < 19)) {
            let joueur = this.joueurOppose(idJ);
            var c;             // indice de la dernière case de la distribution
            if (d < 18) {
                c = d - 10;
            }else {
                c = d - 20;
            }
            if (joueur[c] == 2|| joueur[c] == 3 || joueur[c] == 4) {
                for (let j = c; j >= 0 && (joueur[j] == 2|| joueur[j] == 3 || joueur[j] == 4); j--) {
                    if (idJ < 17) {
                        this.pointJoueur1 += joueur[j];
                        joueur[j] = 0;
                    }else {
                        this.pointJoueur2 += joueur[j];
                        joueur[j] = 0;
                    }
                }

            }
        }
    }

    // Méthode qui dit si le jeu se poursuit

    poursuiteJeu() {
        if (this.pointJoueur1 > 35) {
            return 1;
        } else if (this.pointJoueur2 > 35) {
            return 2;
        } else if (this.nbPionsEnJeu() < 10) {
            if ((this.nbPoints(10) + this.pointJoueur1) > 35) {
                return 1;
            } else if ((this.nbPoints(20) + this.pointJoueur2) > 35) {
                return 2;
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    }
}



let songo = new Songo();
let t = 0;           // Vs machine ou Joueur local

function commencer() {
    songo.coteJoueur1 = [5, 5, 5, 5, 5, 5, 5];
    songo.coteJoueur2 = [5, 5, 5, 5, 5, 5, 5];
    songo.pointJoueur1 = 0;
    songo.pointJoueur2 = 0;
    tour = 1;
    msg = message(99);
    update(songo);
    let Mode = 0;
    let y;
    t = 0;
    while(t == 0){
        try{
            y = prompt(alert("Vous voulez jouer contre la machine(1) ou contre un joueur local(2) ?")) ;
            if(y == 0) {
                cansole.log();
            }else if(y == 1 || y == 2) {
                t = y;
            }else {
                cansole.log();
            }
        }catch(err) {
                alert("Valeur non valide !!");
        }
    }   
    if(t == 1) {
        Mode = "VS Machine";
    }else if(t == 2){
        Mode = "VS Joueur local";
    } 
    document.getElementById("mode").innerHTML = Mode;
        
}

function update() {
    for (let i = 0; i < 7; i++) {
        document.getElementById("A[" + i + "]").innerHTML = songo.coteJoueur1[i];
        document.getElementById("B[" + i + "]").innerHTML = songo.coteJoueur2[i];
    };
    document.getElementById("prise1").innerHTML = songo.pointJoueur1;
    document.getElementById("prise2").innerHTML = songo.pointJoueur2;
    document.getElementById("msg").innerHTML = msg;
}

function message(a) {
    switch(a) {
        case 99 :
            return "Le Player 1 commence..."
        case 1 :
            return "Player 1 a gagné !";
        case 2 :
            return "Player 2 a gagné !";
        case 3 :
            return "Player 1 est bloqué ! Le joueur 2 continue...";
        case 4 :
            return "Player 2 est bloqué ! Le joueur 1 continue..";
        case 10:
            return "Le Player 1 joue...";
        case 20:
            return "Le Player 2 joue...";
        case 5 :
            return "Vous et la machine avez joué ! Suivant...";
        default :
            return "Suivant";

    }
}

let tour = 1;
let msg = message(99);
function jeu(idJ) {
    if (tour == 1 && idJ < 17 && (songo.coteJoueur1[parseInt(idJ) - 10] != 0)) {
        songo.prise(idJ);
        let suite = songo.poursuiteJeu();
        tour = 2;
        if(songo.estBloque(10) == 0){
            tour = 1;
            alert(message(4));
            msg = message(10);
        }else {
            msg = message(20);
            if (t == 1){
                setTimeout(alert(message(5)), 2000);
            }else {
                setTimeout(alert(message()), 2000);
            }
        }
        if (suite != 0){
            alert(message(suite));
            msg = message(suite);
            tour = 3;
            songo.coteJoueur1 = ["X", "X", "X", "X", "X", "X", "X"];
            songo.coteJoueur2 = ["X", "X", "X", "X", "X", "X", "X"];
        }
        update();
        let machine;
        let pointMachine = 0;
        if (tour == 2) {
            while(pointMachine == 0 && t == 1) {
                machine = Math.ceil((Math.random()* 7) - 1);
                pointMachine = songo.coteJoueur2[machine];
                console.log(machine);
                console.log("Pions = " + pointMachine);
            }
            setTimeout(jeu(parseInt(machine) + 20), 3000);
        }
    }else if (tour == 2 && idJ > 19 && (songo.coteJoueur2[parseInt(idJ) - 20] != 0)) {
        songo.prise(idJ);
        let suite = songo.poursuiteJeu();
        tour = 1;
        if(songo.estBloque(20) == 0){
            tour = 2;
            alert(message(3));
            msg = message(20);
        }else {
            msg = message(10);
            if (t != 1){
                setTimeout(alert(message()), 2000);
            }
        }
        if (suite != 0){
            alert(message(suite));
            msg = message(suite);
            tour = 3;
            songo.coteJoueur1 = ["X", "X", "X", "X", "X", "X", "X"];
            songo.coteJoueur2 = ["X", "X", "X", "X", "X", "X", "X"];
        }
        update();
    }
}



