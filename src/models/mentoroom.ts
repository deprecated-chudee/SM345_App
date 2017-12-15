export class Mentoroom {
    mentoroom_id: number;
    team_name: string;
    team_about: string;
    team_theme: string;
    team_link: string;
    team_year: number;
    team_semester: number;
    mento_id: number;
    mento_name: string;
    team_confirm: number;
    picture: string;

    constructor(team_name, team_theme, team_link, team_about) {
        this.team_name = team_name;
        this.team_theme = team_theme;
        this.team_link = team_link;
        this.team_about = team_about;
    }
}