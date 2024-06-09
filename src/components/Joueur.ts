interface TabJoueur {
    joueurs: Joueur[];
}

class Joueur {
    private _username: string;
    private _password: string;
    private _intervaleA: number;
    private _intervaleB: number;

    constructor(username: string, password: string, A: number = 1, B: number =100) {
        this._username = username;
        this._password = password;
        this._intervaleA = A;
        this._intervaleB = B;
    }

    public save() {
        const joueur = new Joueur(this._username, this._password, this._intervaleA, this._intervaleB);
        const Tabjoueur: TabJoueur = Joueur.getJoueursFromLocalStorage();
        Tabjoueur.joueurs.push(joueur);
        localStorage.setItem("joueurs", JSON.stringify(Tabjoueur.joueurs));
    }



    private static getJoueursFromLocalStorage(): TabJoueur {
        const joueursJson = localStorage.getItem("joueurs");
        const joueurs: Joueur[] = joueursJson ? JSON.parse(joueursJson).map((j: any) => new Joueur(j._username, j._password, j._intervaleA, j._intervaleB)) : [];
        return { joueurs };
    }


    // New method to set the connected user
    public static setConnectedUser(username: string, password: string): boolean {
        const joueur = Joueur.findJoueurByUsername(username, password);
        if (joueur) {
            localStorage.setItem("connectedUser", JSON.stringify(joueur));
            return true;
        }
        return false;
    }

    // New method to get the connected user
    public static getConnectedUser(): Joueur | null {
        const joueurJson = localStorage.getItem("connectedUser");
        if (joueurJson) {
            const joueurObj = JSON.parse(joueurJson);
            return new Joueur(joueurObj._username, joueurObj._password, joueurObj._intervaleA, joueurObj._intervaleB);
        }
        return null;
    }


    // New method to clear the connected user
    public static clearConnectedUser() {
        localStorage.removeItem("connectedUser");
    }




    public static clearJoueurs() {
        localStorage.removeItem("joueurs");
    }

    public static findJoueurByUsername(username: string, password?: string): Joueur | null {
        const tabJoueur: TabJoueur = Joueur.getJoueursFromLocalStorage();
        for (const joueur of tabJoueur.joueurs) {
            if (joueur.username === username) {
                if (password) {
                    if (joueur.password === password) {
                        return joueur;
                    }
                } else {
                    return joueur;
                }
            }
        }
        return null;
    }


    public get username(): string {
        return this._username;
    }

    public set username(username: string) {
        this._username = username;
    }

    public get password(): string {
        return this._password;
    }

    public set password(password: string) {
        this._password = password;
    }


    public get intervaleA(): number {
        return this._intervaleA;
    }

    public set intervaleA(A: number) {
        this._intervaleA = A;
    }

    public get intervaleB(): number {
        return this._intervaleB;
    }

    public set intervaleB(B: number) {
        this._intervaleB = B;
    }

    // Nouvelle méthode pour mettre à jour les informations du joueur connecté
    public static updateConnectedUser(newUsername: string, newPassword: string, newIntervaleA: number, newIntervaleB: number): boolean {
        // Récupérer l'utilisateur connecté
        const connectedUser = Joueur.getConnectedUser();
        // Vérifier si un utilisateur est connecté
        if (connectedUser) {
            // Mettre à jour les informations de l'utilisateur connecté avec les nouvelles valeurs
            connectedUser.username = newUsername;
            connectedUser.password = newPassword;
            connectedUser.intervaleA = newIntervaleA;
            connectedUser.intervaleB = newIntervaleB;

            // Mettre à jour les informations du joueur connecté dans localStorage
            localStorage.setItem("connectedUser", JSON.stringify(connectedUser));
            // Mettre à jour le tableau de joueurs dans localStorage
            const Tabjoueur: TabJoueur = Joueur.getJoueursFromLocalStorage();
            // Trouver l'index du joueur connecté dans le tableau de joueurs
            const index = Tabjoueur.joueurs.findIndex(joueur => joueur.username === connectedUser.username);
            // Vérifier si le joueur connecté existe dans le tableau de joueurs
            if (index !== -1) {
                // Mettre à jour le joueur connecté dans le tableau de joueurs
                Tabjoueur.joueurs[index] = connectedUser;
                // Mettre à jour le tableau de joueurs dans localStorage
                localStorage.setItem("joueurs", JSON.stringify(Tabjoueur.joueurs));
            }


            return true; // Retourner vrai pour indiquer que la mise à jour a réussi
        }
        return false; // Retourner faux si aucun utilisateur n'est connecté
    }



    // public static getJoueurFromLocalStorage(): Joueur | null {
    //     const username = localStorage.getItem("userName");
    //     const password = localStorage.getItem("password");
    //     const niveau = parseInt(localStorage.getItem("niveau") || "1");
    //     const score = parseInt(localStorage.getItem("score") || "0");
    //     const intervaleA = parseInt(localStorage.getItem("IntervaleA") || "0");
    //     const intervaleB = parseInt(localStorage.getItem("IntervaleB") || "0");

    //     if (username === null || password === null) {
    //         return null;
    //     }

    //     return new Joueur(username, password, niveau, score, intervaleA, intervaleB);
    // }
}

export default Joueur;
