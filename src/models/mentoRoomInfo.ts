export class MentoRoomInfo{
    mento_start: number;
    mento_end: number;
    menti_start: number;
    menti_end: number;
    max_mento: number;
    max_menti: number;
    meeting_period: number; //모임기간
    meeting_number: number; //모임횟수
    survey_start: number;
    survey_end: number;

    constructor(mento_start: number, mento_end: number, menti_start: number, menti_end: number, max_mento: number, max_menti: number, meeting_period: number, meeting_number: number, survey_start: number, survey_end: number){
        this.mento_start = mento_start;
        this.mento_end = mento_end;
        this.menti_start = menti_start;
        this.menti_end = menti_end;
        this.max_mento = max_mento;
        this.max_menti = max_menti;
        this.meeting_period = meeting_period;
        this.meeting_number = meeting_number; 
        this.survey_start = survey_start;
        this.survey_end = survey_end;
    }
}