export class Mentoroom{
    mentoroom_id: number;
    team_name: string;
    team_about: string;
    team_theme: string;
    team_filekind: number;
    team_link: string;
    team_year: number;
    team_semester: number;
    mento_id: number;
    mento_name: string;
    team_confirm: number;

    constructor(team_name: string, team_about: string, team_theme: string, team_filekind: number, team_link: string, team_year: number, team_semester: number, mento_id: number){
        this.team_name = team_name;
        this.team_about = team_about;
        this.team_theme = team_theme;
        this.team_filekind = team_filekind;
        this.team_link = team_link;
        this.team_year = team_year;
        this.team_semester = team_semester;
        this.mento_id = mento_id;
    }
}