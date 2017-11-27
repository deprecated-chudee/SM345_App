export class MentoroomInfo{
    id: number;
    mento_start: string;
    mento_end: string;
    menti_start: string;
    menti_end: string;
    max_mento: string;
    max_menti: string;
    meeting_period: string; //모임기간
    meeting_string: string; //모임횟수
    survey_start: string;
    survey_end: string;

    constructor(id: number, mento_start: string, mento_end: string, menti_start: string, menti_end: string, max_mento: string, max_menti: string, meeting_period: string, meeting_string: string, survey_start: string, survey_end: string){
        this.id = id;
        this.mento_start = mento_start;
        this.mento_end = mento_end;
        this.menti_start = menti_start;
        this.menti_end = menti_end;
        this.max_mento = max_mento;
        this.max_menti = max_menti;
        this.meeting_period = meeting_period;
        this.meeting_string = meeting_string; 
        this.survey_start = survey_start;
        this.survey_end = survey_end;
    }
}