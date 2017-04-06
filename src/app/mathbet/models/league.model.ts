export class LeagueModel {
    data: any;

    constructor(data) {
        this.data = data;
    }

    public getData() {
        return this.data;
    }

    public getHomeTeam(teamName: string): Array<Object> {
        let teamMatches = this.data.filter(match => match.HomeTeam === teamName);
        return teamMatches;
    }

    public getAwayTeam(teamName: string): Array<Object> {
        let teamMatches = this.data.filter(match => match.AwayTeam === teamName);
        return teamMatches;
    }

    public getHomeGoalsScored(teamName: string): any {
        let matches = this.getHomeTeam(teamName);
        let sum = matches.reduce((sum, x) => sum +  x['FTHG'], 0);
        return sum;
    }

    public getHomeGoalsReceived(teamName: string): any {
        let matches = this.getHomeTeam(teamName);
        let sum = matches.reduce((sum, x) => sum +  x['FTAG'], 0);
        return sum;
    }

    public getAwayGoalsScored(teamName: string): any {
        let matches = this.getAwayTeam(teamName);
        let sum = matches.reduce((sum, x) => sum +  x['FTAG'], 0);
        return sum;
    }

    public getAwayGoalsReceived(teamName: string): any {
        let matches = this.getAwayTeam(teamName);
        let sum = matches.reduce((sum, x) => sum +  x['FTHG'], 0);
        return sum;
    }

    public getHomeAtack(teamName: string): any {
        let scored = this.getHomeGoalsScored(teamName);
        let matchesNr = this.getHomeTeam(teamName).length;
        let league = this.leagueAtackStrength();
        return scored / matchesNr / league;
    }

    public getAwayAtack(teamName: string): any {
        let scored = this.getAwayGoalsScored(teamName);
        let matchesNr = this.getAwayTeam(teamName).length;
        let league = this.leagueDefenseStrength();
        return scored / matchesNr / league;
    }

    public getHomeDefense(teamName: string): any {
        let received = this.getHomeGoalsReceived(teamName);
        let matchesNr = this.getHomeTeam(teamName).length;
        let league = this.leagueDefenseStrength();
        return received / matchesNr / league;
    }

    public getAwayDefense(teamName: string): any {
        let received = this.getAwayGoalsReceived(teamName);
        let matchesNr = this.getAwayTeam(teamName).length;
        let league = this.leagueAtackStrength();
        return received / matchesNr / league;
    }
    private getLeagueMatches(): number {
        return this.data.length;
    }

    private getHomeGoals(): number {
        let sum = this.data.reduce((sum, x) => sum +  x['FTHG'], 0);
        return sum;
    }

    private getAwayGoals(): number {
        let sum = this.data.reduce((sum, x) => sum +  x['FTAG'], 0);
        return sum;
    }

    public leagueAtackStrength(): number {
        let matches = this.getLeagueMatches();
        let homeG = this.getHomeGoals();

        return homeG / matches;
    }

    public leagueDefenseStrength(): number {
        let matches = this.getLeagueMatches();
        let awayG = this.getAwayGoals();

        return awayG / matches;
    }
}
