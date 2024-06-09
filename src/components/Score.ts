import Joueur from "./Joueur.ts";

interface TabScore_For_User {
    scores: Score[];
}

interface TabScoreStorage {
    tabScores: TabScore_For_User[];
}

class Score {
    private _point: number;
    private _niveau: number;
    private _joueur: Joueur;
    private _numTentative: number;

    constructor(joueur: Joueur, point: number = 0, niveau: number = 0, numTentative: number = 0) {
        this._point = point;
        this._niveau = niveau;
        this._joueur = joueur;
        this._numTentative = numTentative;
    }

    public get point(): number {
        return this._point;
    }

    public get niveau(): number {
        return this._niveau;
    }

    public get joueur(): Joueur {
        return this._joueur;
    }

    public get numTentative(): number {
        return this._numTentative;
    }

    public set numTentative(numTentative: number) {
        this._numTentative = numTentative
    }
    // Méthode pour sauvegarder le score dans le localStorage
    public save() {
        // Récupérer les scores existants depuis le localStorage
        const tabScoreStorage: TabScoreStorage = Score.getScoresFromLocalStorage();
        // Chercher l'utilisateur dans le tableau de scores
        let userScores = tabScoreStorage.tabScores.find(userScore => userScore.scores.length > 0 && userScore.scores[0].joueur.username === this._joueur.username);

        // Si l'utilisateur n'a pas encore de scores, créer un nouveau tableau pour cet utilisateur
        if (!userScores) {
            userScores = { scores: [] };
            tabScoreStorage.tabScores.push(userScores);
        }


        // Ajouter le nouveau score
        userScores.scores.push(this);

        // Sauvegarder le tableau de scores mis à jour dans le localStorage
        localStorage.setItem('tabScores', JSON.stringify(tabScoreStorage.tabScores));
    }

    public static updateScoresForUser(oldUsername: string, updatedJoueur: Joueur, oldJoueur: Joueur): void {

        const tabScoreStorage: TabScoreStorage = Score.getScoresFromLocalStorage();
        tabScoreStorage.tabScores.forEach(userScore => {

            if (userScore.scores.length > 0 && userScore.scores[0].joueur.username === oldUsername) {
                userScore.scores.forEach(score => {
                    score._joueur.username = updatedJoueur.username;
                    score._joueur.password = updatedJoueur.password;
                    score._joueur.intervaleA = oldJoueur.intervaleA;
                    score._joueur.intervaleB = oldJoueur.intervaleB;
                });
            }
        });

        localStorage.setItem('tabScores', JSON.stringify(tabScoreStorage.tabScores));

    }

    // Méthode statique pour récupérer les scores depuis le localStorage
    public static getScoresFromLocalStorage(): TabScoreStorage {

        const tabScoresJson = localStorage.getItem('tabScores');

        const tabScores: TabScore_For_User[] = tabScoresJson ? JSON.parse(tabScoresJson).map((userScore: any) => ({

            scores: userScore.scores.map((score: any) => new Score(new Joueur(score._joueur._username, score._joueur._password, score._joueur._intervaleA, score._joueur._intervaleB), score._point, score._niveau, score._numTentative))


        })) : [];
        return { tabScores };
    }


    // Méthode pour récupérer les scores d'un utilisateur spécifique

    public static getScoresForUser(username: string): Score[] {

        const tabScoreStorage: TabScoreStorage = Score.getScoresFromLocalStorage();

        const userScores = tabScoreStorage.tabScores.find(userScore => userScore.scores[0].joueur.username === username && userScore.scores.length > 0);

        return userScores ? userScores.scores : [];

    }



    /// Méthode statique pour trier les scores en fonction du niveau, des points, du nombre de tentatives et de l'intervalle
    public static sortScores(scores: Score[]): Score[] {
        return scores.sort((a, b) => {
            // Priorité 1: Niveau (décroissant)
            if (a.niveau !== b.niveau) {
                return b.niveau - a.niveau;
            }

            // Priorité 2: Points (décroissant)
            if (a.point !== b.point) {
                return b.point - a.point;
            }

            // Priorité 3: Nombre de tentatives (croissant)
            if (a.numTentative !== b.numTentative) {
                return a.numTentative - b.numTentative;
            }

            // Priorité 4: Intervalle (croissant)
            const intervalA = a.joueur.intervaleB - a.joueur.intervaleA;
            const intervalB = b.joueur.intervaleB - b.joueur.intervaleA;
            return intervalB - intervalA;
        });
    }


    // Méthode statique pour récupérer et trier les scores d'un utilisateur spécifique
    public static getAndSortScoresForUser(username: string): Score[] {
        const userScores = Score.getScoresForUser(username);
        return Score.sortScores(userScores);
    }


    public static getLastScoreForUser(username: string): Score | null {
        const userScores = Score.getScoresForUser(username);
        return userScores.length > 0 ? userScores[userScores.length - 1] : null;
    }


    // Méthode pour récupérer les scores de tous les utilisateurs
    public static getAllScores(): TabScore_For_User[] {

        const tabScoreStorage: TabScoreStorage = Score.getScoresFromLocalStorage();
        return tabScoreStorage.tabScores;

    }
}

export default Score;
